// a bunch of loading divs

import { Loader2Icon } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <Loader2Icon className="w-10 h-10 animate-spin" />
    </div>
  );
}
