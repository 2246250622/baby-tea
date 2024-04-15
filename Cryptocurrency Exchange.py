import hashlib
import json

class Exchange:
    def __init__(self):
        self.users = {}
        self.orders = []
        self.balances = {}

    def register_user(self, username, password):
        # Create a new user account
        self.users[username] = {
            'password': password,
            'balances': {}
        }

    def login_user(self, username, password):
        # Authenticate a user
        if username not in self.users:
            return False
        if self.users[username]['password'] != password:
            return False
        return True

    def deposit(self, username, currency, amount):
        # Deposit cryptocurrency into a user's account
        if username not in self.users:
            raise ValueError('User does not exist')
        if currency not in self.balances:
            raise ValueError('Invalid currency')
        self.balances[currency][username] += amount

    def withdraw(self, username, currency, amount):
        # Withdraw cryptocurrency from a user's account
        if username not in self.users:
            raise ValueError('User does not exist')
        if currency not in self.balances:
            raise ValueError('Invalid currency')
        if self.balances[currency][username] < amount:
            raise ValueError('Insufficient balance')
        self.balances[currency][username] -= amount

    def place_order(self, username, order_type, currency, amount, price):
        # Place a buy or sell order
        if username not in self.users:
            raise ValueError('User does not exist')
        if currency not in self.balances:
            raise ValueError('Invalid currency')
        if order_type == 'buy' and self.balances[currency][username] < amount:
            raise ValueError('Insufficient balance')
        if order_type == 'sell' and self.balances[currency][username] < amount * price:
            raise ValueError('Insufficient balance')
        self.orders.append({
            'username': username,
            'order_type': order_type,
            'currency': currency,
            'amount': amount,
            'price': price
        })

    def execute_trade(self, order1, order2):
        # Execute a trade between two orders
        if order1['currency'] != order2['currency']:
            raise ValueError('Currencies do not match')
        if order1['order_type'] == 'buy' and order2['order_type'] == 'sell':
            # Buy order is fulfilled
            self.balances[order1['currency']][order1['username']] -= order1['amount'] * order1['price']
            self.balances[order2['currency']][order2['username']] += order2['amount']
            # Sell order is fulfilled
            self.balances[order2['currency']][order2['username']] -= order2['amount'] * order2['price']
            self.balances[order1['currency']][order1['username']] += order1['amount']
        elif order1['order_type'] == 'sell' and order2['order_type'] == 'buy':
            # Sell order is fulfilled
            self.balances[order1['currency']][order1['username']] -= order1['amount'] * order1['price']
            self.balances[order2['currency']][order2['username']] += order2['amount']
            # Buy order is fulfilled
            self.balances[order2['currency']][order2['username']] -= order2['amount'] * order2['price']
            self.balances[order1['currency']][order1['username']] += order1['amount']
        else:
            raise ValueError('Orders cannot be matched')

    def get_balance(self, username, currency):
        # Get the balance of a user's account
        if username not in self.users:
            raise ValueError('User does not exist')
        if currency not in self.balances:
            raise ValueError('Invalid currency')
        return self.balances[currency][username]

# Example usage
exchange = Exchange()

# Register a user
exchange.register_user('alice', 'password123')

# Login a user
if exchange.login_user('alice', 'password123'):
    print('Login successful')
else:
    print('Login failed')

# Deposit cryptocurrency into a user's account
exchange.deposit('alice', 'BTC', 10)

# Withdraw cryptocurrency from a user's account
exchange.withdraw('alice', 'BTC', 5)

# Place a buy order
exchange.place_order('alice', 'buy', 'BTC', 5, 10000)

# Place a sell order
exchange.place_order('bob', 'sell', 'BTC', 5, 10000)

# Execute a trade between two orders
exchange.execute_trade(exchange.orders[0], exchange.orders[1])

# Get the balance of a user's account
print(exchange.get_balance('alice', 'BTC'))