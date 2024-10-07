// src/components/Dropdown/Dropdown.stories.tsx

import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Dropdown from './Dropdown';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof Dropdown>> = (args) => {
  const [selected, setSelected] = useState<
    React.ComponentProps<typeof Dropdown>['onSelect']
  >(args.onSelect);

  return (
    <div style={{ padding: '20px' }}>
      <Dropdown {...args} onSelect={setSelected} />
      <div style={{ marginTop: '10px' }}>
        <strong>Selected:</strong>{' '}
        {Array.isArray(selected)
          ? selected.map((opt) => opt.label).join(', ')
          : selected?.label || 'None'}
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
  multiSelect: false,
  className: '',
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  options: [
    { id: 1, value: 'Dimensions', label: 'Dimensions' },
    { id: 2, value: 'Ratio', label: 'Ratio' },
    { id: 3, value: 'Percentage', label: 'Percentage' },
  ],
  multiSelect: true,
  titleHelper: 'Scale',
  titleHelperPlural: 'Scales',
  className: '',
};
