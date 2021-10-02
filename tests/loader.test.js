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
  removeEnvVar('NEXT_PUBLIC_UPLOADCARE_TRANSFORMATION_PARAMETERS');

  let result = uploadcareLoader({
    src,
    width: "500",
    quality: 80,
  });

  expect(result).toBe('https://test-public-key.ucr.io/-/format/auto/-/stretch/off/-/progressive/yes/-/resize/500x/-/quality/normal/https:/example.com/image.jpg');

  // Override default params, including resize and quality.

  addEnvVar('NEXT_PUBLIC_UPLOADCARE_TRANSFORMATION_PARAMETERS', 'format/jpg, stretch/on, progressive/no, resize/1x, quality/smart_retina');

  result = uploadcareLoader({
    src,
    width: "500",
    quality: 80,
  });

  expect(result).toBe('https://test-public-key.ucr.io/-/format/jpg/-/stretch/on/-/progressive/no/-/resize/1x/-/quality/smart_retina/https:/example.com/image.jpg');

  removeEnvVar('NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY');
  removeEnvVar('NEXT_PUBLIC_UPLOADCARE_TRANSFORMATION_PARAMETERS');
});

test("The loader doesn't process SVG and GIF", () => {
  const src = "https:/example.com/image.svg";

  addEnvVar('NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY', 'test-public-key');

  const result = uploadcareLoader({
    src,
    width: "500",
    quality: 80,
  });

  expect(result).toBe(`https://test-public-key.ucr.io${src}`);

  removeEnvVar('NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY');
});

test("The loader returns SVG and GIF hosted on the CDN as is", () => {
  const src = "https://ucarecdn.com/375bba4b-35db-4cb8-8fc7-7540625f2181/next.svg";

  addEnvVar('NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY', 'test-public-key');

  const result = uploadcareLoader({
    src,
    width: "500",
    quality: 80,
  });

  expect(result).toBe(src);

  removeEnvVar('NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY');
});

test("The loader handles an image hosted on the default CDN domain properly", () => {
  const src = "https://ucarecdn.com/a6f8abc8-f92e-460a-b7a1-c5cd70a18cdb/vercel.png";

  addEnvVar('NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY', 'test-public-key');

  const result = uploadcareLoader({
    src,
    width: "500",
    quality: 80,
  });

  expect(result).toBe(`https://ucarecdn.com/a6f8abc8-f92e-460a-b7a1-c5cd70a18cdb/-/format/auto/-/stretch/off/-/progressive/yes/-/resize/500x/-/quality/normal/vercel.png`);

  removeEnvVar('NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY');
});

test("The loader handles an image hosted on a custom CDN domain properly", () => {
  const src = "https://cdn.example.com/image.png";

  addEnvVar('NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY', 'test-public-key');
  addEnvVar('NEXT_PUBLIC_UPLOADCARE_CDN_DOMAIN', 'cdn.example.com');

  const result = uploadcareLoader({
    src,
    width: "500",
    quality: 80,
  });

  expect(result).toBe(`https://cdn.example.com/-/format/auto/-/stretch/off/-/progressive/yes/-/resize/500x/-/quality/normal/image.png`);

  removeEnvVar('NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY');
  removeEnvVar('NEXT_PUBLIC_UPLOADCARE_CDN_DOMAIN');
});
