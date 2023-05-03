import React, { useRef, useState } from 'react';
import classes from './ThingEditor.module.css';
import { Thing } from '../../../../models/Thing';
import DescriptionField from './description-field/DescriptionField';
import { useAppSelector } from '../../../../store/store';
import Svg from '../../../primitives/svg/Svg';
import ContextMenu from '../../../contex-menu/ContextMenu';
import SmallButton from '../../../primitives/buttons/small-button/SmallButton';
import { thingApi } from '../../../../store/api/thingApi';
import Img from '../../../primitives/img/Img';

interface ThingEditorProps {
    fileUrl?: string;
    setFileUrl: (fileUrl: string) => void;

    thing: Thing;
    setThing: (thing: Thing) => void;
}

function ThingEditor(props: ThingEditorProps) {
    const username = useAppSelector(state => state.authSlice.data?.username);
    const [showChangeThingMenu, setShowChangeThingMenu] = useState(false);
    const changeButtonRef = useRef<HTMLDivElement>(null);

    // const [updateAnswers, { isLoading, isSuccess, isError }] = profileTaskApi.useUpdateAnswersMutation();
    const [deleteThingById, { isLoading, isSuccess, isError }] = thingApi.useDeleteByIdMutation();

    function changeThing(event: React.MouseEvent<HTMLDivElement>) {
        props.thing.id
            ? setShowChangeThingMenu(prevState => !prevState)
            : props.setFileUrl('');
    }

    function deleteThing(thingId?: number) {
        if (thingId) {
            deleteThingById(thingId)
                .unwrap()
                .then(resp => {
                    props.setFileUrl('');
                    props.setThing({
                        ...props.thing,
                        id: undefined,
                        fileUrl: undefined,
                        description: undefined,
                        archived: false,
                        removed: false
                    });
                });
        }
    }

    function archiveThing() {
        alert('attempt delete archive');
    }

    function renderFile() {
        return <div className={ classes.File }>
            { renderFileImg() }
            { renderFileName() }
            { renderChangeThingButton() }
            { renderChangeThingMenu() }
        </div>;
    }

    function renderFileImg() {
        return <div className={ classes.FileImg }>
            <Img imgUrl={ props.thing.fileUrl ?? props.fileUrl }/>
        </div>;
    }

    function getFileName() {
        const split = props.fileUrl?.split('/') as string[];
        return split[split.length - 1];
    }

    function getPrettyId(id?: number) {
        if (!id) return id;
        return (id > 9
            ? String(id)
            : '0' + id);
    }

    function renderFileName() {
        return <div className={ classes.FileName }>
            <p>{ getPrettyId(props.thing?.id!) ?? getFileName() }</p>
            <p>{ `by @${ username }` }</p>
        </div>;
    }

    function renderChangeThingButton() {
        return <div
            ref={ changeButtonRef }
            onClick={ event => changeThing(event) }
            className={ classes.ChangeThingButton }>
            <Svg path={ require('./change-thing.light.svg').default }/>
        </div>;
    }

    function renderDescriptionField() {
        return <div className={ classes.FieldThingDescription }>
            <DescriptionField
                thing={ props.thing }
                setThing={ props.setThing }
            />
        </div>;
    }

    function renderChangeThingMenu() {
        return showChangeThingMenu &&
            <div
                className={ classes.ChangeThingMenu }>
                <ContextMenu triggerRef={ changeButtonRef } setShowContextMenu={ setShowChangeThingMenu }>
                    <SmallButton value={ 'delete' } onClick={ _ => deleteThing(props.thing?.id!) }/>
                    <SmallButton value={ 'archive' } onClick={ _ => archiveThing() }/>
                </ContextMenu>
            </div>;
    }

    return (
        <div className={ classes.ThingEditor }>
            { renderFile() }
            { renderDescriptionField() }
        </div>
    );
}

export default ThingEditor;