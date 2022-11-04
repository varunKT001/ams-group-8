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
