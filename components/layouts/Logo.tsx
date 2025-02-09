import React, { memo } from "react";
import Image from 'next/image'
interface LogoProps {
  logoSrc?: string;
  logoAlt?: string;
}

// eslint-disable-next-line react/display-name
const Logo: React.FC<LogoProps> = memo(({
  logoSrc = "/logo.svg",
  logoAlt = "Logo"
}) => {
  return (
    <div className={`flex items-center justify-center max-h-20 w-36 mx-auto`}>
      <Image
        src={logoSrc}
        alt={logoAlt}
        aria-label={logoAlt}
        width={10}
        height={10}
        loading="lazy"
        className="object-contain w-full h-full"
      />
    </div>
  );
});

export default Logo;
