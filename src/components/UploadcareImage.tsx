import Image, { ImageProps } from 'next/image';
import React from 'react';
import { uploadcareLoader } from '..';

const UploadcareImage = (props: ImageProps): JSX.Element => {
  return <Image loader={uploadcareLoader} {...props} />;
};

export default UploadcareImage;
