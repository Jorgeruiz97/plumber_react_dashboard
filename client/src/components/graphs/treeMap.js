import React from 'react';
import { Treemap } from 'react-vis';
import { Grid, Typography, Breadcrumbs, Link, Card, CardContent } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const Hint = ({value, hoveredNodesaved, y}) => {
  return(
    value ?
    <Card elevation={24} >
      <CardContent>
      {value.parent &&
        <Typography color="textSecondary" gutterBottom >
          {value.parent.parent && `${value.parent.parent.data.title} > `}
          {value.parent.data.title}
        </Typography>}
        {value.data && 
        <Typography variant="h5" component="h2" >
          {value.data.title}
        </Typography>}
        <br/>
        <br/>
        <Typography color="textPrimary">
          {value.value && value.value !== "undefined" && `${y.value}: ${(value.value).toFixed(2)}`} 
        </Typography>
        <Typography variant="body2" component="p">
          {
            value.data.color && 
            value.data.color !== "undefined" &&
            `Performance: ${(value.data.color * 100 / 5).toFixed(2)} %`
          }
        </Typography>
        <Typography variant="body2" component="p">
          {
            value.value &&
            value.value !== "undefined" &&
            value.parent.value && value.parent.value !== "undefined" &&
            `Weigth: ${((value.value / value.parent.value) * 100).toFixed(0)} %`
          }
        </Typography>
      </CardContent>
    </Card>
    :
    <Card elevation={24} >
    <CardContent>
        <h3 style={{ color: "red" }} > 
          hover or select a leaf <br/>
          from the TreeMap <br/>
        </h3>
    </CardContent>
    </Card>
  )}

const Label = ({value}) => { 
  return(
    <div>
      <h2 style={{ marginTop: "-10px"}}>{value.title}</h2>
    </div>
  )
}

function DynamicTreemapExample(props) {
  const { hoveredNode, depth, breadCrumbs, treeMapData, hoveredNodeFunc, hoveredNodesaved, yMetric } = props;
  const bcrumb = breadCrumbs.slice(0, breadCrumbs.length - 1)
  const currentBcrumb = breadCrumbs.slice(breadCrumbs.length-1, breadCrumbs.length)
  const palette = ['#f9f9f9', '#CA3437', '#D97B36', '#E6B330', '#9ABF4A', '#37C741'];
  const wd = window.innerWidth > 900 ? window.innerWidth * 7/10 : window.innerWidth * 6/10;
  const hg = window.innerWidth > 900 ? window.innerWidth * 3.89/10 : window.innerWidth * 4.5/10;
  const treeProps = {
    data: treeMapData,
    onLeafMouseOver: x => hoveredNodeFunc({hoveredNode: x}),
    onLeafMouseOut: () => hoveredNodeFunc({hoveredNode: false}),
    onLeafClick: x => { props.handleTileClick(x); },
    getLabel: x => <Label value={x} />,
    colorDomain: [0,1,2,3,4,5],
    colorRange: palette,
    hideRootNode: true,
    renderMode: "DOM",
    height: hg,
    width: wd,
    padding: 2,
  };
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Breadcrumbs aria-label="Breadcrumb">
                {
                  bcrumb.map((b, i) => 
                    <Link key={i} color="inherit" href="/" onClick={(e) => props.handleBreadCrumpClick(e,b,i)}>
                    {b}
                    </Link>
                  )
                }
                <Typography color="textPrimary">{currentBcrumb}</Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item>
              LEVEL:
            <ToggleButtonGroup size="small" value={depth} exclusive onChange={props.handleDepth} style={{ marginRight: 48, marginLeft: 15 }}>
              <ToggleButton value={0}>
                Business Units
              </ToggleButton>
              <ToggleButton value={1}>
                Teams
              </ToggleButton>
              <ToggleButton value={2} >
                Agents
              </ToggleButton>
            </ToggleButtonGroup>
            </Grid>
          </Grid>
          <Treemap {...treeProps}/>
        </Grid>
        <Grid item xs>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="stretch"
          />
          <Grid item>
            <Hint value={hoveredNode} hoveredNodesaved={hoveredNodesaved} y={yMetric} />
          </Grid>
        </Grid>
      </Grid>
    </div>      
  );
}

export default DynamicTreemapExample;
