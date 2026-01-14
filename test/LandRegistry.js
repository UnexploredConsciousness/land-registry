import { expect } from "chai";
import pkg from "hardhat";

const { ethers } = pkg;

describe("LandRegistry", function () {
  let LandRegistry, landRegistry;
  let admin, owner1, owner2, registrar;

  beforeEach(async function () {
    [admin, owner1, owner2, registrar] = await ethers.getSigners();

    LandRegistry = await ethers.getContractFactory("LandRegistry");
    landRegistry = await LandRegistry.deploy(admin.address);

    // Grant registrar role
    const REGISTRAR_ROLE = await landRegistry.REGISTRAR_ROLE();
    await landRegistry.connect(admin).grantRole(REGISTRAR_ROLE, registrar.address);
  });

  it("should register a parcel", async function () {
    await landRegistry.connect(registrar).registerParcel(1, owner1.address, "Qm123");
    const parcel = await landRegistry.getParcel(1);
    expect(parcel[0]).to.equal(owner1.address); // currentOwner
  });

  it("should transfer ownership", async function () {
    await landRegistry.connect(registrar).registerParcel(2, owner1.address, "Qm456");
    await landRegistry.connect(owner1).transferTitle(2, owner2.address);
    const parcel = await landRegistry.getParcel(2);
    expect(parcel[0]).to.equal(owner2.address);
  });

  it("should not allow non-owner to transfer", async function () {
    await landRegistry.connect(registrar).registerParcel(3, owner1.address, "Qm789");
    await expect(
      landRegistry.connect(owner2).transferTitle(3, admin.address)
    ).to.be.revertedWith("Not authorized");
  });
});

