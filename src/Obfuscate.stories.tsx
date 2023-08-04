import { Meta, StoryObj } from '@storybook/react';
import { AllHTMLAttributes, forwardRef } from 'react';
import { Obfuscate } from '.';

const meta = {
  title: 'Obfuscate',
  component: Obfuscate,
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    children: 'This text is obfuscated',
  },
};

export const Email: Story = {
  args: {
    email: true,
    children: 'hello@example.com',
  },
};

export const Tel: Story = {
  args: {
    tel: true,
    children: '+01 012 12345678',
  },
};

export const Sms: Story = {
  args: {
    sms: true,
    children: '+01 012 12345678',
  },
};

export const Href: Story = {
  args: {
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};

export const CustomChildren: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <Obfuscate email="hello@example.com">email</Obfuscate>
      <Obfuscate tel="+01 012 12345678">telephone</Obfuscate>
      <Obfuscate sms="+01 012 12345678">sms</Obfuscate>
      <Obfuscate href="https://example.com" target="_blank" rel="noopener noreferrer">
        href
      </Obfuscate>
    </div>
  ),
};

const Anchor = forwardRef<HTMLAnchorElement, AllHTMLAttributes<HTMLAnchorElement>>(function Anchor(
  { style, ...rest },
  ref,
) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a ref={ref} style={{ ...style, color: 'green' }} {...rest} />;
});

export const CustomElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <Obfuscate as="span">as `span` component</Obfuscate>
      <Obfuscate as={Anchor} href="//example.com" target="_blank" rel="noopener noreferrer">
        as custom `Anchor` component
      </Obfuscate>
    </div>
  ),
};
