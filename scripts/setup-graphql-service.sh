#!/bin/bash

export namespace=$1

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

oc new-project $namespace 2> /dev/null
oc project $namespace
oc create is graphqldemo 2> /dev/null
oc apply -f createGraphQLDemoImage.yaml
oc start-build build-graphql-demo-image

sleep 60

( echo "cat <<EOF" ; cat deployGraphQLDemoTemplate.yaml ; echo EOF ) | sh > deployGraphQLDemoService.yaml
oc apply -f deployGraphQLDemoService.yaml
oc wait --for=condition=Available=True deployment/graphql-demo-service --timeout=60s

exit 0

