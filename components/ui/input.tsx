import { EyeIcon, EyeOffIcon } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface InputProps
   extends React.InputHTMLAttributes<HTMLInputElement> {}

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

const InputPassword = React.forwardRef<HTMLInputElement>(
   ({ ...props }, ref) => {
      const [isEyeOpen, setIsEyeOpen] = React.useState(false)

      return (
         <div className="relative w-full">
            <input
               type={isEyeOpen ? 'text' : 'password'}
               className={cn(
                  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
               )}
               ref={ref}
               {...props}
            />
            <button
               type="button"
               aria-label={isEyeOpen ? 'Hide password' : 'Show password'}
               onClick={() => setIsEyeOpen((prev) => !prev)}
               className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-600"
            >
               {isEyeOpen ? <EyeIcon size={15} /> : <EyeOffIcon size={15} />}
            </button>
         </div>
      )
   }
)

InputPassword.displayName = 'InputPassword'

export default InputPassword

Input.displayName = 'Input'
InputPassword.displayName = 'Input.Password'

export { Input, InputPassword }
