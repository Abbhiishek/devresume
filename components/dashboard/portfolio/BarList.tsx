'use client';

import { TypographyH4 } from '@/components/common/Typography';
import { BarList } from '@tremor/react';
export const BlogBarList = ({
  data,
}: {
  data: {
    name: string;
    value: number;
  }[];
}) => (
  <>
    <BarList
      color={['green-500']}
      data={data}
      className="mx-auto !fill-green-500"
      showAnimation
    />
  </>
);

type data = {
  name: string;
  value: number;
  logo?: React.JSXElementConstructor<any>;
};

export const BrowsersAgents = async ({ data }: { data: data[] }) => {
  return (
    <div className="border p-4 rounded-lg">
      <TypographyH4>Browsers</TypographyH4>
      <br />
      <BarList
        color={['cyan-500']}
        data={data}
        className="mx-auto"
        showAnimation
      />
    </div>
  );
};

export const OsAgents = async ({ data }: { data: data[] }) => {
  return (
    <div className="border p-4 rounded-lg">
      <TypographyH4>Operating Systems</TypographyH4>
      <br />
      <BarList
        color={['cyan-500']}
        data={data}
        className="mx-auto"
        showAnimation
      />
    </div>
  );
};

export const DeviceAgents = async ({ data }: { data: data[] }) => {
  return (
    <div className="border p-4 rounded-lg">
      <TypographyH4>Devices</TypographyH4>
      <br />
      <BarList
        color={['cyan-500']}
        data={data}
        className="mx-auto"
        showAnimation
      />
    </div>
  );
};
