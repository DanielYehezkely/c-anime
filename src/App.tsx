import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import SharedLayout from "./layout/SharedLayout";
import { Home, SingleAnimePage, WatchListPage } from "./pages";

import ProtectedRoute from "./routes/protectedRout";

const App:React.FC = () => {



const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "singleAnime/:animeId",
        element: (
          <ProtectedRoute>
            <SingleAnimePage  />
          </ProtectedRoute>
        ),
      },
      {
        path: "watchlist",
        element: (
          <ProtectedRoute>
            <WatchListPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

  return (
    <RouterProvider router={router}/>
  );
    
  
};

export default App;

