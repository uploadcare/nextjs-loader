"use strict";

const uploadcareLoader = require("./src/util/loader");

test("The loader validates the 'src' parameter", () => {
  const src = "/relative/image.jpg";

  const t = () => {
    uploadcareLoader({
      root: "",
      src,
      width: "",
      quality: 80,
    });
  };
  expect(t).toThrow(Error);
  expect(t).toThrow(
    `Failed to parse "${src}" in "next/image", Uploadcare loader doesn't support relative images.`
  );
});

test("The loader validates the 'root' parameter", () => {
  const root = "https://wrong-domain.com";

  const t = () => {
    uploadcareLoader({
      root,
      src: "",
      width: "",
      quality: 80,
    });
  };
  expect(t).toThrow(Error);
  expect(t).toThrow(
    `Failed to parse "${root}" in "next/image", Uploadcare loader expects proxy endpoint like "https://YOUR_PUBLIC_KEY.ucr.io".`
  );
});
