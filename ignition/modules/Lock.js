import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("LandRegistryModule", (m) => {
  // Use first Hardhat account as admin (government)
  const admin = m.getAccount(0);

  //Deploy LandRegistry with admin address
  const landRegistry = m.contract("LandRegistry", [admin]);

  return { landRegistry };
});
