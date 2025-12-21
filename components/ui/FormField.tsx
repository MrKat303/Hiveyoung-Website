import React from 'react';

interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    textarea?: boolean;
    rows?: string;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string | null;
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    name,
    type = "text",
    placeholder,
    required,
    textarea,
    rows,
    className,
    onChange,
    error
}) => {
    return (
        <div className={`form-field ${className || ''}`}>
            <label htmlFor={name}>{label}</label>
            {textarea ? (
                <textarea
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    rows={parseInt(rows || "3")}
                    onChange={onChange}
                />
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    onChange={onChange}
                />
            )}
            {error && <span className="error-text">{error}</span>}
        </div>
    );
};

export default FormField;
