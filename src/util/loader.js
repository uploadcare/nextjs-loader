const MAX_OUTPUT_IMAGE_DIMENSION = 3000;
const SKIPPED_EXTENSIONS = ["svg", "gif"];
const DEFAULT_PARAMS = ["format/auto", "stretch/off"];

function uploadcareLoader({ src, width, quality }) {
  const publicKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || null;
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
        `Failed to parse "${src}" in "next/image", Uploadcare loader doesn't support relative images.`
      );
    }
  }

  const filename = getFilename(src);
  const extension = getExtension(filename);

  // Some extensions are not processed by Uploadcare, e.g. SVG.
  if (SKIPPED_EXTENSIONS.includes(extension)) {
    return isOnCdn ? src : `${trimTrailingSlash(root)}${src}`;
  }

  const maxResizeWidth = getMaxResizeWidth(width);
  // Demo: https://ucarecdn.com/a6f8abc8-f92e-460a-b7a1-c5cd70a18cdb/-/format/auto/-/resize/300x/vercel.png
  const params = DEFAULT_PARAMS.concat([`resize/${maxResizeWidth}x`]);

  if (quality) {
    params.push(`quality/${convertToUploadcareQuality(quality)}`);
  } else {
    params.push("quality/smart");
  }

  const paramsString = "/-/" + params.join("/-/") + "/";

  if (isOnCdn) {
    const withoutFilename = src.slice(0, src.lastIndexOf("/"));
    return `${withoutFilename}${paramsString}${filename}`;
  }

  return `${trimTrailingSlash(root)}${paramsString}${src}`;
}

function getExtension(filename) {
  return filename.toLowerCase().split("?")[0].split("#")[0].split(".")[1];
}

function getFilename(url) {
  return url.substring(1 + url.lastIndexOf("/"));
}

function trimTrailingSlash(url) {
  return url.replace(/\/$/, "");
}

function convertToUploadcareQuality(requestedQuality) {
  /**
   * Uploadcare doesn't support integer-based quality modificators,
   * so we need to map them onto uploadcare's equivalents
   */
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

function getProxyEndpoint(publicKey) {
  // @todo: Take into account the possibility to set a custom domain for the proxy.
  return `https://${publicKey}.ucr.io`;
}

function isCdnUrl(url) {
  return /^https?:\/\/ucarecdn\.com/.test(url);
}

function isProduction() {
  return process.env.NODE_ENV === "production";
}

module.exports = uploadcareLoader;
