# [1.0.0](https://github.com/uploadcare/nextjs-loader/compare/v0.4.0...v1.0.0) (2022-11-22)


### Features

* add a `getBlurDataURL` server-side helper to generate base64 blurred placeholder ([5404d56](https://github.com/uploadcare/nextjs-loader/commit/5404d564e211aee6a633dfb272de71e0c4c0ce85))
* add separate `loader.js` module entry to be used with Next.js v13 `loaderFile` setting ([a6577b7](https://github.com/uploadcare/nextjs-loader/commit/a6577b7cca4c5a7b8ddf26beb29ad9ddc9a261f6))


### BREAKING CHANGES

* previously implemented `blurDataURL` auto-generation won't work in Next.js v13. It was a bad way because the blurry image was requested from the server in runtime. A new way is to generate a blurry image base64 string at build time using `getBlurDataURL`. See [README](https://github.com/uploadcare/nextjs-loader#when-src-is-a-string).



# [0.4.0](https://github.com/uploadcare/nextjs-loader/compare/v0.3.3...v0.4.0) (2022-06-08)


### Features

* auto-generate `blurDataURL` property when `placeholder=blur` ([bda8cf1](https://github.com/uploadcare/nextjs-loader/commit/bda8cf1545b3b856064e608eea49b1b18861a3db))



## [0.3.3](https://github.com/uploadcare/nextjs-loader/compare/v0.3.2...v0.3.3) (2022-06-01)


### Bug Fixes

* accept src without filename ([#14](https://github.com/uploadcare/nextjs-loader/issues/14)) ([7f18177](https://github.com/uploadcare/nextjs-loader/commit/7f1817794d7e84ccd0a049aba883ae223c6d1d46))



## [0.3.2](https://github.com/uploadcare/nextjs-loader/compare/v0.3.1...v0.3.2) (2022-01-21)


### Bug Fixes

* force format for large jpegs ([#11](https://github.com/uploadcare/nextjs-loader/issues/11)) ([2e93d47](https://github.com/uploadcare/nextjs-loader/commit/2e93d473884f7d808766d45cc8e71a6331cced57))



## [0.3.1](https://github.com/uploadcare/nextjs-loader/compare/v0.3.0...v0.3.1) (2021-11-09)


### Bug Fixes

* Fixed processing of the local image in the production mode. ([f165d3a](https://github.com/uploadcare/nextjs-loader/commit/f165d3a4caa486138954e77279ccb0efd48c4ad9))



# [0.3.0](https://github.com/uploadcare/nextjs-loader/compare/v0.2.0...v0.3.0) (2021-11-04)


### Features

* Bumped Next.js to 12. ([9c8be4c](https://github.com/uploadcare/nextjs-loader/commit/9c8be4c1a7abef88fda25690950f5f4c232c7329))



# [0.2.0](https://github.com/uploadcare/nextjs-loader/compare/v0.1.0...v0.2.0) (2021-11-03)


### Features

* Added support for local images. Improved automated tests. Made the demo consume the latest development snapshot. ([e495754](https://github.com/uploadcare/nextjs-loader/commit/e49575442005c74596c9cb6de605371878d629b9))



# [0.1.0](https://github.com/uploadcare/nextjs-loader/compare/v0.0.0...v0.1.0) (2021-10-28)

* Initial release



