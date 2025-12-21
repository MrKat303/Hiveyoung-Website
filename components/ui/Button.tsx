import React, { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    isLoading?: boolean;
    icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, isLoading, icon, className, ...props }) => {
    return (
        <button className={`custom-button ${className}`} disabled={isLoading} {...props}>
            {isLoading ? "Enviando..." : children}
            {!isLoading && icon && <span className="button-icon">{icon}</span>}
        </button>
    );
};

export default Button;
