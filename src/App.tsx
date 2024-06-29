import React from "react";

import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import SharedLayout from "./layout/SharedLayout";
import { Home, SingleAnimePage } from "./pages";

const App:React.FC = () => {

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: 'about',
        element: <SingleAnimePage/>
      },
    ]
  },
]);


  return (
    <RouterProvider router={router}/>
  );
    
  
};

export default App;

