import React, { useEffect, useState } from "react";
import API from "../../../../api";
import SelectField from "../../../common/form/selectField";
import { validator } from "../../../../utils/validator";
import TextAreaField from "../../../common/form/textAreaField";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const CreateComment = ({ onCreate }) => {
    const { userId } = useParams();
    const [users, setUsers] = useState();
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        userId: "",
        userName: "",
        content: "",

        _id: "",
        pageId: "",
        created_at: ""
    });

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Пользователь должен быть выбран"
            }
        },
        content: {
            isRequired: {
                message: "Текст комментария должен быть заполнен"
            }
        }
    };

    function compare(a, b) {
        if (a.label > b.label) return 1;
        if (a.label === b.label) return 0;
        if (a.label < b.label) return -1;
    }

    const getOptions = () => {
        return users
            .map((user) => ({ label: user.name, value: user._id }))
            .sort(compare);
    };

    const handleChange = ({ name, value }) => {
        return setData((prev) => ({ ...prev, [name]: value, pageId: userId }));
    };

    const handleCreate = () => {
        const isValidate = validate();

        if (!isValidate) return;

        const userSelected = users.find((user) => user._id === data.userId);
        onCreate({ ...data, userName: userSelected.name });
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <>
            <div>
                <h2>New comment</h2>
                <div className="mb-4">
                    <SelectField
                        label=""
                        value={data.userId}
                        onChange={handleChange}
                        defaultOption={
                            users ? "Выберите пользователя" : "Loading..."
                        }
                        options={users ? getOptions() : []}
                        error={errors.userId}
                        name="userId"
                    />
                </div>
                <div className="mb-4">
                    <TextAreaField
                        rows="3"
                        name="content"
                        value={data.content}
                        onChange={handleChange}
                        label="Сообщение"
                        error={errors.content}
                    />
                    {/* <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                    >
                        Сообщение
                    </label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        name="commentText"
                        value={data.commentText}
                        onChange={handleChange}
                    ></textarea> */}
                </div>
                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-primary mb-3"
                        onClick={handleCreate}
                        disabled={!isValid}
                    >
                        Опубликовать
                    </button>
                </div>
            </div>
        </>
    );
};
CreateComment.propTypes = {
    onCreate: PropTypes.func
};
export default CreateComment;
