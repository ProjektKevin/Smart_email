import { useState } from 'react';

// useForm Hook
const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    // Handle form submission (Optional)
    const handleSubmit = (callback) => (e) => {
        e.preventDefault();
        callback();
    };

    return {
        values,
        handleChange,
        handleSubmit,
    };
};

export default useForm;
