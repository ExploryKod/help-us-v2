import LayoutWrapper from "../layoutWrapper";
import GlobalModal from "@/components/ui/GlobalModal";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LayoutWrapper>{children}</LayoutWrapper>
      <GlobalModal />
    </>
  );
}