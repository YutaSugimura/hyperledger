composer card delete -c PeerAdmin@fabric-network
composer card delete -c admin@tutorial-network
rm -fr ~/.composer

composer card create -p connection.json -u PeerAdmin -c key/Admin@org1.example.com-cert.pem -k key/9173aadbcf98b376d338f071333f618643aa07da02cb8bd1059f15d917c35692_sk -r PeerAdmin -r ChannelAdmin

composer card import -f PeerAdmin@fabric-network.card

composer network install -c PeerAdmin@fabric-network -a tutorial-network@0.0.1.bna

composer network start --networkName tutorial-network --networkVersion 0.0.1 -A admin -S adminpw -c PeerAdmin@fabric-network

composer card import -f admin@tutorial-network.card

composer network ping -c admin@tutorial-network

