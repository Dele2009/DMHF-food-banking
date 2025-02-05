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
      className={className}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: size,
        backgroundRepeat: repeat ? "repeat" : "no-repeat",
      }}
    >
      {children}
    </div>
  );
}
