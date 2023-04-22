import React from 'react';
import classes from './CellList.module.css';

interface CellListProps {
    children: React.ReactNode;
}

function CellList(props: CellListProps) {
    return (
        <div className={ classes.CellList }>
            { props.children }
        </div>
    );
}

export default CellList;