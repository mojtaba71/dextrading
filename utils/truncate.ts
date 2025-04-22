export const minifyContract = (
  contract: string,
  startChars: number = 3,
  endChars: number = 4
) => {
  if (!contract) return "";
  if (contract.length <= 12) return contract;
  const first = contract.slice(0, startChars);
  const second = contract.slice(-endChars, contract.length);
  return `${first}...${second}`;
};

export const minifyTokenName = (tokenName: string | undefined) => {
  if (!tokenName) return "";
  // return tokenName;
  if (tokenName.length <= 12) return tokenName;
  const first = tokenName.slice(0, 12);
  return `${first}...`;
};

export const customizeTokenName = (
  tokenName: string | undefined,
  startChar: number = 6,
  endChar: number = 6
) => {
  if (!tokenName) return "";
  // return tokenName;
  if (tokenName.length <= 8) return tokenName;
  const first = tokenName.slice(0, 7);
  return `${first}...`;
};

export function truncate(text: string, length?: number): string {
  var maxLength = length || 20;
  var result = `${text.substring(0, maxLength)}  ${
    text.length > maxLength ? "..." : ""
  }`;
  return result;
}
