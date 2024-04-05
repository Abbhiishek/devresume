export function TypographyH1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-semibold tracking-tight first:mt-0 ${className}`}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}

export function TypographyP({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`leading-0 ${className}`}>{children}</p>;
}

export function TypographyBlockquote({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
}

export function TypographyInlineCode({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}

export function TypographyLead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-xl text-muted-foreground ${className}`}>{children}</p>
  );
}

export function TypographyLarge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`text-lg font-semibold ${className}`}>{children}</div>;
}

export function TypographySmall({ children }: { children: React.ReactNode }) {
  return <small className="text-sm font-medium leading-none">{children}</small>;
}

export function TypographyMuted({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

export function TypographyList({
  children,
  liststyle,
}: {
  children: React.ReactNode;
  liststyle?: string;
}) {
  return (
    <ul className={`ml-6  ${liststyle ? liststyle : 'list-disc'} [&>li]:mt-2`}>
      {children}
    </ul>
  );
}

export function TypographyListItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return <li>{children}</li>;
}
