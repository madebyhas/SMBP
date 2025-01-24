import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, type = "button", className, variant, ...props }) => {
    // Tentukan kelas latar belakang berdasarkan variant
    const bgVariant = {
        danger: 'bg-red-600',
        primary: 'bg-indigo-500',
        warning: 'bg-yellow-400',
        success: 'bg-green-500',
    };

    return (
        <button
            className={`${
                props.disabled
                    ? 'bg-green-600'
                    : bgVariant[variant] ?? 'bg-gray-600'
            } hover:opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                className || ''
            }`}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(['danger', 'primary', 'warning', 'success']), // Validasi variant
};

export default Button;
