import React, {useRef, useState} from 'react';
import classes from './ThingEditor.module.css';
import {Thing} from "../../../../models/Thing";
import TextArea from "../../../primitives/fields/text-area/TextArea";
import SmallButton from "../../../primitives/buttons/small-button/SmallButton";
import ContextMenu from "../../../contex-menu/ContextMenu";
import Svg from "../../../primitives/svg/Svg";
import {usePrettyNumber} from "../../../../hooks/usePrettyNumber";
import {useAppSelector} from "../../../../store/store";
import {thingApi} from "../../../../store/api/thingApi";
import Img from "../../../img/Img";

interface ThingEditorProps {
    thingState: Thing,
    setThingState: (thing: Thing) => void;
}

function ThingEditor(props: ThingEditorProps) {
    const {getPrettyNumber} = usePrettyNumber();
    const username = useAppSelector(state => state.authSlice.data?.username);
    const [changeThingMenuVisible, setChangeThingMenuVisible] = useState(false);
    const changeButtonRef = useRef<HTMLDivElement>(null);

    const [updateThing] = thingApi.useUpdateThingMutation();

    function changeThing() {
        props.thingState.id
            ? setChangeThingMenuVisible(prevState => !prevState)
            : props.setThingState({...props.thingState, pictureLink: undefined})
    }

    function deleteThing(thingState: Thing) {
        updateThing({...thingState, removed: true})
        props.setThingState({
            profileTaskId: thingState.profileTaskId,
            archived: false,
            removed: false
        } as Thing)
    }

    function archiveThing(thingState: Thing) {
        updateThing({...thingState, archived: true})
        props.setThingState({
            profileTaskId: thingState.profileTaskId,
            archived: false,
            removed: false
        } as Thing)
    }

    function renderFile() {
        return <div className={classes.File}>
            {renderFileImg()}
            {renderFileName()}
            {renderChangeThingButton()}
            {renderChangeThingMenu()}
        </div>;
    }

    function renderFileImg() {
        return <Img className={classes.FileImg} src={props.thingState.pictureLink!}/>
    }

    function getFileName() {
        const split = props.thingState.pictureLink?.split('/') as string[];
        return split[split.length - 1];
    }

    function renderFileName() {
        return <div className={classes.FileName}>
            <p>{props.thingState.id ? getPrettyNumber(props.thingState.id) : getFileName()}</p>
            <p>{`by @${username}`}</p>
        </div>;
    }

    function renderChangeThingButton() {
        return <div
            ref={changeButtonRef}
            onClick={() => changeThing()}
            className={classes.ChangeThingButton}>
            <Svg path={require('./change-thing.light.svg').default}/>
        </div>;
    }

    function renderDescriptionField() {
        return <div className={classes.FieldThingDescription}>
            <TextArea
                maxLength={140}
                rows={5}
                value={props.thingState.description ?? ''}
                onChange={e => props.setThingState({...props.thingState, description: e.target.value})}
            />
        </div>;
    }

    function renderChangeThingMenu() {
        return changeThingMenuVisible && <div
            className={classes.ChangeThingMenu}>
            <ContextMenu triggerRef={changeButtonRef} setShowContextMenu={setChangeThingMenuVisible}>
                <SmallButton value={'delete'} onClick={_ => deleteThing(props.thingState)}/>
                <SmallButton disabled={true} value={'archive'} onClick={_ => archiveThing(props.thingState)}/>
            </ContextMenu>
        </div>;
    }

    return (
        <div className={classes.ThingEditor}>
            {renderFile()}
            {renderDescriptionField()}
        </div>
    );
}

export default ThingEditor;