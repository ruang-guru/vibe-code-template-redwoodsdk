const COOKIE_NAME = "auth_session";

const encoder = new TextEncoder();

export async function createAuthCookie(
  userId: string,
  secret: string,
): Promise<string> {
  const payload = base64UrlEncode(encoder.encode(userId));
  const signature = await signValue(payload, secret);

  return `${COOKIE_NAME}=${payload}.${signature}; Path=/; HttpOnly; SameSite=Lax; Max-Age=1209600`;
}

export function readAuthCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) {
    return null;
  }

  for (const cookie of cookieHeader.split(";")) {
    const [name, ...valueParts] = cookie.trim().split("=");
    if (name === COOKIE_NAME) {
      return valueParts.join("=");
    }
  }

  return null;
}

export async function verifyAuthCookie(
  sessionValue: string | null,
  secret: string,
): Promise<string | null> {
  if (!sessionValue) {
    return null;
  }

  const [payload, signature] = sessionValue.split(".");
  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = await signValue(payload, secret);
  if (!timingSafeEqual(signature, expectedSignature)) {
    return null;
  }

  return new TextDecoder().decode(base64UrlDecode(payload));
}

async function signValue(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return base64UrlEncode(new Uint8Array(signature));
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlDecode(value: string): Uint8Array {
  const paddedValue = value.padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");
  const binary = atob(paddedValue.replaceAll("-", "+").replaceAll("_", "/"));
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function timingSafeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) {
    return false;
  }

  let result = 0;
  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return result === 0;
}
