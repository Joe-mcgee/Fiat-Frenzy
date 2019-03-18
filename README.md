
# Fiat Frenzy

An Ethereum dapp that takes an ERC-20 interface and adds the ability create money from nothing by creating loans.

There are two restrictions

1. An individual may lend no more than ~ 62% of their balance
2. If an individual creates a loan, they must hold enough coins in reserve to cover that loan until its paid back

# Why

Fractional reserve banking is the bread and butter of money creation for the lions share of the planet. 

It is the current reality that the right to perform this practice is at the disgression of government, else be subject to the criminal offence of forgery.

It is the current reality that banking institutions have an uncanny amount of political influence, so that the gates to the money tree are virtually in the hands of the banks themselves.

Fiat Frenzy is intended to be a living answer to the question-

"What if everyone could fractionally reserve lend at the same rate?"

As the developed world looks for answers to job loss from automation, The answer may not be to simply give people money, but allow them to create it themselves.

## Running

This repo uses docker for development

```docker-compose up```

deploy contracts with truffle

```truffle deploy```

front end serving at localhost:3000
