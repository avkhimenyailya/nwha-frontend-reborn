import React from 'react';
import classes from './Basket.module.css';
import DescriptionField from './description-field/DescriptionField';

interface BasketProps {

    children?: React.ReactNode;
}

function Basket(props: BasketProps) {
    return (
        <div className={ classes.Basket }>
            { props.children }

        </div>
    );
}

export default Basket;