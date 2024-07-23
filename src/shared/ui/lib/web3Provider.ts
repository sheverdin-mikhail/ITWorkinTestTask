import { ethers } from "ethers";

/**
 * Get an Ethereum provider
 *
 * @returns {ethers.BrowserProvider | null} An Ethereum provider or null.
 * @throws {Error} Throws an error if it is not installed or not accessible.
 */
const getProvider = (): ethers.BrowserProvider | ethers.JsonRpcProvider => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider;
  } else {
    const rpcUrl = process.env.NEXT_PUBLIC_HTTPS_PROVIDER;
    return new ethers.JsonRpcProvider(rpcUrl);
  }
};

export default getProvider;
