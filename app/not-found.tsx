import { TypographyH1 } from '@/components/common/Typography';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

function NotFoundSite() {
  return (
    <div className="pt-20 flex flex-col items-center space-x-4 min-h-screen">
      <TypographyH1 className="font-cal text-primary">😖 404 😖</TypographyH1>
      <Image
        alt="missing site"
        src="https://illustrations.popsy.co/red/crashed-error.svg"
        width={400}
        height={400}
        className="dark:hidden"
      />
      <Image
        alt="missing site"
        src="https://illustrations.popsy.co/white/crashed-error.svg"
        width={400}
        height={400}
        className="hidden dark:block"
      />
      <p className="text-lg text-primary">
        LOOKS! Like you found a non registered sub domain with Us 🤖
      </p>
      <Link href={'https://app.dresume.me'} passHref>
        <Button variant="faded" className="mt-10" color="primary">
          Navigate to Cool Stuff 😎
        </Button>
      </Link>
    </div>
  );
}

export default NotFoundSite;
