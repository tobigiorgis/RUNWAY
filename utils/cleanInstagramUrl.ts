// utils/cleanInstagramUrl.ts
export const cleanInstagramUrl = (url: string): string => {
    const urlObj = new URL(url);
    return `${urlObj.origin}${urlObj.pathname}`;
  };