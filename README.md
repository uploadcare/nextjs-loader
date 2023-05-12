# Uploadcare custom image loader for Next.js
![Test Status][test-status-img]
[![NPM version][npm-img]][npm-link]

<a href="https://uploadcare.com/?utm_source=github&utm_campaign=nextjs-loader">
  <img align="right" width="56" height="56"
    src="https://ucarecdn.com/1cc871de-5d82-442d-b4d6-aa2e35966879/-/resize/112x112/-/quality/lightest/logocircle2x.png"
    alt="">
</a>

The package helps you use the Uploadcare's transformation and CDN services from a Next.js app smoothly and easily.

It provides the `uploadcareLoader` function, which you can use as [a custom loader for the Next's Image component](https://nextjs.org/docs/api-reference/next/image#loader), and the `UploadcareImage` component with the custom loader enabled by default.

* [Demo](#demo)
* [Dependencies](#dependencies)
* [Installation](#installation)
* [Configuration](#configuration)
* [Usage](#usage)
* [Props](#props)
* [Notes](#notes)
* [Known Issues](#known-issues)
* [Links](#links)

## Demo

Look at the demo [here][demo-link].

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

Alternatively, in case you're using a [custom proxy endpoint][docs-custom-proxy-endpoint], set the proxy domain.

```ini
#.env
NEXT_PUBLIC_UPLOADCARE_CUSTOM_PROXY_DOMAIN="proxy.example.com"
```

If you're using a proxy, provide your application's base URL (also whitelisted), which is required to process local images properly:

```ini
#.env
NEXT_PUBLIC_UPLOADCARE_APP_BASE_URL="https://your-domain.com/"
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

Image transformation settings example:

```js{noAutoLinker}
# .env
NEXT_PUBLIC_UPLOADCARE_TRANSFORMATION_PARAMETERS="format/auto, quality/smart_retina, stretch/off, progressive/yes"
```

The default image transformation parameters are `format/auto, stretch/off, progressive/yes`. 
If `quality` isn't explicitly specified, the plugin will use `quality/smart` by default.

## Usage

**Option 1**. Use the `UploadcareImage` component and leave us the rest ;)
```tsx
import UploadcareImage from '@uploadcare/nextjs-loader';

<UploadcareImage
  alt="A test image"
  src="https://your-domain/image.jpg"
  width="400"
  height="300"
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

**Option 3 (Next.js v13+ only)**. Use the [`loaderFile` setting][loader-file] to enable Uploadcare image loader for all images by default.

1. Configure the `loaderFile` in your `next.config.js` like the following:

```js
module.exports = {
  images: {
    loader: 'custom',
    loaderFile: './node_modules/@uploadcare/nextjs-loader/build/loader.js',
  },
}
```

2. Use `Image` as usual, with Uploadcare loader enabled implicitly:

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

**Option 4**. Use the [next-image-loader](https://www.npmjs.com/package/next-image-loader) plugin to enable Uploadcare image loader for all images by default

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

## Props

### `placeholder` and `blurDataURL`

[Read Next.js Image Component docs](https://nextjs.org/docs/api-reference/next/image#placeholder) about `placeholder` and `blurDataURL`.

There are two possible use cases:

  1. [When `src` is a string](#when-src-is-a-string)
  2. [When `src` is a static import](#when-src-is-a-static-import)

#### When `src` is a string

If you pass `placeholder="blur"` to the `Image` or `UploadcareImage` component, the `blurDataURL` property will be used as the placeholder. In this case you must provide the `blurDataURL` property using our `getBlurDataURL` server-side helper.

Here is the `getBlurDataURL` interface:

```ts
function getBlurDataURL(
  src: string,
  width = 10,
  quality = 1
): Promise<string>
```

Usage example:

```tsx
import UploadcareImage, { getBlurDataURL } from '@uploadcare/nextjs-loader';

const BLUR_IMAGE_URL = "https://your-domain/image.jpg"

export const getStaticProps = async () => {
  const blurDataURL = await getBlurDataURL(BLUR_IMAGE_URL);

  return {
    props: { blurDataURL }
  };
};

export default ({ blurDataURL }) => {
  return (
    <UploadcareImage
      alt="Blurred image"
      src={BLUR_IMAGE_URL}
      width="400"
      height="300"
      placeholder="blur"
      blurDataURL={blurDataURL}
    />
  )
}
```

#### When `src` is a static import

You can use both `UploadcareImage` and `Image` component with custom loader. In this case Next.js will generate base64 encoded image for `blurDataURL` automatically during build time.

```tsx
import staticImage from 'image.jpg'

<UploadcareImage
  alt="A test image"
  src={staticImage}
  width="400"
  height="300"
  quality="80"
  placeholder="blur"
/>
```

## Notes

- If you have jpegs larger than 3000px and you want loader to resize them up to 5000px, you need to pass filename with `jpeg` or `jpg`  extension to the src url. See [Output image dimensions docs](https://uploadcare.com/docs/transformations/image/#dimensions) for more details. When no filename provided, we'll treat the image as non-jpeg and can resize it up to 3000px only.

- If you pass a local image url, the loader returns it AS IS if the app is run in the development mode or if the `NEXT_PUBLIC_UPLOADCARE_APP_BASE_URL` is not set.

- Next.js Image component allows numeric only `quality` value. Uploadcare CDN supports string-based quality only (see [our docs](https://uploadcare.com/docs/transformations/image/compression/#operation-quality)). So numeric quality values will be mapped onto string ones using the following intervals:

  - 1-38 - lightest
  - 39-70 - lighter
  - 71-80 - normal
  - 81-88 - better
  - 89-100 - best

## Known Issues

**Issue 1:** Console warning like this:
> Image with src "${src}" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader-width

Next checks whether the image url which loader generates has the exact value which user passed through the `width` property of the `Image` component. And because the Uploadcare loader doesn't process SVG and GIF images, it just returns the same `src` value without adding any transformation parameters to it (including `width`). That's why Next reports the console warning.

**Fix:** Ignore the warning for now.

## Links

- [Uploadcare image compression documentation][uploadcare-transformation-image-compression-docs]
- [Uploadcare File Uploader for React](https://github.com/uploadcare/react-widget)

[test-status-img]: https://github.com/uploadcare/nextjs-loader/actions/workflows/test-and-lint.yml/badge.svg
[npm-img]: https://img.shields.io/npm/v/@uploadcare/nextjs-loader.svg
[npm-link]: https://www.npmjs.com/package/@uploadcare/nextjs-loader
[demo-link]: https://uploadcare-nextjs-loader.netlify.app/
[uploadcare-transformation-image-compression-docs]: https://uploadcare.com/docs/transformations/image/compression/?utm_source=github&utm_campaign=nextjs-loader
[docs-custom-proxy-endpoint]: https://uploadcare.com/docs/delivery/proxy/#usage-endpoint
[last-next-12-release]: https://github.com/uploadcare/nextjs-loader/tree/v0.4.0
[loader-file]: https://nextjs.org/docs/api-reference/next/image#loader-configuration
