const forceCast = <T>(input: any): T => {
  // @ts-ignore <-- forces TS compiler to compile this as-is
  return input;
};
