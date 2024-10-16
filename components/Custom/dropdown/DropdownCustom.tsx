import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuPortal,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger
} from '../../ui/dropdown-menu'

interface SubMenuItem {
   label?: string
   icon?: JSX.Element
   onClick?: () => void
   separator?: boolean
}

// Define o tipo para um item de menu principal
interface MenuItem {
   label?: string
   icon?: JSX.Element
   shortcut?: string
   onClick?: () => void
   disabled?: boolean
   separator?: boolean
   subItems?: SubMenuItem[] // Permite subitens
}

interface Menu {
   children: JSX.Element
   items: MenuItem[]
}

// Componente para renderizar um item de menu
const DropdownMenuItemCustom = ({ item }: { item: MenuItem }) => {
   return (
      <DropdownMenuItem
         onClick={item.onClick}
         disabled={item.disabled}
      >
         {item.icon && item.icon}
         <span>{item.label}</span>
         {item.shortcut && (
            <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
         )}
      </DropdownMenuItem>
   )
}

// Componente para renderizar um submenu, se necessário
const DropdownMenuSubCustom = ({ item }: { item: MenuItem }) => {
   if (!item.subItems) return <></>
   return (
      <DropdownMenuSub>
         <DropdownMenuSubTrigger>
            {item.icon && item.icon}
            <span>{item.label}</span>
         </DropdownMenuSubTrigger>
         <DropdownMenuPortal>
            <DropdownMenuSubContent>
               {item.subItems.map((subItem, index) =>
                  subItem.separator ? (
                     <DropdownMenuSeparator key={index} />
                  ) : (
                     <DropdownMenuItemCustom
                        key={index}
                        item={subItem}
                     />
                  )
               )}
            </DropdownMenuSubContent>
         </DropdownMenuPortal>
      </DropdownMenuSub>
   )
}

// Componente para renderizar todo o menu
export const DropdownMenuCustom = ({ children, items }: Menu) => {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
         <DropdownMenuContent className="w-56">
            {items.map((item, index) =>
               item.separator ? (
                  <DropdownMenuSeparator key={index} />
               ) : item.subItems ? (
                  <DropdownMenuSubCustom
                     key={index}
                     item={item}
                  />
               ) : (
                  <DropdownMenuItemCustom
                     key={index}
                     item={item}
                  />
               )
            )}
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
