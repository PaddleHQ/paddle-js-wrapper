import { Paddle } from '../types';

const CDN_URL = 'https://cdn.paddle.com/paddle/v2/paddle.js';

export function findScript(): HTMLScriptElement | undefined {
  return document.querySelector<HTMLScriptElement>(`script[src="${CDN_URL}"]`) || undefined;
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

let promise: Promise<Paddle | undefined> | undefined;

export function loadFromCDN(): Promise<Paddle | undefined> {
  // Return promise on re-renders
  if (promise !== undefined) {
    return promise;
  }

  promise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Return undefined in a server side environment
      resolve(undefined);
      return;
    }

    // Return Paddle instance if it is already initialized
    if (window.Paddle) {
      resolve(window.Paddle);
      return;
    }

    try {
      // Inject if paddle.js script tag is not found
      let script = findScript();

      if (!script) {
        script = injectScript(CDN_URL);
      }

      // Wait for `load` event before returning
      script.addEventListener('load', () => {
        if (window.Paddle) {
          resolve(window.Paddle);
        } else {
          reject(new Error('Paddle.js not available'));
        }
      });

      // Show an error if loading fails
      script.addEventListener('error', () => {
        reject(new Error('Failed to load Paddle.js'));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });

  return promise;
}
