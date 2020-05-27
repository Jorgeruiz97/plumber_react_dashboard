import { sumBy, partial } from 'lodash';

export const palette = ['#0D3B66', '#ECC30B', '#E88D67', '#1D7874', '#96DED1', '#B5D99C', '#DE6449'];

export const BarChartData = (totalTeams, data, yMetric, dates, timeFrame) => {
  const tf = timeFrame > dates.length ? dates.length : timeFrame;
  const dts = dates.slice(dates.length - tf, dates.length)
  const teams = totalTeams.map(m => m.value);
  return(
    teams.map((team, i) =>
      dts.map(month => {
          return([{
            x: month,
            y: sumBy(
              [yMetric.value], 
              partial(
                sumBy, 
                data.filter(f => f.TEAM === team && f.MONTH === month)
              )
            ),
            team: team,
            color: palette[i]
          }])
        }
      )
    )
  )
}

export const LineChartData = (data, yMetric, dates, timeFrame) => {
  const tf = timeFrame > dates.length ? dates.length : timeFrame;
  const dts = dates.slice(dates.length - tf, dates.length)
  const totalNumber = dates.length
  return(
    dts.map(d => {
      const ySum = sumBy(
          [yMetric],
          partial(sumBy, data.filter(f => f.MONTH === d))
        )
      return({
        x: d,
        y: ySum / totalNumber
      })
    })
  )
}