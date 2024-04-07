import { NavProps, SideNav } from "./_components/side-nav";
import { Home } from 'lucide-react';

type Props = {}

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const links: NavProps["links"] = [
    {
      title: 'Dashboard',
      path: '/admin',
      icon: Home,
      variant: "default",

    },
    {
      title: 'Courses',
      path: '/admin/course',
      icon: Home,
      variant: "default",

    },

    {
      title: 'Announcements',
      path: '/admin/announcement',
      icon: Home,
      variant: "default",

    },
    {
      title: 'User',
      path: '/admin/user',
      icon: Home,
      variant: "default",

    },
    {
      title: 'Subject',
      path: '/admin/subject',
      icon: Home,
      variant: "default",

    },

  ]

  return (
    <div className="flex justify-between h-full absolute w-full">
      <SideNav isCollapsed={false} links={links} className=" group h-full bg-gray-300 flex flex-col gap-4 py-2 data-[collapsed=true]:py-2" />
      <div className="w-full  p-4  flex flex-col">

      {children}
      </div>


    </div>
  )
}

export default layout