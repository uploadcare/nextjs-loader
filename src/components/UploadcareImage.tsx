import Image, { ImageProps } from 'next/image';
import React from 'react';
import {
  PLACEHOLDER_SIZE_FALLBACK,
  PLACEHOLDER_SIZE_MULTIPLIER
} from '../utils/constants';
import { getInt } from '../utils/helpers';
import { uploadcareLoader } from '../utils/loader';

const shouldOverrideBlurDataUrl = (props: ImageProps): boolean => {
  return (
    typeof props.src === 'string' &&
    props.placeholder === 'blur' &&
    !props.blurDataURL
  );
};

const generateBlurDataUrl = (
  src: string,
  width: ImageProps['width']
): string => {
  const imageWidth = getInt(width);
  const blurImageWidth = imageWidth
    ? Math.ceil(imageWidth * PLACEHOLDER_SIZE_MULTIPLIER)
    : PLACEHOLDER_SIZE_FALLBACK;
  return uploadcareLoader({
    src: src,
    width: blurImageWidth,
    quality: 1
  });
};

export function UploadcareImage(props: ImageProps): JSX.Element {
  let blurDataURL = props.blurDataURL;
  if (shouldOverrideBlurDataUrl(props)) {
    blurDataURL = generateBlurDataUrl(props.src as string, props.width);
  }
  return (
    <Image loader={uploadcareLoader} blurDataURL={blurDataURL} {...props} />
  );
}
