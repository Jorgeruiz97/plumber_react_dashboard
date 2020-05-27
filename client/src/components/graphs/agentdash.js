import React from 'react';
import { Hint, FlexibleWidthXYPlot, XAxis, YAxis, VerticalGridLines, RadialChart,
    HorizontalGridLines, VerticalBarSeries, LineSeries } from 'react-vis';
import { Grid, Typography, Breadcrumbs, Link, Card, CardContent } from '@material-ui/core';
import { curveBundle } from 'd3-shape';
import { sumBy, partial } from 'lodash';

const colors = [
    "#FBF5F3", "#8DAA9D", "#522B47", "#7B0828",
    "#0F0E0E", "#008000", "#82A7A6", "#656839",
    "#573280", "#4F7CAC", "#F4AFAB"
]

const metricsNames = [
    "LUNCH", "BREAK", "CALL COACHING", "CASE WORK", "EXTERNAL SUPPORT", "OTHER PRODUCTIVE WORK",
    "STARTUP TIME", "SYSTEM ISSUES", "TRAIN MEET PROJECT MEAN", "UNSCHEDULED BREAK", "UNSCHEDULED AUX TIME"
  ]

function AgentDash(props) {
    const { breadCrumbs, hintValue, asd, fff, hint2, yMetric } = props;
    const bcrumb = breadCrumbs.slice(0, breadCrumbs.length - 1)
    const currentBcrumb = breadCrumbs.slice(breadCrumbs.length-1, breadCrumbs.length)
    
    const reportcard = (data) => {
        const metrics = ["ACD CALLS SUM", "AVG. ACD TIME MEAN", "% UN SCHEDULED AUX MEAN", "SHRINKAGE MEAN", "RISK MEAN"]
        const metricsNames = ["ACD CALLS", "AVG. ACD TIME", "% UN-SCHEDULED AUX", "SHRINKAGE", "RISK OF ATTRITION"]
        return(
            metrics.map((metric, i) => {
                const sum = sumBy([metric], partial(sumBy, data));
                const avg = (sumBy([metric], partial(sumBy, data)) / data.length).toFixed(2);
                return({
                    title: metricsNames[i],
                    value: metric === "ACD CALLS SUM" ? sum : avg,
                    type: i === 0 || i === 1 ? "" : "%"
                })
          })
        )
      }
      const dt = reportcard(props.MeanSumTotalWithAgentForAD)

      const pieChart = (data) => {
          const metrics = [
              "TIME IN LUNCH MEAN", "TIME IN BREAK MEAN", "TIME IN CALL COACHING MEAN",
              "TIME IN CASE WORK MEAN", "TIME IN EXTERNAL SUPPORT MEAN",
              "TIME IN OTHER PRODUCTIVE WORK MEAN", "TIME IN STARTUP TIME MEAN", "TIME IN SYSTEM ISSUES MEAN",
              "TIME IN TRAIN MEET PROJECT MEAN", "TIME IN UNSCHEDULED BREAK MEAN", "UNSCHEDULED AUX TIME MEAN"
            ]
          return(
              metrics.map((metric, i) => {
                const sum = sumBy([metric], partial(sumBy, data));
                return({
                    angle: sum,
                    label: metricsNames[i],
                    value: sum,
                    color: colors[i]
                })
              })
          )
      }

      const pc = pieChart(props.MeanSumTotalWithAgentForAD)

      const Historical = (data, yMetric) => {
        return(
          data.map((d, i) => {
            return({
                label: yMetric.value,
                x: d.MONTH,
                y: sumBy([yMetric.value], partial(sumBy, data.filter(f => f.MONTH === d.MONTH)))
              })
          })
        )
      }
    const hist = Historical(props.MeanSumTotalWithAgentForAD, yMetric)
    const items = metricsNames.map((t, i) => {return({title: t, color: colors[i]})})
    console.log(props.MeanSumTotalWithAgentForAD)
    if (breadCrumbs.length < 4) {
        return(
            <Typography style={{ color: "red" }} variant="h4" >
                please select an agent from the TreeMap at the general overview tab
            </Typography>
        )
    } else {
        return(
            <div>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="stretch"
                >
                    <Grid item >
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid item lg={12} >
                                <Card style={{ width: window.innerWidth > 900 ? window.innerWidth * 0.65 : window.innerWidth * 0.75, marginTop: 15 }} elevation={6} >
                                    <CardContent>
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
                                        <Grid container direction="row" justify="space-between" alignItems="center" style={{ paddingTop: 8 }} >
                                            {
                                                dt.map((m, i) =>
                                                    <Grid key={i} item>
                                                        <Typography variant="subtitle2" align="center" >
                                                            {m.title}
                                                        </Typography>
                                                        <Typography variant="h4" align="right" >
                                                            {m.value}<span>{m.type}</span>
                                                        </Typography>
                                                    </Grid>
                                                )
                                            }
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item lg={12} sm={12} >
                                <FlexibleWidthXYPlot 
                                    xType="ordinal" width={window.innerWidth > 900 ? window.innerWidth * 0.65 : window.innerWidth * 0.75} height={300} 
                                    style={{ marginTop: 35 }}
                                >
                                    <VerticalGridLines />
                                    <HorizontalGridLines />

                                    <VerticalBarSeries data={hist} 
                                        barWidth={0.4}
                                        onValueMouseOver={(x) => fff(x)}
                                        onValueMouseOut={(x) => fff(false)}
                                        color="#ccc"
                                    />

                                    <LineSeries getNull={(d) => d.y !== null} data={hist} curve={curveBundle}
                                        onValueMouseOver={(x) => fff(x)} color="red"
                                        onValueMouseOut={(x) => fff(false)}
                                    />

                                    {hint2 !== false && 
                                        <Hint value={hint2}>
                                            <Card style={{background: 'black', color: "#fff" }}>
                                                <CardContent>
                                                    <Typography variant="subtitle2">
                                                        {hint2.x}
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        {`${hint2.label}: ${hint2.y}`}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Hint>
                                    }
                                    <XAxis title="MONTHS" style={{ title: {fontWeight: 800, fontSize: 20, fill: "#000"} }} />
                                    <YAxis title={yMetric.value} style={{ title: {fontWeight: 800, fontSize: 20, fill: "#000"} }}  />
                                </FlexibleWidthXYPlot>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={3} md={12} sm={12}>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Grid item>
                                <Typography variant="h5" >
                                    Agent Total AUX Time Distribution
                                </Typography>
                                <RadialChart
                                    data={pc}
                                    onValueMouseOver={(x) => hintValue(x)}
                                    onSeriesMouseOut={(x) => hintValue(false)}
                                    height={350}
                                    width={300}
                                    colorType="literal"
                                >
                                    {
                                        asd !== false &&
                                        <Hint value={asd}>
                                            <Card style={{background: 'black', color: "#fff" }}>
                                                <CardContent>
                                                <Typography variant="h5">
                                                    {asd.team}
                                                </Typography>
                                                <br/>
                                                <Typography variant="subtitle2">
                                                    {`${asd.label}: ${asd.value}`}
                                                </Typography>
                                                </CardContent>
                                            </Card>
                                        </Hint>
                                    }
                                </RadialChart>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
// add breadcrumbs
// populate data
// agent card

export default AgentDash;
