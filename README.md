# [In Development] Uploadcare custom loader (and more) for Next.js

**!!! Please note the project is in active development and it's not ready for production just yet.**

## Demo

TBD

## Configuration

```ini
#.env
# Get it from Dashboard -> API Keys -> Public key or set a custom proxy domain.
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY="YOUR_PUBLIC_KEY"
NEXT_PUBLIC_UPLOADCARE_CUSTOM_PROXY_DOMAIN="proxy.example.com"
# [Optional] A comma-separated list of API parameters. Default: format/auto, stretch/off, progressive/yes
NEXT_PUBLIC_UPLOADCARE_TRANSFORMATION_PARAMETERS="format/auto, stretch/off, progressive/yes"
# [Optional] Default Uploadcare CDN domain is ucarecdn.com
NEXT_PUBLIC_UPLOADCARE_CUSTOM_CDN_DOMAIN="cdn.example.com"
```

> Please note `NEXT_PUBLIC_UPLOADCARE_TRANSFORMATION_PARAMETERS` override corresponding default parameters and keep others in place.

## Usage

**Option 1**. Use the `UploadcareImage` component and leave us the reset ;)
```jsx
import Image from 'next/image';
import { UploadcareImage } from 'nextjs-loader';

<UploadcareImage
  alt="A test image"
  src="https://your-domain/image.jpg"
  width="400"
  height="300"
  quality="80"
/>
```
The `UploadcareImage` component supports the same parameters as the Next `Image` component.

**Option 2**. Pass `uploadcareLoader` through the `Image` component property
```jsx
import Image from 'next/image';
import { uploadcareLoader } from 'nextjs-loader';

<Image 
  alt="A test image"
  src="https://your-domain/image.jpg"
  width="400"
  height="300"
  quality="80"
  loader={uploadcareLoader}
/>
```

## Links

- [Uploadcare image compression documentation](https://uploadcare.com/docs/transformations/image/compression/)
- [Uploadcare File Uploader for React](https://github.com/uploadcare/react-widget)
