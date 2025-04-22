export const walletRoute = (walletAddress: string, network?: string) =>
  network ? `/wallet/${walletAddress}/${network}` : `/wallet/${walletAddress}`;

export const tokenRoute = (contractAddress: string, network: string) =>
  `/tokens/${network}/${contractAddress}`;
