import axios from "axios"
import { useEffect } from "react"
import {
  RouterProvider,
} from "react-router-dom";
import { router } from '@/router/index'

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
