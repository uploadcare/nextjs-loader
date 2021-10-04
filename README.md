# [In Development] Uploadcare custom image loader for Next.js
[![Build Status][build-img]][build-link]
[![NPM version][npm-img]][npm-link]

**!!! Please note the project is in active development and it's not ready for production just yet.**

* [Demo](#demo)
* [Preview](#preview)
* [Dependencies](#dependencies)
* [Installation](#installation)
* [Configuration](#configuration)
* [Usage](#usage)
* [Links](#links)
* [Known Issues](#known-issues)

## Demo

Look at the demo [here][demo-link].

## Preview

Preview it on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz][stackblitz-image]][stackblitz-link]

## Dependencies

Next.js supports custom image loaders starting from 10.0.5.

## Installation

```shell_script
yarn add nextjs-loader
```

## Configuration

Inform Next that you're going to use a custom image loader through `next.config.js`:

```js
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

That's it. You may now use `nextjs-loader` in your project (see [Usage](#usage)).

---

Below are additional optional parameters which you may not need:

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

**Option 2**. Pass `uploadcareLoader` to the `Image` component:

```tsx
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

**Option 3**. Use [next-image-loader](https://www.npmjs.com/package/next-image-loader) project to enable Uploadcare image loader for all app `Image`-s by default

In that case, you may not need the `loader: "custom"` setting in your `next.config.js`.

1. Install the [next-image-loader](https://www.npmjs.com/package/next-image-loader) plugin and enable it as described in its README. 

2. Create `image-loader.config.js` in the project root (in the same directory as `next.config.js`)
and add this code to it:

```js
// image-loader.config.js
import { imageLoader } from 'next-image-loader/build/image-loader';
import { uploadcareLoader } from 'nextjs-loader';

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

**Issue 1:** Console warnings like this: 
> Image with src "${src}" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader-width

Next checks whether the image url which loader generates has the exact value which user passed through the `width` property of the `Image` component. And because the Uploadcare loader doesn't process SVG and GIF images, it just returns the same `src` value without adding any transformation parameters to it (including `width`). That's why Next reports the console warning.

**Fix:** Ignore the warning for now.


[build-img]: https://app.travis-ci.com/kkomelin/nextjs-loader.svg?branch=main
[build-link]: https://api.travis-ci.com/kkomelin/nextjs-loader
[npm-img]: https://img.shields.io/npm/v/nextjs-loader.svg
[npm-link]: https://www.npmjs.com/package/nextjs-loader
[stackblitz-image]: https://developer.stackblitz.com/img/open_in_stackblitz.svg
[stackblitz-link]: https://stackblitz.com/github/kkomelin/nextjs-loader/tree/main/example
[demo-link]: https://nextjs-loader.vercel.app/
[uploadcare-transformation-image-compression-docs]: https://uploadcare.com/docs/transformations/image/compression/?utm_source=github&utm_campaign=nextjs-loader
