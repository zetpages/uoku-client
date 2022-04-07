import ReactDOM from 'react-dom';

// core styles
import "./scss/volt.scss";

// vendor styles
import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";

import UserAuth from "./User/UserAuth";
import React, {createContext} from 'react';
import App from "./App";

export const Context = createContext(null);
// console.log(process.env.REACT_APP_API_URL)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserAuth()
    }}>
        <App />
    </Context.Provider>,
  document.getElementById("root")
);
