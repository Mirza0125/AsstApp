import React from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordInput = ({
  focusedLabel,
  placeholder = "",
  onChange,
  onClick,
  onFocus,
  value,
  className,
  errorClass,
  errorText
}) => {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <>
      <div className={`input-field-wrapper password-field-wrapper ${className}`}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">{placeholder}</InputLabel>
          <OutlinedInput
            id={`outlined-adornment-password`}
            type={showPassword ? 'text' : 'password'}
            onChange={onChange}
            onClick={onClick}
            onFocus={onFocus}
            value={value}
            label={focusedLabel}
            inputProps={{
              shrink: value ? true : false
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      {/* <div className={`error-message ${errorClass}`}>
        {errorText}
      </div> */}
    </>
  )
}

export default PasswordInput