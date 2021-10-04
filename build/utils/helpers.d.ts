/**
 * Merge user parameters with default parameters, so that user parameters have higher priority.
 *
 * @param {string[]} defaultParams
 * @param {string[]} userParams
 * @returns {string[]}
 */
export declare function mergeParams(defaultParams: string[], userParams: string[]): string[];
/**
 * Get requested image format from params, for example jpeg or auto.
 *
 * @param {string[]} userParams
 * @returns {string}
 */
export declare function getRequestedFormatFromParams(userParams: string[]): string;
export declare function getExtension(filename: string): string;
export declare function getFilename(url: string): string;
export declare function trimTrailingSlash(url: string): string;
export declare function convertToUploadcareQualityString(requestedQuality?: number): string;
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
export declare function getMaxResizeWidth(requestedWidth: number, isForJpeg?: boolean): number;
export declare function generateDefaultProxyEndpoint(publicKey: string | null): string;
export declare function generateCustomProxyEndpoint(customProxyDomain: string): string;
export declare function isCdnUrl(url: string, cdnDomain: string): boolean;
export declare function isProduction(): boolean;
export declare function parseUserParamsString(paramsString?: string): string[];
export declare function isDotenvParamEmpty(param: string | null): boolean;
export declare function isJpegExtension(extension: string): boolean;
