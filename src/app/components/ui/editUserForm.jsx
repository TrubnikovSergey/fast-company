import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const EditUserForm = ({ userId }) => {
    if (!localStorage.getItem("users")) return <h1>Users list not found</h1>;
    const arrayUsers = JSON.parse(localStorage.getItem("users"));
    const user = arrayUsers.find((user) => String(user._id) === String(userId));

    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        profession: user.profession._id,
        sex: user.sex,
        qualities: getOptions(user.qualities)
    });

    function getOptions(qualities) {
        const qualitiesList = Object.keys(qualities).map((optionName) => ({
            value: qualities[optionName]._id,
            label: qualities[optionName].name,
            color: qualities[optionName].color
        }));

        return qualitiesList;
    }

    const history = useHistory();

    const [qualities, setQualities] = useState(user.qualities);
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "ФИО обязательна для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users.update(user._id, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });

        history.replace(`/users/${user._id}`);
    };

    let renderForm = null;
    if (professions.length > 0 && qualities.length > 0) {
        renderForm = (
            <form onSubmit={handleSubmit}>
                <TextField
                    label="ФИО"
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
                    options={professions}
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
                    options={qualities}
                    onChange={handleChange}
                    defaultValue={data.qualities}
                    name="qualities"
                    label="Выберите ваши качества"
                />
                <button
                    className="btn btn-primary w-100 mx-auto"
                    type="submit"
                    disabled={!isValid}
                >
                    Update
                </button>
            </form>
        );
    } else {
        renderForm = <h1>Loading...</h1>;
    }
    return renderForm;
};

EditUserForm.propTypes = {
    userId: PropTypes.string
};

export default EditUserForm;
