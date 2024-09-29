import { useTableContext } from '../context/TableContext'

export const TableSelectedRowsHelper = () => {
   const { table } = useTableContext()

   return (
      <div className="flex-1 text-sm text-muted-foreground">
         {table.getFilteredSelectedRowModel().rows.length} of{' '}
         {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
   )
}
