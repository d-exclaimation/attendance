//
//  AuthStore.ts
//  web
//
//  Created by d-exclaimation on 00:28.
//

/**
 * Authentication InMemory storage.
 */
export class AuthStore {
  /** Static shared global store */
  static shared = new AuthStore();

  private _token: string | null = null;
  private _expireAt: Date | null = null;

  /**
   * Getter for the current token stored
   */
  get token() {
    return this._token ?? "";
  }

  /**
   * Set the auth values in the store and apply logics
   * @param auth New Auth values.
   */
  setAuth(auth: { token: string; expireAt: string }) {
    try {
      const expiration = new Date(auth.expireAt);

      const diff = expiration.getTime() - new Date().getTime() + 3000;
      setTimeout(() => this && this.reset(), diff);
      this._token = auth.token;
      this._expireAt = expiration;
    } catch (_) {}
  }

  /** Get expiration of currently active token */
  get expireAt() {
    return this._expireAt ?? new Date();
  }

  /** @internal */
  private reset() {
    this._expireAt = null;
    this._token = null;
  }
}
