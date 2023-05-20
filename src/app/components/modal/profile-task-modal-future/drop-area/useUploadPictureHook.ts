import axios from "axios";
import {useAppSelector} from "../../../../store/store";
import {useState} from "react";
import {Thing} from "../../../../models/Thing";
import {baseUrl} from "../../../../baseUrl";

export function useUploadPictureHook(thingState: Thing, setThingState: (thing: Thing) => void) {
    const accessToken = useAppSelector(state => state.authSlice.data?.accessToken);
    const [progress, setProgress] = useState<number>(0);
    const [isLoading, setLoading] = useState(false);

    function upload(file: File) {
        setProgress(0);
        setLoading(true);

        function onUploadProgress(event: any) {
            setProgress(Math.round((100 * event.loaded) / event.total));
        }

        uploadToServer(file, onUploadProgress)
            .then(r => {
                setProgress(100);
                setThingState({...thingState, pictureLink: r.data})
                setLoading(false)
            })
            .catch(err => {
                setLoading(false);
            });
    }

    function uploadToServer(file: File, onUploadProgress: any) {
        let formData = new FormData();
        formData.append('file', file);
        return axios.post('/picture/upload', formData, {
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + accessToken
            },
            onUploadProgress
        });
    }

    return {
        upload,
        progress,
        isLoading
    }
}