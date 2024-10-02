import React from 'react'
import styles from './button.module.styl'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
}

function Button({ children, variant = 'primary', size = 'medium', className, ...props }: ButtonProps) {
  const buttonClasses = `${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}

export default Button