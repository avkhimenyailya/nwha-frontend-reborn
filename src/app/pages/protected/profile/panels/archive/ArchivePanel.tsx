import React from 'react';
import {Task} from '../../../../../models/Task';
import {Thing} from "../../../../../models/Thing";

interface ArchivePanelProps {
    allTasks: Task[],
    archivedThings: Thing[]
}

function ArchivePanel(props: ArchivePanelProps) {

    return (
        <div>
            <p style={{
                color: 'orange'
            }}>Panel disabled until Tuesday, sorry</p>
        </div>
    )
}

export default ArchivePanel;