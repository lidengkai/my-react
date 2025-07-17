/** 字符串转json */
export const stringToJson = (value: any): unknown => {
  try {
    return JSON.parse(value);
  } catch {}
};

/** json转字符串 */
export const jsonToString = (value: any): string => {
  try {
    return JSON.stringify(value);
  } catch {
    return '';
  }
};

/** URLSearch转object */
export const urlSearchToObject = <T extends { [x: string]: string }>(
  value: string
): Partial<T> | null => {
  if (value) {
    try {
      const data: any = {};
      const info = new URLSearchParams(value);
      for (const key of info.keys()) {
        const value = info.get(key);
        data[key] = value;
      }
      return data;
    } catch {}
  }
  return null;
};

/** object转URLSearch */
export const objectToUrlSearch = (
  value: any,
  hasQuestion: boolean = true
): string => {
  if (value) {
    try {
      const data = new URLSearchParams();
      for (const key in value) {
        const info = value[key];
        if (info !== undefined) {
          data.append(key, info);
        }
      }
      const text = data.toString();
      if (hasQuestion && text) {
        return '?' + text;
      }
      return text;
    } catch {}
  }
  return '';
};

/** object转FormData */
export const objectToFormData = (value: any): FormData => {
  const data = new FormData();
  if (value) {
    try {
      for (const key in value) {
        const info = value[key];
        if (info !== undefined) {
          data.append(key, info);
        }
      }
    } catch {}
  }
  return data;
};

/** FormData转object */
export const formDataToObject = <T extends { [x: string]: string }>(
  form: FormData
): Partial<T> | null => {
  try {
    const data: any = {};
    for (const key of form.keys()) {
      const value = form.get(key);
      data[key] = value;
    }
    return data;
  } catch {
    return null;
  }
};

/** 千分位格式 */
export const toThousand = (value: any, decimal = 2): string => {
  const number = parseFloat(
    typeof value === 'string' ? value.replace(/,/g, '') : value
  );
  if (!isNaN(number)) {
    return (number || 0).toLocaleString(undefined, {
      minimumFractionDigits: decimal > 0 ? decimal : 0,
      maximumFractionDigits: decimal > 0 ? decimal : 0,
    });
  }
  return '';
};
