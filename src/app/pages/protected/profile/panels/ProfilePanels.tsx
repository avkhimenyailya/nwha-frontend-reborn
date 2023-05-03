import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ThingsPanel from './things/ThingsPanel';
import classes from './ProfilePanels.module.css';
import { CollectionThings } from '../../../../models/CollectionThings';
import { Profile } from '../../../../models/Profile';

interface ProfilePanelsProps {
    profile: Profile,
    collections: CollectionThings[]
}

function ProfilePanels(props: ProfilePanelsProps) {

    return (
        <Tabs className={ classes.Panels }>
            <TabList className={ classes.Tabs }>
                <Tab
                    selectedClassName={ classes.SelectedTab }
                    className={ classes.Tab }>
                    <p>Things</p>
                </Tab>
            </TabList>
            <TabPanel>
                <ThingsPanel profile={ props.profile }/>
            </TabPanel>
        </Tabs>
    );
}

export default ProfilePanels;