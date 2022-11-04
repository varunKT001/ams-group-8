export function set(obj, path, value) {
  if (path.length === 1) {
    obj[path] = value;
    return;
  }
  return set(obj[path[0]], path.slice(1), value);
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generatePassword() {
  let length = 8,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    retVal = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
