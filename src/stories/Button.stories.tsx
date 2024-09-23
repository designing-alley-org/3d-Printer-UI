// import React from 'react';
import Button from './Button';

export default {
  title: 'Example/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Click Me',
  onClick: () => alert('Button clicked!'),
  width: '100px', // Set width here
  height: '50px', // Set height here
};
