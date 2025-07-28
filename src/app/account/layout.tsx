import Layout from "@/components/Layout";
import StoreProvider from "@/redux/providers";

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <Layout>{children}</Layout>
    </StoreProvider>
  );
}
