import {
  AllHTMLAttributes,
  CSSProperties,
  ElementType,
  FocusEventHandler,
  MouseEventHandler,
  createElement,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { createUri, isString, noop, reverse } from './util';

export interface ObfuscateBaseProps {
  /**
   * Polymorphic `as` component. Use this to change the Obfuscate element.
   *
   * @default 'a'
   */
  as?: ElementType;
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
   * Children to be displayed in the component. Will be ignored if any other obfuscate props receive strings except `href`.
   */
  children?: string;
  /**
   * Override the `aria-label` when component is obfuscated.
   *
   * @default 'focus to reveal obfuscated content'
   */
  'aria-label'?: string;
  /**
   * Override the text shown in the `href` when component is obfuscated.
   *
   * @default 'obfuscated'
   */
  obfuscateText?: string;
}

export interface ObfuscateProps
  extends ObfuscateBaseProps,
    Omit<AllHTMLAttributes<HTMLElement>, keyof ObfuscateBaseProps> {}

/**
 * A React component to obfuscate your contact links and text on your website.
 *
 * ```tsx
 * // use the component's children to create the link and display
 * <Obfuscate email>hello@example.com</Obfuscate>
 *
 * // or specify the email address for the link with custom children
 * <Obfuscate email="hello@example.com">Send email</Obfuscate>
 * ```
 *
 * @see https://github.com/South-Paw/react-obfuscate-ts
 */
export const Obfuscate = forwardRef<HTMLElement, ObfuscateProps>(function Obfuscate(
  {
    as = 'a',
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
    ...rest
  },
  ref,
) {
  const [humanInteraction, setHumanInteraction] = useState(false);

  const componentStyle = useMemo<CSSProperties>(
    () => ({
      ...style,
      unicodeBidi: 'bidi-override',
      direction: humanInteraction ? 'ltr' : 'rtl',
    }),
    [style, humanInteraction],
  );

  const content = useMemo(() => {
    if (children) return children;
    if (isString(email)) return email;
    if (isString(tel)) return tel;
    if (isString(sms)) return sms;
    if (isString(href)) return href;
    return '';
  }, [children, email, tel, sms, href]);

  const uri = useMemo(() => createUri({ email, tel, sms, href, children }), [email, tel, sms, href, children]);
  const hrefUri = useMemo(() => (humanInteraction ? uri : obfuscateText), [humanInteraction, uri, obfuscateText]);

  const handleOnClick = useCallback<MouseEventHandler<HTMLElement>>(
    (e) => {
      onClick(e);

      if (!humanInteraction && uri) {
        window.location.href = uri;
      }
    },
    [humanInteraction, uri, onClick],
  );

  const handleOnFocus = useCallback<FocusEventHandler<HTMLElement>>(
    (e) => {
      onFocus(e);
      setHumanInteraction(true);
    },
    [onFocus],
  );

  const handleOnMouseOver = useCallback<MouseEventHandler<HTMLElement>>(
    (e) => {
      onMouseOver(e);
      setHumanInteraction(true);
    },
    [onMouseOver],
  );

  const handleOnContextMenu = useCallback<MouseEventHandler<HTMLElement>>(
    (e) => {
      onContextMenu(e);
      setHumanInteraction(true);
    },
    [onContextMenu],
  );

  return createElement(
    as,
    {
      style: componentStyle,
      href: uri ? hrefUri : undefined,
      'aria-label': humanInteraction ? undefined : ariaLabel,
      onClick: handleOnClick,
      onFocus: handleOnFocus,
      onMouseOver: handleOnMouseOver,
      onContextMenu: handleOnContextMenu,
      ...rest,

      ref,
    },
    humanInteraction ? content : reverse(content),
  );
});
