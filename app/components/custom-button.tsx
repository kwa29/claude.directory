import { cva, type VariantProps } from 'class-variance-authority'
// Update the import to use the CSS module
import styles from './custom-button.module.css'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  // ... rest of the code remains unchanged
)