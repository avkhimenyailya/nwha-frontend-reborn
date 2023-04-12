import React, { useEffect, useState } from 'react';
import classes from './ThingEditor.module.css';
import { Thing } from '../../../../models/Thing';
import DescriptionField from './description-field/DescriptionField';
import SmallButton from '../../../primitives/buttons/small-button/SmallButton';
import ContextMenu from '../../../contex-menu/ContextMenu';


interface ThingEditorProps {
    changedThing?: boolean;

    thing: Thing | null;
    setThing: (thing: Thing | null) => void;

    file?: File | null;
    setFile: (file: File | null) => void;

    thingDescr?: string;
    setThingDescr: (descr: string) => void;
}

function ThingEditor(props: ThingEditorProps) {
    const [showCancelMenu, setShowCancelMenu] = useState(false);
    const [changedThing, setChangedThing] = useState(false);

    useEffect(() => {
        if (props.thing?.archived || props.thing?.removed) {
            setChangedThing(true);
        }
    }, [props.thing?.archived, props.thing?.removed]);


    function getFileURL() {
        if (props.file) return URL.createObjectURL(props.file);
        if (props.thing) return props.thing.fileUrl;
        return ''; // todo
    }

    function handleCancelButton() {
        if (props.thing && !props.thing.archived && !props.thing.removed) {
            setShowCancelMenu(prevState => !prevState);
        } else {
            props.setFile(null);
            props.setThingDescr('');
        }
    }

    return (
        <div className={ classes.ThingEditor }>
            <div className={ classes.FileInfo }>
                <div className={ classes.File }>
                    <img
                        draggable={ false }
                        alt={ '???' }
                        src={ getFileURL() }
                        style={ { objectFit: 'cover' } }
                    />
                </div>
                <div className={ classes.FileName }>
                    {
                        props.thing &&
                        !props.thing.archived &&
                        !props.thing.removed &&
                        <p>000{ props.thing.id }</p> }
                    <p>{ 'by @ilya' }</p>
                    <img
                        alt={ '?' }
                        src={ require('../../../../../static/icons/thing-editor-close__light.svg').default }
                        draggable={ false }
                        style={ { userSelect: 'none', filter: changedThing ? 'grayscale(100%)' : '' } }
                        className={ classes.CancelButton }
                        onClick={ () => handleCancelButton() }/>
                    { showCancelMenu && <div className={ classes.CancelMenu }>
                        <ContextMenu>
                            <SmallButton value={ 'archive' } onClick={ () => {
                                props.setThing({
                                    ...props.thing,
                                    archived: true
                                });
                                props.setThingDescr('');
                                setShowCancelMenu(false);
                            } }/>
                            <SmallButton value={ 'delete' } onClick={ () => {
                                props.setThing({
                                    ...props.thing,
                                    removed: true
                                });
                                props.setThingDescr('');
                                setShowCancelMenu(false);
                            } }/>
                        </ContextMenu>
                    </div> }
                </div>
            </div>
            <div className={ classes.FieldThingDescription }>
                <DescriptionField
                    thingDescr={ props.thingDescr }
                    setThingDescr={ props.setThingDescr }
                />
            </div>
        </div>
    );
}

export default ThingEditor;