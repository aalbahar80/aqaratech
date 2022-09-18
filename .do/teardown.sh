#!/bin/bash

SPEC_NAME=$1

# List all apps
doctl app list

# Sample output:

# ID                                      Spec Name                 Default Ingress                                            Active Deployment ID                    In Progress Deployment ID    Created At                       Updated At
# bea9d854-c465-4d5a-85d3-13e029028e16    init-common-env-module    https://init-common-env-module-gnt4g.ondigitalocean.app    cf46e14b-95af-42f9-b2da-01061c968f7a                                 2022-09-17 23:52:02 +0000 UTC    2022-09-18 00:10:59 +0000 UTC
# 9034ac21-daa4-49a5-8767-a13d3a25552b    master                    https://master-rhzk5.ondigitalocean.app                    ae19d16f-6786-4977-b1d3-ccb9196176cb                                 2022-09-16 15:47:08 +0000 UTC    2022-09-18 00:25:13 +0000 UTC
# 5d258d70-3fbd-4909-8eb9-263f17a43dfc    aqaratech-app-prod        https://aqaratech-app-prod-tcxpp.ondigitalocean.app        49bd1665-23c1-468f-a431-2b8d8ec567fc                                 2022-08-18 13:12:38 +0000 UTC    2022-09-18 00:04:51 +0000 UTC

# Select app ID by spec name
APP_ID=$(doctl app list | grep $SPEC_NAME | awk '{print $1}')

# Abort if more than one app is found
if [ $(echo $APP_ID | wc -w) -gt 1 ]; then
  echo "More than one app found"
  echo "Exiting..."
  exit 1
fi

# Delete app by ID
doctl app delete $APP_ID
