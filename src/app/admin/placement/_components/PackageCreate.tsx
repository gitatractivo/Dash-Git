"use client"
import React from 'react'

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
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { createPackageSchema } from '@/lib/schema'
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
type Props = {
  // companies: Company[];
  students: User[];
}
import { useFormState } from "react-dom"
import { createPackageAction } from '@/app/actions'
import { toast } from 'sonner'
import { Company, User } from '@prisma/client'
import { Loader2 } from 'lucide-react'

const PackageCreate = ({  students }: Props) => {

  const form = useForm<z.infer<typeof createPackageSchema>>({
    resolver: zodResolver(createPackageSchema),
  })

  async function onSubmit(values: z.infer<typeof createPackageSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });
    const resp = await createPackageAction(formData)
    if (resp.success) {
      toast.success("Package created")
    }
    else {
      toast.error(resp.errors?.map((e) => e.message).join(", "))
    }
  }

  return (
      <div className='flex flex-col gap-3'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (inval) => {
          console.log("inval", inval)
        })} className="space-y-8">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <Input  placeholder="Company Name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Salary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting && <Loader2 className='animate-spin' />}Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default PackageCreate