#### SEPOLIA - TESTNET

## 0 - Criando Pasta

mkdir ~/.capivara-wallets
mkdir ~/.capivara-wallets/erc20test

## 1.1 - Criando nova pvt key

starkli signer keystore new ~/.capivara-wallets/erc20test/capivara_keystore.json

## 1.2 - Salvando a Private Key 

export STARKNET_KEYSTORE="~/.capivara-wallets/erc20test/capivara_keystore.json" 

Obs.: Mesmo com o comando acima, a solicitação de senha pode não ser exibida, ocasião em que se deve colocar a flag --keystore ao final do comando que se executa.

## 1.3 - Conectando com private key local

starkli signer keystore from-key ~/.capivara-wallets/erc20test/capivara_keystore.json

## 2.1 - Criando conta

starkli account oz init ~/.capivara-wallets/erc20test/capivara_account.json

starkli account deploy ~/.capivara-wallets/erc20test/capivara_account.json --keystore ~/.capivara-wallets/erc20test/capivara_keystore.json

## 2.2 - Conectando com conta local

cat ~/.capivara-wallets/erc20test/capivara_account.json

starkli account fetch <inserir aqui o endereço de uma conta local> --rpc https://starknet-sepolia.public.blastapi.io/rpc/v0_7 --output ~/.capivara-wallets/erc20test/capivara_account.json

## 3 Declarando Capivara ERC20 Token

starkli declare target/dev/token_sender_CapivaraERC20.contract_class.json --rpc https://starknet-sepolia.public.blastapi.io/rpc/v0_7 --account ~/.capivara-wallets/erc20test/capivara_account.json --keystore ~/.capivara-wallets/erc20test/capivara_keystore.json

wandsonmesquita@LAPTOP-T7TA7229:/mnt/c/Users/wfmes/OneDrive/Área de Trabalho/capivara coin/toke
n-sender-erc20$ starkli declare target/dev/token_sender_CapivaraERC20.contract_class.json --rpc https://starknet-sepolia.public.blastapi.io/rpc/v0_7 --account ~/.capivara-wallets/erc20test/capivara_account.json --keystore ~/.capivara-wallets/erc20test/capivara_keystore.json
Enter keystore password:
Sierra compiler version not specified. Attempting to automatically decide version to use...
Network detected: sepolia. Using the default compiler version for this network: 2.7.1. Use the --compiler-version flag to choose a different version.
Declaring Cairo 1 class: 0x00d1de4f1fe31a95a75952ed485fc6e405d0130f540f94f776e08455ad4a4a40    
Compiling Sierra class to CASM with compiler version 2.7.1...
CASM class hash: 0x0404748d8dffba5a7786c0b7240b8d4352530b23810aceab09c61d9650e2b38f
Contract declaration transaction: 0x04fd5ff3cd705a5c06c493532aeb6754c388f0bf18fc31ceb8e63386f7088364
Class hash declared:
0x00d1de4f1fe31a95a75952ed485fc6e405d0130f540f94f776e08455ad4a4a40

## 4 Deployand Capivara ERC20 Token

Exemplo 

starkli deploy <Class hash declared> u256:1000000000 <endereço de conta criardo com starkli account deploy>  
--rpc https://starknet-sepolia.public.blastapi.io/rpc/v0_7 --account ~/.capivara-wallets/erc20test/capivara_account.json --keystore ~/.capivara-wallets/erc20test/capivara_keystore.json

Código empregado neste contrato

(cuidado com o excesso de espaços entre os argumentos. Caso haja mais de um espaço ou espaço de ENTER entre ele, o código não vai rodar.)

starkli deploy 0x00d1de4f1fe31a95a75952ed485fc6e405d0130f540f94f776e08455ad4a4a40 u256:1000000000 0x07c015ddc076554d59682672502e28eaa726a0bb7624e4925b7185d0f66a79f4 --rpc https://starknet-sepolia.public.blastapi.io/rpc/v0_7 --account ~/.capivara-wallets/erc20test/capivara_account.json --keystore ~/.capivara-wallets/erc20test/capivara_keystore.json

wandsonmesquita@LAPTOP-T7TA7229:/mnt/c/Users/wfmes/OneDrive/Área de Trabalho/capivara coin/toke
n-sender-erc20$ starkli deploy 0x00d1de4f1fe31a95a75952ed485fc6e405d0130f540f94f776e08455ad4a4a40 u256:1000000000 0x07c015ddc076554d59682672502e28eaa726a0bb7624e4925b7185d0f66a79f4 --rpc https://starknet-sepolia.public.blastapi.io/rpc/v0_7 --account ~/.capivara-wallets/erc20test/capivara_account.json --keystore ~/.capivara-wallets/erc20test/capivara_keystore.json
Enter keystore password: 
Deploying class 0x00d1de4f1fe31a95a75952ed485fc6e405d0130f540f94f776e08455ad4a4a40 with salt 0x0376b80042d3aa7e6f801a6e743d69930735b40c54fa93b9f2a5de587700d93a...
The contract will be deployed at address 0x048380cf31ac6608a5039a4f45c50158f3375631afe6e3a7c536e3ac4cce0390
Contract deployment transaction: 0x037bef1e01c26029c83a3ee61b347a4d644a4b807a8f15a3553b1aa6a17e7410
Contract deployed:
0x048380cf31ac6608a5039a4f45c50158f3375631afe6e3a7c536e3ac4cce0390

## 5 Checando Supply do Token

Exempolo 

starkli call <hash Contract deployed> total_supply --rpc https://starknet-sepolia.public.blastapi.io/rpc/v0_7

starkli call 0x048380cf31ac6608a5039a4f45c50158f3375631afe6e3a7c536e3ac4cce0390 total_supply --rpc https://starknet-sepolia.public.blastapi.io/rpc/v0_7

result: [
    "0x000000000000000000000000000000000000000000000000000000003b9aca00",
    "0x0000000000000000000000000000000000000000000000000000000000000000"
]


#### MAINNET

## 0 - Criando Pasta

mkdir ~/.wallets
mkdir ~/.wallets/mainnet

## 1.1 - Criando nova pvt key

starkli signer keystore new ~/.wallets/mainnet/mainnet_keystore.json

## 1.2 - Conectando com private key local

starkli signer keystore from-key ~/.wallets/mainnet/mainnet_keystore.json

## 2.1 - Criando conta

starkli account oz init ~/.wallets/mainnet/mainnet_account.json --keystore ~/.wallets/mainnet/mainnet_keystore.json

Deploy da Conta

starkli account deploy /home/wandsonmesquita/.wallets/mainnet/mainnet_account.json --keystore ~/.wallets/mainnet/mainnet_ketstore.json

starkli account deploy ~/.wallets/mainnet/mainnet_account.json --rpc https://free-rpc.nethermind.io/mainnet-juno --keystore ~/.wallets/mainnet/mainnet_keystore.json

## 2.2 - Conectando com conta local

cat ~/.wallets/mainnet/mainnet_account.json

starkli account fetch 0x02700ce498c01ffc0af8426b465dcb3a615e408092a76fb0390d56c1b6c45c0e --output ~/.wallets/mainnet/mainnet_account.json --rpc https://free-rpc.nethermind.io/mainnet-juno

## 3 Declarando Capivara ERC20 Token

starkli declare ./target/dev/token_sender_CapivaraERC20.contract_class.json --account ~/.wallets/mainnet/mainnet_account.json --rpc https://free-rpc.nethermind.io/mainnet-juno --keystore ~/.wallets/mainnet/mainnet_keystore.json

class hash declared: 0x00d1de4f1fe31a95a75952ed485fc6e405d0130f540f94f776e08455ad4a4a40

## 4 Deployand Capivara ERC20 Token

starkli deploy 0x00d1de4f1fe31a95a75952ed485fc6e405d0130f540f94f776e08455ad4a4a40 u256:1000000000 0x05d1376a48eef71cdc7b2d49836ce08989999bca88cdbd255323aafa5819fff5 --account ~/.wallets/mainnet/mainnet_account.json --rpc https://free-rpc.nethermind.io/mainnet-juno --keystore ~/.wallets/mainnet/mainnet_keystore.json

wandsonmesquita@LAPTOP-T7TA7229:/mnt/c/Users/wfmes/OneDrive/Área de Trabalho/capivara coin/token-sender-erc20$ starkli deploy 0x00d1de4f1fe31a95a75952ed485fc6e405d0130f540f94f776e08455ad4a4a40 u256:1000000000 0x05d1376a48eef71cdc7b2d49836ce08989999bca88cdbd255323aafa5819fff5 --account ~/.wallets/mainnet/mainnet_account.json --rpc https://free-rpc.nethermind.io/mainnet-juno 0x00d1de4f1fe31a95a75952ed485fc6e405d0130f540f94f776e08455ad4a4a40 u256:1000000000 0x05d1376a48eef71cdc7b2d49836ce08989999bca88cdbd255323aafa5819fff5 --account ~/.wallets/mainnet/mainnet_account.json --rpc https://free-rpc.nethermind.io/mainnet-junoa88cdbd255323aafa5819fff5 --account ~/.wallets/mainnet/mainnet_account.json --rpc https://free-rpc.nethermind.io/mainnet-juno --keystore ~/.wallets/mainnet/mainnet_keystore.json
 --keystore ~/.wallets/mainnet/mainnet_keystore.json
Enter keystore password:
Enter keystore password:
Deploying class 0x00d1de4f1fe31a95a75952ed485fc6e405d0130f540f94f776e08455ad4a4a40 with salt 0x00a74deaf973bc6f7d64c249e5b3b44dd46c3aa68536a0883cfa6d5ec7eab2f5...
4dd46c3aa68536a0883cfa6d5ec7eab2f5...
The contract will be deployed at address 0x01bdf56637034ceee8b929e82d9f4d88b949fffad9349a152647111168024a43
Contract deployment transaction: 0x06bae7fd8a5f6f02a31c8dae3354387b2898d35b18c9ed955c3d6cac2e28f35d
Contract deployed:
0x01bdf56637034ceee8b929e82d9f4d88b949fffad9349a152647111168024a43

## 5 Checando Supply do Token

starkli call 0x01bdf56637034ceee8b929e82d9f4d88b949fffad9349a152647111168024a43  total_supply --rpc https://free-rpc.nethermind.io/mainnet-juno

wandsonmesquita@LAPTOP-T7TA7229:/mnt/c/Users/wfmes/OneDrive/Área de Trabalho/capivara coin/token-sender-erc20$ starkli call 0x01bdf56637034ceee8b929e82d9f4d88b949fffad9349a152647111168024a43  total_supply --rpc https://free-rpc.nethermind.io/mainnet-juno
[
    "0x000000000000000000000000000000000000000000000000000000003b9aca00",
    "0x0000000000000000000000000000000000000000000000000000000000000000"


## Site Rápido de Faucets ETH

https://blastapi.io/faucets/starknet-sepolia-eth