// src/components/Dropdown/Dropdown.stories.tsx
import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Dropdown, { Option } from './Dropdown';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof Dropdown>> = (args) => {
  const [selected, setSelected] = useState<Option | null>(null);

  const handleSelect = (option: Option) => {
    setSelected(option);
  };
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginTop: '10px' }}>
        <strong>Selected:</strong> {selected?.label || 'None'}
      </div>
    </div>
  );
};

export const SingleSelect = Template.bind({});
SingleSelect.args = {
  options: [
    { id: 1, value: 'Dimensions', label: 'Dimensions' },
    { id: 2, value: 'Ratio', label: 'Ratio' },
    { id: 3, value: 'Percentage', label: 'Percentage' },
  ],
  defaultValue: 'Dimensions',
  className: '',
};
