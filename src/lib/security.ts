// Web Crypto API SHA-256 hashing
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Precomputed SHA-256 for default master PIN '7860'
export const DEFAULT_PIN_HASH = 'e2f691407acb1efa4c9f9f8b1ae626cf6d9a4d96e73e207e9ea7f429293127a8';

const ATTEMPTS_KEY = 'yasin_portfolio_admin_attempts';
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes lockout
const MAX_ATTEMPTS = 5;

export interface LockoutStatus {
  isLocked: boolean;
  remainingSeconds: number;
  remainingAttempts: number;
}

export function getLockoutStatus(): LockoutStatus {
  try {
    const data = localStorage.getItem(ATTEMPTS_KEY);
    if (!data) return { isLocked: false, remainingSeconds: 0, remainingAttempts: MAX_ATTEMPTS };
    const { count, lockedUntil } = JSON.parse(data);
    const now = Date.now();
    if (lockedUntil && lockedUntil > now) {
      return {
        isLocked: true,
        remainingSeconds: Math.ceil((lockedUntil - now) / 1000),
        remainingAttempts: 0
      };
    }
    return {
      isLocked: false,
      remainingSeconds: 0,
      remainingAttempts: Math.max(0, MAX_ATTEMPTS - (count || 0))
    };
  } catch {
    return { isLocked: false, remainingSeconds: 0, remainingAttempts: MAX_ATTEMPTS };
  }
}

export function recordFailedAttempt(): LockoutStatus {
  try {
    const data = localStorage.getItem(ATTEMPTS_KEY);
    const parsed = data ? JSON.parse(data) : { count: 0, lockedUntil: 0 };
    parsed.count = (parsed.count || 0) + 1;
    if (parsed.count >= MAX_ATTEMPTS) {
      parsed.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
    }
    localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(parsed));
    return getLockoutStatus();
  } catch {
    return { isLocked: false, remainingSeconds: 0, remainingAttempts: 0 };
  }
}

export function resetFailedAttempts() {
  try {
    localStorage.removeItem(ATTEMPTS_KEY);
  } catch {}
}
