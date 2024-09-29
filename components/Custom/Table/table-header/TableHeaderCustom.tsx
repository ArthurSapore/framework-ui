import {
   TableHead,
   TableHeader,
   TableRow
} from '@/zenith-ui/components/ui/table'
import { flexRender } from '@tanstack/react-table'
import { useTableContext } from '../context/TableContext'

export const TableHeaderCustom = () => {
   const { table } = useTableContext()

   return (
      <TableHeader>
         {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
               {headerGroup.headers.map((header) => {
                  return (
                     <TableHead key={header.id}>
                        {header.isPlaceholder
                           ? null
                           : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                             )}
                     </TableHead>
                  )
               })}
            </TableRow>
         ))}
      </TableHeader>
   )
}
