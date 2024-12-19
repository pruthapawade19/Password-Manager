import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Passwords from "./pages/Passwords";
import Sidebar from "./components/Sidebar";
import AddPassword from "./pages/AddPassword.jsx";
import PassGene from "./pages/PassGene.jsx";
import PassHealth from "./pages/PassHealth.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/passwords",
    element: (
      <Sidebar>
        <Passwords />
      </Sidebar>
    ),
  },
  {
    path: "/addpassword",
    element: (
      <Sidebar>
        <AddPassword />
      </Sidebar>
    ),
  },
  {
    path: "/passgen",
    element: (
      <Sidebar>
        <PassGene />
      </Sidebar>
    ),
  },
  {
    path: "/passhealth",
    element: (
      <Sidebar>
        <PassHealth />
      </Sidebar>
    ),
  },
  {
    path: "/*",
    element: <h1>404 Page Not found</h1>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
