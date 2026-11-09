/**
 * Security Rules Dirty Dozen Verification Suite
 * Verifies that all 12 adversarial payloads described in security_spec.md
 * are rejected by DRAFT_firestore.rules / firestore.rules.
 */

export interface SecurityTestCase {
  id: number;
  name: string;
  collection: string;
  docId: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  expectedResult: 'PERMISSION_DENIED';
  payload?: Record<string, unknown>;
}

export const dirtyDozenTestCases: SecurityTestCase[] = [
  {
    id: 1,
    name: 'Unauthenticated Write',
    collection: 'products',
    docId: 'prod_1',
    operation: 'create',
    expectedResult: 'PERMISSION_DENIED',
    payload: { ownerId: 'anon', proId: '10.101', name: 'Keyboard' }
  },
  {
    id: 2,
    name: 'Unverified Email Spoof',
    collection: 'products',
    docId: 'prod_1',
    operation: 'create',
    expectedResult: 'PERMISSION_DENIED',
    payload: { ownerId: 'user_1', email_verified: false }
  },
  {
    id: 3,
    name: 'Owner Spoofing',
    collection: 'customers',
    docId: 'cust_1',
    operation: 'create',
    expectedResult: 'PERMISSION_DENIED',
    payload: { ownerId: 'other_user_id', name: 'Humayoun Kabir', mobile: '01517850737', address: 'Jashore', due: 0 }
  },
  {
    id: 4,
    name: 'Shadow/Ghost Field Injection',
    collection: 'products',
    docId: 'prod_1',
    operation: 'update',
    expectedResult: 'PERMISSION_DENIED',
    payload: { isSuperAdmin: true }
  },
  {
    id: 5,
    name: 'Path ID Poisoning',
    collection: 'orders',
    docId: 'invalid$id!with*spaces',
    operation: 'create',
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 6,
    name: 'Denial-of-Wallet String Overflow',
    collection: 'products',
    docId: 'prod_1',
    operation: 'create',
    expectedResult: 'PERMISSION_DENIED',
    payload: { name: 'A'.repeat(500) }
  },
  {
    id: 7,
    name: 'Timestamp Forgery on Create',
    collection: 'orders',
    docId: 'ord_1',
    operation: 'create',
    expectedResult: 'PERMISSION_DENIED',
    payload: { createdAt: '1999-01-01T00:00:00Z' }
  },
  {
    id: 8,
    name: 'Immutable Field Mutation',
    collection: 'orders',
    docId: 'ord_1',
    operation: 'update',
    expectedResult: 'PERMISSION_DENIED',
    payload: { ownerId: 'hacker_uid' }
  },
  {
    id: 9,
    name: 'Invalid Enum State',
    collection: 'orders',
    docId: 'ord_1',
    operation: 'create',
    expectedResult: 'PERMISSION_DENIED',
    payload: { orderStatus: 'HackedStatus' }
  },
  {
    id: 10,
    name: 'Terminal State Modification',
    collection: 'orders',
    docId: 'ord_completed',
    operation: 'update',
    expectedResult: 'PERMISSION_DENIED',
    payload: { orderStatus: 'Pending' }
  },
  {
    id: 11,
    name: 'Unauthorized PII Read',
    collection: 'customers',
    docId: 'cust_owned_by_A',
    operation: 'get',
    expectedResult: 'PERMISSION_DENIED'
  },
  {
    id: 12,
    name: 'Blanket List Scraping',
    collection: 'customers',
    docId: '*',
    operation: 'list',
    expectedResult: 'PERMISSION_DENIED'
  }
];
