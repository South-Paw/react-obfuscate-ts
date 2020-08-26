import { createUri, isString, reverse } from '../util';

describe('reverse', () => {
  it('should reverse a string', () => {
    expect(reverse('hello world')).toBe('dlrow olleh');
  });

  it('should reverse a string with parentheses', () => {
    expect(reverse('(hello)')).toBe('(olleh)');
  });

  it('should reverse a string with brackets', () => {
    expect(reverse('[hello]')).toBe('[olleh]');
  });

  it('should reverse a string with curly brackets', () => {
    expect(reverse('{hello}')).toBe('{olleh}');
  });

  it('should reverse a string with gt and lt', () => {
    expect(reverse('<hello>')).toBe('<olleh>');
  });
});

describe('isString', () => {
  test('a string to be a string', () => expect(isString('')).toBe(true));

  test('a boolean not to be a string', () => expect(isString(true)).toBe(false));
});

describe('createUri', () => {
  describe('email', () => {
    it('should return the email if its a string', () => {
      expect(createUri({ email: 'test@example.com' })).toBe('mailto:test@example.com');
    });

    it('should return the children if its not a string', () => {
      expect(createUri({ email: true, children: 'test2@example.com' })).toBe('mailto:test2@example.com');
    });
  });

  describe('tel', () => {
    it('should return the tel if its a string', () => {
      expect(createUri({ tel: '+1234567890' })).toBe('tel:+1234567890');
    });

    it('should return the children if its not a string', () => {
      expect(createUri({ tel: true, children: '+1234567890' })).toBe('tel:+1234567890');
    });
  });

  describe('sms', () => {
    it('should return the sms if its a string', () => {
      expect(createUri({ sms: '+1234567890' })).toBe('sms:+1234567890');
    });

    it('should return the children if its not a string', () => {
      expect(createUri({ sms: true, children: '+1234567890' })).toBe('sms:+1234567890');
    });
  });

  describe('href', () => {
    it('should return the href if its a string', () => {
      expect(createUri({ href: '//example.com' })).toBe('//example.com');
    });
  });

  it('should return undefined when only children', () => {
    expect(createUri({ children: 'children' })).toBe(undefined);
  });
});
