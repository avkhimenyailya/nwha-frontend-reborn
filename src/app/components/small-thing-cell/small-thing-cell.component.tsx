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
                src={ imgUrl ? imgUrl : 'https://lifehacker.ru/wp-content/uploads/2021/02/Trinity-Matrix-phone-booth_1613043690.jpg' }
            />
        </div>
    );
}

export default SmallThingCellComponent;