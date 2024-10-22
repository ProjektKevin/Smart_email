import React from 'react';
import '../styles/inputField.css';

const inputField = ({ label }) => {
    return (
        <div className="input-field">
            <label>{label}</label>
            <input type="text" placeholder={`Enter ${label.toLowerCase()}`} />
        </div>
    );
};

export default inputField;
