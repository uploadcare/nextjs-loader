# [In Development] Uploadcare custom image loader for Next.js
[![Build Status][build-img]][build-link]
[![NPM version][npm-img]][npm-link]

**!!! Please note the project is in active development and it's not ready for production just yet.**

* [Demo](#demo)
* [Dependencies](#dependencies)
* [Installation](#installation)
* [Configuration](#configuration)
* [Usage](#usage)
* [Links](#links)

## Demo

The demo is live on [StackBlitz](http://stackblitz.com/):

[![Open in StackBlitz][stackblitz-image]]()

## Dependencies

Next.js supports custom image loaders starting from 10.0.5.

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

Pass `uploadcareLoader` to the `Image` component:

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
[stackblitz-image]: https://developer.stackblitz.com/img/open_in_stackblitz.svg
[stackblitz-link]: https://stackblitz.com/github/kkomelin/nextjs-loader/tree/example
[uploadcare-transformation-image-compression-docs]: https://uploadcare.com/docs/transformations/image/compression/?utm_source=github&utm_campaign=nextjs-loader
