
import { prisma } from '@/lib/prisma';
import AnnouncementCreate from '../_components/AnnouncementCreate';


export default async function Page() {


  const users = await prisma.user.findMany();

  return (
    <div>
      
      <AnnouncementCreate users={users} />
    </div>
  );
}