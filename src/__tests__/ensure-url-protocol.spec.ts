import { ensureUrlProtocol } from '../utils/helpers';

describe('ensureUrlProtocol', () => {
  it('should force https protocol for protocol relative URLs', () => {
    expect(ensureUrlProtocol('//domain.com')).toBe('https://domain.com');
  });

  it('should not modify relative URLs', () => {
    expect(ensureUrlProtocol('/path/')).toBe('/path/');
  });

  it('should not modify absolute URLs', () => {
    expect(ensureUrlProtocol('https://domain.com')).toBe('https://domain.com');
    expect(ensureUrlProtocol('http://domain.com')).toBe('http://domain.com');
  });
});
