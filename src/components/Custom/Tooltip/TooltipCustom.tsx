import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger
} from '@/components/ui/tooltip'
import { TooltipProps } from '@radix-ui/react-tooltip'

interface IProps extends TooltipProps {
   trigger?: JSX.Element
   content?: JSX.Element
}
export const TooltipCustom = ({
   content,
   trigger,
   ...props
}: IProps): JSX.Element => {
   if (!content?.props?.children) {
      return <></> // Não renderiza o Tooltip se não houver conteúdo
   }
   return (
      <TooltipProvider>
         <Tooltip
            {...props}
            delayDuration={200}
         >
            <TooltipTrigger asChild>{trigger}</TooltipTrigger>
            <TooltipContent>{content}</TooltipContent>
         </Tooltip>
      </TooltipProvider>
   )
}
