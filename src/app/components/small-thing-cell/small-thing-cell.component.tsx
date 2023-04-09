import React from 'react';
import classes from './small-thing-cell.module.css';

interface SmallThingCellComponentProps {
    imgUrl?: string;
    hover: boolean;
}

function SmallThingCellComponent({ imgUrl, hover }: SmallThingCellComponentProps) {

    return (
        <div className={ classes.SmallThingCell + (hover ? ' ' + classes.SmallThingCellHover : '') }>
            <img
                alt={ '?' }
                draggable={ false }
                style={ { objectFit: 'contain' } }
                src={ imgUrl ? imgUrl : 'https://cdnimages.absatz.media/images/2022.06/original/1920_629f55f9b09c60b37527f12a.jpg' }
            />
        </div>
    );
}

export default SmallThingCellComponent;