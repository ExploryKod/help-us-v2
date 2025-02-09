import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/auth-provider";
import ThemeProvider from "@/providers/theme-provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LayoutWrapper from "./layoutWrapper";
import GlobalModal from "@/components/ui/GlobalModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HelpUs",
  description: "Sign-Up and Sign-In with Nextjs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AntdRegistry>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <LayoutWrapper>{children}</LayoutWrapper>
              <GlobalModal /> {/* La modal est maintenant accessible partout */}
              <Toaster />
            </ThemeProvider>
          </AntdRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
