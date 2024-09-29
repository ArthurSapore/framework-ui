import React from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from '../../../ui/form'

interface IProps<TFieldValues extends FieldValues> {
   formController: Control<TFieldValues> // Tipo correto para `form`
   label: string
   placeholder: string
   description?: string
   name: FieldPath<TFieldValues>
   children: JSX.Element
}

export const FormFieldCustom = <TFieldValues extends FieldValues>({
   formController,
   label,
   placeholder,
   description,
   name,
   children
}: IProps<TFieldValues>): JSX.Element => {
   return (
      <FormField
         control={formController}
         name={name}
         render={({ field }) => (
            <FormItem>
               <div className="flex justify-between">
                  <FormLabel>{label}</FormLabel>
                  <FormDescription>{description}</FormDescription>
               </div>
               <FormControl>
                  {React.cloneElement(children as React.ReactElement, {
                     ...field,
                     value: field.value || '',
                     placeholder: placeholder
                  })}
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   )
}
