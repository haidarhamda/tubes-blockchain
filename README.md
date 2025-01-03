# tubes-blockchain

Aplikasi ini merupakan aplikasi untuk pembayaran royalti konten berbasis private blockchain

## Requirements

- Geth v1.13.15

- Truffle v5.11.15

- Node v20.11.1

- Web3.js v1.10.0

## Start Private Chain

Pastikan sudah inisialisasi Geth database
```bash
    geth --datadir {folder node} init genesis.json
```

Terminal 1:

```bash
    cd .\bnode\
    bootnode -nodekey boot.key -verbosity 10 -addr "127.0.0 1:30301"
```

Terminal 2:
```bash
    geth --datadir "./node1"  --port 30307 --bootnodes enode://f6b34937797b533369bf425b879679ed31dde0fbe0fcaff8e1116c90fc4ff70e8093dccfe431f1722a10ab336408191806eb2f40b29c6ea4d2f67a9ede060b55@127.0.0.1:0?discport=30301 --authrpc.port 8547 --ipcdisable --allow-insecure-unlock  --http --http.corsdomain="*" --http.api web3,eth,debug,personal,net,admin --http.port 8545 --networkid 1234567 --unlock 0x81441f063a290b1f3252123029ba09139c80b3b0  --mine --miner.etherbase=0x81441f063a290b1f3252123029ba09139c80b3b0
    password: node1node
```

Terminal 3:
```bash
    geth --datadir "./node2"  --port 30305 --bootnodes enode://f6b34937797b533369bf425b879679ed31dde0fbe0fcaff8e1116c90fc4ff70e8093dccfe431f1722a10ab336408191806eb2f40b29c6ea4d2f67a9ede060b55@127.0.0.1:0?discport=30301 --authrpc.port 8546 --ipcdisable --allow-insecure-unlock  --http --http.corsdomain="*" --http.api web3,eth,debug,personal,net,admin --http.port 8548 --networkid 1234567 --unlock 0x343931481aa12105128ddf43310cfbeaaa79c697
    password: node2node
```

Terminal 4:
```bash
    geth --datadir "./node3"  --port 30306 --bootnodes enode://f6b34937797b533369bf425b879679ed31dde0fbe0fcaff8e1116c90fc4ff70e8093dccfe431f1722a10ab336408191806eb2f40b29c6ea4d2f67a9ede060b55@127.0.0.1:0?discport=30301 --authrpc.port 8550 --ipcdisable --allow-insecure-unlock  --http --http.corsdomain="*" --http.api web3,eth,debug,personal,net,admin --http.port 8551 --networkid 1234567 --unlock 0x55b8c893bf2c731ee62c794dc47bcb540c2b0107
    password: node3node
```

## Deploy Smart Contract & Oracle

```bash
    truffle migrate
```

Jika mau melakukan compile, hasil compilenya dicopy ke folder `fe/contracts`

```bash
    truffle compile
    truffle migrate
```

Catat address Oracle dan Smart Contract yaaaaa!!!

## Setup Smart Contract

```bash
    truffle console
    web3.eth.sendTransaction({from: '81441f063a290b1f3252123029ba09139c80b3b0', to: '{smartContractAddress}', value: 1000000000000000})
    const contentOwnership = await ContentOwnership.deployed();
    contentOwnership.setOracle({oracleAddress});
```

## Simulasi Oracle

Oracle disini bertujuan untuk memperoleh jumlah view dari suatu konten, misalnya pada Youtube atau Spotify. Namun, Oracle yang diimplementasikan hanya sebatas simulasi, sehingga harus dijalankan secara manual.

Setelah menambahkan konten, lakukan hal berikut pada terminal baru

1. Rename `truffle-config.js` > `truffle-config.js.something`
2. Rename `truffle-config.js.node2` > `truffle-config.js`
3. Jalankan truffle console
```bash
    truffle console
    const oracle = await Oracle.deployed();
    oracel.setContentViewers({contentId}, {totalViews(smallInt)});
```
4. Kembalikan kedua `truffle-config.js` seperti semula

## Front-end

Setelah melakukan migrate, catat address dari Smart Contract ContentOwnership, kemudian pada `fe/src/utils/ownership.ts` ubah `const contractAddress = {smartContractAddress}`

```bash
    nmp i 
    npm run dev
```

## Authors

- [Christian Albert Hasiholan (13521078)](https://github.com/ChrisAlberth)
- [Tobias Natalio Sianipar (13521090)](https://github.com/tobisns)
- [Haidar Hamda (13521105)](https://github.com/haidarhamda)