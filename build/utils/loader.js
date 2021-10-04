"use strict";;
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const helpers_1 = require("./helpers");
const uploadcareLoader = ({ src, width, quality }) => {
    const publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || null;
    const userParamsString = process.env.NEXT_PUBLIC_UPLOADCARE_TRANSFORMATION_PARAMETERS || '';
    const cdnDomain = process.env.NEXT_PUBLIC_UPLOADCARE_CUSTOM_CDN_DOMAIN || constants_1.DEFAULT_CDN_DOMAIN;
    const customProxyDomain = process.env.NEXT_PUBLIC_UPLOADCARE_CUSTOM_PROXY_DOMAIN || null;
    const customProxyEndpoint = customProxyDomain
        ? (0, helpers_1.generateDefaultProxyEndpoint)(customProxyDomain)
        : null;
    const proxyEndpoint = customProxyEndpoint || (0, helpers_1.generateDefaultProxyEndpoint)(publicKey);
    const root = (0, helpers_1.trimTrailingSlash)(proxyEndpoint);
    const isOnCdn = (0, helpers_1.isCdnUrl)(src, cdnDomain);
    if (!(0, helpers_1.isProduction)() && !isOnCdn) {
        const isPublicKeySet = !(0, helpers_1.isDotenvParamEmpty)(publicKey);
        const isCustomProxyEndpointSet = !(0, helpers_1.isDotenvParamEmpty)(customProxyEndpoint);
        if (!isPublicKeySet && !isCustomProxyEndpointSet) {
            throw new Error(`Both NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY and NEXT_PUBLIC_UPLOADCARE_CUSTOM_PROXY_DOMAIN are not set. Please set either one.`);
        }
        if (src.startsWith('/')) {
            throw new Error(`Failed to parse "${src}" in "uploadcareLoader", Uploadcare loader doesn't support relative images.`);
        }
    }
    const filename = (0, helpers_1.getFilename)(src);
    const extension = (0, helpers_1.getExtension)(filename);
    // Some extensions are not processed by Uploadcare, e.g. SVG.
    if (constants_1.NOT_PROCESSED_EXTENSIONS.includes(extension)) {
        // @todo: Test non-CDN urls.
        return isOnCdn ? src : `${root}${src}`;
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
    if (isOnCdn) {
        const withoutFilename = src.slice(0, src.lastIndexOf('/'));
        return `${withoutFilename}${apiParamsString}${filename}`;
    }
    return `${root}${apiParamsString}${src}`;
};
exports.default = uploadcareLoader;
module.exports = exports["default"];
