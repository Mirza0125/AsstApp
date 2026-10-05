import React from "react"
import ReactDOM from "react-dom/client"
import { Router } from "react-router-dom"
import "./index.css"
import App from "./App"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../src/assets/scss/common.scss"
import "./assets/fonts/poppins.css"
import { Provider } from "react-redux"
import { store, persistor } from "./reduxStore/store"
import { history } from "./reduxStore/store"
import { PersistGate } from "redux-persist/integration/react"


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>
)
