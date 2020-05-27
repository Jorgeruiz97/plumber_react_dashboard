# build main / etl
main <- read.csv("data/dummyData.csv", header = TRUE, sep = ",")
main$MONTH <- as.Date(main$MONTH, format='%m/%d/%Y')
main[is.na(main)] <- 0
main$BUSINESS.UNIT <- "Annuities"

# thresholds
acwTresh <- 2.15
ahtTresh <- 8.15
usauxTresh <- 100

# add calculated for shrikage
# forecast 2 months in advance
main$TEAM <- as.factor(main$TEAM)
# build shrinkage
main$SHRINKAGE <- ((main$`AUX.TIME` / main$`STAFFED.TIME`) * 100)

# add type
main$TYPE <- "ACTUAL"

# build performance
normalize <- function(number, tresh) { return((number - 0) / (tresh - 0)) }
acwTresh <- 2.15
ahtTresh <- 8.15
usauxTresh <- 100


main <- mutate(main,
               Performance = round(
                 (100 - ifelse(
                   (((
                     ifelse((normalize(`AVG..ACW.TIME`, acwTresh) - 1) > 0, (normalize(`AVG..ACW.TIME`, acwTresh) - 1), ifelse((normalize(`AVG..ACW.TIME`, acwTresh) - 1) < 0.25, ((normalize(`AVG..ACW.TIME`, acwTresh) - 1) * -1), 0)) +
                       ifelse((normalize(`AVG..HANDLE.TIME`, ahtTresh) - 1) > 0, (normalize(`AVG..HANDLE.TIME`, ahtTresh) - 1), ifelse((normalize(`AVG..HANDLE.TIME`, ahtTresh) - 1) < 0.25, ((normalize(`AVG..HANDLE.TIME`, ahtTresh) - 1) * -1), 0)) +
                       ifelse((normalize(`X..UN.SCHEDULED.AUX`, usauxTresh)) > 0.10, (normalize(`X..UN.SCHEDULED.AUX`, usauxTresh)), 0)
                   ) / 3) * 100) < 100,
                   (((
                     ifelse((normalize(`AVG..ACW.TIME`, acwTresh) - 1) > 0, (normalize(`AVG..ACW.TIME`, 2.15) - 1), ifelse((normalize(`AVG..ACW.TIME`, acwTresh) - 1) < 0.25, ((normalize(`AVG..ACW.TIME`, acwTresh) - 1) * -1), 0)) +
                       ifelse((normalize(`AVG..HANDLE.TIME`, ahtTresh) - 1) > 0, (normalize(`AVG..HANDLE.TIME`, 8.15) - 1), ifelse((normalize(`AVG..HANDLE.TIME`, ahtTresh) - 1) < 0.25, ((normalize(`AVG..HANDLE.TIME`, 8.15) - 1) * -1), 0)) +
                       ifelse((normalize(`X..UN.SCHEDULED.AUX`, usauxTresh)) > 0.10, (normalize(`X..UN.SCHEDULED.AUX`, usauxTresh)), 0)
                   ) / 3) * 100),100
                 ))
                 ,2)
)

occupancyTresh <- 75
shrinkageTresh <- 20
performanceTresh <- 100
unscheduledTresh <- 18

# build risk
main <- mutate(main,
               RISK = round(
                 (ifelse(
                   (((
                     ifelse((normalize(`X..AGENT.OCCUPANCY.W..ACW`, occupancyTresh) - 1) > 1.10, (normalize(`X..AGENT.OCCUPANCY.W..ACW`, occupancyTresh) - 1), ifelse((normalize(`X..AGENT.OCCUPANCY.W..ACW`, occupancyTresh) - 1) < 0.90, ((normalize(`X..AGENT.OCCUPANCY.W..ACW`, occupancyTresh) - 1) * -1), 0)) +
                       ifelse((normalize(`SHRINKAGE`, mean(`SHRINKAGE`)) - 1) > 1, (normalize(`SHRINKAGE`, mean(`SHRINKAGE`)) - 1), ifelse((normalize(`SHRINKAGE`, mean(`SHRINKAGE`)) - 1) < 0.5, ((normalize(`SHRINKAGE`, mean(`SHRINKAGE`)) - 1) * -1), 0)) +
                       ifelse((normalize(`Performance`, performanceTresh) - 1) > 1, (normalize(`Performance`, performanceTresh) - 1), ifelse((normalize(`Performance`, performanceTresh) - 1) < 0.75, ((normalize(`Performance`, performanceTresh) - 1) * -1), 0)) +
                       ifelse((normalize(`X..UN.SCHEDULED.AUX`, unscheduledTresh)) > 0.10, (normalize(`X..UN.SCHEDULED.AUX`, unscheduledTresh)), 0)
                   ) / 3) * 100) < 100,
                   (((
                     ifelse((normalize(X..AGENT.OCCUPANCY.W..ACW, occupancyTresh) - 1) > 1.10, (normalize(`X..AGENT.OCCUPANCY.W..ACW`, occupancyTresh) - 1), ifelse((normalize(`X..AGENT.OCCUPANCY.W..ACW`, occupancyTresh) - 1) < 0.90, ((normalize(`X..AGENT.OCCUPANCY.W..ACW`, occupancyTresh) - 1) * -1), 0)) +
                       ifelse((normalize(`SHRINKAGE`, mean(SHRINKAGE)) - 1) > 1, (normalize(`SHRINKAGE`, mean(`SHRINKAGE`)) - 1), ifelse((normalize(`SHRINKAGE`, mean(`SHRINKAGE`)) - 1) < 0.5, ((normalize(`SHRINKAGE`, mean(`SHRINKAGE`)) - 1) * -1), 0)) +
                       ifelse((normalize(`Performance`, performanceTresh) - 1) > 1, (normalize(`Performance`, performanceTresh) - 1), ifelse((normalize(`Performance`, performanceTresh) - 1) < 0.75, ((normalize(`Performance`, performanceTresh) - 1) * -1), 0)) +
                       ifelse((normalize(`X..UN.SCHEDULED.AUX`, unscheduledTresh)) > 0.10, (normalize(`X..UN.SCHEDULED.AUX`, unscheduledTresh)), 0)
                   ) / 3) * 100), 100
                 ))
                 ,2)
)

# Forecast everything 2 months in advance

# MeanSumTotal
MeanSumTotal <- main %>%
  dplyr::select(-one_of("LOGIN.ID", "AGENT.NAME")) %>%
  group_by(TYPE, MONTH, BUSINESS.UNIT, TEAM) %>%
  summarise_all(list("sum" = sum,"mean" = mean))
names(MeanSumTotal) <- gsub("G.T", "G T", gsub("AU%", "AUX ", gsub("X ", "%", gsub("_sum", " SUM", gsub("_mean", " MEAN", gsub("G ", "G.", gsub("\\.", " ", names(MeanSumTotal))))))))

# names to remove in Mean Sum Total
namesToRemove <- c(names(MeanSumTotal[ ,  grepl("AVG.", names(MeanSumTotal)) & grepl("SUM", names(MeanSumTotal))]),
                   names(MeanSumTotal[ ,  grepl("%", names(MeanSumTotal)) & grepl("SUM", names(MeanSumTotal))]))
# remove names
MeanSumTotal <- MeanSumTotal[, !names(MeanSumTotal) %in% namesToRemove]

# MeanSumTotalWithAgent
MeanSumTotalWithAgent <- main %>%
  dplyr::select(-one_of("LOGIN.ID")) %>%
  group_by(TYPE, MONTH, BUSINESS.UNIT, TEAM, AGENT.NAME) %>%
  summarise_all(list("sum" = sum,"mean" = mean))
names(MeanSumTotalWithAgent) <- gsub("G.T", "G T", gsub("AU%", "AUX ", gsub("X ", "%", gsub("_sum", " SUM", gsub("_mean", " MEAN", gsub("G ", "G.", gsub("\\.", " ", names(MeanSumTotalWithAgent))))))))

# names to remove in Mean Sum Total
namesToRemoveWithAgent <- c(names(MeanSumTotalWithAgent[ ,  grepl("AVG.", names(MeanSumTotalWithAgent)) & grepl("SUM", names(MeanSumTotalWithAgent))]),
                            names(MeanSumTotalWithAgent[ ,  grepl("%", names(MeanSumTotalWithAgent)) & grepl("SUM", names(MeanSumTotalWithAgent))]))

# remove names
MeanSumTotalWithAgent <- MeanSumTotalWithAgent[, !names(MeanSumTotalWithAgent) %in% namesToRemoveWithAgent]