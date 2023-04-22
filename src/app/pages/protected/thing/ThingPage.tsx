import React from 'react';
import classes from './ThingPage.module.css';
import { useParams } from 'react-router-dom';
import { thingApi } from '../../../store/api/thingApi';
import { Thing } from '../../../models/Thing';

interface ThingPageProps {

}

function ThingPage(props: ThingPageProps) {
    const { id } = useParams();

    const { data, isSuccess } = thingApi.useFetchThingByIdQuery(Number(id));

    function renderPhoto(thing: Thing) {
        return <div className={ classes.Photo }>
            <img alt={ '?' } src={ thing.fileUrl }/>
        </div>;

    }

    return (
        <div className={ classes.ThingPage }>
            { isSuccess && renderPhoto(data) }
            <div className={ classes.Info }>
            </div>
        </div>
    );
}

export default ThingPage;