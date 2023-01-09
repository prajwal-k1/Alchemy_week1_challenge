const secp = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');

const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);
const address = keccak256(publicKey.slice(1)).slice(-20);

console.log("Private key : ", toHex(privateKey));
console.log("Public Key : ", toHex(publicKey));
console.log("Address : 0x" + toHex(address));

// privateKey1 = 0f3b085e45bd559de603c6c00fd70d7a29911faa1eb909d3f123619f1959dcbc
// address1= 0xe82192772361816fb97d348e5aa65a65f14410a9
// privateKey2 = 45d5d4936396054fb881fc61c70c14813619728515b568aae6c94c6f5a2b94b8
// address2 = 0x23c18d1c0b060c43dcc38cc135354d481972c5c1
// privateKey3 = 2dd13e495d0f868e62c292308d945025ce152e679af695073968bc5b5eae47b2
// address3 = 0xca055613a97f0c1127497e6164d9b8fa5af40f38