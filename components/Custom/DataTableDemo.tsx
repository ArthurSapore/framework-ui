import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   VisibilityState,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable
} from '@tanstack/react-table'
import * as React from 'react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Table } from '../ui/table'
import { TableColumnsControl } from './Table/components/TableColumnsControl'
import { TableInputFilter } from './Table/components/TableInputFilter'
import { TablePagination } from './Table/components/TablePagination'
import { TableSelectedRowsHelper } from './Table/components/TableSelectedRowsHelper'
import { TableProvider } from './Table/context/TableContext'
import { TableBodyCustom } from './Table/table-body/TableBodyCustom'
import { TableHeaderCustom } from './Table/table-header/TableHeaderCustom'

const data: Payment[] = [
   {
      id: 'm5gr84i9',
      amount: 316,
      status: 'success',
      email: 'ken99@yahoo.com'
   },
   {
      id: '3u1reuv4',
      amount: 242,
      status: 'success',
      email: 'Abe45@gmail.com'
   },
   {
      id: 'derv1ws0',
      amount: 837,
      status: 'processing',
      email: 'Monserrat44@gmail.com'
   },
   {
      id: '5kma53ae',
      amount: 874,
      status: 'success',
      email: 'Silas22@gmail.com'
   },
   {
      id: 'bhqecj4p',
      amount: 721,
      status: 'failed',
      email: 'carmella@hotmail.com'
   }
]

export type Payment = {
   id: string
   amount: number
   status: 'pending' | 'processing' | 'success' | 'failed'
   email: string
}

export const columns: ColumnDef<Payment>[] = [
   {
      id: 'select',
      header: ({ table }) => (
         <Checkbox
            checked={
               table.getIsAllPageRowsSelected() ||
               (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
               table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
         />
      ),
      cell: ({ row }) => (
         <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
         />
      ),
      enableSorting: false,
      enableHiding: false
   },
   {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
         <div className="capitalize">{row.getValue('status')}</div>
      )
   },
   {
      accessorKey: 'email',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
            >
               Email
               <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
         )
      },
      cell: ({ row }) => (
         <div className="lowercase">{row.getValue('email')}</div>
      )
   },
   {
      accessorKey: 'amount',
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
         const amount = parseFloat(row.getValue('amount'))

         // Format the amount as a dollar amount
         const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
         }).format(amount)

         return <div className="text-right font-medium">{formatted}</div>
      }
   },
   {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
         const payment = row.original

         return (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     variant="ghost"
                     className="h-8 w-8 p-0"
                  >
                     <span className="sr-only">Open menu</span>
                     <DotsHorizontalIcon className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                     onClick={() => navigator.clipboard.writeText(payment.id)}
                  >
                     Copy payment ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View customer</DropdownMenuItem>
                  <DropdownMenuItem>View payment details</DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         )
      }
   }
]

export function DataTableDemo() {
   const [sorting, setSorting] = React.useState<SortingState>([])
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      []
   )
   const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({})
   const [rowSelection, setRowSelection] = React.useState({})

   const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
         sorting,
         columnFilters,
         columnVisibility,
         rowSelection
      }
   })

   return (
      <TableProvider table={table}>
         <div className="w-full">
            <div className="flex items-center py-4">
               <TableInputFilter />
               <TableColumnsControl />
            </div>
            <Table className="rounded-md border">
               <TableHeaderCustom />
               <TableBodyCustom />
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4">
               <TableSelectedRowsHelper />
               <TablePagination />
            </div>
         </div>
      </TableProvider>
   )
}
