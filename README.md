# Uploadcare custom image loader for Next.js
![Test Status][test-status-img]
[![NPM version][npm-img]][npm-link]

* [Demo](#demo)
* [Play with it](#play-with-it)
* [Dependencies](#dependencies)
* [Installation](#installation)
* [Configuration](#configuration)
* [Usage](#usage)
* [Links](#links)
* [Known Issues](#known-issues)

## Demo

Look at the demo [here][demo-link].

## Play with it

Play with the demo example on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz][stackblitz-image]][stackblitz-link]

## Dependencies

The only dependency is Next.js >= 10.0.5. 

## Installation

```shell_script
yarn add @uploadcare/nextjs-loader
```

## Configuration

Inform Next that you're going to use a custom image loader through `next.config.js`:

```js
// next.config.js
module.exports = {
  images: {
    loader: "custom"
  }
}
```

Add your public Uploadcare key to your `.env*` config file. You can copy it from Dashboard -> API Keys -> Public key.

```ini
#.env
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY="YOUR_PUBLIC_KEY"
```

Alternatively, in case you're using a custom proxy, set the proxy domain.

```ini
#.env
NEXT_PUBLIC_UPLOADCARE_CUSTOM_PROXY_DOMAIN="proxy.example.com"
```

That's it. You may now use `@uploadcare/nextjs-loader` in your app (see [Usage](#usage)).

---

Below are optional parameters which you may not need:

```ini
#.env
# A comma-separated list of transformation parameters. Default: format/auto, stretch/off, progressive/yes
NEXT_PUBLIC_UPLOADCARE_TRANSFORMATION_PARAMETERS="format/auto, stretch/off, progressive/yes"
# Uploadcare CDN domain. Default: ucarecdn.com
NEXT_PUBLIC_UPLOADCARE_CUSTOM_CDN_DOMAIN="cdn.example.com"
```

> Please note `NEXT_PUBLIC_UPLOADCARE_TRANSFORMATION_PARAMETERS` override corresponding default parameters and keep others in place.

## Usage

**Option 1**. Use the `UploadcareImage` component and leave us the reset ;)
```tsx
import UploadcareImage from '@uploadcare/nextjs-loader';

<UploadcareImage
  alt="A test image"
  src="https://your-domain/image.jpg"
  width="400"
  height="300"
  quality="80"
/>
```
The `UploadcareImage` component supports the same parameters as the Next `Image` component.

**Option 2**. Pass `uploadcareLoader` to the `Image` component:

```tsx
import Image from 'next/image';
import { uploadcareLoader } from '@uploadcare/nextjs-loader';

<Image 
  alt="A test image"
  src="https://your-domain/image.jpg"
  width="400"
  height="300"
  quality="80"
  loader={uploadcareLoader}
/>
```

**Option 3**. Use the [next-image-loader](https://www.npmjs.com/package/next-image-loader) plugin to enable Uploadcare image loader for all images by default

In that case, you may not need the `loader: "custom"` setting in your `next.config.js`.

1. Install [next-image-loader](https://www.npmjs.com/package/next-image-loader) and enable it as described in its README. 

2. Create `image-loader.config.js` in the project root (in the same directory as `next.config.js`)
and add this code to it:

```js
// image-loader.config.js
import { imageLoader } from 'next-image-loader/build/image-loader';
import { uploadcareLoader } from '@uploadcare/nextjs-loader';

imageLoader.loader = uploadcareLoader;
```

3. Use `Image` as usual, with Uploadcare loader enabled implicitly:

```tsx
import Image from 'next/image';

<Image 
  alt="A test image"
  src="https://your-domain/image.jpg"
  width="400"
  height="300"
  quality="80"
/>
```

Please note that you can still use any other loader for a separate image like this:

```tsx
import Image from 'next/image';
import anotherLoader from '[another-loader-project-name]';

<Image 
  alt="A test image"
  src="https://your-domain/image.jpg"
  width="400"
  height="300"
  quality="80"
  loader={anotherLoader}
/>
```

where `anotherLoader` will be used instead of the Uploadcare loader for this particular image.

## Links

- [Uploadcare image compression documentation][uploadcare-transformation-image-compression-docs]
- [Uploadcare File Uploader for React](https://github.com/uploadcare/react-widget)

## Known Issues

**Issue 1:** Console warning like this: 
> Image with src "${src}" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader-width

Next checks whether the image url which loader generates has the exact value which user passed through the `width` property of the `Image` component. And because the Uploadcare loader doesn't process SVG and GIF images, it just returns the same `src` value without adding any transformation parameters to it (including `width`). That's why Next reports the console warning.

**Fix:** Ignore the warning for now.

[test-status-img]: https://github.com/uploadcare/nextjs-loader/.github/workflows/test-and-lint.yml/badge.svg
[npm-img]: https://img.shields.io/npm/v/@uploadcare/nextjs-loader.svg
[npm-link]: https://www.npmjs.com/package/@uploadcare/nextjs-loader
[stackblitz-image]: https://developer.stackblitz.com/img/open_in_stackblitz.svg
[stackblitz-link]: https://stackblitz.com/github/uploadcare/nextjs-loader/tree/main/example
[demo-link]: https://nextjs-loader.vercel.app/
[uploadcare-transformation-image-compression-docs]: https://uploadcare.com/docs/transformations/image/compression/?utm_source=github&utm_campaign=nextjs-loader
