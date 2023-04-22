import React, { useEffect } from 'react';
import classes from './Attributes.module.css';
import Menu from '../../../../components/menu/Menu';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

interface AttributesPageProps {

}

function AttributesPage(props: AttributesPageProps) {
    const location = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        if (location.pathname === '/attributes') {
            nav('CP');
        }
    }, [location.pathname, nav]);


    return (
        <div className={ classes.AttributesPage }>
            <div className={ classes.Menu }>
                <Menu
                    linkNames={ [
                        ['Conductor / Producer', 'CP'],
                        ['Mind / Feeling', 'MF'],
                        ['Order / Disorder', 'OD'],
                        ['Introvert / Extrovert', 'IE'],
                        ['Altruistic / Separate', 'AS']
                    ] }
                />
            </div>
            <div className={ classes.Content }>
                <Outlet/>
            </div>
        </div>
    );
}

export default AttributesPage;