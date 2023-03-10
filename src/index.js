import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter as Router } from "react-router-dom";

import { store } from 'store';

// style + assets
import 'assets/scss/style.scss';
import config from './config';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router basename={config.basename}>
      <App />
    </Router>
  </Provider>
);
