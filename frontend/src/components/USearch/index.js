import React from 'react';

// Components
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Image from '../Image';
import { Images } from '../../theme/Images';
import { Spinner } from 'reactstrap';

const USearch = ({
    value,
    onChange,
    onFocus,
    onClick,
    searchRequesting
}) => {
    return (
        <div className='input-field-wrapper search-field-wrapper'>
            <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    endAdornment={
                        <InputAdornment position="end">
                            {searchRequesting
                                ?
                                <Spinner size={"sm"} />
                                :
                                <Image src={Images.searchIcon} />
                            }
                        </InputAdornment>
                    }
                    label="Search"
                    value={value}
                    onChange={onChange}
                    onClick={onClick}
                    onFocus={onFocus}
                />
            </FormControl>
        </div>
    )
}

export default USearch