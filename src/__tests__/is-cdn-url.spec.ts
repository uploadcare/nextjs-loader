/**
 * @jest-environment jsdom
 */
import { isCdnUrl } from '../utils/helpers';

describe('isCdnUrl', () => {
  it('should return true in cases when provided URL matches provided domain', () => {
    expect(
      isCdnUrl('https://ucarecdn.com/:uuid/:filename', 'ucarecdn.com')
    ).toBeTruthy();
    expect(isCdnUrl('http://ucarecdn.com/', 'ucarecdn.com')).toBeTruthy();
    expect(isCdnUrl('http://ucarecdn.com', 'ucarecdn.com')).toBeTruthy();
    expect(isCdnUrl('http://ucarecdn.com:8080', 'ucarecdn.com')).toBeTruthy();
    expect(
      isCdnUrl('http://custom.domain.com', 'custom.domain.com')
    ).toBeTruthy();
    expect(isCdnUrl('//ucarecdn.com/', 'ucarecdn.com')).toBeTruthy();
  });

  it("should return false in cases when provided URL doesn't matches provided domain", () => {
    expect(
      isCdnUrl('https://ucarecdn.com/:uuid/:filename', 'other.com')
    ).toBeFalsy();
    expect(isCdnUrl('http://custom.domain.com', 'ucarecdn.com')).toBeFalsy();
    expect(isCdnUrl('//custom.domain.com/', 'ucarecdn.com')).toBeFalsy();
  });

  it('should throw a error if invalid URL provided', () => {
    expect(() => isCdnUrl('ucarecdn', 'ucarecdn.com')).toThrowError(
      /Invalid URL/
    );
  });
});
