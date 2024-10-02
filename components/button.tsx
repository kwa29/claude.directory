import React from 'react'
import styles from './button.module.styl'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
}

export function Button({ children, onClick, variant = 'primary', size = 'medium' }: ButtonProps) {
  return (
    <button 
      className={`${styles.button} ${styles[variant]} ${styles[size]}`} 
      onClick={onClick}
    >
      {children}
    </button>
  )
}