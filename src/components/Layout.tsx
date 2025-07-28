import { Sidenav } from "@/components/Sidenav";

const Layout = async ({
  children,
}: {
  children: React.ReactNode | React.ReactElement;
}) => {

  return (
    <section className="flex sm:h-screen h-screen w-full overflow-hidden bg-[#f3f3f5]">
      <Sidenav />
      <main className="w-full relative overflow-y-auto">{children}</main>
    </section>
  );
};

export default Layout;
