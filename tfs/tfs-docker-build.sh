#!/bin/bash
docker build -t $IMAGE_REPO/sam-admin-ui:$BUILD_BUILDNUMBER .
docker push $IMAGE_REPO/sam-admin-ui:$BUILD_BUILDNUMBER