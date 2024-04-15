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
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { createAnnouncementSchema } from '@/lib/schema'
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
type Props = {
  users: User[];
}
import { useFormState } from "react-dom"
import { createAnnouncementAction } from '@/app/actions'
import { toast } from 'sonner'
import { User } from '@prisma/client'

const AnnouncementCreate = ({ users }: Props) => {

  const form = useForm<z.infer<typeof createAnnouncementSchema>>({
    resolver: zodResolver(createAnnouncementSchema),
  })

  async function onSubmit(values: z.infer<typeof createAnnouncementSchema>) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });
    const resp = await createAnnouncementAction(formData)
    if (resp.success) {
      toast.success("Announcement created")
    }
    else {
      toast.error(resp.errors?.map((e) => e.message).join(", "))
    }
  }

  return (
    <div className='flex flex-col gap-3'>Add Announcement
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (inval) => {
          console.log("inval", inval)
        })} className="space-y-8">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
                <FormControl>
                  <Textarea placeholder="Announcement text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="for"
            render={({ field }) => (
              <FormItem>
                <FormLabel>For</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="STUDENT">Student</SelectItem>
                    <SelectItem value="FACULTY">Faculty</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default AnnouncementCreate