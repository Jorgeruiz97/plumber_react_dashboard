import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

function TabContainer(props) {
  return (
    <Paper style={{ padding: 10 }} square elevation={0}>
      {props.children}
    </Paper>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


export default function TabsComponent(props) {
  // console.log(props.SelectedPill)
  return (
      <div style={{ "marginTop": 8 }}>        
        <AppBar position="static" color="primary">
          <Tabs value={props.tabValue} onChange={props.handleTabChange} elevation={0} >
            {props.tabs &&
              props.tabs.map((v, index) => <Tab key={index} label={v} />)
            }
          </Tabs>
        </AppBar>
        {
          props.SelectedPill.PillName === "General" ?
          <div>
            {props.tabValue === 0 &&
            <TabContainer>
              {props.treeMap}
            </TabContainer>}
            {props.tabValue === 1 &&
            <TabContainer>
            {props.MyResponsiveBar}
            </TabContainer>}
          </div>
          : props.SelectedPill.PillName === "Agent" &&
          <div>
            {props.tabValue === 0 &&
            <TabContainer>
              {props.AgentDash}
            </TabContainer>}
            {props.tabValue === 1 && <TabContainer>
              calculated risk of attrition
            </TabContainer>}
          </div>

        }
    </div>
  );
}