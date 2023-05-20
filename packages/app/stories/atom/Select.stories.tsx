import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Select',
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: 'sample',
    items: [
      { title: '', value: '' },
      ...new Array(5).fill(0).map((_, i) => ({ title: i.toString(), value: i.toString() })),
    ],
  },
  render: function (props): JSX.Element {
    const [state, setState] = React.useState<string>('');

    return <Select label={props.label} items={props.items} value={state} onChange={(e) => setState(e.target.value)} />;
  },
};
