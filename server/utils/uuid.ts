import { randomUUID } from 'crypto';

// UUID v4 validation regex
const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Generate a new UUID v4
 * @returns A new UUID v4 string
 */
export const generateUUID = (): string => {
  return randomUUID();
};

/**
 * Validate if a string is a valid UUID v4
 * @param uuid - The string to validate
 * @returns True if valid UUID v4, false otherwise
 */
export const isValidUUID = (uuid: string): boolean => {
  return UUID_V4_REGEX.test(uuid);
};

/**
 * Ensure an ID is a valid UUID v4, generate one if not
 * @param id - The ID to validate/generate
 * @returns A valid UUID v4 string
 */
export const ensureUUID = (id?: string): string => {
  if (id && isValidUUID(id)) {
    return id;
  }
  return generateUUID();
};

/**
 * Type guard for UUID v4
 * @param value - The value to check
 * @returns True if the value is a valid UUID v4 string
 */
export const isUUIDv4 = (value: any): value is string => {
  return typeof value === 'string' && isValidUUID(value);
};

// Export the UUID type for better TypeScript support
export type UUIDv4 = string; 