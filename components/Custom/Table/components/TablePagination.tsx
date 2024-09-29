import { Button } from '@/zenith-ui/components/ui/button'
import { useTableContext } from '../context/TableContext'

export const TablePagination = () => {
   const { table } = useTableContext()
   return (
      <div className="space-x-2">
         <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
         >
            Previous
         </Button>
         <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
         >
            Next
         </Button>
      </div>
   )
}
