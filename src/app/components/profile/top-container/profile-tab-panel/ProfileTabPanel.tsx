import React from 'react';
import classes from './ProfileTabPanel.module.css';
import Menu from '../../../menu/Menu';

interface ProfileTabPanelProps {
    foreign: boolean;
}

function ProfileTabPanel(props: ProfileTabPanelProps) {
    return (
        <div className={ classes.ProfileTabPanel }>
            <Menu linkNames={ [
                ['Things', 'things'],
                ['Collections', 'collections'],
                props.foreign ? [] : ['Archive', 'archive']
            ] }/>
        </div>
    );
}

export default ProfileTabPanel;