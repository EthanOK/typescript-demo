import SafeApiKit from "@safe-global/api-kit";
import Safe from "@safe-global/protocol-kit";
import {
  MetaTransactionData,
  OperationType,
} from "@safe-global/safe-core-sdk-types";
import { config } from "./config";
// Initialize the Protocol Kit with Owner A
export const initSafe = async () => {
  return await Safe.init({
    provider: config.RPC_URL,
    signer: config.OWNER_A_PRIVATE_KEY,
    safeAddress: config.SAFE_ADDRESS,
  });
};
const safeTransactionData: MetaTransactionData = {
  to: config.TO,
  value: config.VALUE,
  data: "0x",
  operation: OperationType.Call,
};

export const getSafeTransaction = async (
  safe: Safe,
  transactions: MetaTransactionData[]
) => {
  return await safe.createTransaction({
    transactions: transactions,
  });
};

export const getSafeApiKit = (chainId: number) =>
  new SafeApiKit({
    chainId: BigInt(chainId),
  });
