export interface AuthResponse {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      [key: string]: any;
    };
    [key: string]: any;
  }

  export interface AuthProvider {
    signIn(email: string, password: string): Promise<AuthResponse>;
    signUp(name: string, email: string, password: string): Promise<AuthResponse>;
    signOut(): Promise<void>;
  }