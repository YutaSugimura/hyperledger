PRIVATE_KEY=/basic-network/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/2a19a7c5def4ec8dd2e4df4ddabf0881119ce9a5c2b716da46cf6afb44d3cbbf_sk
CERT=/basic-network/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/signcerts/Admin@org1.example.com-cert.pem


# connection
composer card create -p connection.json -u PeerAdmin -c $CERT -k $PRIVATE_KEY -r PeerAdmin -r ChannelAdmin

composer card import -f PeerAdmin@fabric-network.card
