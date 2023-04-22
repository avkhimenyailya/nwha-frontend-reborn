import axios from 'axios';
import { useAppSelector } from '../../../store/store';
import React, { useState } from 'react';
import { Thing } from '../../../models/Thing';

export function useFileUploader() {
    const data = useAppSelector(state => state.authSlice.data);

    const [currentImage, setCurrentImage] = useState<File>();
    const [progress, setProgress] = useState<number>(0);

    const [thingWithImage, setThingWithImage] = useState<Thing>();


    const uploadImage = (thingId: number) => {
        setProgress(0);
        if (!currentImage) return;
        upload(thingId, currentImage, (event: any) => {
            console.log(event.loaded);
            setProgress(Math.round((100 * event.loaded) / event.total));
        })
            .then((response) => {
                console.log('Image successfully uploaded: ' + response.data.thingId);
                return getThingWithImageUrl(response.data.thingId);
            })
            .then((thing) => {
                setThingWithImage(thing);
            })
            .catch((err) => {
                console.log('Could not upload the Image!');
                setProgress(0);
                if (err.response && err.response.data && err.response.data.message) {
                    console.log(err.response.data.message);
                } else {
                    console.log('Could not upload the Image!');
                }
                setCurrentImage(undefined);
            });
    };

    const upload = (thingId: number, file: File, onUploadProgress: any): Promise<any> => {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('thingId', String(thingId));
        return axios.post('/thing/upload', formData, {
            baseURL: 'https://api.nwha.grayproject.io',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + data?.accessToken
            },
            onUploadProgress
        });
    };

    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files as FileList;
        setCurrentImage(selectedFiles?.[0]);
        setProgress(0);
    };

    const getThingWithImageUrl = (thingId: number): Promise<Thing> => {
        return axios.get('/thing/upload', {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + data?.accessToken
            }
        });
    };


    return {
        selectImage,
        uploadImage,
        progress,
        thingWithImage
    };
}