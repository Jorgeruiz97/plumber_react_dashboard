import React from 'react';
import Grid from '@material-ui/core/Grid';
import SummaryCard from './summaryCard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CallEndIcon from '@material-ui/icons/CallEnd';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import colorSelector from '../other/colorCalculation';

const color = "#fff";

export default function SummaryComponent(props) {
    // console.log(props.data)
    const numberOfRows = props.data.length;
    const aatm = Number((props.data.reduce((a, b) => (a + (b[`AVG. ACW TIME MEAN`] || 0)), 0 ) / numberOfRows).toFixed(2));
    const ahtm = Number((props.data.reduce((a, b) => (a + (b[`AVG. HANDLE TIME MEAN`] || 0)), 0 ) / numberOfRows).toFixed(2));
    const aowam = Number((props.data.reduce((a, b) => (a + (b[`% AGENT OCCUPANCY W O ACW MEAN`] || 0)), 0 ) / numberOfRows).toFixed(2));
    const per = Number((props.data.reduce((a, b) => (a + (b[`Performance MEAN`] || 0)), 0 ) / numberOfRows).toFixed(2));
    const sum = [
        {number: aatm, treshold: 2.15, label:"Avg. After Call Work", type: "Mins"},
        {number: ahtm, treshold: 8.15, label:"Avg. Handle Time", type: "Mins"},
        {number: aowam, treshold: 75, label:"Avg. Occupancy", type: "%"},
        {number: per, treshold: 100, label:"Performance", type: "%"}
    ];
    return(
        <Grid container justify="space-between" spacing={1} style={{ "marginTop": "5px" }} >
        {sum.map((v, index) => (
        <Grid key={index} item xs={12} sm={6} md={3} lg={3}>
            <SummaryCard
                title={v.label}
                icon={ 
                    index === 0 ? <AssignmentIcon fontSize="large" style={{ "fontSize": "75px", "color": color, "opacity": "0.2" }}/> :
                    index === 1 ? <CallEndIcon color="action" fontSize="large" style={{ "fontSize": "80px", "transform": "rotate(135deg)" , "color": color, "opacity": "0.2"}}/> :
                    index === 2 ? <PersonIcon color="action" fontSize="large" style={{ "fontSize": "80px", "color": color, "opacity": "0.2" }}/> :
                    index === 3 ? <EqualizerIcon color="action" fontSize="large" style={{ "fontSize": "80px", "color": color, "opacity": "0.2" }}/> :
                    <DashboardIcon  color="action" fontSize="large" style={{ "fontSize": "80px", "color": color, "opacity": "0.2" }}/>
                }
                number={v.number}
                type={v.type}
                treshold={v.treshold}
                color={color}
                backgroundColor={colorSelector(v.label, v.number, v.treshold)}
            />
        </Grid>
        ))}
    </Grid>
    );
}