"use strict";

const uploadcareLoader = require("../src/util/loader");
const { addEnvVar, removeEnvVar } = require("./util");

test("The loader validates the 'src' parameter", () => {
  addEnvVar('NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY', 'test-public-key');

  const src = "/relative/image.jpg";

  const t = () => {
    uploadcareLoader({
      src,
      width: "",
      quality: 80,
    });
  };
  expect(t).toThrow(Error);
  expect(t).toThrow(
    `Failed to parse "${src}" in "uploadcareLoader", Uploadcare loader doesn't support relative images.`
  );

  removeEnvVar('NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY');
});

test("The loader validates the NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY config parameter", () => {
  const t = () => {
    uploadcareLoader({
      src: "",
      width: "",
      quality: 80,
    });
  };
  expect(t).toThrow(Error);
  expect(t).toThrow(
    `The NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY is not set.`
  );
});
