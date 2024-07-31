import "dotenv/config";

export const config = {
  RPC_URL: process.env.RPC_URL,
  OWNER_A_PRIVATE_KEY: process.env.OWNER_A_PRIVATE_KEY,
  OWNER_A_ADDRESS: process.env.OWNER_A_ADDRESS,
  SAFE_ADDRESS: process.env.SAFE_ADDRESS,
  TO: process.env.TO,
  VALUE: "1",
};
