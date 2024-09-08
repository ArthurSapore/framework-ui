import { z } from 'zod'

import { FormFieldCustom } from '@/components/Custom/FormField/FormFieldCustom'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
   email: z.string().email(),
   password: z.string().min(8, {
      message: 'Password must be at least 28 characters'
   })
})

type AuthTP = z.infer<typeof formSchema>

export const Auth = (): JSX.Element => {
   const form = useForm<AuthTP>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: ''
      }
   })

   // 2. Define a submit handler.
   function onSubmit(data: AuthTP) {
      const dto: AuthTP = {
         email: data.email,
         password: data.password
      }
      console.log(dto)
   }

   const authRequest = axios({
      url: '',
      method: 'GET'
   })

   const queryRequest = useQuery({
      queryKey: ['authRequest'],
      queryFn: authRequest
   })

   return (
      <div className="flex items-center justify-center w-screen h-screen bg-primary-foreground">
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-8"
            >
               <FormFieldCustom
                  formController={form.control}
                  label="Email"
                  name="email"
                  placeholder="Email"
                  description={'Teste'}
               />

               <FormFieldCustom
                  formController={form.control}
                  label="Password"
                  name="password"
                  placeholder="Password"
               />
               <Button type="submit">Submit</Button>
            </form>
         </Form>
      </div>
   )
}
