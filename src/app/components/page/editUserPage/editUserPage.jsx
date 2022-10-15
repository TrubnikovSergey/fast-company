import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";
import localStorageService from "../../../services/localStorage.service";

const EditUserPage = () => {
    const history = useHistory();
    let { userId } = useParams();
    const authUserId = localStorageService.getUserId();
    const isAuthUser = userId === authUserId;

    if (!isAuthUser) {
        userId = authUserId;
    }

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const { professions } = useProfessions();
    const convertProfessions = (p) =>
        p.map((item) => ({
            label: item.name,
            value: item._id
        }));
    const { qualities } = useQualities();
    const convertQualities = (q) =>
        q.map((item) => ({
            label: item.name,
            color: item.color,
            value: item._id
        }));

    const { getUserById } = useUser();
    const { updateUser } = useAuth();
    const [errors, setErrors] = useState({});

    function getDefaultValue(elements) {
        const qualitiesArray = [];

        for (const elem of elements) {
            for (const quality of qualities) {
                if (elem === quality._id) {
                    qualitiesArray.push({
                        value: quality._id,
                        label: quality.name,
                        color: quality.color
                    });
                }
            }
        }

        return qualitiesArray;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;

        const newData = {
            ...data,
            profession: profession._id ? profession._id : profession,
            qualities: qualities.map((item) =>
                item.value ? item.value : item._id
            )
        };

        updateUser(newData);

        history.replace(`/users/${userId}`);
    };

    useEffect(async () => {
        setIsLoading(true);
        const user = await getUserById(userId);

        return setData((prevState) => {
            const newState = {
                ...prevState,
                ...user
            };

            return newState;
        });
    }, []);

    useEffect(() => {
        if (data._id) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        return setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    if (isAuthUser) {
        return (
            <div className="container mt-5">
                <BackHistoryButton />
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        {!isLoading &&
                        professions.length > 0 &&
                        qualities.length > 0 ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выбери свою профессию"
                                    defaultOption="Choose..."
                                    options={convertProfessions(professions)}
                                    name="profession"
                                    onChange={handleChange}
                                    value={data.profession}
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    defaultValue={getDefaultValue(
                                        data.qualities
                                    )}
                                    options={convertQualities(qualities)}
                                    onChange={handleChange}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </form>
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            </div>
        );
    } else {
        return <Redirect to={`/users/${authUserId}/edit`} />;
    }
};

export default EditUserPage;
