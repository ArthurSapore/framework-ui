import { Button } from '@/zenith-ui/components/ui/button'
import {
   DropdownMenuCheckboxItem,
   DropdownMenuContent
} from '@/zenith-ui/components/ui/dropdown-menu'
import {
   DropdownMenu,
   DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'
import { useTableContext } from '../context/TableContext'

export const TableColumnsControl = () => {
   const { table } = useTableContext()

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               variant="outline"
               className="ml-auto"
            >
               Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            {table
               .getAllColumns()
               .filter((column) => column.getCanHide())
               .map((column) => {
                  return (
                     <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                           column.toggleVisibility(!!value)
                        }
                     >
                        {column.id}
                     </DropdownMenuCheckboxItem>
                  )
               })}
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
