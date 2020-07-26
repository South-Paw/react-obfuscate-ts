import * as React from 'react';
import styled from 'styled-components';
import { Obfuscate } from '.';

const Anchor = styled('a')`
  color: green;
`;

export default {
  title: 'Obfuscate',
  component: Obfuscate,
};

export const Simple = () => <Obfuscate>This text is obfuscated</Obfuscate>;

export const Text = () => <Obfuscate>Obfuscate this text</Obfuscate>;

export const Email = () => <Obfuscate email>hello@example.com</Obfuscate>;

export const Tel = () => <Obfuscate tel>+01 012 12345678</Obfuscate>;

export const Sms = () => <Obfuscate sms>+01 012 12345678</Obfuscate>;

export const Href = () => <Obfuscate href="https://example.com" target="_blank" rel="noopener noreferrer" />;

export const CustomChildren = () => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <Obfuscate email="hello@example.com">Email</Obfuscate>
    <Obfuscate tel="+01 012 12345678">Telephone</Obfuscate>
    <Obfuscate sms="+01 012 12345678">SMS</Obfuscate>
    <Obfuscate href="https://example.com" target="_blank" rel="noopener noreferrer">
      Href
    </Obfuscate>
  </div>
);

export const CustomComponent = () => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <Obfuscate as="span">as `span` component</Obfuscate>
    <Obfuscate as={Anchor} href="//example.com" target="_blank" rel="noopener noreferrer">
      as custom `Anchor` component
    </Obfuscate>
  </div>
);
