#!/bin/bash
echo -e "Begin Deployment"

KUBECTL_CLUSTER=$1

sed "s/%BUILD_BUILDNUMBER%/$BUILD_BUILDNUMBER/g;s/%IMAGE_REPO%/$IMAGE_REPO/g;s/%IMAGE_SECRET%/$IMAGE_SECRET/g;s/%INTERNAL_NAME%/$INTERNAL_NAME/g;s/%REPLICAS%/$REPLICAS/g;" tfs/sam-admin-ui.yaml | tee "tfs/sam-admin-ui-$BUILD_BUILDNUMBER.yaml"

#/home/local/TTXDOM01/svc_tfs_prd/bin/kubectl
/home/local/TTXDOM01/svc_tfs_prd/bin/kubectl --context $KUBECTL_CLUSTER apply -f "tfs/sam-admin-ui-$BUILD_BUILDNUMBER.yaml"

echo -e "Successful execution"