import React from 'react';
import { Grid, Typography, Card, CardContent, Breadcrumbs, Link } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { FlexibleWidthXYPlot, XAxis, YAxis, HorizontalGridLines,
  DiscreteColorLegend, VerticalBarSeries, LineSeries, Hint } from 'react-vis';
import { curveBundle } from 'd3-shape';
import { palette } from '../datahandlers/barchartData';
import { LineChartData } from '../datahandlers/barchartData';

function Example(props) {
  const {yMetric, fff, hint2, selectedTeams, timeframeForBarChart, breadCrumbs, BarChartData, data } = props;
  const items = selectedTeams.map((t, i) => {return({title: t.value, color: palette[i], strokeWidth: 15})})
  const bcrumb = breadCrumbs.slice(0, breadCrumbs.length - 1)
  const currentBcrumb = breadCrumbs.slice(breadCrumbs.length-1, breadCrumbs.length)
  const lcdt = LineChartData(data, yMetric.value, props.dates, props.timeframeForBarChart)
  console.log(lcdt)
  return (
    <div>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        direction="row"
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
          TIME PERIOD: 
          <ToggleButtonGroup size="small" value={timeframeForBarChart} exclusive onChange={(e, w) => props.handleTimeperiodToAnalyse(e, w)} style={{ marginRight: 48, marginLeft: 15 }}>
            <ToggleButton value={12}>
              1 Year
            </ToggleButton>
            <ToggleButton value={6}>
              6 Months
            </ToggleButton>
            <ToggleButton value={3} >
              3 Months
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <Grid item>
          <Typography variant="h6" component="h2" style={{ fontWeight: 800, textAlign: "center" }} >
            {yMetric.value}
          </Typography>
        </Grid>
      <Grid container
        justify="flex-start"
        alignItems="center"
        direction="row"
      >
        <Grid item >
          <FlexibleWidthXYPlot 
            xType="ordinal" width={window.innerWidth * 0.825} height={400} 
            style={{ marginTop: 15 }}
          >
            <HorizontalGridLines />
            <LineSeries getNull={(d) => d.y !== null} data={lcdt} curve={curveBundle.beta(0.5)}
                onValueMouseOver={(x) => fff(x)} color="#8b0000"
                onValueMouseOut={(x) => fff(false)}
            />
            {BarChartData.map((dtfm) =>
              dtfm.map((dt, i) =>
                <VerticalBarSeries 
                  data={dt}
                  color={dt[0].color}
                  onValueMouseOver={(x) => fff(x)}
                  onValueMouseOut={(x) => fff(false)}
                />
              )
            )}

            {hint2 !== false && <Hint value={hint2}>
              <Card style={{background: 'black', color: "#fff" }}>
                <CardContent>
                  <Typography variant="h4">
                    {hint2.team}
                  </Typography>
                  <br/>
                  <Typography variant="subtitle1">
                    {`${yMetric.value}: ${hint2.y}`}
                  </Typography>
                </CardContent>
              </Card>
            </Hint> }

            <XAxis/>
            <YAxis tickSize={-20} /> 
          </FlexibleWidthXYPlot>
          <Typography variant="h6" component="h2" style={{ fontWeight: 800, textAlign: "center" }} >
            MONTHS
          </Typography>
        </Grid>
        <Grid item lg={1} >
          <DiscreteColorLegend items={items} orientation={window.innerWidth < 700 ? "horizontal" : "vertical"} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Example;
