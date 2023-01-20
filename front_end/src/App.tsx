import axios from "axios"
import { useEffect } from "react"
import {
  RouterProvider,
} from "react-router-dom";
import { router } from '@/router/index'

function App() {
  
  useEffect(()=>{
    axios.get("/api/mmdb/movie/v3/list/hot.json?ct=%E5%8C%97%E4%BA%AC&ci=1&channelId=4").then(
      res=>{
        console.log(res)
      }
    )
  },[])
  return (
    <RouterProvider router={router} />
  )
}

export default App
