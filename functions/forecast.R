# build predictive model
createForecasts <- function(data) {
  # empty df to fill
  dtf <- data.frame()
  forecastedDf <- data.frame()
  # for loop to forecast each metric
  for (agent in levels(data$AGENT.NAME)[1]) {
    filteredAgentData <- data %>% filter(AGENT.NAME == agent)
    filteredAndOrderedAgentData <- filteredAgentData[order(as.Date(filteredAgentData$MONTH, format="%d/%m/%Y")), ]
    for (variable in names(filteredAgentData[, -c(1,2,15,16,17)])[1]) {
      dtf <- data.frame()
      dataTimeSeries <- ts(
        filteredAgentData[, variable],
        start = c(
          as.numeric(substring(filteredAndOrderedAgentData$MONTH[1], 1,4)),
          as.numeric(substring(filteredAndOrderedAgentData$MONTH[1], 6,7))
        ),
        frequency = 12
      )
      model <- dataTimeSeries %>% ets()
      forecast <- model %>% forecast(h = 2)
      accuracy <- forecast %>% accuracy()
      
      print(forecast)
      
      # merge forecast with current values
      metric <- c(filteredAgentData[, variable], as.numeric(forecast$mean))
      # dtf[variable] <- metric
    }
  }
  # rbind data with forecastedDtf
  # newDf <- rbind(data, forecastedDf)
  return(forecast)
}