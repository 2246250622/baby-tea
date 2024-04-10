from web3 import Web3

# 連接到以太坊節點
w3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/your-infura-project-id'))

# 檢查連接是否成功
if w3.isConnected():
    print('成功連接到以太坊節點')
else:
    print('無法連接到以太坊節點')

# 獲取最新的區塊數
block_number = w3.eth.blockNumber
print('最新區塊數:', block_number)

# 獲取最新的區塊
latest_block = w3.eth.getBlock(block_number)
print('最新區塊:', latest_block)

# 獲取特定地址的餘額
address = '0x8d8e1c0ac6219c8c7a3d9c3a1fde2fca3c5e8bd1'
balance = w3.eth.getBalance(address)
print('地址餘額:', w3.fromWei(balance, 'ether'), 'ETH')