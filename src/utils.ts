export const randomId = `${Math.random()
  .toString(36)
  .substring(2, 9)}-${Date.now()}`;

// 비동기 함수 타이머
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
