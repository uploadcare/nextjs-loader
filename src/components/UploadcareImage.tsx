import Image, { ImageProps } from 'next/image';
import React from 'react';
import { getInt } from '../utils/helpers';
import { uploadcareLoader } from '../utils/loader';

export function UploadcareImage({
  blurDataURL,
  ...props
}: ImageProps): JSX.Element {
  if (
    props.placeholder === 'blur' &&
    !blurDataURL &&
    typeof props.src === 'string'
  ) {
    const imageWidth = getInt(props.width);
    const blurImageWidth = imageWidth ? Math.ceil(imageWidth * 0.01) : 10;
    blurDataURL = uploadcareLoader({
      src: props.src,
      width: blurImageWidth,
      quality: 0
    });
  }
  return (
    <Image loader={uploadcareLoader} blurDataURL={blurDataURL} {...props} />
  );
}
