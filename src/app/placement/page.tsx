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

const gender = Object.keys(Gender).map(key => {
  return { id: key, label: key }
})

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
    <div className="w-full h-[100vh] max-w-[800px] mx-auto flex flex-col items-center justify-center mt-[80px] md:mt-0">
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
      <Sheet>
        <SheetTrigger className="fixed bottom-4 right-4 md:bottom-14 bg-white md:right-14 border border-black p-4 rounded-lg hover:bg-gray-100 font-semibold">Add Student</SheetTrigger>
        <SheetContent side="bottom" className="h-fit">
          <SheetHeader>
            <SheetTitle>Add Student Details</SheetTitle>
            <SheetDescription>
              Add a new student details who got placed.
            </SheetDescription>
            <Form {...Formf}>
              <form onSubmit={Formf.handleSubmit(onSubmit)} className="space-y-1 ">
                <FormField
                  control={Formf.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={Formf.control}
                  name="regNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration No</FormLabel>
                      <FormControl>
                        <Input placeholder="Registration No" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={Formf.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={Formf.control}
                  name="package"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package</FormLabel>
                      <FormControl>
                        <Input placeholder="Amount" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={Formf.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input placeholder="Age" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={Formf.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Gender</FormLabel>
                      </div>
                      {gender.map((item) => (
                        <FormItem key={item.id} className="flex items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value === item.id}
                              onCheckedChange={(checked) => {
                                field.onChange(checked ? item.id : undefined);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item.label}</FormLabel>
                        </FormItem>
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={Formf.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter 10 digit number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={Formf.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={Formf.control}
                  name="cgpa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cgpa</FormLabel>
                      <FormControl>
                        <Input placeholder="Cgpa" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </SheetHeader>
        </SheetContent>
      </Sheet>

    </div>


  );
}

export default Page