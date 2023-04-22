import React, { useCallback } from 'react';
import classes from './DropArea.module.css';
import { useDropzone } from 'react-dropzone';

interface DropAreaProps {
    setFile: (file: File) => void;
}

function DropArea(props: DropAreaProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles[0]) {
            props.setFile(acceptedFiles[0]);
        }
    }, [props]);

    const { getRootProps, getInputProps, inputRef, isDragAccept, isDragReject }
        = useDropzone({ onDrop, noClick: true, multiple: false, accept: { 'image/*': [] } });

    const dropAreaClasses = [
        classes.DropArea,
        isDragAccept && classes.DropAreaAccept,
        isDragReject && classes.DropAreaReject
    ];
    return (
        <div className={ dropAreaClasses.join(' ') } { ...getRootProps() }>
            <input { ...getInputProps() }/>
            { (!isDragAccept && !isDragReject) && <p>
                <span
                    onClick={ () => inputRef?.current?.click() }
                    className={ classes.LabelFileInput }>upload</span> or drop files here</p> }
            { isDragReject &&
                <p style={ { color: 'var(--error-color)' } }>
                    only one .jpg / .png / .gif
                </p> }
        </div>
    );
}

export default DropArea;

