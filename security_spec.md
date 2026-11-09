# Security Specification (Phase 0: Payload-First Security TDD)

## 1. Data Invariants
1. **Strict Ownership**: Every document in `/products`, `/customers`, `/orders`, `/service_tickets`, `/financial_entries`, and `/site_licenses` must have an `ownerId` matching `request.auth.uid` (or be accessed by a verified bootstrapped Admin).
2. **Email Verification**: Every write operation requires `request.auth.token.email_verified == true`.
3. **Strict Keys & Schema Bounds**: Every document write is validated by `isValid[Entity](incoming())`, enforcing `hasAll` and `hasOnly` key checks, string `.size()` bounds, numeric type checks, and enum allowlists.
4. **Path ID Hardening**: All single-document operations (`get`, `create`, `update`, `delete`) validate the document ID via `isValidId(id)` matching `^[a-zA-Z0-9_\-]+$` and `.size() <= 128`.
5. **Temporal Integrity**: `createdAt` must equal `request.time` on `create` and remain immutable on `update`; `updatedAt` must equal `request.time` on both `create` and `update`.
6. **Query Enforcer**: All `allow list` rules enforce `resource.data.ownerId == request.auth.uid` (or `isAdmin()`).

## 2. The "Dirty Dozen" Payloads
1. **Unauthenticated Write**: Creating a `/products/prod_1` document with `request.auth == null`.
2. **Unverified Email Spoof**: Creating a `/products/prod_1` document where `request.auth.token.email == 'ucec.gov.bd@gmail.com'` but `email_verified == false`.
3. **Owner Spoofing**: Creating `/customers/cust_1` where `ownerId != request.auth.uid`.
4. **Shadow/Ghost Field Injection**: Updating `/products/prod_1` with an extra field `isSuperAdmin: true`.
5. **Path ID Poisoning**: Creating `/orders/invalid$id!with*spaces` that violates `^[a-zA-Z0-9_\-]+$`.
6. **Denial-of-Wallet String Overflow**: Creating `/products/prod_1` with a `name` exceeding 200 characters.
7. **Timestamp Forgery on Create**: Creating `/orders/ord_1` with a past/future `createdAt` not equal to `request.time`.
8. **Immutable Field Mutation**: Updating `/orders/ord_1` by modifying `ownerId` or `createdAt`.
9. **Invalid Enum State**: Creating `/orders/ord_1` with `orderStatus: "HackedStatus"`.
10. **Terminal State Modification**: Non-admin attempting to mutate an order after it reaches terminal state `Completed` or `Cancel`.
11. **Unauthorized PII Read**: Authenticated user `user_B` attempting `get` on `/customers/cust_owned_by_A`.
12. **Blanket List Scraping**: Authenticated user running an unconstrained `list` query on `/customers` without filtering by `ownerId == request.auth.uid`.

## 3. Conflict & Audit Verification
- **Shadow Update Test**: Blocked by `.keys().hasOnly(...)` in `isValid[Entity]` and `affectedKeys().hasOnly(...)` in `allow update`.
- **Email Spoofing Test**: Blocked by `isVerifiedUser()` checking `request.auth.token.email_verified == true`.
- **PII Blanket Test**: `/customers/{customerId}` restricts `get` and `list` to `resource.data.ownerId == request.auth.uid || isAdmin()`.
- **Query Trust Test**: All `allow list` rules check `resource.data.ownerId == request.auth.uid || isAdmin()`.
