import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";

import { useParams } from "react-router-dom";
import EditUserPage from "../editUserPage/editUserPage";
import UserPanel from "./userPanel/userPanel";
import CommentPanel from "./commentsPanel/commentsPanel";

const UserPage = ({ userId }) => {
    const { edit } = useParams();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user) {
        return edit ? (
            <EditUserPage />
        ) : (
            <div className="container">
                <div className="row gutters-sm">
                    <UserPanel user={user} />
                    <CommentPanel />
                </div>
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
