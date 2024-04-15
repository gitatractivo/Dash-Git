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
import { createUserSchema } from '@/lib/schema'
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
type Props = {}
import { useFormState } from "react-dom"
import { createUserAction } from '@/app/actions'
import { toast } from 'sonner'

const UserCreate = (props: Props) => {
 
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues:{
      role:"STUDENT"
    }
    
  })

  async function onSubmit(values: z.infer<typeof createUserSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(typeof values)
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string|Blob);
    });
    const resp = await createUserAction(formData)
    if (resp.success){
      toast.success("User created")
    }
    else{
      toast.error(resp.errors?.map((e)=>e.message).join(", "))
    }
    // console.log(resp
  }
  return (
    <div className='flex flex-col gap-3'>Add user
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit,(inval)=>{
          console.log("inval", inval)
        })} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" type="email" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your email.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone"  {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your email.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="regNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <Input placeholder="regNo" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Role</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Role" >
                        {field.value[0]+field.value.slice(1).toLowerCase()}
                      </SelectValue>
                    </SelectTrigger>

                  </FormControl>
                 
                  <SelectContent>
                    <SelectItem value="STUDENT">Student</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="FACULTY">Faculty</SelectItem>
                  </SelectContent>
                </Select>
                <FormControl>
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" >Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default UserCreate
