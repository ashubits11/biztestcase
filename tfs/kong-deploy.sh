#!/bin/bash

###This script is for Kong v0.10.x API deployment from TFS

## This function registers an api with KONG
# $1 - cluster prefix - note: will be provided automatically by TFS environment variables
# $2 - KONG_API_NAME
# $3 - upstream_url
# $4 - uris
# $5 - request_host
function createDeployment {
  curl --fail -s -i -X POST --url https://$1.ttx.com/kong-admin-api/apis/ \
      --data "name=$2" \
      --data "upstream_url=$3" \
      --data "uris=$4" \
      --data "preserve_host=true" \
      --data "hosts=$5" 2>&1
}

## This function un-registers an api with KONG
# $1 - cluster prefix - note: will be provided automatically by TFS environment variables
# $2 - kong_api_name
function deleteDeployment {
  curl --fail -s -i -X DELETE --url https://$1.ttx.com/kong-admin-api/apis/$2 2>&1 
}
KONG_CLUSTER_PREFIX=$1
KONG_API_NAME="$INTERNAL_NAME-service"
upstream_url="http://$KONG_API_NAME.default.svc.cluster.local:4000"

echo "Attempting to register API with '$KONG_CLUSTER_PREFIX' KONG server"

kong_api_exists=$( curl -s --url https://$KONG_CLUSTER_PREFIX.ttx.com/kong-admin-api/apis/$KONG_API_NAME | grep $KONG_API_NAME )
if [ -z "$kong_api_exists" ]; then
  echo "API '$KONG_API_NAME' does not exist on '$KONG_CLUSTER_PREFIX', so we will attempt to register it with KONG"
    
  createDeployment $KONG_CLUSTER_PREFIX $KONG_API_NAME $upstream_url $REQUEST_PATH $SAM_HOST

else
  echo "API already exists on '$KONG_CLUSTER_PREFIX' KONG server, deleting existing API"

  deleteDeployment $KONG_CLUSTER_PREFIX $KONG_API_NAME

  echo "Existing API deleted, attempting new API registration with KONG"

  createDeployment $KONG_CLUSTER_PREFIX $KONG_API_NAME $upstream_url $REQUEST_PATH $SAM_HOST

fi