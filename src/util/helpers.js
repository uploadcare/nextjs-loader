const { MAX_OUTPUT_IMAGE_DIMENSION } = require("./constants");

/**
 * Merge user parameters with default parameters, so that user parameters have higher priority.
 * 
 * @param {Array} defaultParams 
 * @param {Array} userParams 
 * @returns {Array}
 */
function mergeParams(defaultParams, userParams) {
  let resultParams = defaultParams;

  for (let i = 0; i < userParams.length; i++) {
    const [userParam] = _parseUploadcareTransformationParam(userParams[i]);

    for (let j = 0; j < resultParams.length; j++) {
      if (resultParams[j].startsWith(userParam)) {
        resultParams[j] = userParams[i];
      }
    }
  }

  return resultParams;
}

function getExtension(filename) {
  return filename.toLowerCase()
    .split("?")[0]
    .split("#")[0]
    .split(".")[1];
}

function getFilename(url) {
  return url.substring(1 + url.lastIndexOf("/"));
}

function trimTrailingSlash(url) {
  return url.replace(/\/$/, "");
}

function convertToUploadcareQualityString(requestedQuality) {
  // If any particular quality has not been requested, we use the smart quality mode.
  if (!requestedQuality) {
    return "smart";
  }

  // Uploadcare doesn't support integer-based quality modificators,
  // so we need to map them onto uploadcare's equivalents
  const names = ["lightest", "lighter", "normal", "better", "best"];
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
 */
function getMaxResizeWidth(requestedWidth) {
  return Math.min(Math.max(requestedWidth, 0), MAX_OUTPUT_IMAGE_DIMENSION);
}

function generateDefaultProxyEndpoint(publicKey) {
  return `https://${publicKey}.ucr.io`;
}

function generateCustomProxyEndpoint(customProxyDomain) {
  return `https://${customProxyDomain}`;
}

function isCdnUrl(url, cdnDomain) {
  const escapedCdnDomain = cdnDomain.replace('.', '\.');

  const regexp = new RegExp(`^https?:\/\/${escapedCdnDomain}`);

  return regexp.test(url);
}

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function parseUserParamsString(paramsString) {
  if (paramsString == null || paramsString === "") {
    return [];
  }

  const params = paramsString.split(",");

  return params.map((param) => param.trim());
}

function isDotenvParamEmpty(param) {
  return param == null || param.trim() === "";
}

function _parseUploadcareTransformationParam(param) {
  return param.split('/');
}

module.exports = {
  mergeParams,
  getExtension,
  getFilename,
  trimTrailingSlash,
  convertToUploadcareQualityString,
  getMaxResizeWidth,
  generateDefaultProxyEndpoint,
  generateCustomProxyEndpoint,
  isCdnUrl,
  isProduction,
  parseUserParamsString,
  isDotenvParamEmpty
};
