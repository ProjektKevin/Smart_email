import React, { useState, useEffect } from 'react';
import '../styles/emailBar.css'; // You can create this CSS file for styling

const EmailBar = () => {
  const [emails, setEmails] = useState([]);

  // Mock email data
  useEffect(() => {
    const mockEmails = [
      {
        id: 1,
        sender: 'John Doe',
        subject: 'Welcome to our service!',
        snippet: 'Thank you for signing up for our service...',
        date: '2024-10-22',
        isRead: false,
      },
      {
        id: 2,
        sender: 'Jane Smith',
        subject: 'Your invoice is available',
        snippet: 'Your latest invoice for October is ready...',
        date: '2024-10-21',
        isRead: true,
      },
      {
        id: 3,
        sender: 'Support',
        subject: 'Password Reset Request',
        snippet: 'We received a request to reset your password...',
        date: '2024-10-20',
        isRead: false,
      },
      // More mocked email data can go here...
    ];

    setEmails(mockEmails);
  }, []);

  return (
    <div className="email-bar">
      {emails.map((email) => (
        <div key={email.id} className={`email-item ${email.isRead ? 'read' : 'unread'}`}>
          <div className="email-sender">{email.sender}</div>
          <div className="email-info">
            <span className="email-subject">{email.subject}</span>
            <span className="email-snippet"> - {email.snippet}</span>
          </div>
          <div className="email-date">{email.date}</div>
        </div>
      ))}
    </div>
  );
};

export default EmailBar;
