/* eslint-env browser */

import * as React from 'react';
import styled from 'styled-components';
import { createUri, isString, noop, reverse } from './util';

const Component = styled('a')``;

export interface ObfuscateProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Styled components's `as` polymorphic prop.
   *
   * View the [`styled-components` docs](https://styled-components.com/docs/api#as-polymorphic-prop) for more information.
   */
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  /**
   * When set as a `boolean`, the component will treat the `children` as an email address.
   * Alternatively when set as a `string` the prop will be used to create the href and use the `children` for display.
   */
  email?: boolean | string;
  /**
   * When set as a `boolean`, the component will treat the `children` as an telephone number.
   * Alternatively when set as a `string` the prop will be used to create the href and use the `children` for display.
   */
  tel?: boolean | string;
  /**
   * When set as a `boolean`, the component will treat the `children` as an sms number.
   * Alternatively when set as a `string` the prop will be used to create the href and use the `children` for display.
   */
  sms?: boolean | string;
  /**
   * When set the component will place the `href` on the component and use `children` for display.
   */
  href?: string;
  /**
   * Children to be displayed in the component. Will be ignored if any other obfuscate props recieve strings except `href`.
   */
  children?: string;
  /**
   * Override the `aria-label` when component is obfuscated.
   */
  'aria-label'?: string;
  /**
   * Override the text shown in the `href` when component is obfuscated.
   */
  obfuscateText?: string;
}

/**
 * A React component to obfuscate your contact links and text on your website.
 *
 * ```
 * // use the component's children to create the link and display
 * <Obfuscate email>hello@example.com</Obfuscate>
 *
 * // or specify the email address for the link with custom children
 * <Obfuscate email="hello@example.com">Email me!</Obfuscate>
 * ```
 *
 * @see https://github.com/South-Paw/react-obfuscate-ts
 */
const Obfuscate: React.FC<ObfuscateProps> = ({
  email,
  tel,
  sms,
  href,
  children,
  'aria-label': ariaLabel = 'focus to reveal obfuscated content',
  obfuscateText = 'obfuscated',
  style,
  onClick = noop,
  onFocus = noop,
  onMouseOver = noop,
  onContextMenu = noop,
  ...other
}) => {
  const [humanInteraction, setHumanInteraction] = React.useState(false);

  const componentStyle = React.useMemo<React.CSSProperties>(
    () => ({
      ...style,
      unicodeBidi: 'bidi-override',
      direction: humanInteraction ? 'ltr' : 'rtl',
    }),
    [style, humanInteraction],
  );

  const content = React.useMemo(() => {
    if (children) return children;
    if (isString(email)) return email;
    if (isString(tel)) return tel;
    if (isString(sms)) return sms;
    if (isString(href)) return href;
    return '';
  }, [children, email, tel, sms, href]);

  const uri = React.useMemo(() => createUri({ email, tel, sms, href, children }), [email, tel, sms, href, children]);
  const hrefUri = React.useMemo(() => (humanInteraction ? uri : obfuscateText), [humanInteraction, uri, obfuscateText]);

  const handleOnClick = React.useCallback<(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void>(
    (e) => {
      onClick(e);

      if (!humanInteraction && uri) {
        window.location.href = uri;
      }
    },
    [uri, onClick],
  );

  const handleOnFocus = React.useCallback<(e: React.FocusEvent<HTMLAnchorElement>) => void>((e) => {
    onFocus(e);
    setHumanInteraction(true);
  }, []);

  const handleOnMouseOver = React.useCallback<(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void>((e) => {
    onMouseOver(e);
    setHumanInteraction(true);
  }, []);

  const handleOnContextMenu = React.useCallback<(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void>((e) => {
    onContextMenu(e);
    setHumanInteraction(true);
  }, []);

  return (
    <Component
      style={componentStyle}
      href={uri ? hrefUri : undefined}
      aria-label={humanInteraction ? undefined : ariaLabel}
      onClick={handleOnClick}
      onFocus={handleOnFocus}
      onMouseOver={handleOnMouseOver}
      onContextMenu={handleOnContextMenu}
      {...other}
    >
      {humanInteraction ? content : reverse(content)}
    </Component>
  );
};

Obfuscate.displayName = 'Obfuscate';

export { Obfuscate };
