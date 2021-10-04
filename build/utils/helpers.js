"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJpegExtension = exports.isDotenvParamEmpty = exports.parseUserParamsString = exports.isProduction = exports.isCdnUrl = exports.generateCustomProxyEndpoint = exports.generateDefaultProxyEndpoint = exports.getMaxResizeWidth = exports.convertToUploadcareQualityString = exports.trimTrailingSlash = exports.getFilename = exports.getExtension = exports.getRequestedFormatFromParams = exports.mergeParams = void 0;
const constants_1 = require("./constants");
/**
 * Merge user parameters with default parameters, so that user parameters have higher priority.
 *
 * @param {string[]} defaultParams
 * @param {string[]} userParams
 * @returns {string[]}
 */
function mergeParams(defaultParams, userParams) {
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
exports.mergeParams = mergeParams;
/**
 * Get requested image format from params, for example jpeg or auto.
 *
 * @param {string[]} userParams
 * @returns {string}
 */
function getRequestedFormatFromParams(userParams) {
    for (let i = 0; i < userParams.length; i++) {
        const [key, value] = _parseUploadcareTransformationParam(userParams[i]);
        if (key === 'format') {
            return value;
        }
    }
    return 'auto';
}
exports.getRequestedFormatFromParams = getRequestedFormatFromParams;
function getExtension(filename) {
    return filename.toLowerCase().split('?')[0].split('#')[0].split('.')[1];
}
exports.getExtension = getExtension;
function getFilename(url) {
    return url.substring(1 + url.lastIndexOf('/'));
}
exports.getFilename = getFilename;
function trimTrailingSlash(url) {
    return url.replace(/\/$/, '');
}
exports.trimTrailingSlash = trimTrailingSlash;
function convertToUploadcareQualityString(requestedQuality) {
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
exports.convertToUploadcareQualityString = convertToUploadcareQualityString;
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
function getMaxResizeWidth(requestedWidth, isForJpeg = false) {
    const maxDimension = isForJpeg
        ? constants_1.MAX_OUTPUT_JPEG_IMAGE_DIMENSION
        : constants_1.MAX_OUTPUT_IMAGE_DIMENSION;
    return Math.min(Math.max(requestedWidth, 0), maxDimension);
}
exports.getMaxResizeWidth = getMaxResizeWidth;
function generateDefaultProxyEndpoint(publicKey) {
    return `https://${publicKey}.ucr.io`;
}
exports.generateDefaultProxyEndpoint = generateDefaultProxyEndpoint;
function generateCustomProxyEndpoint(customProxyDomain) {
    return `https://${customProxyDomain}`;
}
exports.generateCustomProxyEndpoint = generateCustomProxyEndpoint;
function isCdnUrl(url, cdnDomain) {
    //eslint-disable-next-line
    const escapedCdnDomain = cdnDomain.replace('.', '.');
    //eslint-disable-next-line
    const regexp = new RegExp(`^https?:\/\/${escapedCdnDomain}`);
    return regexp.test(url);
}
exports.isCdnUrl = isCdnUrl;
function isProduction() {
    return process.env.NODE_ENV === 'production';
}
exports.isProduction = isProduction;
function parseUserParamsString(paramsString) {
    if (paramsString == null || paramsString === '') {
        return [];
    }
    const params = paramsString.split(',');
    return params.map((param) => param.trim());
}
exports.parseUserParamsString = parseUserParamsString;
function isDotenvParamEmpty(param) {
    return param == null || param.trim() === '';
}
exports.isDotenvParamEmpty = isDotenvParamEmpty;
function isJpegExtension(extension) {
    return ['jpg', 'jpeg'].includes(extension.toLowerCase());
}
exports.isJpegExtension = isJpegExtension;
function _parseUploadcareTransformationParam(param) {
    return param.split('/');
}
