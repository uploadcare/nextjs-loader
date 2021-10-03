# [In Development] Uploadcare custom loader (and more) for Next.js
[![Build Status][build-img]][build-link]
[![NPM version][npm-img]][npm-link]

**!!! Please note the project is in active development and it's not ready for production just yet.**

* [Demo](#demo)
* [Installation](#installation)
* [Configuration](#configuration)
* [Usage](#usage)
* [Links](#links)

## Demo

TBD

## Installation

```shell_script
yarn add nextjs-loader
```

## Configuration

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

That's it. You may now use `nextjs-loader` in your project (see Usage section).

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

- [Uploadcare image compression documentation][uploadcare-transformation-image-compression-docs]
- [Uploadcare File Uploader for React](https://github.com/uploadcare/react-widget)


[build-img]: https://app.travis-ci.com/kkomelin/nextjs-loader.svg?branch=main
[build-link]: https://api.travis-ci.com/kkomelin/nextjs-loader
[npm-img]: https://img.shields.io/npm/v/nextjs-loader.svg
[npm-link]: https://www.npmjs.com/package/nextjs-loader
[uploadcare-transformation-image-compression-docs]: https://uploadcare.com/docs/transformations/image/compression/?utm_source=github&utm_campaign=nextjs-loader
