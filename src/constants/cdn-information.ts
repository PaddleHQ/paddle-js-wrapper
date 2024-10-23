export const Versions = {
  CLASSIC: 'classic',
  V1: 'v1',
} as const;

export const DefaultVersion = Versions.V1;

export const PaddleClassicCDNUrl = 'https://cdn.paddle.com/paddle/paddle.js';
export const PaddleBillingCDNUrl = 'https://cdn.paddle.com/paddle/v2/paddle.js';

export const PaddleClassicInfo = {
  url: PaddleClassicCDNUrl,
} as const;

export const PaddleBillingV1Info = {
  url: PaddleBillingCDNUrl,
} as const;
