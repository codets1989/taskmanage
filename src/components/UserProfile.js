// UserProfile.js
import React from "react";
import { useUser } from "./UserContext";

const UserProfile = () => {
    const { user } = useUser();

    return (
        <div>
            <h2>User Profile</h2>
            <p>Name: {user.name}</p>
            {/* You can display other user info if needed */}
        </div>
    );
};

export default UserProfile;
