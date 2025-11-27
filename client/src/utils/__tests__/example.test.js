import { describe, it, expect } from 'vitest';

describe('Example Test Suite', () => {
  it('should add 1 + 1 correctly', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle string operations', () => {
    const str = 'Hello World';
    expect(str.toUpperCase()).toBe('HELLO WORLD');
    expect(str.length).toBe(11);
  });

  it('should work with arrays', () => {
    const arr = [1, 2, 3];
    expect(arr.length).toBe(3);
    expect(arr.includes(2)).toBe(true);
  });

  it('should work with objects', () => {
    const obj = { name: 'test', value: 123 };
    expect(obj.name).toBe('test');
    expect(obj.value).toBe(123);
  });
});
