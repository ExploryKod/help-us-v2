"use client";

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Space, Typography } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { use, useMemo } from "react";

const { Text } = Typography;

const UserBar: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log("session", session);
  
  const signout = () => {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/signin`
    })
  }
  
  // méthode pour avoir les initiales du prénom et du nom du user
  const getInitials = (name: string) => {
    if(!name) return "";
    const names = name.split(" ");
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };
  
  // générer une couleur aléatoire pour l'avatar (une seule fois)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const avatarColor = useMemo(() => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }, []); // La couleur est générée une seule fois

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      onClick: () => router.push('/profile'),
      label: (
        <Space>
          <Avatar
            style={{
              backgroundColor: avatarColor,
              verticalAlign: 'middle',
            }}
            size="small"
          >
            {getInitials(session?.user?.name!)}
          </Avatar>
          <Text strong>
            {session?.user?.name}
          </Text>
        </Space>
      ),
    },
    { type: 'divider' }, // Diviseur entre les éléments
    {
      key: 'email',
      label: <Text type="secondary">
        {session?.user?.email}
      </Text>,
      disabled: true,
    },
    {
      key: 'logout',
      label: (
        <div
          onClick={signout}
          style={{ display: 'flex', alignItems: 'center' }}>
          <LogoutOutlined />
          <span style={{ marginLeft: '8px' }}>Déconnexion</span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex space-x-2">
      <Dropdown menu={{ items }} placement="bottomRight" trigger={['hover']}>
        {session?.user && (
            <Avatar
                style={{ backgroundColor: avatarColor }}
                size="large"
            >

              {session.user.firstName && session.user.lastName ?
                  session.user.firstName[0] + session.user.lastName[0] :
                  session.user.name[0] + session.user.name[1]}
            </Avatar>
        )}
      </Dropdown>
    </div>
  );
};

export default UserBar;
