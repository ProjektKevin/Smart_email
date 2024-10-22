// emailService.js
export const sendEmail = async (emailData) => {
    const response = await fetch('https://api.your-email-service.com/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
    });
    return response.json();
};
