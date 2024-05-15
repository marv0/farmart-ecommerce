import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux'
import { store, persistor } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} >
            <ToastContainer 
                autoClose={1000}
            />
            <App />
        </PersistGate>
    </Provider>
);
