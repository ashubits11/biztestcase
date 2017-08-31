#!/bin/bash
echo -e "Begin Deployment"
KUBECTL_CLUSTER=$1

sed "s|%BUILD_BUILDNUMBER%|$BUILD_BUILDNUMBER|g;s|%SAM_ADMIN_API_AZURE_CLIENTID%|$SAM_ADMIN_API_AZURE_CLIENTID|g;s|%SAM_ADMIN_UI_AZURE_CLIENTID%|$SAM_ADMIN_UI_AZURE_CLIENTID|g;s|%SAM_ENGINE_AZURE_CLIENTID%|$SAM_ENGINE_AZURE_CLIENTID|g;
s|%SAM_ENGINE_ENDPOINT%|$SAM_ENGINE_ENDPOINT|g;s|%SAM_ADMIN_API_ENDPOINT%|$SAM_ADMIN_API_ENDPOINT|g;s|%BASE_HREF%|$REQUEST_PATH|g;" tfs/sam-admin-ui-configmap.yaml | tee "tfs/sam-admin-ui-configmap-$BUILD_BUILDNUMBER.yaml"

#/home/local/TTXDOM01/svc_tfs_prd/bin/kubectl
/home/local/TTXDOM01/svc_tfs_prd/bin/kubectl --context $KUBECTL_CLUSTER apply -f "tfs/sam-admin-ui-configmap-$BUILD_BUILDNUMBER.yaml"

echo -e "Successful execution"