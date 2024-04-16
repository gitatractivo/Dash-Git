import { prisma } from '@/lib/prisma';
import PackageCreate from './_components/PackageCreate';

export default async function Page() {
  // const companies = await prisma.company.findMany();
  const students = await prisma.user.findMany();

  return (
    <div>
      <h1>Create Package</h1>
      <PackageCreate  students={students} />
    </div>
  );
}