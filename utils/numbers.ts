export function separate3digits(num: number | string) {
  if (!num) return num;
  let str = num.toString().split(".");
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, "$1 ");
  }
  return str.join(".");
}

export const formatCash = (number: number, toFixed = 1) => {
  let n;
  let isMinus = number < 0;
  if (number < 0) {
    n = -1 * number;
  } else {
    n = number;
  }

  if (n < 1e3) return isMinus ? -1 * +n.toFixed(toFixed) : +n.toFixed(toFixed);
  if (n >= 1e3 && n < 1e6)
    return isMinus
      ? -1 * +(n / 1e3).toFixed(toFixed) + "K"
      : +(n / 1e3).toFixed(toFixed) + "K";
  if (n >= 1e6 && n < 1e9)
    return isMinus
      ? -1 * +(n / 1e6).toFixed(toFixed) + "M"
      : +(n / 1e6).toFixed(toFixed) + "M";
  if (n >= 1e9 && n < 1e12)
    return isMinus
      ? -1 * +(n / 1e9).toFixed(toFixed) + "B"
      : +(n / 1e9).toFixed(toFixed) + "B";
  if (n >= 1e12)
    return isMinus
      ? -1 * +(n / 1e12).toFixed(toFixed) + "T"
      : +(n / 1e12).toFixed(toFixed) + "T";
};
