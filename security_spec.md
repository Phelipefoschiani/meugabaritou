# Security Specification: Meu Gabaritou Firestore Rules

## 1. Data Invariants
1. **User Identity Invariant**: A user document at `/users/{userId}` can only be read and written by the authenticated owner where `request.auth.uid == userId`.
2. **Immutability of Identity**: `id` and `email` on a `/users/{userId}` record cannot be altered after creation.
3. **Study Progress Security**: Study progress records at `/studyProgress/{userId}` can only be accessed and modified by the owning student (`request.auth.uid == userId`).
4. **Trial Registration Integrity**: Trials can be created by visitors or authenticated users, but once created, expiration and creation dates cannot be tampered with. Only the creator or the user with matching email can read their trial document.
5. **Answer Integrity**: Answers logged at `/answers/{answerId}` must have `userId == request.auth.uid`. A student cannot log answers on behalf of another user.
6. **Denial-of-Wallet Prevention**: Document IDs and string fields must respect strictly bounded maximum lengths (<= 128 characters for IDs, bounded string fields).

## 2. The "Dirty Dozen" Payloads (Must Return PERMISSION_DENIED)
1. **Spoofed User Creation**: Unauthenticated client attempting to create `/users/attacker123`.
2. **Cross-User Profile Hijack**: Authenticated user `user_A` attempting to write to `/users/user_B`.
3. **Ghost Role Escalation**: User attempting to inject a shadow admin flag `isAdmin: true` into `/users/{userId}`.
4. **Junk ID Poisoning**: Attempt to create `/users/` document with a 2048-byte non-alphanumeric document ID.
5. **Study Stats Impersonation**: User `user_A` writing study stats to `/studyProgress/user_B`.
6. **Unbounded String Injection**: Submitting a name exceeding 100 characters in `/users/{userId}`.
7. **Negative Stats Attack**: Setting `correctCount: -50` in `/studyProgress/{userId}`.
8. **Answer Log Forgery**: User `user_A` writing an answer to `/answers/ans_1` with `userId: 'user_B'`.
9. **Blanket Query Scraping**: Attempting a collection-level list on `/users` without scoping to `request.auth.uid`.
10. **Trial Tampering**: Attempting to alter `expiresAt` on an existing `/trials/{trialId}` document.
11. **Malicious Enum Injection**: Attempting to set `planId: 'super_admin_vip'` instead of one of the valid plan enums.
12. **Unauthenticated Study Write**: Unauthenticated client attempting to increment answers in `/studyProgress/{userId}`.

## 3. Test Runner Specification
The test suite validates that all 12 dirty payloads are rejected with `PERMISSION_DENIED`.
