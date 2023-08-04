# @south-paw/react-obfuscate-ts

🕵️ A React component to obfuscate contact links and text

[![npm](https://img.shields.io/npm/v/@south-paw/react-obfuscate-ts.svg)](https://www.npmjs.com/package/@south-paw/react-obfuscate-ts)

## Features

- Easy to implement component for hiding your contact links or text in the DOM.
- Obfuscation of `email`, `tel`, `sms`, `href` and any other string of text as a child.
- `aria-label` for screen readers to identify the obfuscated element.
- Polymorphic `as` prop for use with other Link components (such as your own UI libraries link component).

## How it works

The component reverses the content in the DOM for you and uses CSS to re-reverse the content so it appears normally to the user, it also replaces the content of the link's `href` attribute. When a user hovers, clicks or focuses the element, it is considered "interacted" and has its content un-reversed and the correct `href` attribute applied. This ideally makes the link useless for a bot/spammer but ensures it remains user friendly when viewed normally.

## Basic usage

```jsx
import { Obfuscate } from '@south-paw/react-obfuscate-ts';

// use the component's children to create the link and display
<Obfuscate email>hello@example.com</Obfuscate>;

// or specify the email address for the link with custom children
<Obfuscate email="hello@example.com">Email me!</Obfuscate>;
```

## Inspiration

I was inspired to create this package after using the [coston/react-obfuscate](https://github.com/coston/react-obfuscate) package for two years. After switching the majority of my own code bases to TypeScript, I was disappointed to see there was no `@types` package for this original version and that it wasn't reliably obfuscating it's content in some of the usages I had. I decided that I'd do a variant of that component with a new API, a few minor bug fixes and one that included types as well.

## Issues and Bugs

If you find any, please report them [here](https://github.com/South-Paw/react-obfuscate-ts/issues) so they can be squashed.

## License

MIT, see the [LICENSE](./LICENSE) file.
