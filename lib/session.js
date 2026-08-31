// Perfil activo en este dispositivo (estilo Netflix)
const KEY = "mc_profile";

export function getProfile() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(KEY) || "null");
  } catch {
    return null;
  }
}
export function setProfile(p) {
  localStorage.setItem(KEY, JSON.stringify(p));
}
export function clearProfile() {
  localStorage.removeItem(KEY);
}

export async function hashPin(pin) {
  const data = new TextEncoder().encode("metacog:" + pin);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
