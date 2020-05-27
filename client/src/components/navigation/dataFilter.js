import React from 'react';
import TuneIcon from '@material-ui/icons/Tune';
import { makeStyles } from '@material-ui/core/styles';
import { ClickAwayListener, Paper, Fab, Tooltip } from '@material-ui/core';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Slide from '@material-ui/core/Slide';

const animatedComponents = makeAnimated();

const useStyles = makeStyles(theme => ({
    paper: {
        position: "fixed",
        top: "auto",
        bottom: 120,
        left: "auto",
        right: 45,
        width: 350,
        padding: 15
    },
    select: {
        marginTop: 5,
        marginBottom: 20
    },
    fab: {
        position: "fixed",
        top: "auto",
        bottom: 20,
        right: 30,
        left: 'auto',
        margin: 0
    }
}))
function DataFilter(props) {
    const[open, setOpen] = React.useState(false);
    const classes = useStyles();
    const { handleInputChange, filters, state } = props;

    const handleClick = () => {
        setOpen(prev => !prev);
    }

    const handleClickAway = () => {
        setOpen(false);
    }
    return (
        <React.Fragment>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className={classes.root}>
                <Tooltip title="Data Filter" placement="bottom" >
                    <Fab 
                        aria-label="Data Filter"
                        color = "primary"
                        variant="extended"
                        onClick = {handleClick}
                        className={classes.fab}
                    >
                        <TuneIcon style={{ "marginRight": 5 }} /> Data Filter
                    </Fab>
                </Tooltip>
                <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                    <Paper className={classes.paper} elevation={20} >
                        <div>
                            <span>Business Units</span>
                            <Select
                                isMulti
                                isClearable={false}
                                backspaceRemovesValue={false}
                                value={state.selectedBusinessUnits}
                                defaultValue={state.selectedBusinessUnits}
                                components={animatedComponents}
                                options={filters.businessUnits.map((v) => { return({"label": v, "value": v}) })}
                                className={classes.select}
                                styles={state.selectedBusinessUnits.length === 1 ? { multiValueRemove: (base) => ({ ...base, display: 'none' }) } : { multiValueRemove: (base) => ({ ...base }) } }
                                onChange={(ns)=> {if(ns !== null){handleInputChange(ns, "selectedBusinessUnits")}}}
                            />
                        </div>
                        <div>
                            <span>Teams</span>
                            <Select
                                isMulti
                                backspaceRemovesValue={false}
                                value={state.selectedTeams}
                                defaultValue={state.selectedTeams}
                                components={animatedComponents}
                                options={filters.teams.map((v) => { return({"label": v, "value": v}) })}
                                className={classes.select}
                                styles={state.selectedTeams.length === 1 ? { multiValueRemove: (base) => ({ ...base, display: 'none' }) } : { multiValueRemove: (base) => ({ ...base }) } }
                                onChange={(ns)=> {if(ns !== null){handleInputChange(ns, "selectedTeams")}}}
                            />
                        </div>
                        {/* <div>
                            <span>Focus on Agents</span>
                            <Select
                                backspaceRemovesValue={false}
                                value={state.selectedAgents}
                                defaultValue={state.selectedAgents}
                                components={animatedComponents}
                                options={filters.agents}
                                className={classes.select}
                                classNamePrefix="select"
                                onChange={(ns)=> {if(ns !== null){handleInputChange(ns, "selectedAgents")}}}
                                onMenuClose={filterDataset}
                            />
                        </div> */}
                        <div>
                            <span>Starting Month:</span>
                            <Select                                
                                value={state.startDate}
                                defaultValue={state.startDate}
                                components={animatedComponents}
                                options={filters.start.filter(f => f <= state.endDate.value).map((v) => { return({"label": v, "value": v}) })}
                                className={classes.select}
                                classNamePrefix="select"
                                onChange={(ns)=> {if(ns !== null){handleInputChange(ns, "startDate")}}}
                            />
                        </div>
                        <div>
                            <span>Last Month:</span>
                            <Select
                                defaultValue={state.endDate}
                                value={state.endDate}
                                components={animatedComponents}
                                options={filters.end.filter(f => f >= state.startDate.value).map((v) => { return({"label": v, "value": v}) })}
                                className={classes.select}
                                classNamePrefix="select"
                                onChange={(ns)=> {if(ns !== null){handleInputChange(ns, "endDate")}}}
                            />
                        </div>
                        <div>
                            <span>Metrics to Analyze</span>
                            <Select
                                isClearable={false}
                                backspaceRemovesValue={false}
                                defaultValue={state.yMetric}
                                value={state.yMetric}
                                components={animatedComponents}
                                className={classes.select}
                                options={filters.Ymetrics.map((v) => { return({"label": v, "value": v}) })}
                                styles={state.yMetric.length === 1 ? { multiValueRemove: (base) => ({ ...base, display: 'none' }) } : { multiValueRemove: (base) => ({ ...base }) } }
                                onChange={(ns)=> {if(ns !== null){handleInputChange(ns, "yMetric")}}}
                            />
                        </div>
                    </Paper>
                </Slide>
                </div>
            </ClickAwayListener>
        </React.Fragment>
    );
}

export default DataFilter;