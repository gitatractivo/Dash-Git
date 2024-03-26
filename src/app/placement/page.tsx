"use client"
import React from 'react'
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



const Page = (props: Props) => {

  const gender = [
    {
      id: "male",
      label: "Male",
    },
    {
      id: "female",
      label: "Female",
    }
  ] as const

  const formSchema:any = z.object({
    name: z.string().min(2).max(50),
    package: z.string(),
    age: z.number(),
    gender: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
    phone: z.string().min(10, {
      message: "Number must be 10 digits.",
    }).max(10,{message: "Number must be 10 digits.",}),
    company: z.string().min(2).max(50),
    cgpa: z.number(),


  })

  // function ProfileForm() {
  // 1. Define your form.
  const Formf = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
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
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Cgpa</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.name}</TableCell>
              <TableCell>{invoice.package}</TableCell>
              <TableCell>{invoice.age}</TableCell>
              <TableCell className="text-right">{invoice.gender}</TableCell>
              <TableCell className="text-right">{invoice.phone}</TableCell>
              <TableCell>{invoice.company}</TableCell>
              <TableCell>{invoice.cgpa}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="w-full">
          <TableRow className="w-full">
            <TableCell colSpan={6}>Total</TableCell>
            <TableCell className="">{data.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Sheet>
        <SheetTrigger className="fixed bottom-4 right-4 md:bottom-14 bg-white md:right-14 border border-black p-4 rounded-lg hover:bg-gray-100 font-semibold">Add Student</SheetTrigger>
        <SheetContent side="top" className="h-fit">
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
                <FormField
                  control={Formf.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input placeholder="Age" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={Formf.control}
                  name="gender"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Gender</FormLabel>
                      </div>
                      {gender.map((item) => (
                        <FormField
                          key={item.id}
                          control={Formf.control}
                          name="gender"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex  items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([field.value, item.id])
                                        : field.onChange(
                                          field.value?.filter(
                                            (value:any) => value !== item.id
                                          )
                                        )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
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
                        <Input placeholder="Cgpa" {...field} />
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