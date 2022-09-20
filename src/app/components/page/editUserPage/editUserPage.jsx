import React from "react";
import { useHistory, useParams } from "react-router-dom";
import EditUserForm from "../../ui/editUserForm";

const EditUserPage = () => {
    const { userId, edit } = useParams();
    const history = useHistory();

    let renderEditUserPage = null;
    if (edit === "edit") {
        console.log("userId, edit", userId, edit);
        renderEditUserPage = (
            <div className="container mt-5">
                <button
                    className="btn btn-primary shadow mb-5"
                    onClick={() => history.replace(`/users/${userId}`)}
                >
                    Назад
                </button>
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
