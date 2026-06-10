import { describe, it, expect } from 'vitest';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

describe('email validation', () => {
  it('accepts valid emails', () => {
    expect(EMAIL_REGEX.test('user@example.com')).toBe(true);
    expect(EMAIL_REGEX.test('joao.silva@empresa.com.br')).toBe(true);
    expect(EMAIL_REGEX.test('test+tag@subdomain.io')).toBe(true);
  });

  it('rejects invalid emails', () => {
    expect(EMAIL_REGEX.test('')).toBe(false);
    expect(EMAIL_REGEX.test('user@')).toBe(false);
    expect(EMAIL_REGEX.test('@example.com')).toBe(false);
    expect(EMAIL_REGEX.test('user @example.com')).toBe(false);
    expect(EMAIL_REGEX.test('user@.com')).toBe(false);
  });
});
