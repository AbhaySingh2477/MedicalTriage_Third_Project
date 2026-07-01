// ── Chat Message Types ──────────────────────────────

export type MessageSender = 'patient' | 'doctor' | 'system';

export interface ChatMessage {
  id?: number;
  sessionId: string;
  sender: MessageSender;
  content: string;
  timestamp: number;
  synced: boolean;
}
