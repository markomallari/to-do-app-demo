const SAVE_USER = "userCache";

export function setUserStore(e) {
  localStorage.setItem(SAVE_USER, e);
}

export function removeUserStore() {
  localStorage.removeItem(SAVE_USER);
}

export function getUserStore() {
  return localStorage.getItem(SAVE_USER);
}
