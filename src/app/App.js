import React from "react"
import { Route, Switch } from "react-router-dom"
import NavBar from "./components/navBar"
import Login from "./layout/login"
import Main from "./layout/main"
import Users from "./layout/users"

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
            </Switch>
        </>
    )
}

export default App
