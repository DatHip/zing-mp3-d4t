import { useTop100Data } from "../../api/useTop100Data"

export function useTop100Page() {
   const { data, isLoading } = useTop100Data()
   return { sections: data, isLoading }
}
