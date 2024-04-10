import os
import hashlib
import base58

def generate_key_pair():
    # Generate a random private key (256 bits)
    private_key = os.urandom(32)

    # Compute the public key from the private key
    public_key = hashlib.sha256(private_key).digest()

    # Add a prefix (0x04) to indicate uncompressed public key
    full_public_key = b'\x04' + public_key

    # Generate the address from the public key
    address = base58.b58encode_check(full_public_key)

    return private_key, address

if __name__ == "__main__":
    private_key, address = generate_key_pair()
    print(f"Private Key: {private_key.hex()}")
    print(f"Public Address: {address.decode('utf-8')}")