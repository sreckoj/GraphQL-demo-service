#!/bin/bash

namespace=$1

if [ -z $namespace ]
then
    echo ""
    echo "Usage: ./setup-graphql-service.sh <namespace>"
    echo ""
    echo "Arguments:"
    echo ""
    echo "- <namespace> :   The namespace into which the GraphQL service will be deployed."
    echo "                  It will be created if does not already exists."
    echo ""
    exit 1
fi

#oc new-project $namespace 2> /dev/null
#oc project $namespace
