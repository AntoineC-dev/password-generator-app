export const copyToClipboard = async (str: string) => {
  if (!(navigator && navigator.clipboard && navigator.clipboard.writeText))
    return Promise.reject('The Clipboard API is not available.');
  return navigator.clipboard.writeText(str);
};
