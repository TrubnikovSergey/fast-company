import React from "react";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import QualitiesProvider from "../hooks/useQualities";
import UserProvider from "../hooks/useUsers";
const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        <>
            <UserProvider>
                <QualitiesProvider>
                    {userId ? (
                        edit ? (
                            <EditUserPage />
                        ) : (
                            <UserPage userId={userId} />
                        )
                    ) : (
                        <UsersListPage />
                    )}
                </QualitiesProvider>
            </UserProvider>
        </>
    );
};

export default Users;
