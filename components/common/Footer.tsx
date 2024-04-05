import Link from 'next/link';
import { TypographyP } from './Typography';

export default function Footer() {
  return (
    <footer
      className="w-full border-t border-teal-600/60 p-8 
        lg:px-32 gap-8 flex justify-center"
    >
      <div className="flex justify-center gap-2">
        <TypographyP>Made with 💚 by</TypographyP>
        <Link
          href={'https://github.com/Abbhiishek'}
          target="_blank"
          className="underline decoration-wavy underline-offset-2 decoration-primary"
        >
          Abhishek Kushwaha
        </Link>
      </div>
    </footer>
  );
}
