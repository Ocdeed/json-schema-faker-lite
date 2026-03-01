/**
 * URL Format Generator
 */

import { SeededRandom } from '../utils/seed';

/**
 * Common URL protocols
 */
const PROTOCOLS = [
  'https',
  'http'
];

/**
 * Common domain extensions
 */
const DOMAIN_EXTENSIONS = [
  'com', 'org', 'net', 'io', 'co', 'dev', 'app', 'info',
  'biz', 'me', 'cc', 'tv', 'xyz', 'online', 'site'
];

/**
 * Common domain names
 */
const DOMAIN_NAMES = [
  'example', 'test', 'demo', 'sample', 'mysite', 'app',
  'site', 'web', 'online', 'portal', 'service', 'api'
];

/**
 * Sample path segments
 */
const PATH_SEGMENTS = [
  'home', 'about', 'contact', 'blog', 'news', 'products',
  'services', 'support', 'faq', 'terms', 'privacy', 'login',
  'register', 'dashboard', 'profile', 'settings', 'api', 'v1', 'v2'
];

/**
 * Sample file extensions
 */
const FILE_EXTENSIONS = [
  'html', 'htm', 'php', 'asp', 'aspx', 'jsp', 'do',
  'json', 'xml', 'txt', 'csv', 'pdf', 'jpg', 'png', 'gif'
];

/**
 * Generate a random URL
 * @param random - The random function
 * @returns A random URL string
 */
export function generateURL(random: SeededRandom): string {
  const protocol = PROTOCOLS[Math.floor(random() * PROTOCOLS.length)];
  const domainName = DOMAIN_NAMES[Math.floor(random() * DOMAIN_NAMES.length)];
  const extension = DOMAIN_EXTENSIONS[Math.floor(random() * DOMAIN_EXTENSIONS.length)];
  
  // Randomly decide if we add www
  const www = random() > 0.5 ? 'www.' : '';
  
  // Randomly decide path depth
  const hasPath = random() > 0.3;
  let path = '';
  
  if (hasPath) {
    const pathDepth = Math.floor(random() * 3) + 1;
    const segments: string[] = [];
    
    for (let i = 0; i < pathDepth; i++) {
      segments.push(PATH_SEGMENTS[Math.floor(random() * PATH_SEGMENTS.length)]);
    }
    
    path = '/' + segments.join('/');
    
    // Randomly add file extension
    if (random() > 0.5) {
      const ext = FILE_EXTENSIONS[Math.floor(random() * FILE_EXTENSIONS.length)];
      path += `.${ext}`;
    }
  }
  
  // Randomly add query string
  const hasQuery = random() > 0.7;
  let query = '';
  
  if (hasQuery) {
    const params = ['page', 'id', 'ref', 'source', 'utm_source', 'utm_medium'];
    const param = params[Math.floor(random() * params.length)];
    const value = Math.floor(random() * 1000);
    query = `?${param}=${value}`;
  }
  
  return `${protocol}://${www}${domainName}.${extension}${path}${query}`;
}

/**
 * Generate a simple URL without path/query
 * @param random - The random function
 * @returns A simple URL string
 */
export function generateSimpleURL(random: SeededRandom): string {
  const protocol = PROTOCOLS[Math.floor(random() * PROTOCOLS.length)];
  const domainName = DOMAIN_NAMES[Math.floor(random() * DOMAIN_NAMES.length)];
  const extension = DOMAIN_EXTENSIONS[Math.floor(random() * DOMAIN_EXTENSIONS.length)];
  
  return `${protocol}://${domainName}.${extension}`;
}

/**
 * Generate a random hostname
 * @param random - The random function
 * @returns A random hostname string
 */
export function generateHostname(random: SeededRandom): string {
  const domainName = DOMAIN_NAMES[Math.floor(random() * DOMAIN_NAMES.length)];
  const extension = DOMAIN_EXTENSIONS[Math.floor(random() * DOMAIN_EXTENSIONS.length)];
  
  // Randomly decide if we add subdomain
  const hasSubdomain = random() > 0.5;
  let subdomain = '';
  
  if (hasSubdomain) {
    const subdomains = ['www', 'api', 'dev', 'staging', 'app', 'mail'];
    subdomain = subdomains[Math.floor(random() * subdomains.length)] + '.';
  }
  
  return `${subdomain}${domainName}.${extension}`;
}
