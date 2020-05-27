import React from 'react';
import {RadialChart} from 'react-vis';

export default function MyPieChart() {
    return(
        <RadialChart
            data={[
                {
                angle: 34,
                label: 'deck.gl'
                },
                {
                angle: 32,
                label: 'math.gl'
                },
                {
                angle: 22,
                label: 'probe.gl'
                },
                {
                angle: 8,
                label: 'vis.gl'
                },
                {
                angle: 12,
                label: 'react-map-gl'
                }
            ]}
            labelsRadiusMultiplier={1.3}
            labelsStyle={{ fontSize: 12}}
            showLabels
            height={300}
            width={300}
        />       
    );
}