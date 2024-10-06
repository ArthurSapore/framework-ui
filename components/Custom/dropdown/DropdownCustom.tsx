import {
   Cloud,
   CreditCard,
   Github,
   Keyboard,
   LifeBuoy,
   LogOut,
   Mail,
   MessageSquare,
   Plus,
   PlusCircle,
   Settings,
   User,
   UserPlus
} from 'lucide-react'
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

export const menuItems: MenuItem[] = [
   {
      label: 'Profile',
      icon: <User className="mr-2 h-4 w-4" />,
      shortcut: '⇧⌘P',
      onClick: () => console.log('Profile clicked')
   },
   {
      label: 'Billing',
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      shortcut: '⌘B',
      onClick: () => console.log('Billing clicked')
   },
   {
      label: 'Settings',
      icon: <Settings className="mr-2 h-4 w-4" />,
      shortcut: '⌘S',
      onClick: () => console.log('Settings clicked')
   },
   {
      label: 'Keyboard shortcuts',
      icon: <Keyboard className="mr-2 h-4 w-4" />,
      shortcut: '⌘K',
      onClick: () => console.log('Keyboard shortcuts clicked')
   },
   {
      separator: true // Isso adiciona um separador
   },
   {
      label: 'Invite users',
      icon: <UserPlus className="mr-2 h-4 w-4" />,
      subItems: [
         {
            label: 'Email',
            icon: <Mail className="mr-2 h-4 w-4" />,
            onClick: () => console.log('Email clicked')
         },
         {
            label: 'Message',
            icon: <MessageSquare className="mr-2 h-4 w-4" />,
            onClick: () => console.log('Message clicked')
         },
         {
            separator: true
         },
         {
            label: 'More...',
            icon: <PlusCircle className="mr-2 h-4 w-4" />,
            onClick: () => console.log('More clicked')
         }
      ]
   },
   {
      label: 'New Team',
      icon: <Plus className="mr-2 h-4 w-4" />,
      shortcut: '⌘+T',
      onClick: () => console.log('New Team clicked')
   },
   {
      separator: true
   },
   {
      label: 'GitHub',
      icon: <Github className="mr-2 h-4 w-4" />,
      onClick: () => console.log('GitHub clicked')
   },
   {
      label: 'Support',
      icon: <LifeBuoy className="mr-2 h-4 w-4" />,
      onClick: () => console.log('Support clicked')
   },
   {
      label: 'API',
      icon: <Cloud className="mr-2 h-4 w-4" />,
      disabled: true
   },
   {
      separator: true
   },
   {
      label: 'Log out',
      icon: <LogOut className="mr-2 h-4 w-4" />,
      shortcut: '⇧⌘Q',
      onClick: () => console.log('Log out clicked')
   }
]
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
