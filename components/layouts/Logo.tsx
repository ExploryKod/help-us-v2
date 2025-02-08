import React, { memo } from "react";

interface LogoProps {
  logoSrc?: string;
  logoAlt?: string;
}

// eslint-disable-next-line react/display-name
const Logo: React.FC<LogoProps> = memo(({
  logoSrc = "/logos/logo-min.png",
  logoAlt = "Logo"
}) => {
  return (
    <div className={`flex items-center justify-center w-36 mx-auto`}>
      <img
        src={logoSrc}
        alt={logoAlt}
        aria-label={logoAlt}
        loading="lazy"
        className="object-contain w-full h-full"
      />
    </div>
  );
});

export default Logo;
