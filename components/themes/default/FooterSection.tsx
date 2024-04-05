import { TypographyH4 } from '@/components/common/Typography';
import Link from 'next/link';

function FooterSection() {
  return (
    <div className="mt-10 pb-5 text-center">
      <TypographyH4>
        Built with 💚 and
        <Link
          href={`https://app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
          target="_blank"
          className="pl-2"
        >
          <b className="text-primary">Dresume.me</b>
        </Link>
      </TypographyH4>
    </div>
  );
}

export default FooterSection;
