import Image, { ImageProps } from 'next/image';
import React from 'react';
import { uploadcareLoader } from '../';

export default function UploadcareImage(props: ImageProps): JSX.Element {
  return <Image loader={uploadcareLoader} {...props} />;
};
