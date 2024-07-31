import {
  MetaTransactionData,
  OperationType,
  SafeMultisigTransactionResponse,
} from "@safe-global/safe-core-sdk-types";
import { config } from "./config";
import { initSafe, getSafeTransaction, getSafeApiKit } from "./tools";

console.log("Hello Safe Wallet!");

// Create a Safe transaction
export const safeTransactionData: MetaTransactionData = {
  to: config.TO,
  value: config.VALUE,
  data: "0x",
  operation: OperationType.Call,
};

export const createSafeTransaction = async () => {
  const safeA = await initSafe();
  const safeApiKit = getSafeApiKit(11155111);
  safeTransactionData.value = (
    await safeApiKit.getSafeInfo(config.SAFE_ADDRESS)
  ).nonce.toString();

  const safeTransaction = await getSafeTransaction(safeA, [
    safeTransactionData,
  ]);
  //   console.log("Safe Transaction: ", safeTransaction);

  // Sign the transaction with Owner A
  const safeTxHash = await safeA.getTransactionHash(safeTransaction);
  // console.log("Safe Tx Hash: ", safeTxHash);
  const signatureOwnerA = await safeA.signHash(safeTxHash);
  //   console.log("Signature Owner A: ", signatureOwnerA);

  //   console.log(await safeApiKit.getSafeInfo(config.SAFE_ADDRESS));

  let signedTransaction: SafeMultisigTransactionResponse;
  try {
    signedTransaction = await safeApiKit.getTransaction(safeTxHash);

    // console.log("Signed Transaction: ", signedTransaction);
  } catch (e) {
    // 如果服务器没有safeTxHash的信息，Send transaction to Safe Service
    // Send the transaction to the Transaction Service with the signature from Owner A
    await safeApiKit.proposeTransaction({
      safeAddress: config.SAFE_ADDRESS,
      safeTransactionData: safeTransaction.data,
      safeTxHash,
      senderAddress: signatureOwnerA.signer,
      senderSignature: signatureOwnerA.data,
    });
    console.log("proposeTransaction sent to Safe Service");

    signedTransaction = await safeApiKit.getTransaction(safeTxHash);
  }

  if (
    signedTransaction.confirmations.length ===
    signedTransaction.confirmationsRequired
  ) {
    // Execute the transaction
    const transactionResponse = await safeA.executeTransaction(
      signedTransaction
    );

    // console.log("Transaction Response: ", transactionResponse);
    console.log(`Transaction executed: ${transactionResponse.hash}`);
  } else {
    const owner = signedTransaction.confirmations[0].owner;
    (await safeApiKit.getSafeInfo(config.SAFE_ADDRESS)).owners.forEach(
      (owner_) => {
        if (owner_ !== owner) {
          console.log(`Waiting for confirmations: ${owner_}`);
        }
      }
    );
  }
};
