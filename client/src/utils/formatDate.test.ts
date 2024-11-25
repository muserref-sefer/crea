import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('should format a valid ISO date string to "Month Day, Year"', () => {
    const input = '2024-01-10T10:30:00.000Z';
    const expectedOutput = 'January 10, 2024';
    expect(formatDate(input)).toBe(expectedOutput);
  });

  it('should handle invalid date strings gracefully', () => {
    const input = 'invalid-date';
    const expectedOutput = 'Invalid Date';
    expect(formatDate(input)).toBe(expectedOutput);
  });

  it('should handle empty date strings gracefully', () => {
    const input = '';
    const expectedOutput = 'Invalid Date';
    expect(formatDate(input)).toBe(expectedOutput);
  });

  it('should handle null values gracefully', () => {
    const input = null as unknown as string; 
    const expectedOutput = 'Invalid Date';
    expect(formatDate(input)).toBe(expectedOutput);
  });

  it('should handle undefined values gracefully', () => {
    const input = undefined as unknown as string; 
    const expectedOutput = 'Invalid Date';
    expect(formatDate(input)).toBe(expectedOutput);
  });

  it('should format a leap year date correctly', () => {
    const input = '2024-02-29T00:00:00.000Z';
    const expectedOutput = 'February 29, 2024';
    expect(formatDate(input)).toBe(expectedOutput);
  });
});