export function calculate(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      // 检查除数是否为0，避免除以0的错误
      if (b === 0) {
        return undefined;
      }
      return a / b;
    default:
      return undefined;
  }
}
