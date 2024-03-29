import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Navbar from "./components/navbar/Navbar";
import Branches from "./pages/branches/Branches";
import AddContact from "./pages/contact/AddContact";
import Contact from "./pages/contact/Contact";
import SingleContact from "./pages/contact/SingleContact";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import AddParcel from "./pages/parcels/AddParcel";
import Parcels from "./pages/parcels/Parcels";
import SingleParsel from "./pages/parcels/SingleParsel";
import Prices from "./pages/prices/Prices";
import ChangePassword from "./pages/profile/ChangePassword";
import ChangePicture from "./pages/profile/ChangePicture";
import EditDetails from "./pages/profile/EditDetails";
import EmailVerification from "./pages/profile/EmailVerification";
import Profile from "./pages/profile/Profile";

function App() {
  const Layout = () => {
    return localStorage.getItem("cToken") ? (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    ) : (
      <Login />
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/prices",
          element: <Prices />,
        },
        {
          path: "/branches",
          element: <Branches />,
        },
        {
          path: "/parcels",
          element: <Parcels />,
        },
        {
          path: "/parcels/:id",
          element: <SingleParsel />,
        },
        {
          path: "/add-parcel",
          element: <AddParcel />,
        },
        {
          path: "/contacts",
          element: <Contact />,
        },
        {
          path: "/contacts/:id",
          element: <SingleContact />,
        },
        {
          path: "/add-contact",
          element: <AddContact />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/profile/edit-details",
          element: <EditDetails />,
        },
        {
          path: "/profile/change-picture",
          element: <ChangePicture />,
        },
        {
          path: "/profile/change-password",
          element: <ChangePassword />,
        },
        {
          path: "/profile/email-verification",
          element: <EmailVerification />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
