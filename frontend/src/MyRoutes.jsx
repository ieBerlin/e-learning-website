import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import AuthPage from "./pages/auth/AuthPage";
import LearningPreferencesPage from "./pages/auth/LearningPreferencesPage";
const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "learning-preferences",
        element: <LearningPreferencesPage />,
      },
    ],
  },
]);
export default routes;
