import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ButtonIcon, ButtonIconProps } from './ButtonIcon';
import sampleSvg from '../../assets/react.svg'; // You need to replace this with an actual SVG path
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
  },
} as Meta<typeof ButtonIcon>;

const Template: Story<ButtonIconProps> = (args) => <ButtonIcon {...args} />;

export const Default = Template.bind({});
Default.args = {
  svgPath: sampleSvg,
  onClick: () => alert('Button clicked!'),
  size: 'medium',
  bgColor: '#f0f0f0',
  borderRadius: '4px',
};

export const Small = Template.bind({});
Small.args = {
  svgPath: sampleSvg,
  onClick: () => alert('Small button clicked!'),
  size: 'small',
  bgColor: '#e0e0e0',
  borderRadius: '8px',
};

export const Large = Template.bind({});
Large.args = {
  svgPath: sampleSvg,
  onClick: () => alert('Large button clicked!'),
  size: 'large',
  bgColor: '#d0d0d0',
  borderRadius: '12px',
};
