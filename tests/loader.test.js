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
  // expect(t).toThrow(Error);
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
  // expect(t).toThrow(Error);
  expect(t).toThrow(
    `The NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY is not set.`
  );
});

test("The loader parses user paramters properly", () => {
  const src = "https:/example.com/image.jpg";

  addEnvVar('NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY', 'test-public-key');

  // Using default params. No overrides.
  removeEnvVar('NEXT_PUBLIC_API_PARAMETERS');

  let result = uploadcareLoader({
    src,
    width: "500",
    quality: 80,
  });

  expect(result).toBe('https://test-public-key.ucr.io/-/format/auto/-/stretch/off/-/progressive/yes/-/resize/500x/-/quality/normal/https:/example.com/image.jpg');

  // Override default params, including resize and quality.

  addEnvVar('NEXT_PUBLIC_API_PARAMETERS', 'format/jpg, stretch/on, progressive/no, resize/1x, quality/smart_retina');

  result = uploadcareLoader({
    src,
    width: "500",
    quality: 80,
  });

  expect(result).toBe('https://test-public-key.ucr.io/-/format/jpg/-/stretch/on/-/progressive/no/-/resize/1x/-/quality/smart_retina/https:/example.com/image.jpg');

  removeEnvVar('NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY');
  removeEnvVar('NEXT_PUBLIC_API_PARAMETERS');
});
