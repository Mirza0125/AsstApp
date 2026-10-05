import React from "react"

// Components
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { makeStyles } from "@material-ui/core/styles";
import { element } from "prop-types";

const useStyles = makeStyles({
  paper: {
    background: "linear-gradient(0deg, rgba(147, 45, 177, 0.08), rgba(147, 45, 177, 0.08)), #FFFBFF",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
    borderRadius: '4px'
  }
});

const USelect = ({ placeholderLabel, options, onChange, className, onFocus, value }) => {

  const classes = useStyles();

  return (
    <div className={`input-field-wrapper select-field-wrapper ${className}`}>
      <Autocomplete
        id="combo-box-demo"
        options={options}
        renderInput={params => (
          <TextField {...params} label={placeholderLabel} />
        )}
        onChange={onChange}
        getOptionLabel={option => option.label}
        classes={{ paper: classes.paper }}
        onFocus={onFocus}
        value={value}
      />
    </div>
  )
}

export default USelect
