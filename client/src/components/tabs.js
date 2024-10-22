import React, { useState } from 'react';
import '../styles/tabs.css';

const tabs = () => {
    const [activeTab, setActiveTab] = useState('All');

    return (
        <div className="tabs">
            <button className={activeTab === 'All' ? 'active' : ''} onClick={() => setActiveTab('All')}>All</button>
            <button className={activeTab === 'Spam' ? 'active' : ''} onClick={() => setActiveTab('Spam')}>Spam</button>
        </div>
    );
};

export default tabs;
