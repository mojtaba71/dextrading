interface AddressInfo {
    address: string;
    ETH?: ETHDetails;
    contractInfo?: ContractInfo;
    tokenInfo?: TokenInfo;
    tokens?: Token[];
    countTxs?: number;
}

interface ETHDetails {
    balance: number;
    rawBalance: string;
    totalIn: number;
    totalOut: number;
}

interface ContractInfo {
    creatorAddress: string;
    transactionHash: string;
    timestamp: number;
}

interface Token {
    tokenInfo: TokenInfo;
    balance: number;
    rawBalance: string;
    totalIn: number;
    totalOut: number;
}

interface TokenInfo {
}
