import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { Obfuscate } from '../Obfuscate';

describe('Obfuscate', () => {
  it('should render no children', () => {
    const { container } = render(<Obfuscate />);

    expect(container.querySelector('a')).toBeInTheDocument();
    expect(container.querySelector('a')?.children).toHaveLength(0);
  });

  it('should call a onClick fn when passed', () => {
    const fn = jest.fn();

    const { getByText } = render(<Obfuscate onClick={fn}>click</Obfuscate>);

    fireEvent.click(getByText('kcilc'));

    expect(fn).toHaveBeenCalledTimes(1);
  });

  describe('text', () => {
    it('should obfuscate', () => {
      const { getByText } = render(<Obfuscate>simple text</Obfuscate>);

      expect(getByText('txet elpmis')).toBeInTheDocument();
    });

    it('should unobfuscate on focus', () => {
      const { getByText } = render(<Obfuscate>focus text</Obfuscate>);

      fireEvent.focus(getByText('txet sucof'));

      expect(getByText('focus text')).toBeInTheDocument();
    });

    it('should unobfuscate on mouse over', () => {
      const { getByText } = render(<Obfuscate>mouse over text</Obfuscate>);

      fireEvent.mouseOver(getByText('txet revo esuom'));

      expect(getByText('mouse over text')).toBeInTheDocument();
    });

    it('should unobfuscate on context menu', () => {
      const { getByText } = render(<Obfuscate>context menu text</Obfuscate>);

      fireEvent.contextMenu(getByText('txet unem txetnoc'));

      expect(getByText('context menu text')).toBeInTheDocument();
    });

    it('should unobfuscate the href on focus', () => {
      const { getByText } = render(<Obfuscate href="//example.com">link</Obfuscate>);

      fireEvent.mouseOver(getByText('knil'));

      expect(getByText('link').getAttribute('href')).toBe('//example.com');
    });
  });

  describe('email', () => {
    it('should obfuscate', () => {
      const { getByText } = render(<Obfuscate email="test@example.com" />);

      expect(getByText('moc.elpmaxe@tset').getAttribute('href')).toBe('obfuscated');
    });

    it('should unobfuscate on focus', () => {
      const { getByText } = render(<Obfuscate email="test@example.com" />);

      fireEvent.focus(getByText('moc.elpmaxe@tset'));

      expect(getByText('test@example.com').getAttribute('href')).toBe('mailto:test@example.com');
    });
  });

  describe('tel', () => {
    it('should obfuscate', () => {
      const { getByText } = render(<Obfuscate tel="+1234567890" />);

      expect(getByText('0987654321+').getAttribute('href')).toBe('obfuscated');
    });

    it('should unobfuscate on focus', () => {
      const { getByText } = render(<Obfuscate tel="+1234567890" />);

      fireEvent.focus(getByText('0987654321+'));

      expect(getByText('+1234567890').getAttribute('href')).toBe('tel:+1234567890');
    });
  });

  describe('sms', () => {
    it('should obfuscate', () => {
      const { getByText } = render(<Obfuscate sms="+1234567890" />);

      expect(getByText('0987654321+').getAttribute('href')).toBe('obfuscated');
    });

    it('should unobfuscate on focus', () => {
      const { getByText } = render(<Obfuscate sms="+1234567890" />);

      fireEvent.focus(getByText('0987654321+'));

      expect(getByText('+1234567890').getAttribute('href')).toBe('sms:+1234567890');
    });
  });

  describe('href', () => {
    it('should obfuscate', () => {
      const { getByText } = render(<Obfuscate href="//example.com" />);

      expect(getByText('moc.elpmaxe//').getAttribute('href')).toBe('obfuscated');
    });

    it('should unobfuscate on focus', () => {
      const { getByText } = render(<Obfuscate href="//example.com" />);

      fireEvent.focus(getByText('moc.elpmaxe//'));

      expect(getByText('//example.com').getAttribute('href')).toBe('//example.com');
    });
  });
});
