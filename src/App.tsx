import React from "react";

import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import SharedLayout from "./layout/SharedLayout";

const App:React.FC = () => {

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout/>,
  },
]);


  return (
    <RouterProvider router={router}/>
  );
    
  
};

export default App;

