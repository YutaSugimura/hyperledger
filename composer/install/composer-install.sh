

# composer-cli
echo "composer-cli@0.20"
npm install -g composer-cli@0.20

# rest server
echo "rest-server@0.20"
npm install -g composer-rest-server@0.20

# generator
echo "generator-hyperledger-composer"
npm install -g generator-hyperledger-composer@0.20

# yo
echo "install yo"
npm install -g yo

# playground
echo "composer-playground@0.20"
npm install -g composer-playground@0.20

# create testfile
echo "create testfile"
mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers

# download package
echo "download package"
curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz

# fabric v1.2
echo "download fabric v12"
cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12
./downloadFabric.sh

# start fabric
echo "fabric-dev-servers"
cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12
./startFabric.sh

# create peerAdmin
echo "createPeerAdmin"
./createPeerAdminCard.sh

