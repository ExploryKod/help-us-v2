import React from "react";
import SideNavLink from "./SideNavLink";

interface SideNavSectionProps {
  title: string;
  links: Array<{
    id: string;
    label: string;
    route?: string;
    icon: React.ReactNode;
    badge?: number;
    onClick?: () => void;
  }>;
}

const SideNavSection: React.FC<SideNavSectionProps> = ({ title, links }) => {

  return (
    <div className="section">
      <h4 className={`overflow-hidden section-title`}>
        {title}
      </h4>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <SideNavLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default SideNavSection;
