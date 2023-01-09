const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');
const { utf8ToBytes, toHex } = require('ethereum-cryptography/utils');

app.use(cors());
app.use(express.json());

const balances = {
  "0xe82192772361816fb97d348e5aa65a65f14410a9": 100,
  "0x23c18d1c0b060c43dcc38cc135354d481972c5c1": 50,
  "0xca055613a97f0c1127497e6164d9b8fa5af40f38": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, recoveryKey } = req.body;
  const message = { sender, amount, recipient };
  const msgHash = keccak256(utf8ToBytes(JSON.stringify(message)));
  const publicKey = secp.recoverPublicKey(msgHash, signature, recoveryKey).slice(1);
  const address = '0x' + toHex(keccak256(publicKey).slice(-20));
  console.log(address);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (address != sender)
    res.status(400).send({ message: "You're not authorized to do this!!" })
  else {
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
