#
# This is a Plumber API. You can run the API by clicking
# the 'Run API' button above.
#
# Find out more about building APIs with Plumber here:
#
#    https://www.rplumber.io/
#

library(dplyr)
library(plumber)
library(reshape2)
library(janitor)
library(forecast)

# source('functions/forecast.R')
# source('functions/summary.R')
# source('functions/transform.R')

#* Log some information about the incoming request
#* @filter logger
function(req){
  cat(as.character(Sys.time()), "-", 
      req$REQUEST_METHOD, req$PATH_INFO, "-", 
      req$HTTP_USER_AGENT, "@", req$REMOTE_ADDR, "\n")
  plumber::forward()
}

#' @filter cors
cors <- function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}

#* Echo back list with dataframes, filters and summary stats
#' @serializer unboxedJSON
#' @get /data
function(){
  # data <- list(
  #   "MeanSumTotal" = MeanSumTotal,
  #   "MeanSumTotalWithAgent" = MeanSumTotalWithAgent,
  #   "MeanSumTotalMelted" = MeanSumTotalMelted
  # )
  # 
  # return(data)
  list()
}

#* Echo back list with dataframes, filters and summary stats
#' @serializer unboxedJSON
#' @get /filters
function(){
  # filters <- list(
  #   "businessUnits" = levels(as.factor(main$BUSINESS.UNIT)),
  #   "teams" = levels(main$TEAM),
  #   "agents" = levels(main$AGENT.NAME),
  #   "start" = levels(as.factor(main$MONTH)),
  #   "end" = levels(as.factor(main$MONTH)),
  #   "Ymetrics" = names(MeanSumTotal[-c(1,2,3,4)])
  # )

  # return(filters)
  list()
}

# excel file
#' echo back the excel files
#' @get /excelfile
function() {
  # start empty pivots list
  pivots <- list()

    # return
    return(pivots)
}

#' echo back created forecasts
#' @get /forecasts
function() {
  # return(createForecasts(main))
  list()
}

# FRONT PAGE
#' @assets ./client/build /
list()
