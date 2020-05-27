etl <- function(wd = getwd()) {
  
  # variables
  dtf <- list()
  df <- list()
  
  # build dtf
  for (year in list.files(wd)) {
    for (month in list.files(paste(wd, year, sep = "/"))) {
      for (manager in list.files(paste(wd, year, month, sep = "/"))) {
        for (report in list.files(paste(wd, year, month, manager, sep = "/"), pattern = ".csv")) {
          if (grepl("AUX", report)) {
            temp <- read.csv(
              paste(wd, year, month, manager, report, sep = "/"),
              header = FALSE,
              sep = ",",
              na.strings = "NA",
              stringsAsFactors = FALSE
            )
            # process data
            # add headers
            names(temp) <- headers[["group_aux"]]
            
            # manager
            temp$TEAM <- gsub(" ","_", temp[1,1])
            
            # time period MAKE IT POSITXT
            temp$MONTH <- as.Date(temp[2,1],format='%m/%d/%Y')
            
            # erase unnecessary stuff
            temp <- temp[-c(1,2,3),]
            
            # erase ted
            temp <- temp[!(temp$`AGENT NAME` == "DELGADO TED"),]
            
            # erase totals
            temp <- temp[!(temp$`AGENT NAME` == "Totals"),]
            
            dtf[["group_aux"]][[paste(manager, month, gsub(" ", "_", gsub(".csv","", report)), sep = "_")]] <- temp
            
          } else if (grepl("Summary", report)) {
            temp <- read.csv(
              paste(wd, year, month, manager, report, sep = "/"),
              header = FALSE,
              sep = ",",
              na.strings = "NA",
              stringsAsFactors = FALSE
            )
            
            # process data
            # add headers
            names(temp) <- headers[["group_summary"]]
            
            # manager
            temp$TEAM <- gsub(" ","_", temp[1,1])
            
            # time period MAKE IT POSITXT
            temp$MONTH <- as.Date(temp[2,1],format='%m/%d/%Y')
            
            # erase unnecessary stuff
            temp <- temp[-c(1,2,3),]
            
            # erase ted
            temp <- temp[!(temp$`AGENT NAME` == "DELGADO TED"),]
            
            # erase totals
            temp <- temp[!(temp$`AGENT NAME` == "Totals"),]
            
            dtf[["group_summary"]][[paste(manager, month, gsub(" ", "_", gsub(".csv","", report)), sep = "_")]] <- temp
            
          } else if (grepl("Performance", report)) {
            temp <- read.csv(
              paste(wd, year, month, manager, report, sep = "/"),
              header = FALSE,
              sep = ",",
              na.strings = "NA",
              stringsAsFactors = FALSE
            )
            # process data
            # add headers
            names(temp) <- headers[["group_performance"]]
            
            # manager
            temp$TEAM <- gsub(" ","_", temp[2,1])
            
            # time period MAKE IT POSITXT
            temp$MONTH <- as.Date(temp[1,1],format='%m/%d/%Y')
            
            # erase unnecessary stuff
            temp <- temp[-c(1,2,3),]
            
            # erase ted
            temp <- temp[!(temp$`AGENT NAME` == "DELGADO TED"),]
            # erase totals
            temp <- temp[!(temp$`AGENT NAME` == "Totals"),]
            
            dtf[["group_performance"]][[paste(manager, month, gsub(" ", "_", gsub(".csv","", report)), sep = "_")]] <- temp
            
          } else {
            print("IDK what report is this")
          }
          rm(temp, report)
        }
        rm(manager)
      }
      rm(month)
    }
    rm(year)
  }
  
  # build list with datframes
  for (ls in 1:length(dtf)) {
    for (r in 1:length(ls)) {
      df[[names(dtf[ls])]] <- do.call(rbind, dtf[ls][[r]])
    }
  }
  
  # build main
  main <- df %>% purrr::reduce(full_join, by = c("AGENT NAME", "TEAM", "MONTH", "STAFFED TIME"))
  
  # erase duplicates
  main <- subset(main, select = which(!sapply(names(main), function(x) grepl(".y", x))))
  
  # change names of columns who have duplicates
  names(main) <- gsub(pattern = ".x", replacement = "", x = names(main))
  
  # seconds to minutes in the respective columns
  main[,grepl("TIME", names(main))] <- sapply(main[,grepl("TIME", names(main))], function(x) round(as.numeric(x)/60, 2))
  
  # remove unnecessary stuff for faster processing
  rm(dtf)
  rm(ls)
  rm(r)
  rm(df)
  
  # assign correct datatypes
  main$`AGENT NAME` <- as.factor(main$`AGENT NAME`)
  main$TEAM <- as.factor(main$TEAM)
  return(main)
}