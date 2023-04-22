import React, { useState } from 'react';
import classes from './RecentlyAddedThings.module.css';
import { RecentlyAddedThing } from '../../models/RecentlyAddedThing';
import { Link } from 'react-router-dom';

interface RecentlyAddedThingsProps {
    recentlyAddedThings: RecentlyAddedThing[];
}

function RecentlyAddedThings({ recentlyAddedThings }: RecentlyAddedThingsProps) {
    const [imgVisible, setImgVisible] = useState(false);
    const [imgUrl, setImgUrl] = useState('');
    const [imgPosition, setImgPosition] = useState({ x: 0, y: 0 });

    function showPreview(flag: boolean, url: string) {
        setImgVisible(flag);
        setImgUrl(url);
    }

    function renderImg() {
        const style = {
            top: imgPosition.y + 20 + 'px',
            left: imgPosition.x + 20 + 'px'
        };
        return imgVisible && <img
            alt={ '?' }
            src={ imgUrl }
            style={ style }
            className={ classes.Preview }
        />;
    }

    function handleMove(event: React.MouseEvent<HTMLDivElement>) {
        setImgPosition({ x: event.pageX, y: event.pageY });
    }

    function getPrettyNumber(number: number) {
        let result = String(number);
        return result.length > 1 ? result : '0' + result;
    }

    function getThingInfo(thingId: number, taskOrdinalNumber: number) {
        return getPrettyNumber(thingId) + ' – ' + getPrettyNumber(taskOrdinalNumber);
    }

    return (
        <div
            onMouseMove={ handleMove }
            className={ classes.RecentlyAddedThings }>
            { renderImg() }
            { recentlyAddedThings.map(item =>
                <Link to={ `/thing/${ item.thingId }` }>
                    <div
                        className={ classes.Row }
                        onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                        onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                        <p className={ classes.U }>
                            { getThingInfo(
                                item.thingId,
                                item.taskOrdinalNumber
                            ) }
                        </p>
                        <p className={ classes.N }>@{ item.username }</p>
                        <p className={ classes.T }>{ item.addingTime }</p>
                    </div>
                </Link>
            ) }
            { recentlyAddedThings.map(item =>
                <Link to={ `/thing/${ item.thingId }` }>
                    <div
                        className={ classes.Row }
                        onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                        onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                        <p className={ classes.U }>
                            { getThingInfo(
                                item.thingId,
                                item.taskOrdinalNumber
                            ) }
                        </p>
                        <p className={ classes.N }>@{ item.username }</p>
                        <p className={ classes.T }>{ item.addingTime }</p>
                    </div>
                </Link>
            ) }
            { recentlyAddedThings.map(item =>
                <Link to={ `/thing/${ item.thingId }` }>
                    <div
                        className={ classes.Row }
                        onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                        onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                        <p className={ classes.U }>
                            { getThingInfo(
                                item.thingId,
                                item.taskOrdinalNumber
                            ) }
                        </p>
                        <p className={ classes.N }>@{ item.username }</p>
                        <p className={ classes.T }>{ item.addingTime }</p>
                    </div>
                </Link>
            ) }
            { recentlyAddedThings.map(item =>
                <Link to={ `/thing/${ item.thingId }` }>
                    <div
                        className={ classes.Row }
                        onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                        onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                        <p className={ classes.U }>
                            { getThingInfo(
                                item.thingId,
                                item.taskOrdinalNumber
                            ) }
                        </p>
                        <p className={ classes.N }>@{ item.username }</p>
                        <p className={ classes.T }>{ item.addingTime }</p>
                    </div>
                </Link>
            ) }
            { recentlyAddedThings.map(item =>
                <Link to={ `/thing/${ item.thingId }` }>
                    <div
                        className={ classes.Row }
                        onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                        onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                        <p className={ classes.U }>
                            { getThingInfo(
                                item.thingId,
                                item.taskOrdinalNumber
                            ) }
                        </p>
                        <p className={ classes.N }>@{ item.username }</p>
                        <p className={ classes.T }>{ item.addingTime }</p>
                    </div>
                </Link>
            ) }
            { recentlyAddedThings.map(item =>
                <Link to={ `/thing/${ item.thingId }` }>
                    <div
                        className={ classes.Row }
                        onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                        onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                        <p className={ classes.U }>
                            { getThingInfo(
                                item.thingId,
                                item.taskOrdinalNumber
                            ) }
                        </p>
                        <p className={ classes.N }>@{ item.username }</p>
                        <p className={ classes.T }>{ item.addingTime }</p>
                    </div>
                </Link>
            ) }
            { recentlyAddedThings.map(item =>
                <Link to={ `/thing/${ item.thingId }` }>
                    <div
                        className={ classes.Row }
                        onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                        onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                        <p className={ classes.U }>
                            { getThingInfo(
                                item.thingId,
                                item.taskOrdinalNumber
                            ) }
                        </p>
                        <p className={ classes.N }>@{ item.username }</p>
                        <p className={ classes.T }>{ item.addingTime }</p>
                    </div>
                </Link>
            ) }
            { recentlyAddedThings.map(item =>
                <Link to={ `/thing/${ item.thingId }` }>
                    <div
                        className={ classes.Row }
                        onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                        onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                        <p className={ classes.U }>
                            { getThingInfo(
                                item.thingId,
                                item.taskOrdinalNumber
                            ) }
                        </p>
                        <p className={ classes.N }>@{ item.username }</p>
                        <p className={ classes.T }>{ item.addingTime }</p>
                    </div>
                </Link>
            ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }{ recentlyAddedThings.map(item =>
            <Link to={ `/thing/${ item.thingId }` }>
                <div
                    className={ classes.Row }
                    onMouseEnter={ _ => showPreview(true, item.thingFileUrl) }
                    onMouseLeave={ _ => showPreview(false, item.thingFileUrl) }>
                    <p className={ classes.U }>
                        { getThingInfo(
                            item.thingId,
                            item.taskOrdinalNumber
                        ) }
                    </p>
                    <p className={ classes.N }>@{ item.username }</p>
                    <p className={ classes.T }>{ item.addingTime }</p>
                </div>
            </Link>
        ) }
        </div>
    );
}

export default RecentlyAddedThings;