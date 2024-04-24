
import { Button } from "@/components/ui/button"
import prisma from '@/lib/prisma';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ShowAnnouncements from "./_components/ShowAnnouncements";



export default async function Page() {
    const announcements = await prisma.announcement.findMany({
        where: {
            for: "STUDENT"
        },
        include:{
            user: {
                select: {
                    name: true,
                    email: true,
                    id: true

                }
            
            }
        }
    });
    return (
        <div className="m-40">
            <h1 className="text-4xl font-bold">Announcements</h1>
            <ShowAnnouncements announcements = {announcements} />
        </div>

    )
}
