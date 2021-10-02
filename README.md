# Uploadcare custom loader (and more) for Next.js

**Please note the project is in active development and it's not ready for production just yet.**

## Configuration

```ini
#.env
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY="YOUR_PUBLIC_KEY"
# Coma-separated list of API parameters.
NEXT_PUBLIC_API_PARAMETERS="format/auto, stretch/off, progressive/yes"
```

Default API parameters are:
`format/auto, stretch/off, progressive/yes, resize/[width]x, quality/[quality]`  
> Please note NEXT_PUBLIC_API_PARAMETERS override corresponding default parameters and keep others in place.

## Usage

1. Use the `UploadcareImage` component and leave us the reset ;)
```jsx
import Image from 'next/image';
import { UploadcareImage } from 'nextjs-loader';

<UploadcareImage
  src="https://your-domain/image.jpg" 
  width="500" 
  quality="80"
/>
```
The `UploadcareImage` component supports the same parameters as the Next `Image` component.

2. Pass the `uploadcareLoader` function through `Image` component property:
```jsx
import Image from 'next/image';
import { uploadcareLoader } from 'nextjs-loader';

<Image 
  src="https://your-domain/image.jpg" 
  width="500" 
  quality="80"
  loader={uploadcareLoader} 
/>
```

## Links

- [Uploadcare image compression documentation](https://uploadcare.com/docs/transformations/image/compression/)
