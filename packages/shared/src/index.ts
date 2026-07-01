// ──────────────────────────────────────────────────
// @medtriage/shared — Core type definitions
// ──────────────────────────────────────────────────

export type { User, UserRole, DoctorMetadata } from './types/user.js';
export type {
  Session,
  SessionStatus,
  SessionSummary,
  SOAPSummary,
  AssessmentEntry,
} from './types/session.js';
export type { ChatMessage, MessageSender } from './types/chat.js';
export type { Prescription, Drug, DrugAlternative } from './types/prescription.js';
export type {
  WebSocketEvent,
  WSChatMessage,
  WSTypingIndicator,
  WSSessionEnd,
  WSMatchFound,
  WSAck,
} from './types/websocket.js';
