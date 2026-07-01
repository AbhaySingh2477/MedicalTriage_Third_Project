// ── User Types ──────────────────────────────────────

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface DoctorMetadata {
  licenseNumber: string;
  specializations: string[];
  rating: number;
  verifiedAt: string | null;
  maxConcurrentSessions: number;
}

export interface User {
  id: string;
  role: UserRole;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    phone?: string;
    dateOfBirth?: string;
    avatarUrl?: string;
  };
  doctorMetadata?: DoctorMetadata;
  createdAt: string;
  updatedAt: string;
}
