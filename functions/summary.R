  # start empty pivots list
  pivots <- list()
  
  # process timframe to a total in the determined time frame
  mainOneTimePeriod <- main %>%
    select(-one_of("LOGIN.ID", "MONTH")) %>%
    group_by(TYPE, BUSINESS.UNIT, TEAM, AGENT.NAME) %>%
    summarise_all(list("sum" = sum,"mean" = mean))
  names(mainOneTimePeriod) <- gsub("G.T", "G T", gsub("AU%", "AUX ", gsub("X ", "%", gsub("_sum", " SUM", gsub("_mean", " MEAN", gsub("G ", "G.", gsub("\\.", " ", names(mainOneTimePeriod))))))))
  
  # add time period in a new column
  # mainOneTimePeriod$MONTH <- paste(inputStart, inputEnd, sep = "_", collapse = NULL)
  mainOneTimePeriod$MONTH <- paste("2019-01-01", "2019-06-01", sep = "_", collapse = NULL)
  
  # pivot tables tabs
  pivots[["AUX TIME"]] <- mainOneTimePeriod %>%
    group_by(TEAM) %>%
    summarise(
      `ACD Calls` = round(sum(`ACD CALLS SUM`), 2),
      `Staffed Time (Hours)` = round(sum(`STAFFED TIME SUM`/ 60), 2),
      `Available Time (Hours)` = round(sum(`AVAILABLE TIME SUM` / 60), 2),
      `AUX Time (Hours)` = round(sum(`UNSCHEDULED AUX TIME SUM` / 60), 2),
      `AVG. % AUX Shrinkage` = round(mean(`% UN SCHEDULED AUX MEAN`), 2)
    ) %>% as.data.frame()

  pivots[["AUX TIME"]]$TEAM <- as.character(pivots[["AUX TIME"]]$TEAM)
  pivots[["AUX TIME"]] <- rbind(pivots[["AUX TIME"]], c("Totals", round(as.numeric(colSums(pivots[["AUX TIME"]][2:5])), 2), paste(round(as.numeric(colMeans(pivots[["AUX TIME"]][6])), 2), "%", sep = "")))
  
  
  pivots[["CALLS HANDLED"]] <- mainOneTimePeriod %>%
    group_by(TEAM) %>%
    summarise(
      `ACD Calls` = round(sum(`ACD CALLS SUM`), 2)
    ) %>%
    as.data.frame() %>%
    adorn_totals()

  pivots[["AVG. % ACW TIME"]] <- mainOneTimePeriod %>%
    group_by(TEAM) %>%
    summarise(
      `AVG. % Total ACW` = round(mean(`% TOTAL ACW MEAN`), 2),
      `ACD Calls` = round(sum(`ACD CALLS SUM`), 2)
    ) %>%
    as.data.frame() %>%
    adorn_totals()

  pivots[["AVG. % UNSCHEDULED AUX"]] <- mainOneTimePeriod %>%
    group_by(TEAM) %>%
    summarise(
      `AVG. % Unscheduled Aux Time` = round(mean(`% UN SCHEDULED AUX MEAN`), 2)
    ) %>%
    as.data.frame() %>%
    adorn_totals()