import React from "react";
import MeetingsCard from "../userPanel/meetingsCard";
import QualitiesCard from "../userPanel/qualitiesCard";
import UserCard from "../userPanel/userCard";
import PropTypes from "prop-types";

const UserPanel = ({ user }) => {
    const { qualities, completedMeetings } = user;
    return (
        <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard qualities={qualities} />
            <MeetingsCard completedMeetings={completedMeetings} />
        </div>
    );
};

UserPanel.propTypes = {
    user: PropTypes.object
};

export default UserPanel;
