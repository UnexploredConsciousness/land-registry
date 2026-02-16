let provider;
let signer;
let contract;
let account;

if (window.ethereum) {
    window.ethereum.on("accountsChanged", () => {
        window.location.reload();
    });
}

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "admin",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "AccessControlBadConfirmation",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "neededRole",
          "type": "bytes32"
        }
      ],
      "name": "AccessControlUnauthorizedAccount",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "parcelId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "holder",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "note",
          "type": "string"
        }
      ],
      "name": "EncumbranceAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "parcelId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "holder",
          "type": "address"
        }
      ],
      "name": "EncumbranceResolved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "parcelId",
          "type": "uint256"
        }
      ],
      "name": "ParcelDeactivated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "parcelId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "registrar",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "metadataCid",
          "type": "string"
        }
      ],
      "name": "ParcelRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "previousAdminRole",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "newAdminRole",
          "type": "bytes32"
        }
      ],
      "name": "RoleAdminChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "parcelId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "TitleTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DEFAULT_ADMIN_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "REGISTRAR_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "parcelId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "holder",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "note",
          "type": "string"
        }
      ],
      "name": "addEncumbrance",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "addRegistrar",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "parcelId",
          "type": "uint256"
        }
      ],
      "name": "deactivateParcel",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "exists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "parcelId",
          "type": "uint256"
        }
      ],
      "name": "getParcel",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "registrar",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "metadataCid",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "active",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "encActive",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "encNote",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "encHolder",
          "type": "address"
        },
        {
          "internalType": "address[]",
          "name": "ownersHistory",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleAdmin",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "grantRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "hasRole",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "parcelId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "metadataCid",
          "type": "string"
        }
      ],
      "name": "registerParcel",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "removeRegistrar",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "callerConfirmation",
          "type": "address"
        }
      ],
      "name": "renounceRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "parcelId",
          "type": "uint256"
        }
      ],
      "name": "resolveEncumbrance",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "revokeRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "parcelId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "transferTitle",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

async function connectWallet() {
    if (!window.ethereum) {
        alert("MetaMask not found");
        return;
    }

    await ethereum.request({ method: "eth_requestAccounts" });

    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();

    account = await signer.getAddress();

    contract = new ethers.Contract(contractAddress, contractABI, signer);

     document.getElementById("mainApp").style.display = "block";
  document.getElementById("accountAddress").innerText = account;

  const ADMIN_ROLE = await contract.DEFAULT_ADMIN_ROLE();
  const REGISTRAR_ROLE = await contract.REGISTRAR_ROLE();

  const isAdmin = await contract.hasRole(ADMIN_ROLE, account);
  const isRegistrar = await contract.hasRole(REGISTRAR_ROLE, account);

  // Fade out cover page
document.getElementById("coverPage").style.opacity = "0";

setTimeout(() => {
  document.getElementById("coverPage").style.display = "none";
  document.getElementById("mainApp").style.display = "block";
}, 800);

  if (isAdmin) {
    document.getElementById("adminActions").style.display = "block";
    document.getElementById("roleLabel").innerText = "Admin";
  } else if (isRegistrar) {
    document.getElementById("registrarActions").style.display = "block";
    document.getElementById("roleLabel").innerText = "Registrar";
  } else {
    document.getElementById("userActions").style.display = "block";
    document.getElementById("roleLabel").innerText = "User";
  }

  document.getElementById("btnRegisterParcel")?.addEventListener("click", () => {
  hideAllSections();
  document.getElementById("sectionRegisterParcel").style.display = "block";
});

document.getElementById("btnRegisterParcelR")?.addEventListener("click", () => {
  hideAllSections();
  document.getElementById("sectionRegisterParcel").style.display = "block";
});

document.getElementById("btnTransferParcel")?.addEventListener("click", () => {
  hideAllSections();
  document.getElementById("sectionTransferParcel").style.display = "block";
});

document.getElementById("btnTransferParcelR")?.addEventListener("click", () => {
  hideAllSections();
  document.getElementById("sectionTransferParcel").style.display = "block";
});

document.getElementById("btnViewParcel")?.addEventListener("click", () => {
  hideAllSections();
  document.getElementById("sectionViewParcel").style.display = "block";
});

document.getElementById("btnViewParcelR")?.addEventListener("click", () => {
  hideAllSections();
  document.getElementById("sectionViewParcel").style.display = "block";
});

document.getElementById("btnViewParcelU")?.addEventListener("click", () => {
  hideAllSections();
  document.getElementById("sectionViewParcel").style.display = "block";
});

document.getElementById("btnViewEncumbrance")?.addEventListener("click", () => {
  hideAllSections();
  document.getElementById("sectionViewEncumbrance").style.display = "block";
});

document.getElementById("btnViewEncumbranceR")?.addEventListener("click", () => {
  hideAllSections();
  document.getElementById("sectionViewEncumbrance").style.display = "block";
});

document.getElementById("btnViewEncumbranceU")?.addEventListener("click", () => {
  hideAllSections();
  document.getElementById("sectionViewEncumbrance").style.display = "block";
});

document
  .getElementById("btnRegisterEncumbrance")
  ?.addEventListener("click", () => {
    hideAllSections();
    document.getElementById("sectionRegisterEncumbrance").style.display =
      "block";
  });

  document
  .getElementById("btnResolveEncumbrance")
  ?.addEventListener("click", () => {
    hideAllSections();
    document.getElementById("sectionResolveEncumbrance").style.display = "block";
  });

}

function hideAllSections() {
  document.getElementById("sectionRegisterParcel").style.display = "none";
  document.getElementById("sectionTransferParcel").style.display = "none";
  document.getElementById("sectionViewParcel").style.display = "none";
  document.getElementById("sectionViewEncumbrance").style.display = "none";
  document.getElementById("sectionRegisterEncumbrance").style.display ="none";
  document.getElementById("sectionResolveEncumbrance").style.display ="none";
}


async function registerParcel() {
  if (!contract){
    document.getElementById("status").innerText = "Please connect wallet first";
    return;
  }
    try {
        const id = document.getElementById("regParcelId").value;
        const owner = document.getElementById("regOwner").value;
        const meta = document.getElementById("regMeta").value;

        const tx = await contract.registerParcel(id, owner, meta);
        document.getElementById("status").innerText = "Transaction sent...";
        await tx.wait();
        document.getElementById("status").innerText = "Parcel registered successfully";
    } catch (err) {
    let msg = "Transaction failed";

    if (err?.error?.data?.message) {
        msg = err.error.data.message;
    } else if (err?.reason) {
        msg = err.reason;
    } else if (err?.message) {
        msg = err.message;
    }

    document.getElementById("status").innerText = msg;
}

}

async function transferTitle() {
  if (!contract) {
    document.getElementById("status").innerText = "Please connect wallet first";
    return;
  }
    try {
        const id = document.getElementById("txParcelId").value;
        const to = document.getElementById("txTo").value;

        const tx = await contract.transferTitle(id, to);
        document.getElementById("status").innerText = "Transaction sent...";
        await tx.wait();
        document.getElementById("status").innerText = "Title transferred successfully";
    } catch (err) {
  let msg = "Transfer failed";

  if (err?.error?.data?.message) {
    msg = err.error.data.message;
  } else if (err?.data?.message) {
    msg = err.data.message;
  } else if (err?.reason) {
    msg = err.reason;
  } else if (err?.message) {
    msg = err.message;
  }

  document.getElementById("status").innerText = msg;
}

}

async function viewParcel() {
  if (!contract) {
    document.getElementById("parcelOutput").innerText =
      "Please connect wallet first";
    return;
  }

  try {
    const id = document.getElementById("viewParcelId").value;

    const parcel = await contract.getParcel(id);

    const output = `
Owner: ${parcel.owner}
Registrar: ${parcel.registrar}
Active: ${parcel.active}
Encumbrance Active: ${parcel.encActive}

Encumbrance Holder: ${parcel.encHolder}
Encumbrance Note: ${parcel.encNote}

Owners History:
${parcel.ownersHistory.join("\n")}
    `;

    document.getElementById("parcelOutput").innerText = output;
  } catch (err) {
    document.getElementById("parcelOutput").innerText =
      err?.reason || err.message || "Failed to fetch parcel";
  }
}

async function viewEncumbrance() {
  if (!contract) {
    document.getElementById("encumbranceOutput").innerText =
      "Please connect wallet first";
    return;
  }

  try {
    const id = document.getElementById("viewEncParcelId").value;
    const parcel = await contract.getParcel(id);

    if (!parcel.encActive) {
      document.getElementById("encumbranceOutput").innerText =
        "No encumbrance on this parcel.";
      return;
    }

    const output = `
Encumbrance Status: ACTIVE
Holder: ${parcel.encHolder}
Note: ${parcel.encNote}
    `;

    document.getElementById("encumbranceOutput").innerText = output;
  } catch (err) {
    document.getElementById("encumbranceOutput").innerText =
      err?.reason || err.message || "Failed to fetch encumbrance";
  }
}

async function registerEncumbrance() {
  if (!contract) {
    document.getElementById("status").innerText =
      "Please connect wallet first";
    return;
  }

  try {
    const id = document.getElementById("encParcelId").value;
    const holder = document.getElementById("encHolder").value;
    const note = document.getElementById("encNote").value;

    const tx = await contract.addEncumbrance(id, holder, note);
    document.getElementById("status").innerText =
      "Registering encumbrance...";
    await tx.wait();

    document.getElementById("status").innerText =
      "Encumbrance registered successfully";
  } catch (err) {
    let msg = "Transaction failed";

    if (err?.error?.data?.message) msg = err.error.data.message;
    else if (err?.reason) msg = err.reason;
    else if (err?.message) msg = err.message;

    document.getElementById("status").innerText = msg;
  }
}

async function resolveEncumbrance() {
  if (!contract) {
    document.getElementById("status").innerText =
      "Please connect wallet first";
    return;
  }

  try {
    const id = document.getElementById("resolveEncParcelId").value;

    const tx = await contract.resolveEncumbrance(id);
    document.getElementById("status").innerText =
      "Resolving encumbrance...";
    await tx.wait();

    document.getElementById("status").innerText =
      "Encumbrance resolved successfully";
  } catch (err) {
    let msg = "Failed to resolve encumbrance";

    if (err?.error?.data?.message) msg = err.error.data.message;
    else if (err?.reason) msg = err.reason;
    else if (err?.message) msg = err.message;

    document.getElementById("status").innerText = msg;
  }
}




