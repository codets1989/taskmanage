// App.js
import React from "react";
import { UserProvider, useUser } from "./components/UserContext";
import UserProfile from "./components/UserProfile";
import Task from "./components/Task";

const App = () => {
    return (
        <UserProvider>
            <div>
                <Header />
                <UserProfile />
                <Task />
            </div>
        </UserProvider>
    );
};

// Header component to show the user's name at the top
const Header = () => {
    const { user } = useUser();
    return <header><h1>Welcome, {user.name}!</h1></header>;
};

export default App;
