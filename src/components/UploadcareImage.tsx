import Image, { ImageProps } from 'next/image';
import React from 'react';
import {
  PLACEHOLDER_SIZE_FALLBACK,
  PLACEHOLDER_SIZE_MULTIPLIER
} from '../utils/constants';
import { getInt } from '../utils/helpers';
import { uploadcareLoader } from '../utils/loader';

const shouldOverrideBlurDataUrl = (props: ImageProps): boolean => {
  return props.placeholder === 'blur' && !props.blurDataURL;
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
  let blurDataURL: string | undefined;
  // TODO: add support for StaticImport, see https://nextjs.org/docs/basic-features/image-optimization#local-images
  if (typeof props.src === 'string' && shouldOverrideBlurDataUrl(props)) {
    blurDataURL = generateBlurDataUrl(props.src, props.width);
  }
  return (
    <Image
      loader={uploadcareLoader}
      blurDataURL={blurDataURL ?? props.blurDataURL}
      {...props}
    />
  );
}
