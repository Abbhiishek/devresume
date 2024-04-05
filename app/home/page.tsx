import { TypographyH1 } from '@/components/common/Typography';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

function Page() {
  return (
    <div className="pt-20 flex flex-col items-center space-x-4 min-h-screen">
      <TypographyH1 className="font-cal text-primary">
        🤫 Dicovered something unTold❗
      </TypographyH1>
      <Image
        alt="cool stuff discovered "
        src="https://illustrations.popsy.co/gray/question-mark.svg"
        width={400}
        height={400}
        className=""
      />
      <Link href={'https://app.dresume.me'} passHref>
        <Button variant="faded" className="mt-10" color="primary">
          Navigate to Cool Stuff 😎
        </Button>
      </Link>
    </div>
  );
}

export default Page;
