// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract LandRegistry is AccessControl {
    bytes32 public constant REGISTRAR_ROLE = keccak256("REGISTRAR_ROLE");

    struct Encumbrance {
        bool active;
        string note;
        address holder;
    }

    struct Parcel {
        address currentOwner;
        address registrar;
        string metadataCid;
        bool isActive;
        Encumbrance enc;
        address[] ownersHistory;
    }

    mapping(uint256 => Parcel) private parcels;
    mapping(uint256 => bool) public exists;

    event ParcelRegistered(uint256 indexed parcelId, address indexed owner, address indexed registrar, string metadataCid);
    event TitleTransferred(uint256 indexed parcelId, address indexed from, address indexed to);
    event EncumbranceAdded(uint256 indexed parcelId, address indexed holder, string note);
    event EncumbranceResolved(uint256 indexed parcelId, address indexed holder);
    event ParcelDeactivated(uint256 indexed parcelId);

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(REGISTRAR_ROLE, admin);
    }

    modifier onlyActive(uint256 parcelId) {
        require(exists[parcelId], "Parcel does not exist");
        require(parcels[parcelId].isActive, "Parcel inactive");
        _;
    }

    function registerParcel(uint256 parcelId, address owner, string calldata metadataCid)
        external onlyRole(REGISTRAR_ROLE)
    {
        require(!exists[parcelId], "Already exists");
        require(owner != address(0), "owner=0");

        Parcel storage p = parcels[parcelId];
        p.currentOwner = owner;
        p.registrar = msg.sender;
        p.metadataCid = metadataCid;
        p.isActive = true;
        p.ownersHistory.push(owner);
        exists[parcelId] = true;

        emit ParcelRegistered(parcelId, owner, msg.sender, metadataCid);
    }

    function transferTitle(uint256 parcelId, address to)
        external onlyActive(parcelId)
    {
        Parcel storage p = parcels[parcelId];
        require(!p.enc.active, "Blocked by encumbrance");
        require(msg.sender == p.currentOwner || hasRole(REGISTRAR_ROLE, msg.sender), "Not authorized");
        address from = p.currentOwner;
        require(to != address(0) && to != from, "Bad recipient");

        p.currentOwner = to;
        p.ownersHistory.push(to);

        emit TitleTransferred(parcelId, from, to);
    }

    function addEncumbrance(uint256 parcelId, address holder, string calldata note)
        external onlyRole(REGISTRAR_ROLE) onlyActive(parcelId)
    {
        Parcel storage p = parcels[parcelId];
        require(!p.enc.active, "Already blocked");
        p.enc = Encumbrance({active: true, note: note, holder: holder});
        emit EncumbranceAdded(parcelId, holder, note);
    }

    function resolveEncumbrance(uint256 parcelId)
        external onlyRole(REGISTRAR_ROLE) onlyActive(parcelId)
    {
        Parcel storage p = parcels[parcelId];
        require(p.enc.active, "Not blocked");
        address h = p.enc.holder;
        p.enc.active = false;
        p.enc.note = "";
        p.enc.holder = address(0);
        emit EncumbranceResolved(parcelId, h);
    }

    function deactivateParcel(uint256 parcelId)
        external onlyRole(REGISTRAR_ROLE) onlyActive(parcelId)
    {
        parcels[parcelId].isActive = false;
        emit ParcelDeactivated(parcelId);
    }

    function getParcel(uint256 parcelId) external view returns (
        address owner,
        address registrar,
        string memory metadataCid,
        bool active,
        bool encActive,
        string memory encNote,
        address encHolder,
        address[] memory ownersHistory
    ) {
        require(exists[parcelId], "Parcel does not exist");
        Parcel storage p = parcels[parcelId];
        return (p.currentOwner, p.registrar, p.metadataCid, p.isActive, p.enc.active, p.enc.note, p.enc.holder, p.ownersHistory);
    }
}
