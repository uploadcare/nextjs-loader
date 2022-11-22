import { isRelativeUrl } from '../utils/helpers';

describe('isRelativeUrl', () => {
  it('should return true when relative URL provided', () => {
    expect(isRelativeUrl('/relative/path/')).toBeTruthy();
    expect(isRelativeUrl('/')).toBeTruthy();
  });

  it('should return false when non-relative URL provided', () => {
    expect(isRelativeUrl('http://domain.com')).toBeFalsy();
    expect(isRelativeUrl('//domain.com')).toBeFalsy();
  });
});
