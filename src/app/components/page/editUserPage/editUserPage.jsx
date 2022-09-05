import React from "react";
import { useParams } from "react-router-dom";
import EditUserForm from "../../ui/editUserForm";

const EditUserPage = () => {
    const { userId, edit } = useParams();

    let renderEditUserPage = null;
    if (edit === "edit") {
        console.log("userId, edit", userId, edit);
        renderEditUserPage = (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <EditUserForm userId={userId} />
                    </div>
                </div>
            </div>
        );
    } else {
        renderEditUserPage = <h1>Loading...</h1>;
    }

    return renderEditUserPage;
};

export default EditUserPage;
