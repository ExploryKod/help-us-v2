import React, { memo } from "react";
import Image from 'next/image'
import { useRouter } from 'next/navigation'
interface LogoProps {
  logoSrc?: string;
  logoAlt?: string;
}

// eslint-disable-next-line react/display-name
const Logo: React.FC<LogoProps> = memo(({
  logoSrc = "/logo.svg",
  logoAlt = "Logo"
}) => {
    const router = useRouter();

  return (
    <div className={`flex items-center justify-center max-h-20 w-36 mx-auto`}>
      <Image
          onClick={() => router.push('/')}
        src={logoSrc}
        alt={logoAlt}
        aria-label={logoAlt}
        width={10}
        height={10}
        loading="lazy"
        className="object-contain w-full h-full hover:opacity-75 transition-opacity duration-75 cursor-pointer"
      />
    </div>
  );
});

export default Logo;
