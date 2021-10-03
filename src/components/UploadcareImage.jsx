import Image from 'next/image';
import React from 'react';
import { uploadcareLoader } from '../util/loader';

const UploadcareImage = (props) => {
  return (
    <Image
      loader={uploadcareLoader}
      {...props}
    />
  )
}

export default UploadcareImage;
