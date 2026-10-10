import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as fbSignOut, 
  onAuthStateChanged,
  signInAnonymously
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  getDocFromServer,
  collection,
  addDoc
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// CRITICAL: The app will break without this line
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Auth Service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Connection Validation Test
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

// Error Handling Infrastructure
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Student User Interface
export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  plan: string;
  planId: 'iniciante' | 'intermediario' | 'avancado' | 'trial';
  isTrial?: boolean;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentProgress {
  userId: string;
  answeredToday: number;
  correctCount: number;
  errorsCount: number;
  streakDays: number;
  updatedAt?: string;
}

/**
 * Sign in with Google using popup
 */
export async function loginWithGoogle(): Promise<StudentProfile> {
  const result = await signInWithPopup(auth, googleProvider);
  const fbUser = result.user;
  const uid = fbUser.uid;
  const email = fbUser.email || '';
  const name = fbUser.displayName || email.split('@')[0] || 'Estudante';

  const userDocRef = doc(db, 'users', uid);
  const userPath = `users/${uid}`;
  
  try {
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      const data = snap.data() as StudentProfile;
      return data;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, userPath);
  }

  // Create new profile if not existing
  const newProfile: StudentProfile = {
    id: uid,
    name: name.slice(0, 100),
    email: email.slice(0, 150),
    plan: 'Intermediário ⭐ (Pratique + Analise)',
    planId: 'intermediario',
    isTrial: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  try {
    await setDoc(userDocRef, newProfile);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, userPath);
  }

  return newProfile;
}

/**
 * Sync email/password login or guest session to Firebase
 */
export async function syncStudentProfile(email: string, name?: string, planId: 'iniciante' | 'intermediario' | 'avancado' | 'trial' = 'intermediario', isTrial: boolean = false, phone?: string): Promise<StudentProfile> {
  // If not already authenticated in Firebase, authenticate anonymously or with existing user
  let currentUid = auth.currentUser?.uid;
  if (!currentUid) {
    try {
      const cred = await signInAnonymously(auth);
      currentUid = cred.user.uid;
    } catch {
      // Fallback pseudo UID
      currentUid = 'student_' + Math.random().toString(36).substring(2, 10);
    }
  }

  const userPath = `users/${currentUid}`;
  const userDocRef = doc(db, 'users', currentUid);

  const profile: StudentProfile = {
    id: currentUid,
    name: (name || email.split('@')[0] || 'Estudante').slice(0, 100),
    email: email.slice(0, 150),
    plan: isTrial ? 'Plano FREE (10 questões/dia)' : (planId === 'avancado' ? 'Avançado 🚀 (Elite do Concurso)' : (planId === 'iniciante' ? 'Iniciante 🎯 (Base Sólida)' : 'Intermediário ⭐ (Pratique + Analise)')),
    planId,
    isTrial,
    phone: phone ? phone.slice(0, 30) : undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  try {
    await setDoc(userDocRef, profile, { merge: true });
  } catch (err) {
    // If permission or anonymous write restrictions apply, keep local profile
    console.warn('Sync profile notice:', err);
  }

  return profile;
}

/**
 * Register a 24h Free Trial lead in Firebase Firestore
 */
export async function registerTrialLead(data: { name: string; email: string; phone: string }): Promise<void> {
  const trialId = 'trial_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const trialPath = `trials/${trialId}`;
  
  const payload = {
    id: trialId,
    name: data.name.trim().slice(0, 100),
    email: data.email.trim().slice(0, 150),
    phone: data.phone.trim().slice(0, 30),
    status: 'active' as const,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  };

  try {
    await setDoc(doc(db, 'trials', trialId), payload);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, trialPath);
  }
}

/**
 * Save user study stats to Firebase
 */
export async function saveStudyStats(userId: string, stats: { answeredToday: number; correctCount: number; errorsCount: number; streakDays: number }): Promise<void> {
  if (!userId) return;
  const path = `studyProgress/${userId}`;
  const docRef = doc(db, 'studyProgress', userId);

  const payload: StudentProgress = {
    userId,
    answeredToday: stats.answeredToday,
    correctCount: stats.correctCount,
    errorsCount: stats.errorsCount,
    streakDays: stats.streakDays,
    updatedAt: new Date().toISOString()
  };

  try {
    await setDoc(docRef, payload, { merge: true });
  } catch (err) {
    console.warn('Study stats update warning:', err);
  }
}

/**
 * Log student question answer
 */
export async function logQuestionAnswer(userId: string, questionId: number, selectedOption: string, isCorrect: boolean): Promise<void> {
  if (!userId) return;
  const ansId = 'ans_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
  const path = `answers/${ansId}`;

  const payload = {
    userId,
    questionId,
    selectedOption: selectedOption.slice(0, 5),
    isCorrect,
    answeredAt: new Date().toISOString()
  };

  try {
    await setDoc(doc(db, 'answers', ansId), payload);
  } catch (err) {
    console.warn('Log answer notice:', err);
  }
}

/**
 * Sign out
 */
export async function logoutFirebase(): Promise<void> {
  try {
    await fbSignOut(auth);
  } catch (e) {
    console.error('Firebase sign out error:', e);
  }
}
