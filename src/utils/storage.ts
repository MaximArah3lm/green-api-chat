const PREFIX = 'green-api-chat:'

export function loadFromStorage<T>(key: string): T | undefined {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? (JSON.parse(raw) as T) : undefined
  } catch {
    return undefined
  }
}

export function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

export function removeFromStorage(key: string) {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    // ignore
  }
}
