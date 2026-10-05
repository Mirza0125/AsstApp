import React, { useRef } from 'react';
// import uploadIcon from '../../assets/images/upload.svg';
import './style.scss';

const UploadFile = (props) => {

    const fileRef = useRef()

    return (
        <div className="upload-file-wrapper">
            <div className="upload-file">
                <div className="icon-wrapper">
                    <div
                        className="sample"
                        onClick={() => fileRef.current.click()}
                    >
                        {props.title}
                    </div>
                    <input
                        type="file"
                        name="file"
                        ref={fileRef}
                        onChange={props.onChange}
                        hidden
                    />
                    <div>
                        <p style={{ margin: "0px", marginLeft: "5px" }}>
                            {props.selectedFile}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadFile