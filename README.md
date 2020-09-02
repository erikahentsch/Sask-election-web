# BL PROVINCIAL ELECTION WEB WIDGET

This widget contains the web widgets used in provincial elections each served at unique endpoints. Hosted on AWS Elastic Beanstalk, each frontend app shares a back end. 


## Setting up the Elastic Beanstalk Environment
1. sign-in to the console, navigate to https://us-east-2.console.aws.amazon.com/elasticbeanstalk/home?region=us-east-2#/environments and choose "Create a new environment"
2. Select Web server environment
3. Give the application a name, this will autofill the environment variable name. 
4. Under Platform dropdown select Node.js
5. Select "Configure more options" 
6. configure the instance as needed, make sure there is a selected Network (VPC), Security Group etc. 
7. Click Create environment
8. Once the environment has finished being created, go to the environment configuration tab, beside the "Software" category click edit. At the bottom of the page under environment properties create a new environment variable Named "PORT" with the value "4001". Click "Apply"
9. After the environment finished configuring, click "Go to environment" to start up the application.

## Deploying to AWS Elastic Beanstalk CodePipeline:
1. Create a new CodePipeline.
2. Give the pipeline a name, role name and set service role to "New Service Role". Click "Next"
3. Set Source Provider to "GitHub"
4. Connect to github using the account that holds the repository for the widget.
5. Choose the widget repository and branch (master)
6. Click "Next"
7. Skip the Build Stage
8. Choose "AWS Elastic Beanstalk" as the Deploy provider.
9. Choose the application and environment created in previous section
10. Click "Create Pipeline"
11. Wait for the pipeline to finish initializing 


## Current list of widget endpoints: 

/ - used only for dev, redirects to each widget endpoint 
/map-widget - map widget using Leaflet library
/graph-widget - pie chart/gains, losses widget
/top-widget - seat map results widget
/barchart-widget - horizontal bar graph results widget

## ENV Variables: 
Can be edited either in the source repository (GitHub) or using the Elastic Beanstalk environment variables themselves (highest priority) found in the environemnt configuration tab.

Required variables (with default): 

PORT - 4001 
    -> will need to be set-up in environment config

DATABASE - https://elector.blcloud.net 
    -> this variable tells the widget which flow database to look for each results endpoint. 
    
TIMER - 100000
    -> in ms. change this variable to adjust how frequently the app checks the database for data