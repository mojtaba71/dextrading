const isDebugEnabled = process.env.DEBUG === "true";

export const log = (...args: any) => {
  if (isDebugEnabled) {
    console.log(...args);
  }
};

export const logError = (...args: any) => {
  if (isDebugEnabled) {
    console.error(...args);
  }
};
