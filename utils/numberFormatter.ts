export function nFormatter(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol)
    : "0";
}

export default function PriceFormatter2(value: number) {
  const vv = -Math.floor(Math.log(value) / Math.log(10) + 1);
  const vvv = value.toExponential();

  if (value > 0.0001) {
    let num =
      value.toString().split(".")[0] +
      value.toString().split(".")[1]?.slice(0, 8)? ".": '' +
      value.toString().split(".")[1]?.slice(0, 8)
        ? value.toString().split(".")[1]?.slice(0, 8)
        : "";
    return nFormatter(+num, 2);
  }
  let tempNum =
    "0.0" + vv + vvv.toString().slice(0, 4).replace(".", "").split("e")[0];
  return nFormatter(+tempNum, 2);
}
