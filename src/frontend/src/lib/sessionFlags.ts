const UNLOCKED_KEY = 'birthday_unlocked';
const ENTERED_KEY = 'birthday_entered';

export function getUnlockedState(): boolean {
  return sessionStorage.getItem(UNLOCKED_KEY) === 'true';
}

export function setUnlockedState(unlocked: boolean): void {
  sessionStorage.setItem(UNLOCKED_KEY, unlocked.toString());
}

export function getEnteredState(): boolean {
  return sessionStorage.getItem(ENTERED_KEY) === 'true';
}

export function setEnteredState(entered: boolean): void {
  sessionStorage.setItem(ENTERED_KEY, entered.toString());
}
