"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadcareLoader = void 0;
const constants_1 = require("./constants");
const helpers_1 = require("./helpers");
function uploadcareLoader({ src, width, quality }) {
    const publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || null;
    const userParamsString = process.env.NEXT_PUBLIC_UPLOADCARE_TRANSFORMATION_PARAMETERS || '';
    const cdnDomain = process.env.NEXT_PUBLIC_UPLOADCARE_CUSTOM_CDN_DOMAIN || constants_1.DEFAULT_CDN_DOMAIN;
    const customProxyDomain = process.env.NEXT_PUBLIC_UPLOADCARE_CUSTOM_PROXY_DOMAIN || null;
    const customProxyEndpoint = customProxyDomain
        ? (0, helpers_1.generateDefaultProxyEndpoint)(customProxyDomain)
        : null;
    const proxyEndpoint = customProxyEndpoint || (0, helpers_1.generateDefaultProxyEndpoint)(publicKey);
    const basePath = (0, helpers_1.trimTrailingSlash)(process.env.NEXT_PUBLIC_UPLOADCARE_APP_BASE_URL || '');
    const proxy = (0, helpers_1.trimTrailingSlash)(proxyEndpoint);
    const isProductionMode = (0, helpers_1.isProduction)();
    const isImageOnCdn = (0, helpers_1.isCdnUrl)(src, cdnDomain);
    const isImageRelative = src.startsWith('/');
    // Development mode; not on CDN.
    if (!isProductionMode && !isImageOnCdn) {
        const isPublicKeySet = !(0, helpers_1.isDotenvParamEmpty)(publicKey);
        const isCustomProxyEndpointSet = !(0, helpers_1.isDotenvParamEmpty)(customProxyEndpoint);
        if (!isPublicKeySet && !isCustomProxyEndpointSet) {
            throw new Error(`Both NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY and NEXT_PUBLIC_UPLOADCARE_CUSTOM_PROXY_DOMAIN are not set. Please set either one.`);
        }
        if (isImageRelative) {
            return src;
        }
    }
    const filename = (0, helpers_1.getFilename)(src);
    const extension = (0, helpers_1.getExtension)(filename);
    // Some extensions are not processed by Uploadcare, e.g. SVG.
    if (constants_1.NOT_PROCESSED_EXTENSIONS.includes(extension)) {
        return isImageOnCdn ? src : `${basePath}${src}`;
    }
    // Demo: https://ucarecdn.com/a6f8abc8-f92e-460a-b7a1-c5cd70a18cdb/-/format/auto/-/resize/300x/vercel.png
    const userParams = (0, helpers_1.parseUserParamsString)(userParamsString);
    const requestedFormat = (0, helpers_1.getRequestedFormatFromParams)(userParams);
    const qualityString = (0, helpers_1.convertToUploadcareQualityString)(quality);
    const isJpeg = requestedFormat === 'jpeg' ||
        (requestedFormat === 'auto' && (0, helpers_1.isJpegExtension)(extension));
    const maxResizeWidth = (0, helpers_1.getMaxResizeWidth)(width, isJpeg);
    const basicParams = constants_1.DEFAULT_PARAMS.concat([
        `resize/${maxResizeWidth}x`,
        `quality/${qualityString}`
    ]);
    const params = (0, helpers_1.mergeParams)(basicParams, userParams);
    const apiParamsString = '/-/' + params.join('/-/') + '/';
    if (isImageOnCdn) {
        const withoutFilename = src.slice(0, src.lastIndexOf('/'));
        return `${withoutFilename}${apiParamsString}${filename}`;
    }
    // Production mode; local image.
    if (isProductionMode && isImageRelative) {
        const isBasePathSet = !(0, helpers_1.isDotenvParamEmpty)(basePath);
        // Return the relative url AS IS if the base path is not set.
        if (!isBasePathSet) {
            return src;
        }
        return `${proxy}${apiParamsString}${basePath}${src}`;
    }
    return `${proxy}${apiParamsString}${src}`;
}
exports.uploadcareLoader = uploadcareLoader;
