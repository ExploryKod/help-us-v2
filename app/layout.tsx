import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/auth-provider";
import ThemeProvider from "@/providers/theme-provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from 'antd';
import theme from '../theme/themeConfig';
import GlobalModal from "@/components/ui/GlobalModal";
import LayoutWrapper from "./LayoutWrapper";
import PageCanvas from "./PageCanvas";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Help Us",
  description: "Gestionnaire de dons en ligne",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AntdRegistry>
            <ConfigProvider theme={theme} >
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <LayoutWrapper><PageCanvas>{children}</PageCanvas></LayoutWrapper>
                <GlobalModal /> {/* La modal est maintenant accessible partout */}
                <Toaster />
              </ThemeProvider>
            </ConfigProvider>
          </AntdRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
