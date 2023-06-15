import Box from '@mui/material/Box'
import classNames from 'classnames'
import styles from './pageDisplay.module.css'

type Props = {
  children: React.ReactNode
  className?: string
}

function PageDisplay({ children, className }: Props) {
  return (
    <Box className={classNames(styles.pageDisplay, className)}>{children}</Box>
  )
}

export default PageDisplay
