# start from the rocker/r-ver:3.6.1 image
FROM trestletech/plumber
      
# install packages
RUN R -e "install.packages('plumber')"
RUN R -e "install.packages('dplyr')"
RUN R -e "install.packages('forecast')"
RUN R -e "install.packages('janitor')"

# copy everything from the current directory into the container
COPY / /

# open port 80 to traffic
EXPOSE 8000

# when the container starts, start the main.R script
ENTRYPOINT ["Rscript", "app.R"]
CMD ["Rscript", "app.R"]