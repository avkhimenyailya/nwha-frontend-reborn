import { useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../../store/store';

export function useFileUploader() {
    const data = useAppSelector(state => state.authSlice.data);
    const [file, setFile] = useState<File>();
    const [fileUrl, setFileUrl] = useState<string>('');
    const [progress, setProgress] = useState<number>(0);
    const [isUploading, setUploading] = useState(false);

    function logic() {
        setProgress(0);
        setUploading(true);

        function onUploadProgress(event: any) {
            setProgress(Math.round((100 * event.loaded) / event.total));
        }

        upload(file!, onUploadProgress)
            .then(r => {
                console.log('Image successfully uploaded: ' + r.data);
                setProgress(100);
                setFileUrl(r.data);
                setUploading(false);
            })
            .catch(err => {
                console.log('Image failed uploaded: ' + err);
                setUploading(false);
            });
    }

    function upload(file: File, onUploadProgress: any) {
        let formData = new FormData();
        formData.append('file', file);
        return axios.post('/thing/upload', formData, {
            baseURL: 'https://api.nwha.grayproject.io',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + data?.accessToken
            },
            onUploadProgress
        });
    }

    return {
        logic,
        file,
        setFile,
        setFileUrl,
        fileUrl,
        progress,
        isUploading
    };
}