'use client';
import { cn } from '@/lib/utils';
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretDownFilled,
  IconCaretLeftFilled,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconCommand,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconSearch,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconWorld,
} from '@tabler/icons-react';
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

export const MacbookScroll = ({
  src,
  showGradient,
  title,
  badge,
}: {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1.2, isMobile ? 1 : 1.5]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.6, isMobile ? 1 : 1.5]
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1500]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={ref}
      className="min-h-[200vh]  flex flex-col items-center py-0 md:py-80 justify-start flex-shrink-0 [perspective:800px] transform md:scale-100  scale-[0.35] sm:scale-50"
    >
      <motion.h2
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="dark:text-white text-neutral-800 text-3xl font-bold mb-20 text-center"
      >
        {title || (
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        )}
      </motion.h2>
      {/* Lid */}
      <Lid
        src={src}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      />
      {/* Base area */}
      <div className="h-[22rem] w-[32rem] bg-gray-200 dark:bg-[#272729] rounded-2xl overflow-hidden relative -z-10">
        {/* above keyboard bar */}
        <div className="h-10 w-full relative">
          <div className="absolute inset-x-0 mx-auto w-[80%] h-4 bg-[#050505]" />
        </div>
        <div className="flex relative">
          <div className="mx-auto w-[10%] overflow-hidden  h-full">
            <SpeakerGrid />
          </div>
          <div className="mx-auto w-[80%] h-full">
            <Keypad />
          </div>
          <div className="mx-auto w-[10%] overflow-hidden  h-full">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="h-2 w-20 mx-auto inset-x-0 absolute bottom-0 bg-gradient-to-t from-[#272729] to-[#050505] rounded-tr-3xl rounded-tl-3xl" />
        {showGradient && (
          <div className="h-40 w-full absolute bottom-0 inset-x-0 bg-gradient-to-t dark:from-black from-white via-white dark:via-black to-transparent z-50" />
        )}
        {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
      </div>
    </div>
  );
};

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src,
}: {
  scaleX: MotionValue<number>;
  scaleY: MotionValue<number>;
  rotate: MotionValue<number>;
  translate: MotionValue<number>;
  src?: string;
}) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: 'perspective(800px) rotateX(-25deg) translateZ(0px)',
          transformOrigin: 'bottom',
          transformStyle: 'preserve-3d',
        }}
        className="h-[12rem] w-[32rem] bg-[#010101] rounded-2xl p-2 relative"
      >
        <div
          style={{
            boxShadow: '0px 2px 0px 2px var(--neutral-900) inset',
          }}
          className="absolute inset-0 bg-[#010101] rounded-lg flex items-center justify-center"
        >
          <span className="text-white">
            <DevResumeLogo />
          </span>
        </div>
      </div>
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: 'preserve-3d',
          transformOrigin: 'top',
        }}
        className="h-96 w-[32rem] absolute inset-0 bg-[#010101] rounded-2xl p-2"
      >
        <div className="absolute inset-0 bg-[#272729] rounded-lg" />
        <Image
          src={src as string}
          alt="aceternity logo"
          fill
          className="object-cover object-left-top absolute rounded-lg inset-0 h-full w-full"
        />
      </motion.div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div
      className="w-[40%] mx-auto h-32  rounded-xl my-1"
      style={{
        boxShadow: '0px 0px 1px 1px #00000020 inset',
      }}
    />
  );
};

export const Keypad = () => {
  return (
    <div className="h-full rounded-md bg-[#050505] mx-1 p-1">
      {/* First Row */}
      <Row>
        <KBtn
          className="w-10 items-end justify-start pl-[4px] pb-[2px]"
          childrenClassName="items-start"
        >
          esc
        </KBtn>
        <KBtn>
          <IconBrightnessDown className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F1</span>
        </KBtn>

        <KBtn>
          <IconBrightnessUp className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F2</span>
        </KBtn>
        <KBtn>
          <IconTable className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F3</span>
        </KBtn>
        <KBtn>
          <IconSearch className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F4</span>
        </KBtn>
        <KBtn>
          <IconMicrophone className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F5</span>
        </KBtn>
        <KBtn>
          <IconMoon className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F6</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackPrev className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F7</span>
        </KBtn>
        <KBtn>
          <IconPlayerSkipForward className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F8</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackNext className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F8</span>
        </KBtn>
        <KBtn>
          <IconVolume3 className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F10</span>
        </KBtn>
        <KBtn>
          <IconVolume2 className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F11</span>
        </KBtn>
        <KBtn>
          <IconVolume className="h-[6px] w-[6px]" />
          <span className="inline-block mt-1">F12</span>
        </KBtn>
        <KBtn>
          <div className="h-4 w-4 rounded-full  bg-gradient-to-b from-20% from-neutral-900 via-black via-50% to-neutral-900 to-95% p-px">
            <div className="bg-black h-full w-full rounded-full" />
          </div>
        </KBtn>
      </Row>

      {/* Second row */}
      <Row>
        <KBtn>
          <span className="block">~</span>
          <span className="block mt-1">`</span>
        </KBtn>

        <KBtn>
          <span className="block ">!</span>
          <span className="block">1</span>
        </KBtn>
        <KBtn>
          <span className="block">@</span>
          <span className="block">2</span>
        </KBtn>
        <KBtn>
          <span className="block">#</span>
          <span className="block">3</span>
        </KBtn>
        <KBtn>
          <span className="block">$</span>
          <span className="block">4</span>
        </KBtn>
        <KBtn>
          <span className="block">%</span>
          <span className="block">5</span>
        </KBtn>
        <KBtn>
          <span className="block">^</span>
          <span className="block">6</span>
        </KBtn>
        <KBtn>
          <span className="block">&</span>
          <span className="block">7</span>
        </KBtn>
        <KBtn>
          <span className="block">*</span>
          <span className="block">8</span>
        </KBtn>
        <KBtn>
          <span className="block">(</span>
          <span className="block">9</span>
        </KBtn>
        <KBtn>
          <span className="block">)</span>
          <span className="block">0</span>
        </KBtn>
        <KBtn>
          <span className="block">&mdash;</span>
          <span className="block">_</span>
        </KBtn>
        <KBtn>
          <span className="block">+</span>
          <span className="block"> = </span>
        </KBtn>
        <KBtn
          className="w-10 items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          delete
        </KBtn>
      </Row>

      {/* Third row */}
      <Row>
        <KBtn
          className="w-10 items-end justify-start pl-[4px] pb-[2px]"
          childrenClassName="items-start"
        >
          tab
        </KBtn>
        <KBtn>
          <span className="block">Q</span>
        </KBtn>

        <KBtn>
          <span className="block">W</span>
        </KBtn>
        <KBtn>
          <span className="block">E</span>
        </KBtn>
        <KBtn>
          <span className="block">R</span>
        </KBtn>
        <KBtn>
          <span className="block">T</span>
        </KBtn>
        <KBtn>
          <span className="block">Y</span>
        </KBtn>
        <KBtn>
          <span className="block">U</span>
        </KBtn>
        <KBtn>
          <span className="block">I</span>
        </KBtn>
        <KBtn>
          <span className="block">O</span>
        </KBtn>
        <KBtn>
          <span className="block">P</span>
        </KBtn>
        <KBtn>
          <span className="block">{'{'}</span>
          <span className="block">{'['}</span>
        </KBtn>
        <KBtn>
          <span className="block">{'}'}</span>
          <span className="block">{']'}</span>
        </KBtn>
        <KBtn>
          <span className="block">{'|'}</span>
          <span className="block">{'\\'}</span>
        </KBtn>
      </Row>

      {/* Fourth Row */}
      <Row>
        <KBtn
          className="w-[2.8rem] items-end justify-start pl-[4px] pb-[2px]"
          childrenClassName="items-start"
        >
          caps lock
        </KBtn>
        <KBtn>
          <span className="block">A</span>
        </KBtn>

        <KBtn>
          <span className="block">S</span>
        </KBtn>
        <KBtn>
          <span className="block">D</span>
        </KBtn>
        <KBtn>
          <span className="block">F</span>
        </KBtn>
        <KBtn>
          <span className="block">G</span>
        </KBtn>
        <KBtn>
          <span className="block">H</span>
        </KBtn>
        <KBtn>
          <span className="block">J</span>
        </KBtn>
        <KBtn>
          <span className="block">K</span>
        </KBtn>
        <KBtn>
          <span className="block">L</span>
        </KBtn>
        <KBtn>
          <span className="block">{':'}</span>
          <span className="block">{';'}</span>
        </KBtn>
        <KBtn>
          <span className="block">{'"'}</span>
          <span className="block">{"'"}</span>
        </KBtn>
        <KBtn
          className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          return
        </KBtn>
      </Row>

      {/* Fifth Row */}
      <Row>
        <KBtn
          className="w-[3.65rem] items-end justify-start pl-[4px] pb-[2px]"
          childrenClassName="items-start"
        >
          shift
        </KBtn>
        <KBtn>
          <span className="block">Z</span>
        </KBtn>
        <KBtn>
          <span className="block">X</span>
        </KBtn>
        <KBtn>
          <span className="block">C</span>
        </KBtn>
        <KBtn>
          <span className="block">V</span>
        </KBtn>
        <KBtn>
          <span className="block">B</span>
        </KBtn>
        <KBtn>
          <span className="block">N</span>
        </KBtn>
        <KBtn>
          <span className="block">M</span>
        </KBtn>
        <KBtn>
          <span className="block">{'<'}</span>
          <span className="block">{','}</span>
        </KBtn>
        <KBtn>
          <span className="block">{'>'}</span>
          <span className="block">{'.'}</span>
        </KBtn>{' '}
        <KBtn>
          <span className="block">{'?'}</span>
          <span className="block">{'/'}</span>
        </KBtn>
        <KBtn
          className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          shift
        </KBtn>
      </Row>

      {/* sixth Row */}
      <Row>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-end w-full pr-1">
            <span className="block">fn</span>
          </div>
          <div className="flex justify-start w-full pl-1">
            <IconWorld className="h-[6px] w-[6px]" />
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-end w-full pr-1">
            <IconChevronUp className="h-[6px] w-[6px]" />
          </div>
          <div className="flex justify-start w-full pl-1">
            <span className="block">control</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-end w-full pr-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex justify-start w-full pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex justify-end w-full pr-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex justify-start w-full pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="w-[8.2rem]" />
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex justify-start w-full pl-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex justify-start w-full pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex justify-start w-full pl-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex justify-start w-full pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <div className="w-[4.9rem] mt-[2px] h-6 p-[0.5px] rounded-[4px] flex flex-col justify-end items-center">
          <KBtn className="w-6 h-3">
            <IconCaretUpFilled className="h-[6px] w-[6px]" />
          </KBtn>
          <div className="flex">
            <KBtn className="w-6 h-3">
              <IconCaretLeftFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="w-6 h-3">
              <IconCaretDownFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="w-6 h-3">
              <IconCaretRightFilled className="h-[6px] w-[6px]" />
            </KBtn>
          </div>
        </div>
      </Row>
    </div>
  );
};
export const KBtn = ({
  className,
  children,
  childrenClassName,
  backlit = true,
}: {
  className?: string;
  children?: React.ReactNode;
  childrenClassName?: string;
  backlit?: boolean;
}) => {
  return (
    <div
      className={cn(
        'p-[0.5px] rounded-[4px]',
        backlit && 'bg-white/[0.2] shadow-xl shadow-white'
      )}
    >
      <div
        className={cn(
          'h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center',
          className
        )}
        style={{
          boxShadow:
            '0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset',
        }}
      >
        <div
          className={cn(
            'text-neutral-200 text-[5px] w-full flex justify-center items-center flex-col',
            childrenClassName,
            backlit && 'text-white'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const Row = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-[2px] mb-[2px] w-full flex-shrink-0">
      {children}
    </div>
  );
};

export const SpeakerGrid = () => {
  return (
    <div
      className="flex px-[0.5px] gap-[2px] mt-2 h-40"
      style={{
        backgroundImage:
          'radial-gradient(circle, #08080A 0.5px, transparent 0.5px)',
        backgroundSize: '3px 3px',
      }}
    />
  );
};

export const OptionKey = ({ className }: { className: string }) => {
  return (
    <svg
      fill="none"
      version="1.1"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <rect
        stroke="currentColor"
        strokeWidth={2}
        x="18"
        y="5"
        width="10"
        height="2"
      />
      <polygon
        stroke="currentColor"
        strokeWidth={2}
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
      />
      <rect
        id="_Transparent_Rectangle_"
        className="st0"
        width="32"
        height="32"
        stroke="none"
      />
    </svg>
  );
};

const DevResumeLogo = () => {
  return (
    <svg
      width="168"
      height="95"
      viewBox="0 0 168 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.453125 32.1875C0.328125 32.0625 0.265625 31.7969 0.265625 31.3906C0.265625 30.7656 0.328125 30.4531 0.453125 30.4531C0.703125 30.4531 1.0625 30.4062 1.53125 30.3125C2 30.2188 2.4375 30.0938 2.84375 29.9375C3.25 29.75 3.48438 29.5781 3.54688 29.4219C3.73438 28.7031 3.82812 27.3281 3.82812 25.2969V7.57812C3.82812 5.82812 3.73438 4.60938 3.54688 3.92188C3.48438 3.73438 3.23438 3.54688 2.79688 3.35938C2.39062 3.14062 1.95312 2.96875 1.48438 2.84375C1.01562 2.6875 0.65625 2.60938 0.40625 2.60938C0.28125 2.60938 0.21875 2.32812 0.21875 1.76562C0.21875 1.26562 0.265625 0.96875 0.359375 0.875C1.60938 0.9375 2.79688 1 3.92188 1.0625C5.07812 1.09375 6.1875 1.10938 7.25 1.10938H15.4062C17.9375 1.10938 20.2031 1.51562 22.2031 2.32812C24.2344 3.14062 25.9531 4.25 27.3594 5.65625C28.7656 7.0625 29.8281 8.67188 30.5469 10.4844C31.2969 12.2969 31.6719 14.2188 31.6719 16.25C31.6719 19.25 31.0156 21.9531 29.7031 24.3594C28.3906 26.7344 26.5156 28.625 24.0781 30.0312C21.6406 31.4375 18.7344 32.1406 15.3594 32.1406C15.0469 32.1406 14.5781 32.125 13.9531 32.0938C13.3594 32.0938 12.6094 32.0781 11.7031 32.0469C10.7969 31.9844 9.96875 31.9375 9.21875 31.9062C8.46875 31.875 7.82812 31.875 7.29688 31.9062L0.453125 32.1875ZM16.1094 29.5156C18.7344 29.5156 20.7656 28.3906 22.2031 26.1406C23.6406 23.8906 24.3594 20.5312 24.3594 16.0625C24.3594 13.75 24.0156 11.6719 23.3281 9.82812C22.6406 7.95312 21.6562 6.46875 20.375 5.375C19.125 4.28125 17.5938 3.73438 15.7812 3.73438H15.5469C12.8906 3.73438 11.375 3.98438 11 4.48438C10.5938 5.01562 10.3906 6 10.3906 7.4375V25.625C10.3906 27.6562 10.5312 28.75 10.8125 28.9062C11.5 29.3125 13.2656 29.5156 16.1094 29.5156ZM43.7075 32.3281C41.8013 32.3281 40.0356 31.8438 38.4106 30.875C36.8169 29.9062 35.5356 28.6094 34.5669 26.9844C33.6294 25.3594 33.1606 23.5781 33.1606 21.6406C33.1606 19.6406 33.5825 17.8438 34.4263 16.25C35.3013 14.6562 36.5044 13.3906 38.0356 12.4531C39.5669 11.5156 41.3325 11.0469 43.3325 11.0469C45.3013 11.0469 46.9731 11.5156 48.3481 12.4531C49.7544 13.3594 50.8169 14.5 51.5356 15.875C52.2856 17.2188 52.6606 18.5781 52.6606 19.9531C52.6606 20.6719 52.5044 21.1406 52.1919 21.3594C51.9106 21.5781 51.3325 21.6875 50.4575 21.6875H39.8638C39.6763 21.6875 39.5825 21.7969 39.5825 22.0156C39.5825 23.1406 39.7856 24.2031 40.1919 25.2031C40.6294 26.2031 41.2544 27.0156 42.0669 27.6406C42.9106 28.2656 43.9263 28.5781 45.1138 28.5781C46.1763 28.5781 47.1606 28.4219 48.0669 28.1094C48.6919 27.9219 49.1763 27.75 49.52 27.5938C49.8638 27.4375 50.1763 27.2656 50.4575 27.0781C50.77 26.8594 51.1294 26.5938 51.5356 26.2812C51.8169 26.4062 51.9575 26.7031 51.9575 27.1719C51.9575 27.5781 51.895 27.8906 51.77 28.1094C51.5825 28.6094 51.0825 29.1875 50.27 29.8438C49.4888 30.5 48.52 31.0781 47.3638 31.5781C46.2388 32.0781 45.02 32.3281 43.7075 32.3281ZM39.9106 19.1094H45.8638C46.3013 19.1094 46.52 18.8125 46.52 18.2188C46.52 17.0312 46.1919 15.9688 45.5356 15.0312C44.9106 14.0938 44.0981 13.625 43.0981 13.625C42.1919 13.625 41.4731 13.9531 40.9419 14.6094C40.4419 15.2344 40.0825 15.9375 39.8638 16.7188C39.6763 17.5 39.5825 18.1406 39.5825 18.6406C39.5825 18.9531 39.6919 19.1094 39.9106 19.1094ZM64.8838 32.5156C64.54 32.5156 64.29 32.3906 64.1338 32.1406L56.3525 14.6094C56.0713 13.9844 55.5713 13.5625 54.8525 13.3438C54.1338 13.0938 53.54 12.9688 53.0713 12.9688C52.9463 12.9688 52.8838 12.6562 52.8838 12.0312C52.8838 11.625 52.9463 11.3594 53.0713 11.2344C53.2588 11.2344 53.6181 11.2656 54.1494 11.3281C54.6806 11.3594 55.29 11.4062 55.9775 11.4688C56.6963 11.5 57.3681 11.5312 57.9931 11.5625C58.6181 11.5938 59.1181 11.6094 59.4931 11.6094C59.8994 11.6094 60.3994 11.5938 60.9931 11.5625C61.6181 11.5312 62.3681 11.4844 63.2431 11.4219C64.0869 11.3594 64.7588 11.3125 65.2588 11.2812C65.7588 11.25 66.0713 11.2344 66.1963 11.2344C66.3213 11.3594 66.3838 11.6719 66.3838 12.1719C66.3838 12.7031 66.3213 12.9688 66.1963 12.9688C65.8838 12.9688 65.4775 13.0312 64.9775 13.1562C64.4775 13.25 64.0244 13.4062 63.6181 13.625C63.2119 13.8125 63.0088 14.0625 63.0088 14.375C63.0088 14.5938 63.0556 14.8281 63.1494 15.0781L66.8056 23.75L70.5088 15.9688C70.9463 15.0312 70.9619 14.3594 70.5556 13.9531C69.8994 13.2969 68.8681 12.9688 67.4619 12.9688C67.3681 12.9062 67.3213 12.6562 67.3213 12.2188C67.3213 11.8125 67.3525 11.4844 67.415 11.2344L69.9931 11.4219C70.6181 11.4844 71.165 11.5312 71.6338 11.5625C72.1025 11.5938 72.5088 11.6094 72.8525 11.6094C73.2275 11.6094 73.6494 11.5938 74.1181 11.5625C74.6181 11.5 75.165 11.4531 75.7588 11.4219L78.2431 11.2344C78.3681 11.3594 78.4306 11.625 78.4306 12.0312C78.4306 12.6562 78.3681 12.9688 78.2431 12.9688C77.9306 12.9688 77.5244 13.0469 77.0244 13.2031C76.5244 13.3594 76.04 13.5781 75.5713 13.8594C75.1025 14.1094 74.7588 14.4375 74.54 14.8438L66.29 31.1562C65.8213 32.0625 65.3525 32.5156 64.8838 32.5156ZM28.9062 94.3281C27.375 94.3281 25.9688 94.1875 24.6875 93.9062C23.4375 93.5938 22.4375 93.25 21.6875 92.875C20.9062 92.5 20.1406 91.9375 19.3906 91.1875C19.0156 90.8125 18.6719 90.4531 18.3594 90.1094C18.0469 89.7656 17.7031 89.3438 17.3281 88.8438C16.9844 88.3125 16.5312 87.625 15.9688 86.7812C15.4062 85.9062 14.6719 84.75 13.7656 83.3125C12.5469 81.4688 11.7344 80.4688 11.3281 80.3125C11.2656 80.2812 11.0938 80.2656 10.8125 80.2656C10.5312 80.2656 10.3906 80.5156 10.3906 81.0156V87.3906C10.3906 89.0469 10.5 90.3281 10.7188 91.2344C10.7812 91.4844 11.0469 91.7031 11.5156 91.8906C11.9844 92.0781 12.5 92.2188 13.0625 92.3125C13.625 92.4062 14.0625 92.4531 14.375 92.4531C14.5 92.4531 14.5625 92.75 14.5625 93.3438C14.5625 93.6562 14.5312 93.9375 14.4688 94.1875C12.5938 94.0938 11.0625 94.0156 9.875 93.9531C8.6875 93.8906 7.82812 93.875 7.29688 93.9062L0.453125 94.1875C0.328125 94.0625 0.265625 93.7969 0.265625 93.3906C0.265625 92.7656 0.328125 92.4531 0.453125 92.4531C0.703125 92.4531 1.0625 92.4062 1.53125 92.3125C2 92.2188 2.4375 92.0938 2.84375 91.9375C3.25 91.75 3.48438 91.5781 3.54688 91.4219C3.73438 90.7031 3.82812 89.3281 3.82812 87.2969V69.5781C3.82812 67.8281 3.73438 66.6094 3.54688 65.9219C3.48438 65.7344 3.23438 65.5469 2.79688 65.3594C2.39062 65.1406 1.95312 64.9688 1.48438 64.8438C1.01562 64.6875 0.65625 64.6094 0.40625 64.6094C0.28125 64.6094 0.21875 64.3281 0.21875 63.7656C0.21875 63.2656 0.265625 62.9688 0.359375 62.875C1.79688 62.9375 3.07812 63 4.20312 63.0625C5.35938 63.0938 6.375 63.1094 7.25 63.1094C8.75 63.0781 9.92188 63.0625 10.7656 63.0625C11.6094 63.0625 12.25 63.0625 12.6875 63.0625C13.125 63.0625 13.5 63.0625 13.8125 63.0625C15.0625 63.0625 16.3125 63.2188 17.5625 63.5312C18.8438 63.8438 20.0156 64.3281 21.0781 64.9844C22.1406 65.6094 22.9844 66.4219 23.6094 67.4219C24.2656 68.3906 24.5938 69.5625 24.5938 70.9375C24.5938 72.3125 24.3125 73.5938 23.75 74.7812C23.1875 75.9688 22.4531 76.9688 21.5469 77.7812C20.6719 78.5938 19.7656 79.1562 18.8281 79.4688C18.5781 79.5625 18.5312 79.7344 18.6875 79.9844C19.375 81.1406 19.9062 82.0156 20.2812 82.6094C20.6562 83.2031 20.9688 83.6875 21.2188 84.0625C21.5 84.4062 21.8281 84.8438 22.2031 85.375C22.5781 85.875 23.1094 86.6406 23.7969 87.6719C24.3281 88.4219 24.9531 89.1719 25.6719 89.9219C26.4219 90.6406 27.2188 91.25 28.0625 91.75C28.9375 92.2188 29.7656 92.4531 30.5469 92.4531C30.6719 92.5781 30.7344 92.8594 30.7344 93.2969C30.7344 93.6719 30.6719 93.9844 30.5469 94.2344C30.3281 94.2656 30.0781 94.2812 29.7969 94.2812C29.5469 94.3125 29.25 94.3281 28.9062 94.3281ZM12.3594 77.6875H13.625C14.8438 77.6875 15.7812 77.1562 16.4375 76.0938C17.125 75.0312 17.4688 73.625 17.4688 71.875C17.4688 67.7188 16.0156 65.6406 13.1094 65.6406C12.0156 65.6406 11.2969 65.7656 10.9531 66.0156C10.5781 66.2969 10.3906 67.8281 10.3906 70.6094V75.6719C10.3906 76.5469 10.5625 77.1094 10.9062 77.3594C11.2812 77.5781 11.7656 77.6875 12.3594 77.6875ZM41.7388 94.3281C39.8325 94.3281 38.0669 93.8438 36.4419 92.875C34.8481 91.9062 33.5669 90.6094 32.5981 88.9844C31.6606 87.3594 31.1919 85.5781 31.1919 83.6406C31.1919 81.6406 31.6138 79.8438 32.4575 78.25C33.3325 76.6562 34.5356 75.3906 36.0669 74.4531C37.5981 73.5156 39.3638 73.0469 41.3638 73.0469C43.3325 73.0469 45.0044 73.5156 46.3794 74.4531C47.7856 75.3594 48.8481 76.5 49.5669 77.875C50.3169 79.2188 50.6919 80.5781 50.6919 81.9531C50.6919 82.6719 50.5356 83.1406 50.2231 83.3594C49.9419 83.5781 49.3638 83.6875 48.4888 83.6875H37.895C37.7075 83.6875 37.6138 83.7969 37.6138 84.0156C37.6138 85.1406 37.8169 86.2031 38.2231 87.2031C38.6606 88.2031 39.2856 89.0156 40.0981 89.6406C40.9419 90.2656 41.9575 90.5781 43.145 90.5781C44.2075 90.5781 45.1919 90.4219 46.0981 90.1094C46.7231 89.9219 47.2075 89.75 47.5513 89.5938C47.895 89.4375 48.2075 89.2656 48.4888 89.0781C48.8013 88.8594 49.1606 88.5938 49.5669 88.2812C49.8481 88.4062 49.9888 88.7031 49.9888 89.1719C49.9888 89.5781 49.9263 89.8906 49.8013 90.1094C49.6138 90.6094 49.1138 91.1875 48.3013 91.8438C47.52 92.5 46.5513 93.0781 45.395 93.5781C44.27 94.0781 43.0513 94.3281 41.7388 94.3281ZM37.9419 81.1094H43.895C44.3325 81.1094 44.5513 80.8125 44.5513 80.2188C44.5513 79.0312 44.2231 77.9688 43.5669 77.0312C42.9419 76.0938 42.1294 75.625 41.1294 75.625C40.2231 75.625 39.5044 75.9531 38.9731 76.6094C38.4731 77.2344 38.1138 77.9375 37.895 78.7188C37.7075 79.5 37.6138 80.1406 37.6138 80.6406C37.6138 80.9531 37.7231 81.1094 37.9419 81.1094ZM60.1963 94.4688C59.4775 94.4688 58.6806 94.3906 57.8056 94.2344C56.9306 94.0781 56.1181 93.8594 55.3681 93.5781C54.6181 93.2969 54.04 93 53.6338 92.6875C53.2588 90.5312 53.0713 88.625 53.0713 86.9688C53.2275 86.875 53.4619 86.8281 53.7744 86.8281C54.7744 86.8281 55.29 86.9688 55.3213 87.25C55.8525 90.3438 57.54 91.8906 60.3838 91.8906C61.1338 91.8906 61.7588 91.7188 62.2588 91.375C62.7588 91.0312 63.0088 90.5156 63.0088 89.8281C63.0088 89.1719 62.7431 88.6094 62.2119 88.1406C61.6806 87.6719 61.0556 87.25 60.3369 86.875C59.6181 86.5 58.9619 86.1562 58.3681 85.8438C56.5556 84.9688 55.2119 84.0156 54.3369 82.9844C53.4619 81.9219 53.0244 80.625 53.0244 79.0938C53.0244 77.6562 53.3994 76.5 54.1494 75.625C54.8994 74.7188 55.8994 74.0469 57.1494 73.6094C58.3994 73.1719 59.7431 72.9531 61.1806 72.9531C63.8994 72.9531 65.9306 73.2656 67.2744 73.8906C67.5869 75.2656 67.7431 77.2031 67.7431 79.7031C67.7431 79.9844 67.54 80.125 67.1338 80.125C66.165 80.125 65.6494 80 65.5869 79.75C65.3056 78.4375 64.8213 77.4062 64.1338 76.6562C63.4775 75.9062 62.415 75.5312 60.9463 75.5312C60.2588 75.5312 59.6963 75.7031 59.2588 76.0469C58.8213 76.3594 58.6025 76.8281 58.6025 77.4531C58.6025 78.1719 58.915 78.7969 59.54 79.3281C60.165 79.8281 61.0869 80.375 62.3056 80.9688C63.3369 81.4375 64.3369 81.9844 65.3056 82.6094C66.2744 83.2031 67.0556 83.9531 67.6494 84.8594C68.2744 85.7344 68.5869 86.8438 68.5869 88.1875C68.5869 90.25 67.79 91.8125 66.1963 92.875C64.6338 93.9375 62.6338 94.4688 60.1963 94.4688ZM87.6069 94.2344C87.4194 94.2344 87.3256 93.9531 87.3256 93.3906V91.6562C87.3256 91.4062 87.2631 91.3438 87.1381 91.4688C86.4819 92.1562 85.5131 92.7812 84.2319 93.3438C82.9819 93.9062 81.6225 94.1875 80.1537 94.1875C78.935 94.1875 77.8569 93.8125 76.9194 93.0625C76.0131 92.3125 75.31 91.3125 74.81 90.0625C74.31 88.7812 74.06 87.375 74.06 85.8438V81.2969C74.06 79.5469 73.7787 78.375 73.2162 77.7812C72.9662 77.4688 72.6225 77.25 72.185 77.125C71.7787 77 71.4194 76.9219 71.1069 76.8906C70.7944 76.8281 70.6381 76.7656 70.6381 76.7031C70.6381 75.6094 70.7162 75.0625 70.8725 75.0625C71.1537 75.0625 71.6694 75 72.4194 74.875C73.2006 74.75 74.0444 74.6094 74.9506 74.4531C75.8569 74.2656 76.7162 74.0781 77.5287 73.8906C78.3725 73.6719 79.0131 73.5 79.4506 73.375C79.5444 73.3438 79.6225 73.3125 79.685 73.2812C79.7787 73.25 79.8725 73.2344 79.9662 73.2344C80.1225 73.2344 80.2787 73.3438 80.435 73.5625C80.5912 73.75 80.6694 73.9062 80.6694 74.0312C80.5131 75.4062 80.3881 76.4844 80.2944 77.2656C80.2006 78.0469 80.1537 78.5312 80.1537 78.7188V83.7344C80.1537 86.1719 80.4662 87.8906 81.0912 88.8906C81.7162 89.8594 82.7631 90.3438 84.2319 90.3438C85.2944 90.3438 86.0912 90.1094 86.6225 89.6406C87.1537 89.1406 87.4194 88.5938 87.4194 88V81.2969C87.4194 79.5469 87.1381 78.375 86.5756 77.7812C86.3256 77.4688 85.9819 77.25 85.5444 77.125C85.1381 77 84.7787 76.9219 84.4662 76.8906C84.1537 76.8281 83.9975 76.7656 83.9975 76.7031C83.9975 75.6094 84.0756 75.0625 84.2319 75.0625C84.5131 75.0625 85.0287 75 85.7787 74.875C86.56 74.75 87.4037 74.6094 88.31 74.4531C89.2162 74.2656 90.0756 74.0781 90.8881 73.8906C91.7319 73.6719 92.3725 73.5 92.81 73.375L93.3256 73.2344C93.4819 73.2344 93.6381 73.3438 93.7944 73.5625C93.9506 73.75 94.0287 73.9062 94.0287 74.0312C93.8725 75.4062 93.7475 76.4844 93.6537 77.2656C93.56 78.0469 93.5131 78.5156 93.5131 78.6719V87.8594C93.5131 89.5156 93.6694 90.5 93.9819 90.8125C94.1381 90.9688 94.3881 91.0938 94.7319 91.1875C95.0756 91.25 95.4194 91.2812 95.7631 91.2812H96.2319C96.3569 91.3125 96.4194 91.4375 96.4194 91.6562C96.4194 92.5625 96.3256 93.0156 96.1381 93.0156C94.2006 93.2031 92.5756 93.3906 91.2631 93.5781C89.9819 93.7656 88.9819 93.9375 88.2631 94.0938L87.6069 94.2344ZM98.5644 94.1875C98.4394 94.0625 98.3769 93.7344 98.3769 93.2031C98.3769 92.7031 98.4394 92.4531 98.5644 92.4531C98.8144 92.4531 99.1738 92.3906 99.6425 92.2656C100.111 92.1094 100.549 91.9375 100.955 91.75C101.361 91.5625 101.58 91.4062 101.611 91.2812C101.83 90.4062 101.939 89.2188 101.939 87.7188V81.2969C101.939 79.5469 101.658 78.375 101.096 77.7812C100.846 77.4688 100.502 77.25 100.064 77.125C99.6581 77 99.2988 76.9219 98.9863 76.8906C98.6738 76.8281 98.5175 76.7656 98.5175 76.7031C98.5175 75.6094 98.5956 75.0625 98.7519 75.0625C99.6894 75 100.83 74.8125 102.174 74.5C103.518 74.1562 105.096 73.8125 106.908 73.4688L107.846 73.2344C108.002 73.2344 108.158 73.3438 108.314 73.5625C108.502 73.75 108.58 73.9062 108.549 74.0312L108.361 75.4844C108.361 75.6406 108.377 75.7344 108.408 75.7656C108.471 75.7656 108.58 75.6875 108.736 75.5312C110.455 73.9062 112.627 73.0938 115.252 73.0938C117.502 73.0938 119.158 74.1719 120.221 76.3281C122.158 74.2031 124.971 73.125 128.658 73.0938C130.471 73.0938 131.939 73.8594 133.064 75.3906C134.221 76.9219 134.799 79.25 134.799 82.375V87.0156C134.799 89.0781 134.908 90.5 135.127 91.2812C135.189 91.4062 135.408 91.5625 135.783 91.75C136.189 91.9375 136.611 92.1094 137.049 92.2656C137.486 92.3906 137.799 92.4531 137.986 92.4531C138.049 92.4531 138.096 92.5781 138.127 92.8281C138.158 93.0781 138.174 93.3438 138.174 93.625C138.174 93.9062 138.143 94.0938 138.08 94.1875C137.893 94.1875 137.533 94.1562 137.002 94.0938C136.471 94.0625 135.861 94.0312 135.174 94C134.518 93.9375 133.877 93.8906 133.252 93.8594C132.627 93.8281 132.127 93.8125 131.752 93.8125C131.252 93.8125 130.549 93.8438 129.643 93.9062C128.736 93.9688 127.861 94.0156 127.018 94.0469C126.205 94.1094 125.674 94.1562 125.424 94.1875C125.299 94.0625 125.236 93.7344 125.236 93.2031C125.236 92.7031 125.299 92.4531 125.424 92.4531C125.674 92.4531 126.018 92.3906 126.455 92.2656C126.924 92.1094 127.346 91.9375 127.721 91.75C128.127 91.5625 128.346 91.4062 128.377 91.2812C128.596 90.4062 128.705 89.2188 128.705 87.7188V83.5C128.705 81.3438 128.377 79.7344 127.721 78.6719C127.096 77.6094 126.08 77.0781 124.674 77.0781C123.799 77.0781 123.064 77.2344 122.471 77.5469C121.877 77.8594 121.486 78.4219 121.299 79.2344C121.299 79.5156 121.314 79.8906 121.346 80.3594C121.377 80.7969 121.393 81.4688 121.393 82.375V87.0156C121.393 89.0781 121.502 90.5 121.721 91.2812C121.783 91.4062 122.002 91.5625 122.377 91.75C122.783 91.9375 123.205 92.1094 123.643 92.2656C124.08 92.3906 124.393 92.4531 124.58 92.4531C124.643 92.4531 124.689 92.5781 124.721 92.8281C124.752 93.0781 124.768 93.3438 124.768 93.625C124.768 93.9062 124.736 94.0938 124.674 94.1875C124.486 94.1875 124.127 94.1562 123.596 94.0938C123.064 94.0625 122.455 94.0312 121.768 94C121.111 93.9375 120.471 93.8906 119.846 93.8594C119.221 93.8281 118.721 93.8125 118.346 93.8125C117.846 93.8125 117.143 93.8438 116.236 93.9062C115.33 93.9688 114.455 94.0156 113.611 94.0469C112.799 94.1094 112.268 94.1562 112.018 94.1875C111.893 94.0625 111.83 93.7344 111.83 93.2031C111.83 92.7031 111.893 92.4531 112.018 92.4531C112.268 92.4531 112.611 92.3906 113.049 92.2656C113.518 92.1094 113.939 91.9375 114.314 91.75C114.721 91.5625 114.939 91.4062 114.971 91.2812C115.189 90.4062 115.299 89.2188 115.299 87.7188V83.5C115.299 81.1875 114.971 79.5469 114.314 78.5781C113.689 77.5781 112.674 77.0781 111.268 77.0781C110.299 77.0781 109.518 77.2656 108.924 77.6406C108.33 77.9844 108.033 78.4844 108.033 79.1406V87.0156C108.033 89.0781 108.143 90.5 108.361 91.2812C108.424 91.4062 108.643 91.5625 109.018 91.75C109.393 91.9375 109.799 92.1094 110.236 92.2656C110.674 92.3906 110.971 92.4531 111.127 92.4531C111.189 92.4531 111.236 92.5781 111.268 92.8281C111.299 93.0781 111.314 93.3438 111.314 93.625C111.314 93.9062 111.283 94.0938 111.221 94.1875C110.971 94.1562 110.439 94.1094 109.627 94.0469C108.814 94.0156 107.955 93.9688 107.049 93.9062C106.174 93.8438 105.486 93.8125 104.986 93.8125C104.611 93.8125 104.096 93.8281 103.439 93.8594C102.814 93.8906 102.158 93.9375 101.471 94C100.783 94.0312 100.174 94.0625 99.6425 94.0938C99.1113 94.1562 98.7519 94.1875 98.5644 94.1875ZM149.506 94.3281C147.6 94.3281 145.834 93.8438 144.209 92.875C142.616 91.9062 141.334 90.6094 140.366 88.9844C139.428 87.3594 138.959 85.5781 138.959 83.6406C138.959 81.6406 139.381 79.8438 140.225 78.25C141.1 76.6562 142.303 75.3906 143.834 74.4531C145.366 73.5156 147.131 73.0469 149.131 73.0469C151.1 73.0469 152.772 73.5156 154.147 74.4531C155.553 75.3594 156.616 76.5 157.334 77.875C158.084 79.2188 158.459 80.5781 158.459 81.9531C158.459 82.6719 158.303 83.1406 157.991 83.3594C157.709 83.5781 157.131 83.6875 156.256 83.6875H145.663C145.475 83.6875 145.381 83.7969 145.381 84.0156C145.381 85.1406 145.584 86.2031 145.991 87.2031C146.428 88.2031 147.053 89.0156 147.866 89.6406C148.709 90.2656 149.725 90.5781 150.913 90.5781C151.975 90.5781 152.959 90.4219 153.866 90.1094C154.491 89.9219 154.975 89.75 155.319 89.5938C155.663 89.4375 155.975 89.2656 156.256 89.0781C156.569 88.8594 156.928 88.5938 157.334 88.2812C157.616 88.4062 157.756 88.7031 157.756 89.1719C157.756 89.5781 157.694 89.8906 157.569 90.1094C157.381 90.6094 156.881 91.1875 156.069 91.8438C155.288 92.5 154.319 93.0781 153.163 93.5781C152.038 94.0781 150.819 94.3281 149.506 94.3281ZM145.709 81.1094H151.663C152.1 81.1094 152.319 80.8125 152.319 80.2188C152.319 79.0312 151.991 77.9688 151.334 77.0312C150.709 76.0938 149.897 75.625 148.897 75.625C147.991 75.625 147.272 75.9531 146.741 76.6094C146.241 77.2344 145.881 77.9375 145.663 78.7188C145.475 79.5 145.381 80.1406 145.381 80.6406C145.381 80.9531 145.491 81.1094 145.709 81.1094ZM164.307 94.5156C163.151 94.5156 162.276 94.1406 161.682 93.3906C161.089 92.6406 160.792 91.8281 160.792 90.9531C160.792 90.0781 161.073 89.2812 161.636 88.5625C162.198 87.8438 163.057 87.4844 164.214 87.4844C165.151 87.4844 165.948 87.8281 166.604 88.5156C167.292 89.1719 167.636 89.9688 167.636 90.9062C167.636 91.875 167.307 92.7188 166.651 93.4375C166.026 94.1562 165.245 94.5156 164.307 94.5156Z"
        fill="black"
      />
    </svg>
  );
};
