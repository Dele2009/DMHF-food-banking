export default function PulsatingElement({
  children,
  className,
  shadowColor,
}: {
  children?: React.ReactNode;
  className?: string;
  shadowColor?: string;
}) {
  return (
    <div
      className={`w-fit h-fit pulsate-shadow ${className}`}
      style={{ "--shadow-color": shadowColor } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
