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

Add the following setting to your `.env*` config file:

```ini
#.env
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY="YOUR_PUBLIC_KEY"
```

You can find you public key in Dashboard -> API Keys -> Public key on Uplocadcare.  
In case you're using a custom proxy, alternatively you can set its domain through the config.

```ini
#.env
NEXT_PUBLIC_UPLOADCARE_CUSTOM_PROXY_DOMAIN="proxy.example.com"
```

That's it. You may now use `nextjs-loader` in your project (see Usage section).

Below are optional parameters:

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
