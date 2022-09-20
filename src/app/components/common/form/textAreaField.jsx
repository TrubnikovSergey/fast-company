import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ rows, name, value, onChange, label, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <>
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className="input-group has-validation">
                <textarea
                    className={getInputClasses()}
                    id={name}
                    rows={rows}
                    name={name}
                    value={value}
                    onChange={handleChange}
                ></textarea>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </>
    );
};

TextAreaField.propTypes = {
    rows: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    error: PropTypes.string
};

export default TextAreaField;
