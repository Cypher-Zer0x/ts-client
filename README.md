# types-backend

## Overview

The types-backend repository contains a REST API that enables users to generate ring signatures. The backend is built using the Express framework and provides functionality to split and compute a part of the ring signature, enhancing the overall user experience.

## Features

- Ring Creation from XRPLedger: Users can create a ring of public keys from the XRPLedger, allowing them to form a group for ring signature generation.

- Ring Signature Generation: The backend API allows users to generate ring signatures, which provide anonymity and unlinkability to transactions or messages.

- Backend Computation: The backend performs the necessary computations to split and compute a part of the ring signature, offloading the processing burden from the client-side and improving user experience. The part where the private key is needed will be computed in the front-end.

## Technology Stack

The types-backend API backend utilizes the following technologies and libraries:

- Express: A fast and minimalist web application framework for Node.js, providing a robust foundation for building APIs.

- @cypherlab/types-ring-signature: Our custom ring signature library, which enables the generation and verification of ring signatures.

- @cypherlab/xrpl-publicKey-getter: Our library specifically designed to retrieve public keys from the XRPLedger, facilitating the creation of a ring of public keys.

These technologies and libraries work together to provide a seamless and efficient experience for generating ring signatures and creating rings of public keys from the ledger.

## Installation

To set up the types-backend API backend locally, follow these steps:

Clone the repository to your local machine.

Install the required dependencies by running the following command:

```
npm install
```

Configure any necessary environment variables or API keys as specified in the project's documentation.

Start the backend server by running the following command:

```
npm start
```

This will launch the backend server, and it will be accessible at the specified endpoint.
