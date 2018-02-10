# BYOBlockchain

## Endpoints
### Get all transactions
- GET /api/v1/transactions
### Get all wallets
- GET /api/v1/wallets
### Show one wallet by ID
- GET /api/v1/wallets/:id
### Show one transaction by ID
- GET /api/v1/transactions/:id
### Post to wallets
- POST /api/v1/wallets
  - { address, balance }
    - address is the account hash identifier
    - balance is the account balance
### Post to transactions
- POST /api/v1/transactions
  - { txHash, amount, to, from }
    - txHash is the transaction hash identifier
    - amount is the amount of the transaction
    - to is a wallet foreign key
    - from is another wallet foreign key
### Edit a transaction
- PATCH /api/v1/transactions/:id
  - { amount }
    - amount is the only value that can be patched
### Edit a wallet
- PATCH /api/v1/wallets/:id
  - { balance }
    - balance is the only value that can be patched
### Delete a transaction
- DELETE /api/v1/transactions/:id
### Delete a wallet
- DELETE /api/v1/wallets/:id
  - nested delete of foreign keys in to: or from: of the transaction table, then wallet.
  
## Responses

### Get all transactions
  - [{ txHash: 'duksehdk2121hjkdnbesk', amount: '500', to: '1', from: '2'}...]
### Get all wallets
  - [{ address: '#jojw390f9ednseknd3', balance: '100'}...]
### Get a single transaction
  - { txHash: 'duksehdk2121hjkdnbesk', amount: '500', to: '1', from: '2'}
### Get a single wallet
  - { address: '#jojw390f9ednseknd3', balance: '100'}
### Post a wallet
  - { id: 26 }
### Post a transaction
  - { id: 26 }
### Patch a transaction 
  - { 1 } returns number of objects affected
### Patch a wallet
  - { 1 } returns number of objects affected
### Delete a transaction
  - { 1 } returns number of objects affected
### Delete a wallet
  - { 1 } returns number of objects affected
