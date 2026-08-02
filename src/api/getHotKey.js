/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios"
import { zingApi } from "config"

// function useGetHotKey() {
//    return useQuery(["getHotKey"], async () => {
//       const data = await axios.get(zingApi.getHotKeyApi())
//       return data.data
//    })
// }

const getHotKey = async () => {
   const res = await axios.get(zingApi.getHotKeyApi())
   return res.data
}

export default getHotKey
