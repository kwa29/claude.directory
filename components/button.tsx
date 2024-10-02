import React from 'react'
import styles from './button.module.styl'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      className={`${styles.button} ${styles[variant]}`} 
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button