#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error, print all commands.
set -ev

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1

docker-compose -f docker-compose.yml down

#docker-compose -f docker-compose.yml up -d ca.myai.com orderer.myai.com peer0.org1.myai.com couchdb
docker-compose -f docker-compose.yml up -d cli orderer.myai.com \
	       ca.org1.myai.com peer0.org1.myai.com

# wait for Hyperledger Fabric to start
# incase of errors when running later commands, issue export FABRIC_START_TIMEOUT=<larger number>
export FABRIC_START_TIMEOUT=10
#echo ${FABRIC_START_TIMEOUT}
sleep ${FABRIC_START_TIMEOUT}

# Create the channel
docker exec cli peer channel create -o orderer.myai.com:7050 -c mychannel -f /etc/hyperledger/configtx/channel.tx --tls --cafile /etc/hyperledger/crypto-config/ordererOrganizations/myai.com/orderers/orderer.myai.com/msp/tlscacerts/tlsca.myai.com-cert.pem

# Join peer0.org1.myai.com to the channel.
docker exec peer0.org1.myai.com peer channel join -b /etc/hyperledger/configtx/mychannel.block