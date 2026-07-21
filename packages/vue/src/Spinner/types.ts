export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl' | number
export type SpinnerVariant = 'default' | 'primary' | 'secondary'

export interface SpinnerProps {
  size?: SpinnerSize
  variant?: SpinnerVariant
}
