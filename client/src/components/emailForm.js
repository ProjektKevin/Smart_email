import React from 'react';
import InputField from './inputField';
import TextArea from './textArea';
import './emailForm.css';

const EmailForm = () => {
    return (
        <div className="email-form">
            <h2>New Email [Testing only]</h2>
            <InputField label="To" />
            <InputField label="Cc" />
            <InputField label="Subject" />
            <TextArea placeholder="Type here" />
            <button className="send-button">
                <img src="/assets/icons/sendIcon.png" alt="send icon" /> Send
            </button>
        </div>
    );
};

export default EmailForm;
