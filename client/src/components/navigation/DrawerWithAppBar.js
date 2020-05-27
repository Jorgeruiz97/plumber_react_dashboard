import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AttachmentIcon from '@material-ui/icons/Attachment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

const drawerWidth = 142.5;

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    hide: {
      display: 'none',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(5) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7) + 1,
      },
    },
    appBar: {
      marginLeft: theme.spacing(7) + 10,
      width: `calc(100% - ${theme.spacing(7) + 20}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth + 10,
      width: `calc(100% - ${drawerWidth + 20}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }
  }));

  

function Nav(props) {
    const classes = useStyles();
    const { MenuToggle, children, handleDrawerOpen, handleDrawerClose, selectPill, SelectedPill, Pills, loadingPage} = props;
    return (
      <Grid >
        <Grid item>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
          [classes.drawerOpen]: MenuToggle,
          [classes.drawerClose]: !MenuToggle,
          })}
          classes={{
          paper: clsx({
              [classes.drawerOpen]: MenuToggle,
              [classes.drawerClose]: !MenuToggle,
          }),
          }}
          open={MenuToggle}
      >
        <div style={MenuToggle ? { "marginLeft": "auto" } : { "marginLeft": "auto", "marginRight": "auto" } } >
        {
         !MenuToggle ?
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            onMouseEnter={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          :
          <IconButton onClick={handleDrawerClose} onMouseEnter={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        }
        </div>
          <List style={{ "marginTop": "35px" }} > 
          {Pills.map((pill, index) => (
            <Tooltip key={index} title={pill.PillName} placement="right-end" disableTouchListener={true} >
              <MenuItem button onClick={() => selectPill(pill)} selected={ pill.PillName === SelectedPill.PillName}>
                {index === 0 && <ListItemIcon><DashboardIcon /></ListItemIcon>}
                {index === 1 && <ListItemIcon><AssignmentIndIcon /></ListItemIcon>}
                {index === 2 && <ListItemIcon><AttachmentIcon /></ListItemIcon>}
                {index === 3 && <ListItemIcon><SettingsIcon/></ListItemIcon>}
                {index === 4 && <ListItemIcon><HelpIcon/></ListItemIcon>}
              <ListItemText primary={pill.PillName} style={{ "textAlign": "right" }}/>
              </MenuItem>
            </Tooltip>
          ))}
          {props.ColorLabels}
          </List>
      </Drawer>
        </Grid>
      <Grid item>
      <main className={clsx(classes.appBar, {[classes.appBarShift]: MenuToggle,})} >
        {
          loadingPage ?
          <Grid justify="center" container style={{ "marginTop": "250px" }}>
            <Grid item>
              <CircularProgress size={150} />
              <p>
                Building Visualisations...
              </p>
            </Grid>
          </Grid>
          :
          <div>
            {children}
          </div>
        }
      </main>
      </Grid>
      </Grid>
  ); 
}

export default Nav;