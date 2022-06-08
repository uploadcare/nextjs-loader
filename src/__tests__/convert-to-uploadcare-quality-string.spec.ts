import { convertToUploadcareQualityString } from '../utils/helpers';

describe('convertToUploadcareQualityString', () => {
  it('should map 1 to lightest', () => {
    expect(convertToUploadcareQualityString(1)).toBe('lightest');
  });

  it('should map 38 to lightest', () => {
    expect(convertToUploadcareQualityString(38)).toBe('lightest');
  });

  it('should map 39 to lighter', () => {
    expect(convertToUploadcareQualityString(39)).toBe('lighter');
  });

  it('should map 100 to best', () => {
    expect(convertToUploadcareQualityString(100)).toBe('best');
  });

  it('should map falsy values to smart', () => {
    expect(convertToUploadcareQualityString()).toBe('smart');
    expect(convertToUploadcareQualityString(0)).toBe('smart');
  });
});
