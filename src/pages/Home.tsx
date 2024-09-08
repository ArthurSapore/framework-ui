import { ModeToggle } from '@/components/Custom/ModeToogle'
import { Badge } from '@/components/ui/badge'

export const Home = (): JSX.Element => {
   return (
      <div className=" h-screen w-screen bg-primary-foreground flex justify-center items-center">
         <ModeToggle />
         <Badge
            variant={'default'}
            className="bg-red-400"
         >
            Time A - vxMedical
         </Badge>
         <ReactQueryTest />
      </div>
   )
}

function ReactQueryTest(): JSX.Element {
   //    const { data, isLoading, error } = useQuery({
   //       queryKey: ['todos'],
   //       queryFn: getUser,
   //       refetchInterval: false
   //    })

   // const { data, isLoading, error } = useQuery({ queryKey: ['getUserAuth'], queryFn: getUserAuth, refetchInterval: false })
   //    const { toast } = useToast()

   //    async function getUser(): Promise<user[]> {
   //       try {
   //          const response = await axios({
   //             url: 'https://669c3ead276e45187d37982f.mockapi.io/user',
   //             method: 'GET',
   //             headers: { Accept: 'application/json' }
   //          })
   //          return response.data
   //       } catch (error) {
   //          if (axios.isAxiosError(error) && error.response) {
   //             toast({
   //                title: 'Erro',
   //                description: 'teste2',
   //                variant: 'destructive'
   //             })
   //             throw new Error(error.response?.data?.message || error.message)
   //          }
   //       }
   //    }

   // async function getUserAuth(): Promise<userAuth> {
   //   try{
   //     const response = await axios({url: 'https://669c3ead276e45187d37982f.mockapi.io/aut'})
   //     return response.data
   //   }catch(error){
   //     throw new Error(error.response.data)
   //   }
   // }

   //    if (!isLoading) {
   //       console.log(data)
   //       console.log(error)
   //    }

   return <></>
}
