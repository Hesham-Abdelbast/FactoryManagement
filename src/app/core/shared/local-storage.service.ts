import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly storage: Storage | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        // Test localStorage availability (might be disabled in private mode)
        const testKey = '__storage_test__';
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
        this.storage = window.localStorage;
      } catch (e) {
        console.error('LocalStorage is not available', e);
      }
    }
  }

  
  getValue<T>(key: string): T | null {
    if (!this.storage) return null;

    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting localStorage key "${key}"`, error);
      return null;
    }
  }

  setValue<T>(key: string, value: T): void {
    if (!this.storage) return;

    try {
      const serializedValue = JSON.stringify(value);
      this.storage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}"`, error);
      if (error === 'QuotaExceededError') {
        console.warn('LocalStorage quota exceeded');
      }
    }
  }

  removeValue(key: string): void {
    if (!this.storage) return;
    this.storage.removeItem(key);
  }

  clearStorage(): void {
    if (!this.storage) return;
    this.storage.clear();
  }

  exists(key: string): boolean {
    if (!this.storage) return false;
    return this.storage.getItem(key) !== null;
  }
}
