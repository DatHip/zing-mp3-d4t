/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios"
import { tmdAPI } from "../config"

// function useGetHotKey() {
//    return useQuery(["getHotKey"], async () => {
//       const data = await axios.get(tmdAPI.getHotKeyApi())
//       return data.data
//    })
// }

const getHotKey = async () => {
   const res = await axios.get(tmdAPI.getHotKeyApi())
   return res.data
}

export default getHotKey
