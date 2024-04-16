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
import { createCourseSchema } from '@/lib/schema'
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
type Props = {
  students: User[];
}
import { useFormState } from "react-dom"
import { createCourseAction } from '@/app/actions'
import { toast } from 'sonner'
import { User } from '@prisma/client'
import { Loader2 } from 'lucide-react'

const CourseCreate = ({ students }: Props) => {

  const form = useForm<z.infer<typeof createCourseSchema>>({
    resolver: zodResolver(createCourseSchema),
  })

  async function onSubmit(values: z.infer<typeof createCourseSchema>) {
    console.log("hello")
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });
    const resp = await createCourseAction(formData)
    console.log(resp)
    if (resp.success) {
      toast.success("Course created")
    }
    else {
      toast.error(resp.errors?.map((e) => e.message).join(", "))
    }
  }


  return (
    <div className='flex flex-col gap-3'>Add Course
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (inval) => {
          console.log("inval", inval)
        })} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Course name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         
         
          <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting&& <Loader2 className='animate-spin'/>}Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default CourseCreate