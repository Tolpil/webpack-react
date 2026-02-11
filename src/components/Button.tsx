import React from 'react';
import clsx from 'clsx';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  onClick 
}) => {
  const buttonClasses = clsx(
    'button',
    `button--${variant}`,
    `button--${size}`,
    {
      'button--disabled': disabled,
    }
  );

  return (
    <button 
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;