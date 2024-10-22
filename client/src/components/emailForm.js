import React from 'react';
import InputField from './inputField';
import TextArea from './textArea';
import '../styles/emailForm.css';
import sendIcon from '../assets/icons/sendIcon.png'; // Adjust the relative path

const emailForm = () => {
    return (
        <div className="email-container">
            <div className="email-form">
                <h2>New Email [Testing only]</h2>
                <InputField label="To" placeholder="Enter to" />
                <InputField label="Cc" placeholder="Enter cc" />
                <InputField label="Subject" placeholder="Enter subject" />
                <TextArea placeholder="Type here" />
                <button className="send-button">
                    <span>Send</span> {/* Text first */}
                    <img src={sendIcon} alt="send icon" /> {/* Icon after text */}
                </button>
            </div>
        </div>
    );
};

export default emailForm;
