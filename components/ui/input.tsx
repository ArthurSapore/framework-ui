import { EyeIcon, EyeOffIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ className, type, ...props }, ref) => {
      return (
         <input
            type={type}
            className={cn(
               'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
               className
            )}
            ref={ref}
            {...props}
         />
      )
   }
)

Input.displayName = 'Input'

interface InputComposition
   extends React.ForwardRefExoticComponent<
      InputProps & React.RefAttributes<HTMLInputElement>
   > {
   Password: typeof InputPassword
}

const InputPassword = React.forwardRef<HTMLInputElement>(({ ...props }) => {
   const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
   const inputRef = React.useRef<HTMLInputElement>(null)
   const removePasswordTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
      null
   )

   const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev)

      removePasswordTimeoutRef.current = setTimeout(() => {
         if (inputRef.current) {
            inputRef.current.focus()
            const length = inputRef.current.value.length
            inputRef.current.setSelectionRange(length, length)
         }
      })
   }

   React.useEffect(() => {
      return () => {
         if (removePasswordTimeoutRef.current) {
            clearTimeout(removePasswordTimeoutRef.current)
         }
      }
   }, [])

   return (
      <div className="relative w-full">
         <Input
            type={isPasswordVisible ? 'text' : 'password'}
            ref={inputRef}
            {...props}
         />
         <button
            type="button"
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
         >
            {isPasswordVisible ? <EyeIcon size={15} /> : <EyeOffIcon size={15} />}
         </button>
      </div>
   )
})

InputPassword.displayName = 'InputPassword'

const InputWithComposition = Input as InputComposition
InputWithComposition.Password = InputPassword

export { InputWithComposition as Input }
