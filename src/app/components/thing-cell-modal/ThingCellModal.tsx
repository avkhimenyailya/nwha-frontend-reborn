import React, { useEffect, useState } from 'react';
import classes from './ThingCellModal.module.css';
import { ProfileTask } from '../../models/ProfileTask';
import QuestionComponent from '../question/QuestionComponent';
import { Answer } from '../../models/Answer';
import { thingApi } from '../../store/api/thingApi';
import Button from '../primitives/buttons/button /Button';
import { useAppSelector } from '../../store/store';
import axios from 'axios';

interface ThingCellModalProps {
    profileTask: ProfileTask;
}

function ThingCellModal(props: ThingCellModalProps) {
    const authData = useAppSelector(state => state.authSlice.data);
    const [progress, setProgress] = useState<number>(0);
    const [disableBtnSave, setDisableBtnSave] = useState(true);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [createThing, { data, isLoading }] = thingApi.useCreateThingMutation();
    const [answers] = useState(new Map<number, Answer>()); // questionId <-> answer

    useEffect(() => {
        if (answers.size === 1 && selectedFile) {
            setDisableBtnSave(false);
        }
    }, [selectedFile, answers]);


    function setAnswer(answer: Answer) {
        answers.set(answer.questionId!, answer);
        console.log(answers);
    }

    // function renderQuestions() {
    //     return props.profileTask.task.questions.map(question =>
    //         <QuestionComponent
    //             key={ question.id }
    //             question={ question }
    //             answers={ answers }
    //             profileTaskId={ props.profileTask.id }
    //         />
    //     );
    // }

    function createResult() {
        const formData = new FormData();
        formData.append('file', selectedFile!);
        formData.append('profileTaskId', String(props.profileTask.id));
        axios.post('/thing/upload', formData, {
            baseURL: 'https://api.nwha.grayproject.io',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + authData?.accessToken
            },
            onUploadProgress: (progressEvent: { loaded: any; }) =>
                console.log(progressEvent.loaded)
        }).then(r => console.log(r));


        createThing({
            fileUrl: 'https://c.files.bbci.co.uk/D5D3/production/_109893745_976650swift.jpg',
            description: 'my thing',
            profileTaskId: props.profileTask.id
        })
            .unwrap()
            .then(thing => {

            });
    }

    return (
        <div className={ classes.ThingCellModal }>
            { selectedFile && <img src={ URL.createObjectURL(selectedFile) }/> }
            <p className={ classes.TaskOrdinalNumber }>
                { 'Task ' + props.profileTask.task.ordinalNumber }
            </p>
            <p className={ classes.TaskDescription }>
                { props.profileTask.task.description }
            </p>
            <p>{ progress + '%' }</p>
            <div className={ classes.InputFileArea }>
                <input
                    className={ classes.InputFile }
                    type={ 'file' }
                    multiple={ false }
                    accept={ 'image/*' }
                    onChange={ (event) => {
                        if (event.target.files) {
                            setSelectedFile(event.target.files[0]);
                        }
                    } }
                />
                <p><span style={ {
                    fontStyle: 'italic',
                    textDecoration: 'underline'
                } }>upload</span> or drop files here</p>
            </div>

            <div style={ { marginTop: '30px' } }>
                <Button disabled={ disableBtnSave } value={ 'save' } onClick={ createResult }/>
            </div>
        </div>
    );
}

export default ThingCellModal;