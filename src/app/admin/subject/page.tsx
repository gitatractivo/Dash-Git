import { prisma } from '@/lib/prisma';
import SubjectCreate from './_components/SubjectCreate';

export default async function Page() {
  const courses = await prisma.course.findMany();
  const teachers = await prisma.user.findMany({ where: { role: 'TEACHER' } });

  return (
    <div>
      <h1>Create Subject</h1>
      <SubjectCreate courses={courses} teachers={teachers} />
    </div>
  );
}