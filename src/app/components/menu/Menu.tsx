import React from 'react';
import classes from './Menu.module.css';
import { NavLink } from 'react-router-dom';

interface MenuProps {
    linkNames?: string[][];
}

function Menu(props: MenuProps) {
    return (
        <div className={ classes.Menu }>
            {
                props.linkNames?.map((arr, index) =>
                    arr[0] &&
                    <NavLink
                        key={ index }
                        to={ arr[1] }
                        className={ ({ isActive }) =>
                            isActive ? [classes.Link, classes.Active].join(' ') : classes.Link
                        }>
                        <p>{ arr[0] }</p>
                    </NavLink>
                )
            }
        </div>
    );
}

export default Menu;