import LayoutWrapper from "../layoutWrapper";
import GlobalModal from "@/components/ui/GlobalModal";
import {Toaster} from "@/components/ui/toaster";
import { StreamChatProvider } from "@/providers/stream-chat-provider";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <StreamChatProvider>
      <LayoutWrapper>{children}</LayoutWrapper>
      <GlobalModal />
      <Toaster />
    </StreamChatProvider>
  );
}