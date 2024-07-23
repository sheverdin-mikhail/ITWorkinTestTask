export interface Web3ContextScheme {
    address?: string 
    balance?: string
    currentEpoch?: string

    connectAccount?: () => void
    disconnectAccount?: () => void 
    fetchEpoch?: () => void
}