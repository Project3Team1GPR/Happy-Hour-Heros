import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Success from "./pages/Success";
import SearchCocktail from "./pages/SearchCocktail.jsx";
import SavedCocktails from "./pages/SavedCocktails.jsx";
import StripePage from "./pages/Stripe.jsx";
import About from "./pages/About/About.jsx";
import NewPostPage from "./pages/NewPagePost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/search",
        element: <SearchCocktail />,
      },
      {
        path: "/saved",
        element: <SavedCocktails />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/stripe",
        element: <StripePage />,
      },
      {
        path: "/post",
        element: <NewPostPage />,
      },
      {
        path: "/*",
        element: <NoMatch />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
