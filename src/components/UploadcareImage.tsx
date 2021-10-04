import Image, { ImageProps } from 'next/image';
import React from 'react';
import { uploadcareLoader } from '../utils/loader';

export function UploadcareImage(props: ImageProps): JSX.Element {
  return <Image loader={uploadcareLoader} {...props} />;
}
