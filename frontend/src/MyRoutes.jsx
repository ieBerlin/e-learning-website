import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/landing-page/LandingPage";
import AuthPage from "./pages/auth/AuthPage";
import LearningPreferencesPage from "./pages/auth/LearningPreferencesPage";
import UserProfilePage from "./pages/user/UserProfilePage";
import UploadImagePage from "./pages/user/UploadImagePage";
import NotificationSettingsPage from "./pages/user/NotificationSettingsPage";
import SettingsPage from "./pages/user/SettingsPage.jsx";
import ViewNotificationsPage from "./pages/user/ViewNotificationsPage";
import NotFoundPage from "./pages/NotFoundPage";
import CartPage from "./pages/courses/CartPage";
import AllCoursesPage from "./pages/courses/AllCoursesPage";
import LibraryPage from "./pages/courses/LibraryPage.jsx";
import RootLayout from "./components/RootLayout.jsx";
import NavigationLayout from "./components/NavigationLayout.jsx";
import CourseCategoryPage from "./pages/courses/CourseCategoryPage.jsx";
// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "auth",
    element: <AuthPage />,
  },
  {
    path: "preferences",
    element: <LearningPreferencesPage />,
  },

  {
    path: "user",
    element: <RootLayout />,
    children: [
      {
        path: "profile",
        element: <NavigationLayout />,
        children: [{ path: "", element: <UserProfilePage /> }],
      },
      {
        path: "upload-image",
        element: <NavigationLayout />,
        children: [{ path: "", element: <UploadImagePage /> }],
      },
      {
        path: "settings",
        element: <NavigationLayout />,
        children: [{ path: "", element: <SettingsPage /> }],
      },
      {
        path: "notifications",
        element: <NavigationLayout />,
        children: [{ path: "", element: <NotificationSettingsPage /> }],
      },
      {
        path: "view-notifications",
        element: <ViewNotificationsPage />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "cart",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <CartPage />,
      },
    ],
  },
  {
    path: "courses",
    element: <RootLayout />,
    children: [
      { path: "", element: <AllCoursesPage /> },
      { path: "my-library", element: <LibraryPage /> },
      { path: ":category", element: <CourseCategoryPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
