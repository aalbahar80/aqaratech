#!/bin/bash

if [[ $ENV_NAME == "prod" || $ENV_NAME == "production" ]]; then
  echo "true"
else
  echo "false"
fi