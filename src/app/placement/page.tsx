"use client"
import React, { useEffect, useState } from 'react'
import { data, Employee } from "@/lib/data"
type Props = {}
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"

import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Checkbox } from "@/components/ui/checkbox"


import { Input } from "@/components/ui/input"
import { Gender } from '@prisma/client';
import prisma from '@/lib/prisma';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  package: z.string(),
  gender: z.nativeEnum(Gender),
  phone: z.string().min(10, {
    message: "Number must be 10 digits.",
  }).max(10, { message: "Number must be 10 digits.", }),
  company: z.string().min(2).max(50),
  cgpa: z.number(),
  email: z.string().email(),
  regNo: z.string()

})

// function ProfileForm() {
// 1. Define your form.
export type PackageFormValues = z.infer<typeof formSchema>

const gender = [{
  id: "MALE",
  label: "MALE"
}, {
  id: "FEMALE",
  label: "FEMALE"
}]

interface Package {
  id: string;
  companyId: string;
  userId: string;
  salary: number;
  company: {
    id: string;
    name: string;
    location?: string;
  };
  user: {
    id: string;
    email: string;
    name?: string;
    gender?:any;
    phone:any;
  };
}
const Page = (props: Props) => {


  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/placements/getPackage");
        const data = await response.json();
        console.log(data)
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);



  const Formf = useForm<PackageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (formValues: PackageFormValues) => {
    try {
      console.log("hello from frontend")
      const response = await fetch('/api/placements/package', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (data.success) {
        console.log('New package created:', data.package);
        // Handle success case
      } else {
        console.error(data.error);
        // Handle error case
      }
    } catch (error) {
      console.error('Error creating package:', error);
    }
  };
  // }

  // const form = useForm()

  return (
    <div className="w-full h-fit min-h-[50vh] max-w-[800px] mx-auto flex flex-col items-center justify-center mt-[80px] md:mt-0">
      <Table>
        <TableCaption>Placement Data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Company</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages?.map((pack, id) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{pack.user.name}</TableCell>
              <TableCell>{pack.salary}</TableCell>
              <TableCell className="text-right">{pack.user.gender}</TableCell>
              <TableCell className="text-right">{pack.user.phone}</TableCell>
              <TableCell>{pack.company.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
  

    </div>


  );
}

export default Page