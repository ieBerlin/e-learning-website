import { Provider } from "react-redux";
import "./index.css";

import MyRoutes from "./MyRoutes";
import store from "./store/store";
export default function App() {
  return (
    <Provider store={store}>
    <MyRoutes />
    </Provider>
  );
}
