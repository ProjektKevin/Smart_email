import React from 'react';
import '../styles/textArea.css';

const textArea = ({ placeholder }) => {
    return (
        <div className="text-area">
            <textarea placeholder={placeholder} rows="10" />
        </div>
    );
};

export default textArea;
