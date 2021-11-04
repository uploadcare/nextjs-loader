import { ImageLoaderProps } from 'next/image';
import {
  DEFAULT_CDN_DOMAIN,
  DEFAULT_PARAMS,
  NOT_PROCESSED_EXTENSIONS
} from './constants';
import {
  convertToUploadcareQualityString,
  generateDefaultProxyEndpoint,
  getExtension,
  getFilename,
  getMaxResizeWidth,
  getRequestedFormatFromParams,
  isCdnUrl,
  isDotenvParamEmpty,
  isJpegExtension,
  isProduction,
  mergeParams,
  parseUserParamsString,
  trimTrailingSlash
} from './helpers';

export function uploadcareLoader({
  src,
  width,
  quality
}: ImageLoaderProps): string {
  const publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || null;
  const userParamsString =
    process.env.NEXT_PUBLIC_UPLOADCARE_TRANSFORMATION_PARAMETERS || '';
  const cdnDomain =
    process.env.NEXT_PUBLIC_UPLOADCARE_CUSTOM_CDN_DOMAIN || DEFAULT_CDN_DOMAIN;
  const customProxyDomain =
    process.env.NEXT_PUBLIC_UPLOADCARE_CUSTOM_PROXY_DOMAIN || null;
  const customProxyEndpoint = customProxyDomain
    ? generateDefaultProxyEndpoint(customProxyDomain)
    : null;
  const proxyEndpoint =
    customProxyEndpoint || generateDefaultProxyEndpoint(publicKey);

  const basePath = trimTrailingSlash(
    process.env.NEXT_PUBLIC_UPLOADCARE_APP_BASE_URL || ''
  );

  const proxy = trimTrailingSlash(proxyEndpoint);

  const isOnCdn = isCdnUrl(src, cdnDomain);

  if (!isProduction() && !isOnCdn) {
    const isPublicKeySet = !isDotenvParamEmpty(publicKey);
    const isCustomProxyEndpointSet = !isDotenvParamEmpty(customProxyEndpoint);

    if (!isPublicKeySet && !isCustomProxyEndpointSet) {
      throw new Error(
        `Both NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY and NEXT_PUBLIC_UPLOADCARE_CUSTOM_PROXY_DOMAIN are not set. Please set either one.`
      );
    }

    if (src.startsWith('/')) {
      return src;
    }
  }

  // Process local images in Production.
  if (isProduction() && !isOnCdn && src.startsWith('/')) {
    const isBasePathSet = !isDotenvParamEmpty(basePath);

    if (!isBasePathSet) {
      return src;
    }

    return `${basePath}${src}`;
  }

  const filename = getFilename(src);
  const extension = getExtension(filename);

  // Some extensions are not processed by Uploadcare, e.g. SVG.
  if (NOT_PROCESSED_EXTENSIONS.includes(extension)) {
    return isOnCdn ? src : `${basePath}${src}`;
  }

  // Demo: https://ucarecdn.com/a6f8abc8-f92e-460a-b7a1-c5cd70a18cdb/-/format/auto/-/resize/300x/vercel.png

  const userParams = parseUserParamsString(userParamsString);

  const requestedFormat = getRequestedFormatFromParams(userParams);
  const qualityString = convertToUploadcareQualityString(quality);

  const isJpeg =
    requestedFormat === 'jpeg' ||
    (requestedFormat === 'auto' && isJpegExtension(extension));
  const maxResizeWidth = getMaxResizeWidth(width, isJpeg);

  const basicParams = DEFAULT_PARAMS.concat([
    `resize/${maxResizeWidth}x`,
    `quality/${qualityString}`
  ]);

  const params = mergeParams(basicParams, userParams);

  const apiParamsString = '/-/' + params.join('/-/') + '/';

  if (isOnCdn) {
    const withoutFilename = src.slice(0, src.lastIndexOf('/'));
    return `${withoutFilename}${apiParamsString}${filename}`;
  }

  return `${proxy}${apiParamsString}${src}`;
}
