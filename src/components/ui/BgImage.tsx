import React from "react";

export type bgImageProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> & {
     children: React.ReactNode;
     src: string;
     size?: "cover" | "contain";
     repeat?: boolean;
};


export default function BgImage({
  children,
  className,
  src,
  size = "cover",
     repeat = false,
  ...props
}: bgImageProps) {
  return (
    <div
      {...props}
      className={`relative ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: size,
        backgroundRepeat: repeat ? "repeat" : "no-repeat",
      }}
    >
      <div className="absolute top-0 w-full h-full bg-black/20 dark:bg-black/50  !z-10" />
      <div className="relative !z-30">{children}</div>
    </div>
  );
}
