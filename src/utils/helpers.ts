import {
  MAX_OUTPUT_IMAGE_DIMENSION,
  MAX_OUTPUT_JPEG_IMAGE_DIMENSION
} from './constants';

/**
 * Merge user parameters with default parameters, so that user parameters have higher priority.
 *
 * @param {string[]} defaultParams
 * @param {string[]} userParams
 * @returns {string[]}
 */
export function mergeParams(
  defaultParams: string[],
  userParams: string[]
): string[] {
  const resultParams = defaultParams;

  for (let i = 0; i < userParams.length; i++) {
    const [userParam] = _parseUploadcareTransformationParam(userParams[i]);

    let hasBeenReplaced = false;
    for (let j = 0; j < resultParams.length; j++) {
      if (resultParams[j].startsWith(userParam)) {
        resultParams[j] = userParams[i];
        hasBeenReplaced = true;
        break;
      }
    }

    // If the param is new, just add it.
    if (!hasBeenReplaced) {
      resultParams.push(userParams[i]);
    }
  }

  return resultParams;
}

/**
 * Get requested image format from params, for example jpeg or auto.
 *
 * @param {string[]} userParams
 * @returns {string}
 */
export function getRequestedFormatFromParams(userParams: string[]): string {
  for (let i = 0; i < userParams.length; i++) {
    const [key, value] = _parseUploadcareTransformationParam(userParams[i]);

    if (key === 'format') {
      return value;
    }
  }

  return 'auto';
}

export function getExtension(filename: string): string {
  return filename.toLowerCase().split('?')[0].split('#')[0].split('.')[1];
}

export function getFilename(url: string): string {
  return url.substring(1 + url.lastIndexOf('/'));
}

export function trimTrailingSlash(url: string): string {
  return url.replace(/\/$/, '');
}

export function convertToUploadcareQualityString(
  requestedQuality?: number
): string {
  // If any particular quality has not been requested, we use the smart quality mode.
  if (!requestedQuality) {
    return 'smart';
  }

  // Uploadcare doesn't support integer-based quality modificators,
  // so we need to map them onto uploadcare's equivalents
  const names = ['lightest', 'lighter', 'normal', 'better', 'best'];
  const intervals = [0, 38, 70, 80, 87, 100];
  const nameIdx = intervals.findIndex((min, idx) => {
    const max = intervals[idx + 1];
    return min <= requestedQuality && requestedQuality <= max;
  });
  return names[nameIdx];
}

/**
 * Get max resize width.
 *
 * Output image dimension is limited to 3000px,
 * but it can be increased by explicitly setting /format/jpeg/ through API params.
 *
 * @param {number} requestedWidth
 * @param {boolean} isForJpeg
 * @returns {number}
 */
export function getMaxResizeWidth(
  requestedWidth: number,
  isForJpeg = false
): number {
  const maxDimension = isForJpeg
    ? MAX_OUTPUT_JPEG_IMAGE_DIMENSION
    : MAX_OUTPUT_IMAGE_DIMENSION;
  return Math.min(Math.max(requestedWidth, 0), maxDimension);
}

export function generateDefaultProxyEndpoint(publicKey: string | null): string {
  return `https://${publicKey}.ucr.io`;
}

export function generateCustomProxyEndpoint(customProxyDomain: string): string {
  return `https://${customProxyDomain}`;
}

export function isCdnUrl(url: string, cdnDomain: string): boolean {
  //eslint-disable-next-line
  const escapedCdnDomain = cdnDomain.replace('.', '.');

  //eslint-disable-next-line
  const regexp = new RegExp(`^https?:\/\/${escapedCdnDomain}`);

  return regexp.test(url);
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function parseUserParamsString(paramsString?: string): string[] {
  if (paramsString == null || paramsString === '') {
    return [];
  }

  const params = paramsString.split(',');

  return params.map((param) => param.trim());
}

export function isDotenvParamEmpty(param: string | null): boolean {
  return param == null || param.trim() === '';
}

export function isJpegExtension(extension: string): boolean {
  return ['jpg', 'jpeg'].includes(extension.toLowerCase());
}

function _parseUploadcareTransformationParam(param: string): string[] {
  return param.split('/');
}
