import { convertToUploadcareQualityString } from '../utils/helpers';

describe('convertToUploadcareQualityString', () => {
  it('should map 0 to lightest', () => {
    expect(convertToUploadcareQualityString(0)).toBe('lightest');
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
});
