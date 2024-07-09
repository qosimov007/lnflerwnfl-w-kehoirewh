import { useEffect } from "react";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { Home, Create, Login, Signup, SingleRecipie, Store } from "./pages";

import RootLayout from "./layout/RootLayout";

import { useSelector, useDispatch } from "react-redux";
import { login } from "./features/user/userSlice";
import { isAuthReady } from "./features/user/userSlice";

import { auth } from "./firebase/firebaseConfig";

import { action as createAction } from "./pages/Create";
import { loader as singleRecipieLoader } from "./pages/SingleRecipie";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { onAuthStateChanged } from "firebase/auth";
import Chart from "./pages/Chart";
import BarChart from "./pages/BarChart";
import PieChart from "./pages/PieChart";

function App() {
  const dispatch = useDispatch();
  const { user, authReady } = useSelector((state) => state.currentUser);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <RootLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: <Create />,
          action: createAction,
        },

        {
          path: "/singleRecipie/:id",
          element: <SingleRecipie />,
          loader: singleRecipieLoader,
        },
        {
          path: "/store",
          element: <Store />,
        },
        {
          path: "/chart",
          element: <Chart />,
        },
        {
          path: "/barchart",
          element: <BarChart />,
        },
        {
          path: "/piechart",
          element: <PieChart />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        dispatch(login(user));
        dispatch(isAuthReady(true));
      }
    });
  }, []);

  return <RouterProvider router={routes} />;
}

export default App;
