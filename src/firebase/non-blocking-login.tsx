'use client';

// Shimbed auth functions: no-op implementations to maintain API compatibility

export function initiateAnonymousSignIn(_authInstance: any): void {
  // no-op
}

export function initiateEmailSignUp(_authInstance: any, _email: string, _password: string): void {
  // no-op
}

export function initiateEmailSignIn(_authInstance: any, _email: string, _password: string): void {
  // no-op
}
