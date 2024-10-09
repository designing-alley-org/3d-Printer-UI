import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ButtonIcon, ButtonIconProps } from './ButtonIcon';
import sampleSvg from '../../assets/icons/cross.svg'; // for testing

export default {
  title: 'Example/ButtonIcon',
  component: ButtonIcon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    bgColor: { control: 'color' },
    border: { control: 'text' },
    borderRadius: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
} as Meta<typeof ButtonIcon>;

const Template: Story<ButtonIconProps> = (args) => <ButtonIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  svgPath: sampleSvg,
  size: 'medium',
  bgColor: '#f0f0f0',
  borderRadius: '4px',
};

export const Small = Template.bind({});
Small.args = {
  svgPath: sampleSvg,
  size: 'small',
  bgColor: '#e0e0e0',
  borderRadius: '8px',
};

export const Large = Template.bind({});
Large.args = {
  svgPath: sampleSvg,
  size: 'large',
  bgColor: '#d0d0d0',
  borderRadius: '12px',
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  svgPath: sampleSvg,
  size: 'medium',
  style: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    transition: 'all 0.3s ease',
  },
};

export const WithHTMLAttributes = Template.bind({});
WithHTMLAttributes.args = {
  svgPath: sampleSvg,
  size: 'medium',
  disabled: true,
  'aria-label': 'Close dialog',
  'data-testid': 'close-button',
};

export const WithCustomProps = Template.bind({});
WithCustomProps.args = {
  svgPath: sampleSvg,
  size: 'medium',
  customProp1: 'value1',
  customProp2: 'value2',
};
