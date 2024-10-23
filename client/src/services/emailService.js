// emailService.js
export const sendEmail = async (emailData) => {
    const response = await fetch('http://localhost:8081/api/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
    });
    return response.json();
};
