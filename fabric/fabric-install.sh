
// sample install
curl -sSL https://raw.githubusercontent.com/hyperledger/fabric/v1.2.1/scripts/bootstrap.sh | bash -s 1.2.1

//
cd fabric-samples
ls

mv basic-network bin config fabric-ca scripts ../

cd ..
rm -fr fabric-samples
ls

echo 'export PATH=$PATH:$HOME/hlf/bin' >> ~/.profile
~/.profile

set -ev

rm -fr ~/.hfc-key-store/*

mkdir -p ~/.hfc-key-store


