"use client"; // Assurez-vous que ce composant est un Client Component

import { Badge } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 🔥 Importation du hook Next.js
import React, { ReactNode } from "react";

interface SidebarLinkType {
  link: {
    id: string;
    label: string;
    route?: string;
    icon: ReactNode;
    badge?: number;
    onClick?: () => void;
  };
}

const SideNavLink: React.FC<SidebarLinkType> = ({ link }) => {
  const pathname = usePathname(); // 🔥 Récupère l'URL actuelle
  const isActive = pathname === link.route; // 🔥 Compare avec le lien actuel

  const linkClasses = `nav-link flex items-center justify-between ${isActive ? "active text-blue-500 font-bold" : ""}`;

  return (
    <Link href={link.route || "#"} className={linkClasses} onClick={link.onClick}>
      <div className="flex items-center space-x-3">
        <span className="icon">{link.icon}</span>
        <span className="link-label">{link.label}</span>
      </div>
      {link.badge !== undefined && (
        <Badge
          showZero={false}
          className={`text-xs px-2 py-1 ${isActive && link.id === "cart" ? "text-jb-primary" : "text-white"}`}
          count={link.badge}
        />
      )}
    </Link>
  );
};

export default SideNavLink;
