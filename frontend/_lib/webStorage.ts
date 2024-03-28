const getStorage = (storageType: "LOCAL" | "SESSION" = "SESSION") => {
  if (typeof window === "undefined") {
    return null;
  }

  return storageType === "LOCAL" ? window.localStorage : window.sessionStorage;
};

export const defineWebStorage = <T>(
  key: string,
  storageType?: "LOCAL" | "SESSION",
) => {
  const getValue = (): T | null => {
    const storage = getStorage(storageType);

    if (!storage) {
      return null;
    }

    try {
      const value = storage.getItem(key);
      if (!value) {
        resetValue();
        return null;
      }
      return JSON.parse(value);
    } catch (e) {
      throw new Error(`${key}에 해당하는 value를 가져오는데 에러가 발생했어요`);
    }
  };

  const setValue = (value: T) => {
    const storage = getStorage(storageType);

    if (!storage) {
      return;
    }

    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      throw new Error(`${key}에 해당하는 value를 세팅하는데 에러가 발생했어요`);
    }
  };

  const resetValue = () => {
    const storage = getStorage(storageType);

    if (!storage) {
      return;
    }

    storage.removeItem(key);
  };

  return {
    getValue,
    setValue,
    resetValue,
  };
};
