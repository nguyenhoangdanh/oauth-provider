import { AuthProvider, AuthResponse } from './types';

export class OAuthProvider implements AuthProvider {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Sign-in failed');
    }

    return response.json();
  }

  async signUp(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error('Sign-up failed');
    }

    return response.json();
  }

  async signOut(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Sign-out failed');
    }
  }
}