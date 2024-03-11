export const defineWebStorage = <T>(
  key: string,
  storageType?: "LOCAL" | "SESSION",
) => {
  const webStorage =
    storageType === "LOCAL" ? window.localStorage : window.sessionStorage;

  const getValue = (): T => {
    try {
      const value = webStorage.getItem(key);
      if (!value) {
        throw new Error(`${key}에 해당하는 value가 없어요`);
      }
      return JSON.parse(value);
    } catch (e) {
      throw new Error(`${key}에 해당하는 value를 가져오는데 에러가 발생했어요`);
    }
  };

  const setValue = (value: T) => {
    try {
      webStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      throw new Error(`${key}에 해당하는 value를 세팅하는데 에러가 발생했어요`);
    }
  };

  const resetValue = () => {
    webStorage.removeItem(key);
  };

  return {
    getValue,
    setValue,
    resetValue,
  };
};
