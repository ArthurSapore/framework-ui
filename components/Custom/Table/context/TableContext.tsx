import { Table } from '@tanstack/react-table'
import { createContext, PropsWithChildren, useContext } from 'react'

interface TableContextProps<T> {
   table: Table<T>
}

const TableContext = createContext<TableContextProps<any> | null>(null)

export const useTableContext = () => {
   const context = useContext(TableContext)
   if (!context) {
      throw new Error('useTableContext must be used inside of TableProvider')
   }
   return context
}

interface TableProvider<T> extends PropsWithChildren {
   table: Table<T>
}

export const TableProvider = <T,>({ table, children }: TableProvider<T>) => {
   return (
      <TableContext.Provider value={{ table }}>
         {children}
      </TableContext.Provider>
   )
}
