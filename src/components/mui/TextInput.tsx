import InputAdornment from '@mui/material/InputAdornment/InputAdornment'
import TextField, {
  BaseTextFieldProps,
} from '@mui/material/TextField/TextField'

type Props = BaseTextFieldProps & {
  delimiter?: string
  startAdornment?: string
  handleChangeFormData: (e: any) => void
  handleValidateForm?: () => void
}

function TextInput({
  delimiter,
  value = '',
  handleChangeFormData,
  handleValidateForm,
  inputMode = 'text',
  startAdornment,
  variant,
  inputProps,
  ...props
}: Props) {
  return (
    <TextField
      {...props}
      fullWidth
      onBlur={() => handleValidateForm && handleValidateForm()}
      onChange={handleChangeFormData}
      size="small"
      value={value}
      variant={variant ?? 'standard'}
      sx={{ mt: 2.5, ...props.sx }}
      inputProps={{ inputMode: inputMode, ...inputProps }}
      InputProps={{
        startAdornment: (delimiter || startAdornment) && (
          <InputAdornment position="start">
            {startAdornment ?? `(${delimiter})`}
          </InputAdornment>
        ),
      }}
    />
  )
}

export default TextInput
