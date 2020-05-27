export function hs6(selectedBusinessUnits, selectedTeams, selectedAgents, yMetric, data) {
    return({
      title: "PBS",
      color: 0,
      level: 0,
      style: { border: '3px solid #ccc' },
      children: selectedBusinessUnits.map(bi => {
        return({
          title: bi.value,
          level: 1,
          type: "selectedBusinessUnits",
          size: (data.filter(f => f[`BUSINESS UNIT`] === bi.value).reduce((a, b) => ((a + (b[yMetric.value] || 0))) , 0)/ data.length),
          color: ((data.filter(f => f[`BUSINESS UNIT`] === bi.value).reduce((a, b) => ((a + (b["Performance MEAN"] || 0))) , 0)/ data.length) + 1) * 5 / 100,
          style: { border: "3px solid #ccc" }
        })
      })
    })
  }
  
export function hs4(selectedBusinessUnits, selectedTeams, selectedAgents, yMetric, data) {
    return({
      title: "PBS",
      color: 0,
      level: 0,
      style: { border: '3px solid #ccc', backgroundColor: "#fff" },
      children: selectedBusinessUnits.map(bi => {
        return({
          title: bi.value,
          color: 0,
          level: 1,
          type: "selectedBusinessUnits",
          style: { border: "3px solid #ccc", backgroundColor: "#fff" },
          children: selectedTeams.map(tm => {
            return({
              title: tm.value,
              level: 2,
              type: "selectedTeams",
              size: ((data.filter(f => f[`BUSINESS UNIT`] === bi.value && f.TEAM === tm.value).reduce((a, b) => ((a + (b[yMetric.value] || 0))) , 0)/ data.filter(f => f[`BUSINESS UNIT`] === bi.value && f.TEAM === tm.value).length)),
              color: ((data.filter(f => f[`BUSINESS UNIT`] === bi.value && f.TEAM === tm.value).reduce((a, b) => ((a + (b["Performance MEAN"] || 0))) , 0)/ data.filter(f => f[`BUSINESS UNIT`] === bi.value && f.TEAM === tm.value).length) + 1) * 5 / 100,
              style: { border: '3px solid #ccc' }
            })
          })
        })
      })
    })
  }
  
export function hs2(selectedBusinessUnits, selectedTeams, selectedAgents, yMetric, data) {
    return({
      title: "PBS",
      color: 0,
      level: 0,
      style: { border: '3px solid #ccc' },
      children: selectedBusinessUnits.map(bi => {
        return({
          title: bi.value,
          color: 0,
          level: 1,
          type: "selectedBusinessUnits",
          // style: { border: "3px solid #ccc" },
          children: selectedTeams.map(tm => {
            return({
              title: tm.value,
              color: 0,
              level: 2,
              type: "selectedTeams",
              style: { border: '3px solid #ccc' },
              children:  selectedAgents.map(sa => {
                return({
                  title: sa.value,
                  level: 3,
                  type: "selectedAgents",
                  size: ((data.filter(f => f[`BUSINESS UNIT`] === bi.value && f.TEAM === tm.value && f["AGENT NAME"] === sa.value).reduce((a, b) => ((a + (b[yMetric.value] || 0))) , 0)/ data.filter(f => f[`BUSINESS UNIT`] === bi.value && f.TEAM === tm.value && f["AGENT NAME"] === sa.value).length)),
                  color: ((data.filter(f => f[`BUSINESS UNIT`] === bi.value && f.TEAM === tm.value && f["AGENT NAME"] === sa.value).reduce((a, b) => ((a + (b["Performance MEAN"] || 0))) , 0)/ data.filter(f => f[`BUSINESS UNIT`] === bi.value && f.TEAM === tm.value && f["AGENT NAME"] === sa.value).length) + 1) * 5 / 100,
                  style: { border: '3px solid #ccc' }
                })
              })
            })
          })
        })
      })
    })
  }