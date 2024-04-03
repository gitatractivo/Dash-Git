import * as React from "react"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"



export default function Page() {
    const router = useRouter();
    return (
        <div className="m-40">
        <Card className=" m-10 text-orange-400 border-orange-400 hover:scale-105 transition-all 0.5s ease-in-out cursor-pointer" onClick={() => {
            // router.push("/placement/createAnnouncement");
          }}>
            <CardHeader>
                <CardTitle>Create Announcement</CardTitle>
                <CardDescription>Create a new announcement</CardDescription>
            </CardHeader>
        </Card>
        <Card className=" m-10 text-orange-400 border-orange-400 hover:scale-105 transition-all 0.5s ease-in-out cursor-pointer">
            <CardHeader>
                <CardTitle>Create Google Form</CardTitle>
                <CardDescription>Create a new announcement</CardDescription>
            </CardHeader>
        </Card>
        <Card className=" m-10 text-orange-400 border-orange-400 hover:scale-105 transition-all 0.5s ease-in-out cursor-pointer">
            <CardHeader>
                <CardTitle>Checkout Prev Announcements</CardTitle>
                <CardDescription>Create a new announcement</CardDescription>
            </CardHeader>
        </Card>
        </div>

    )
}
