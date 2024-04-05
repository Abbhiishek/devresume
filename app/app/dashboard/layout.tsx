import NavBar from '@/components/common/NavBar';
import SideNavBar from '@/components/dashboard/DashBoardSideNavBar';
import { APP_DESC, APP_NAME } from '@/lib/contants';

export const metadata = {
  title: `Dashboard - ${APP_NAME}`,
  description: APP_DESC,
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen">
      <NavBar />
      <div className="flex flex-col gap-5 p-2 mt-2 lg:container lg:mt-10 lg:flex-row ">
        <SideNavBar />
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
}
