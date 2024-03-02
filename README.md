# Cypher-Zer0x: ts-client

This repository contains the local api used by the rust client to compute cryptographical equations in order to verify the transactions.
The only useful endpoint is `verifyTx`. It is used to verify wether a transaction is valid or not. It verifies:
- the commitment equality (ie: if the value is conserved)
- the range proof
- the mlsag signature

The other endpoint are not used.
