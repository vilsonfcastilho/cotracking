const verifyOrderCode = (code: string): boolean =>
  /^[A-Z]{2}[0-9]{9}[A-Z]{2}$/.test(code);

export default verifyOrderCode;
