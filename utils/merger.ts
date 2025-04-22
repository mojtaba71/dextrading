// // @ts-ignore
// export function merge() {
//   var dst = {},
//     src,
//     p,
//     // @ts-ignore
//     args = [].splice.call(arguments, 0);
//   while (args.length > 0) {
//     src = args.splice(0, 1)[0];
//     if (toString.call(src) == "[object Object]") {
//       for (p in src) {
//         // @ts-ignore
//         if (src.hasOwnProperty(p)) {
//           if (toString.call(src[p]) == "[object Object]") {
//             // @ts-ignore
//             dst[p] = merge(dst[p] || {}, src[p]);
//           } else {
//             // @ts-ignore
//             dst[p] = src[p];
//           }
//         }
//       }
//     }
//   }

//   return dst;
// }



export function merge<T>(...args: T[]): T {
  var dst: any = {},
    src: any,
    p: string;

  while (args.length > 0) {
    src = args.splice(0, 1)[0];
    if (Object.prototype.toString.call(src) == "[object Object]") {
      for (p in src) {
        if (Object.prototype.hasOwnProperty.call(src, p)) {
          if (Object.prototype.toString.call(src[p]) == "[object Object]") {
            dst[p] = merge(dst[p] || {}, src[p]);
          } else {
            dst[p] = src[p];
          }
        }
      }
    }
  }

  return dst as T;
}