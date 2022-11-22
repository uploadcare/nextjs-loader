/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: "./node_modules/@uploadcare/nextjs-loader/build/loader.js",
  },
}
