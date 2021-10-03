const { DEFAULT_PARAMS, NOT_PROCESSED_EXTENSIONS, DEFAULT_CDN_DOMAIN } = require("./constants");
const { 
  trimTrailingSlash, 
  mergeParams, 
  getMaxResizeWidth, 
  convertToUploadcareQualityString, 
  getFilename, 
  getExtension, 
  isProduction, 
  isCdnUrl, 
  generateDefaultProxyEndpoint, 
  parseUserParamsString, 
  isDotenvParamEmpty, 
  getRequestedFormatFromParams,
  isJpegExtension
} = require("./helpers");

function uploadcareLoader({ src, width, quality }) {
  const publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || null;
  const userParamsString = process.env.NEXT_PUBLIC_UPLOADCARE_TRANSFORMATION_PARAMETERS || '';
  const cdnDomain = process.env.NEXT_PUBLIC_UPLOADCARE_CUSTOM_CDN_DOMAIN || DEFAULT_CDN_DOMAIN;
  const customProxyDomain = process.env.NEXT_PUBLIC_UPLOADCARE_CUSTOM_PROXY_DOMAIN || null;
  const customProxyEndpoint = customProxyDomain ? generateDefaultProxyEndpoint(customProxyDomain) : null;
  const proxyEndpoint = customProxyEndpoint || generateDefaultProxyEndpoint(publicKey)

  const root = trimTrailingSlash(proxyEndpoint);

  const isOnCdn = isCdnUrl(src, cdnDomain);

  if (!isProduction() && !isOnCdn) {

    const isPublicKeySet = !isDotenvParamEmpty(publicKey);
    const isCustomProxyEndpointSet = !isDotenvParamEmpty(customProxyEndpoint);

    if (!isPublicKeySet && !isCustomProxyEndpointSet) {
      throw new Error(
        `Both NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY and NEXT_PUBLIC_UPLOADCARE_CUSTOM_PROXY_DOMAIN are not set. Please set either one.`
      );
    }

    if (src.startsWith("/")) {
      throw new Error(
        `Failed to parse "${src}" in "uploadcareLoader", Uploadcare loader doesn't support relative images.`
      );
    }
  }

  const filename = getFilename(src);
  const extension = getExtension(filename);

  // Some extensions are not processed by Uploadcare, e.g. SVG.
  if (NOT_PROCESSED_EXTENSIONS.includes(extension)) {
    // @todo: Test non-CDN urls.
    return isOnCdn ? src : `${root}${src}`;
  }

  // Demo: https://ucarecdn.com/a6f8abc8-f92e-460a-b7a1-c5cd70a18cdb/-/format/auto/-/resize/300x/vercel.png

  const userParams = parseUserParamsString(userParamsString);

  const requestedFormat = getRequestedFormatFromParams(userParams);
  const qualityString = convertToUploadcareQualityString(quality);

  const isJpeg = requestedFormat === 'jpeg' || (requestedFormat === 'auto' && isJpegExtension(extension));
  const maxResizeWidth = getMaxResizeWidth(width, isJpeg);

  const basicParams = DEFAULT_PARAMS.concat([
    `resize/${maxResizeWidth}x`,
    `quality/${qualityString}`
  ]);

  const params = mergeParams(basicParams, userParams);

  const apiParamsString = "/-/" + params.join("/-/") + "/";

  if (isOnCdn) {
    const withoutFilename = src.slice(0, src.lastIndexOf("/"));
    return `${withoutFilename}${apiParamsString}${filename}`;
  }

  return `${root}${apiParamsString}${src}`;
}

module.exports = uploadcareLoader;
