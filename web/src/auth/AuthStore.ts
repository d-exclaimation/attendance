//
//  AuthStore.ts
//  web
//
//  Created by d-exclaimation on 00:28.
//

export class AuthStore {
  static shared = new AuthStore();

  private _token: string | null = null;
  private _expireAt: Date | null = null;

  get token() {
    return this._token ?? "";
  }

  setAuth(auth: { token: string; expireAt: string }) {
    try {
      const expiration = new Date(auth.expireAt);

      const diff = expiration.getTime() - new Date().getTime();
      setTimeout(() => {
        if (this) this.reset();
      }, diff);
      this._token = auth.token;
      this._expireAt = expiration;
    } catch (_) {}
  }

  get expireAt() {
    return this._expireAt ?? new Date();
  }

  private reset() {
    this._expireAt = null;
    this._token = null;
  }
}
