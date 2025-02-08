import { MenuOutlined } from "@ant-design/icons";
import React from "react";

interface SidebarProps {
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setSidebarOpen }) => {
  // const user = useAppSelector(selectUser);

  return (


    <header className="flex items-center justify-between p-4 bg-white shadow">
      {/* Bouton hamburger visible uniquement en mobile */}
      <button onClick={() => setSidebarOpen(true)} className="p-2 md:hidden">
        <MenuOutlined className="text-2xl" />
      </button>

      {/* Titre de l'application centré sur les écrans larges */}
      {/* <h1 className="text-lg text-jb-primary font-semibold flex-1 text-center md:text-left">
        Bienvenue {user?.firstName} {user?.lastName} !
      </h1> */}
      <div className="flex items-center justify-end w-full max-w-screen-xl px-4 mx-auto">
        {/* <UserBar /> */}
      </div>
    </header>
  );
};

export default Sidebar;
