import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ThingsPanel from './things/ThingsPanel';
import CollectionPanel from './collections/CollectionPanel';
import classes from './ProfilePanels.module.css';
import { Collection } from '../../../../models/Collection';
import ArchivePanel from './archive/ArchivePanel';
import { Profile } from '../../../../models/Profile';

interface ProfilePanelsProps {
    data: {
        profile: Profile,
        collections: Collection[]
    };
}

function ProfilePanels(props: ProfilePanelsProps) {

    console.log('ProfilePanels: ', props.data.profile?.profileTasks);

    return (
        <Tabs className={ classes.Panels }>
            <TabList className={ classes.Tabs }>
                <Tab
                    selectedClassName={ classes.SelectedTab }
                    className={ classes.Tab }>
                    <p>Things</p>
                </Tab>
                <Tab
                    selectedClassName={ classes.SelectedTab }
                    className={ classes.Tab }>
                    <p>Collections</p>
                </Tab>
                <Tab
                    selectedClassName={ classes.SelectedTab }
                    className={ classes.Tab }>
                    <p>Archive</p>
                </Tab>
            </TabList>
            <TabPanel>
                <ThingsPanel
                    profile={ props.data.profile }
                />
            </TabPanel>
            <TabPanel>
                <CollectionPanel
                    collections={ props.data.collections }
                />
            </TabPanel>
            <TabPanel>
                <ArchivePanel/>
            </TabPanel>
        </Tabs>
    );
}

export default ProfilePanels;