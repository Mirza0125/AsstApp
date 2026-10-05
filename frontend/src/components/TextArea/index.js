import React, { useState } from 'react';
// import textAreaWriteIcon from '../../assets/images/textarea-write.svg';
import './style.scss';

const TextArea = ({

    className = '',
    placeholder = '',
    onChange,
    onClick,
    value,
    onFocus,
    errorMessage = '',
    showError,
    required,
    ...props
}) => {

    const showErrorMessage = showError ? showError : false
    return (
        <div className="text-area-field">
            {/* <span><img src={textAreaWriteIcon} /></span> */}
            <textarea className={className} onChange={onChange} onClick={onClick} name="textarea" placeholder={placeholder}
                id={props.id}
                value={value}
                required={required}

                onFocus={onFocus}
                disabled={props.disabled}

            ></textarea>
            {/* {showErrorMessage && */}
            <label className={`error-message ${showErrorMessage ? 'opacity-1' : ''}`}>{errorMessage}</label>
            {/* } */}

        </div>
    )
}

export default TextArea