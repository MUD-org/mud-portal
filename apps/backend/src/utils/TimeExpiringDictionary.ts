export class TimeExpiringDictionary<T> {
  private store: Map<string, { value: T; expiry: number }>;

  constructor() {
      this.store = new Map();
  }

  expire(key: string): void {
    this.store.delete(key);
  }

  set(key: string, value: T, ttl: number): void {
      const expiry = Date.now() + ttl;
      this.store.set(key, { value, expiry });
  }

  get(key: string): T | undefined {
      const item = this.store.get(key);
      if (!item) return undefined;

      if (Date.now() > item.expiry) {
          this.store.delete(key);
          return undefined;
      }

      return item.value;
  }
}