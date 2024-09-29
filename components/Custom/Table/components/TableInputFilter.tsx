import { Input } from '@/zenith-ui/components/ui/input'
import { useTableContext } from '../context/TableContext'

export const TableInputFilter = () => {
   const { table } = useTableContext()

   return (
      <Input
         placeholder="Filter emails..."
         value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
         onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
         }
         className="max-w-sm"
      />
   )
}
