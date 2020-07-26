export const noop = () => {};

export const reverse = (content: string) => content.split('').reverse().join('');

export const isString = (s: any): s is string => typeof s === 'string';

interface CreateUriProps {
  email?: boolean | string;
  tel?: boolean | string;
  sms?: boolean | string;
  href?: string;
  children?: string;
}

export const createUri = ({ email, tel, sms, href, children }: CreateUriProps) => {
  if (email) {
    if (isString(email)) return `mailto:${email}`;
    if (children) return `mailto:${children}`;
  }

  if (tel) {
    if (isString(tel)) return `tel:${tel.replace(/\s/g, '')}`;
    if (children) return `tel:${children.replace(/\s/g, '')}`;
  }

  if (sms) {
    if (isString(sms)) return `sms:${sms.replace(/\s/g, '')}`;
    if (children) return `sms:${children.replace(/\s/g, '')}`;
  }

  if (href) {
    if (isString(href)) return href;
    if (children) return children;
  }

  return undefined;
};
