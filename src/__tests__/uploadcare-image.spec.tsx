/**
 * @jest-environment jsdom
 */
import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { UploadcareImage } from '../components/UploadcareImage';
import { addEnvVar, removeEnvVar } from './utils';

describe('UploadcareImage', () => {
  beforeEach(() => {
    addEnvVar('NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY', 'test-public-key');

    cleanup();
  });

  afterEach(() => {
    removeEnvVar('NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY');
  });

  it('should render passed image with default settings properly', () => {
    const src =
      'https://ucarecdn.com/a6f8abc8-f92e-460a-b7a1-c5cd70a18cdb/vercel.png';

    render(
      <UploadcareImage
        src={src}
        width={500}
        height={500}
        quality={80}
        alt="Test image"
        // Necessary because lazy-loading causes a placeholder image render first.
        loading="eager"
      />
    );

    expect(screen.getByRole('img').getAttribute('src')).toEqual(
      'https://ucarecdn.com/a6f8abc8-f92e-460a-b7a1-c5cd70a18cdb/-/format/auto/-/stretch/off/-/progressive/yes/-/resize/1080x/-/quality/normal/vercel.png'
    );
  });

  it('should accept src without filename', () => {
    const src = 'https://ucarecdn.com/a6f8abc8-f92e-460a-b7a1-c5cd70a18cdb/';

    render(
      <UploadcareImage
        alt="Test image"
        src={src}
        width={500}
        height={500}
        quality={80}
        // Necessary because lazy-loading causes a placeholder image render first.
        loading="eager"
      />
    );

    expect(screen.getByRole('img').getAttribute('src')).toEqual(
      'https://ucarecdn.com/a6f8abc8-f92e-460a-b7a1-c5cd70a18cdb/-/format/auto/-/stretch/off/-/progressive/yes/-/resize/1080x/-/quality/normal/'
    );
  });
});
