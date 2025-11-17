export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function load(key, defaultValue = []) {
    return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
}