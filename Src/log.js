// Helper functions: validation, JSON parsing, logging, and CD.

export function isValidKey(key) {
  return typeof key === 'string' && key.trim().length > 0;
}

export function parseJSON(str) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

export function toJSON(val) {
  return JSON.stringify(val);
}

export function log(msg, type = 'info') {
  const prefix = type === 'error' ? '[ERROR]' : '[INFO]';
  console.log(prefix + ' ' + msg);
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
