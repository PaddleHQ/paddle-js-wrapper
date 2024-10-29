import { Paddle, Version } from '../../types';
import { PaddleBillingV1Info, PaddleClassicInfo, Versions } from '../constants/cdn-information';

export function findScript(cdnUrl: string): HTMLScriptElement | undefined {
  return document.querySelector<HTMLScriptElement>(`script[src="${cdnUrl}"]`) || undefined;
}

export function injectScript(src: string): HTMLScriptElement {
  const script = document.createElement('script');
  script.src = src;

  const headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error('Cannot inject Paddle.js. It needs a <head> or <body> element.');
  }

  headOrBody.appendChild(script);

  return script;
}

const promiseMap: Record<Version, Promise<Paddle | undefined> | undefined> = {
  classic: undefined,
  v1: undefined,
};

type PaddleInstanceName = 'PaddleClassic' | 'PaddleBillingV1';
const VersionToPaddleMap: Record<Version, PaddleInstanceName> = {
  classic: 'PaddleClassic',
  v1: 'PaddleBillingV1',
};

export function loadFromCDN(version: Version): Promise<Paddle | undefined> | undefined {
  const cdnUrl = getCDNInfoBasedOnVersion(version)?.url;
  if (!cdnUrl) {
    return;
  }
  // Return promise on re-renders
  const existingPromise = promiseMap[version];
  const paddleInstanceName = VersionToPaddleMap[version];
  if (existingPromise !== undefined) {
    return existingPromise;
  }

  promiseMap[version] = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Return undefined in a server side environment
      resolve(undefined);
      return;
    }

    // Return Paddle instance if it is already initialized
    if (window[paddleInstanceName] || window.Paddle) {
      resolve(window[paddleInstanceName] || window.Paddle);
      return;
    }

    try {
      // Inject if paddle.js script tag is not found
      let script = findScript(cdnUrl);

      if (!script) {
        script = injectScript(cdnUrl);
      }

      // Wait for `load` event before returning
      script.addEventListener('load', () => {
        if (window[paddleInstanceName] || window.Paddle) {
          resolve(window[paddleInstanceName] || window.Paddle);
        } else {
          reject(new Error('Paddle.js not available'));
        }
      });

      // Show an error if loading fails
      script.addEventListener('error', () => {
        reject(new Error(`Failed to load Paddle.js - ${version}`));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });

  return promiseMap[version];
}

export function getCDNInfoBasedOnVersion(version: Version) {
  if (version === Versions.CLASSIC) {
    return PaddleClassicInfo;
  }
  if (version === Versions.V1) {
    return PaddleBillingV1Info;
  } else {
    console.error('[Paddle] Unknown Paddle Version');
    return;
  }
}
