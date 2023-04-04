import React from 'react';
import classes from './ZeroTask.module.css';
import QuestionComponent from '../../../components/question/QuestionComponent';
import { useGetTaskByIdQuery } from '../../../api/rtkquery/tasks';

interface ZeroTaskProps {

}

function ZeroTask(props: ZeroTaskProps) {
    const { data } = useGetTaskByIdQuery(0);

    return (
        <div>
            <p className={ classes.TaskDescription }>
                { data?.description }
            </p>
            {
                data?.questions?.map(q => <QuestionComponent question={ q }/>)
            }
        </div>
    );
}

export default ZeroTask;