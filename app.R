library(plumber)

setwd('./')

r <- plumb("plumber.R")

# port settings
if(Sys.getenv("PORT") == "") {
    Sys.setenv(PORT = 8000)
}

r$registerHook("exit", function(){
  print("Bye bye! Plumber its closing its operations")
})

r$run(host = "0.0.0.0", port=as.numeric(Sys.getenv("PORT")), swagger = T)
