
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from './pages/root';





export const routes =[

  // { lable:"tasks",
  //   path: "/",
  //   element: <Tasks/>
  // },

  // {
  //   lable:"create",
  //   path: "Create",
  //   element: <CreateMeeting />
  // },
]




const router = createBrowserRouter([
  {
    path: "/",
    element: <Header/>,
    children: routes,
  },
]);





function App() {
  
  return (
    <>
            <RouterProvider router={router} />
    </>
)

}

export default App
