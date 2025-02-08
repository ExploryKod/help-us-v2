import React from "react";
import { getSidebarLinks, SidebarSection } from "./SideNavLinksConfig";
import { CloseOutlined } from "@ant-design/icons"; // Import icon for close button
import Logo from "../Logo";
import SideNavSection from "./SideNavSection";
import SideNavFooter from "./SideNavFooter";
import { useSession } from "next-auth/react";

interface SideNavProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const SideNav: React.FC<SideNavProps> = ({ sidebarOpen, setSidebarOpen }) => (
  <div>
    {/* Overlay pour le mobile */}
    {sidebarOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={() => setSidebarOpen(false)}
      ></div>
    )}
    <SideNavContent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  </div>
);

const SideNavContent: React.FC<SideNavProps> = ({ sidebarOpen, setSidebarOpen }) => {

    const { data: session, update } = useSession()
  

  const sidebarSections: SidebarSection[] = getSidebarLinks(session?.user?.role!);

  return (
    <aside
      id="sidebar"
      className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-96`}
    >
      {/* Bouton de fermeture en haut à droite */}
      {sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none md:hidden"
          aria-label="Fermer la sidebar"
        >
          <CloseOutlined className="text-2xl" />
        </button>
      )}

      <nav className="sidebar border-r pt-10"> {/* Ajuste le padding-top pour le logo */}
        <Logo />
        <hr className="my-4" />

        <ul className="flex-1 px-3">
          {sidebarSections.map((section) => (
            <SideNavSection key={section.title} title={section.title} links={section.links} />
          ))}
        </ul>

        <SideNavFooter />
      </nav>
    </aside>
  );
};

export default SideNav;
