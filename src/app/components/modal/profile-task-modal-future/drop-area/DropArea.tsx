import React, {useCallback} from 'react';
import classes from './DropArea.module.css';
import {useDropzone} from 'react-dropzone';
import {Thing2} from "../../../../models/Thing2";
import {useUploadPictureHook} from "./useUploadPictureHook";
import FileLoadBar from "./file-loadbar/FileLoadBar";

interface DropAreaProps {
    thingState: Thing2,
    setThingState: (thing: Thing2) => void;
}

function DropArea(props: DropAreaProps) {
    const {
        upload,
        progress,
        isLoading,
    } = useUploadPictureHook(props.thingState, props.setThingState);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles[0]) {
            upload(acceptedFiles[0]);
        }
    }, [upload]);

    const {getRootProps, getInputProps, inputRef, isDragAccept, isDragReject}
        = useDropzone({onDrop, noClick: true, multiple: false, accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
        }});

    const dropAreaClasses = [
        classes.DropArea,
        isDragAccept && classes.DropAreaAccept,
        isDragReject && classes.DropAreaReject
    ];

    if (isLoading) return <FileLoadBar percent={progress}/>
    return (
        <div className={dropAreaClasses.join(' ')} {...getRootProps()}>
            <input {...getInputProps()}/>
            {(!isDragAccept && !isDragReject) && <p>
                <span
                    onClick={() => inputRef?.current?.click()}
                    className={classes.LabelFileInput}>upload</span> or drop files here</p>}
            {isDragReject &&
                <p style={{color: 'var(--error-color)'}}>
                    only one *.jpg *.png *.gif *.heic
                </p>}
        </div>
    );
}

export default DropArea;

