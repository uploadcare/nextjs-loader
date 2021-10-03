import Image from 'next/dist/client/image';
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
