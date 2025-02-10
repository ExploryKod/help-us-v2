import PageCanvas from "../PageCanvas";

 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageCanvas>{children}</PageCanvas>
    </>
  );
}