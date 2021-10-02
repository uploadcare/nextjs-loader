const { DEFAULT_PARAMS, NOT_PROCESSED_EXTENSIONS } = require("./constants");
const { trimTrailingSlash, mergeParams, getMaxResizeWidth, convertToUploadcareQualityString, getFilename, getExtension, isProduction, isCdnUrl, getProxyEndpoint, parseUserParamsString } = require("./helpers");

function uploadcareLoader({ src, width, quality }) {
  const publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || null;
  const userParamsString = process.env.NEXT_PUBLIC_API_PARAMETERS || '';

  const root = getProxyEndpoint(publicKey);

  const isOnCdn = isCdnUrl(src);

  if (!isProduction() && !isOnCdn) {

    if (publicKey == null || publicKey == "") {
      throw new Error(
        `The NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY is not set.`
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
    return isOnCdn ? src : `${trimTrailingSlash(root)}${src}`;
  }

  const qualityString = convertToUploadcareQualityString(quality);
  const maxResizeWidth = getMaxResizeWidth(width);

  // Demo: https://ucarecdn.com/a6f8abc8-f92e-460a-b7a1-c5cd70a18cdb/-/format/auto/-/resize/300x/vercel.png

  const userParams = parseUserParamsString(userParamsString);

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

  return `${trimTrailingSlash(root)}${apiParamsString}${src}`;
}

module.exports = uploadcareLoader;
