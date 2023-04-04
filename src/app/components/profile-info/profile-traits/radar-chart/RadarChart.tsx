import React, { FC, useEffect, useState } from 'react';
import classes from './RadarChart.module.css';
import { Chart as ChartJS, Filler, LineElement, PointElement, RadialLinearScale } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import defaultCallbacks from 'chart.js/dist/plugins/plugin.tooltip';

ChartJS.register(
    LineElement,
    PointElement,
    RadialLinearScale,
    Filler
);


interface RadarChartProps {

}

const RadarChart: FC<RadarChartProps> = ({}: RadarChartProps) => {
    const [ smile, setSmile ] = useState([ 30, 54, 80, 13, 91, 70, 46, 20, 87, 9 ]);


    useEffect(() => {
        setTimeout(() => {
            let rand = [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
            ];
            let arr = [
                rand[0],
                rand[1],
                rand[2],
                rand[3],
                rand[4],
                100 - rand[0],
                100 - rand[1],
                100 - rand[2],
                100 - rand[3],
                100 - rand[4]
            ];
            setSmile(arr);
        }, 800);
    }, [ smile ]);

    const labels = [ 'I', 'F', 'P', 'A', 'O', 'E', 'M', 'C', 'S', 'D' ];

    const data = {
        labels: labels,
        datasets: [ {
            label: 'W',
            data: smile,
            backgroundColor: '#2F2F33',
            borderColor: '#2F2F33'
        } ]
    };

    const options = {
        elements: {
            point: {
                radius: 0
            }
        },
        layout: {
            padding: 0
        },
        plugins: {
            colors: {
                enabled: false
            }
        },
        scales: {
            r: {
                min: 0,
                max: 100,
                angleLines: {
                    display: false
                },
                grid: {
                    display: false
                },
                pointLabels: {
                    display: false
                },
                ticks: {
                    display: false
                }
            }
        }
    };

    return (
        <div className={ classes.chart }>
            <Radar style={ { zIndex: 1 } } data={ data }
                   options={ options }/>
            { [ ...Array(5) ].map((x, i) => {
                console.log(i * 36);
                return <div style={ { rotate: (i * 36) + 'deg' } } className={ classes.line }>
                    <p style={ { rotate: -(i * 36) + 'deg' } }>{ labels[i] }</p>
                    <div className={ classes.vector }/>
                    <p style={ { rotate: -(i * 36) + 'deg' } }>{ labels[i + 5] }</p>
                </div>;
            }) }
        </div>
    );
};

export default RadarChart;