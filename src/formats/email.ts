/**
 * Email Format Generator
 */

import { SeededRandom } from '../utils/seed';

/**
 * Sample email domains
 */
const EMAIL_DOMAINS = [
  'example.com',
  'test.com',
  'demo.org',
  'sample.net',
  'mail.test',
  'foo.co',
  'bar.io',
  'example.org',
  'test.net',
  'demo.com'
];

/**
 * Sample first names for email local part
 */
const FIRST_NAMES = [
  'john', 'jane', 'bob', 'alice', 'mike', 'sarah', 'tom', 'emma',
  'david', 'lisa', 'james', 'kate', 'chris', 'anna', 'matt', 'emily',
  'daniel', 'sophia', 'michael', 'olivia', 'william', 'ava', 'james', 'isabella'
];

/**
 * Sample last names for email local part
 */
const LAST_NAMES = [
  'smith', 'jones', 'brown', 'taylor', 'wilson', 'davis', 'miller',
  'johnson', 'garcia', 'martinez', 'robinson', 'clark', 'rodriguez', 'lee',
  'walker', 'hall', 'allen', 'young', 'king', 'wright', 'lopez', 'hill', 'scott'
];

/**
 * Generate a random email address
 * @param random - The random function
 * @returns A random email address
 */
export function generateEmail(random: SeededRandom): string {
  const firstName = FIRST_NAMES[Math.floor(random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(random() * LAST_NAMES.length)];
  const domain = EMAIL_DOMAINS[Math.floor(random() * EMAIL_DOMAINS.length)];
  
  // Randomly choose email format
  const format = Math.floor(random() * 4);
  
  switch (format) {
    case 0: // firstname.lastname
      return `${firstName}.${lastName}@${domain}`;
    case 1: // firstname_lastname
      return `${firstName}_${lastName}@${domain}`;
    case 2: // firstname + number
      const num = Math.floor(random() * 99) + 1;
      return `${firstName}${num}@${domain}`;
    case 3: // first initial + lastname
      const firstInitial = firstName.charAt(0);
      return `${firstInitial}${lastName}@${domain}`;
    default:
      return `${firstName}.${lastName}@${domain}`;
  }
}
