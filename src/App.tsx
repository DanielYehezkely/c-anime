import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SharedLayout from "./layout/SharedLayout";
import {
  Home,
  NotFoundPage,
  SingleAnimePage,
  WatchListPage,
  LoginPage,
} from "./pages";
import ProtectedRoute from "./routes/protectedRout";
import AuthRedirect from "./routes/authRedirect";


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
            <SingleAnimePage />
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
  {
    path: "/login",
    element: (
      <AuthRedirect>
        <LoginPage />
      </AuthRedirect>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
