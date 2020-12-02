#! /bin/bash

PORTAL_IMAGE=$(cat dev/PORTAL_IMAGE)
PCK_NAME=$(cat dev/PCK_NAME)
HOOKS_DIR=/opt/hooks/$PCK_NAME
PORTAL_DIR=$(cat dev/PORTAL_DIR)

docker exec -it -u "node" $PORTAL_IMAGE /bin/bash -c "cd $PORTAL_DIR; npm install $HOOKS_DIR"
