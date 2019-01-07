
# Essential CLI tools
npm install -g composer-cli@0.20

# Utility for running a REST Server on your machine to expose your business networks as RESTful APIs
npm install -g composer-rest-server@0.20

# Useful utility for generating application assets
npm install -g generator-hyperledger-composer@0.20

# Yeoman is a tool for generating applications, which utilises generator-hyperledger-composer
npm install -g yo

# Browser app for simple editing and testing Business Networks
npm install -g composer-playground@0.20

mkdir ~/composer && cd ~/composer

curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz

# Download.sh

##
#cd ~/composer
#export FABRIC_VERSION=hlfv12
#./downloadFabric.sh
##

# Start.sh

##
#cd ~/composer
#export FABRIC_VERSION=hlfv12
#./startFabric.sh
##