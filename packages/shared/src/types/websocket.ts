// ── WebSocket Event Types ───────────────────────────

export interface WSChatMessage {
  type: 'CHAT_MESSAGE';
  payload: {
    sessionId: string;
    sender: 'patient' | 'doctor';
    content: string;
    timestamp: number;
    messageId: string;
  };
}

export interface WSTypingIndicator {
  type: 'TYPING_INDICATOR';
  payload: {
    sessionId: string;
    sender: 'patient' | 'doctor';
    isTyping: boolean;
  };
}

export interface WSSessionEnd {
  type: 'SESSION_END';
  payload: {
    sessionId: string;
    chatLog: Array<{
      sender: 'patient' | 'doctor';
      content: string;
      ts: number;
    }>;
  };
}

export interface WSMatchFound {
  type: 'MATCH_FOUND';
  payload: {
    sessionId: string;
    doctorId: string;
    doctorName: string;
    specialization: string;
  };
}

export interface WSAck {
  type: 'ACK';
  payload: {
    messageId: string;
    status: 'delivered' | 'read';
  };
}

export interface WSSummaryReady {
  type: 'SUMMARY_READY';
  payload: {
    sessionId: string;
    taskId: string;
  };
}

export interface WSQueuePosition {
  type: 'QUEUE_POSITION';
  payload: {
    position: number;
    estimatedWaitSeconds: number;
  };
}

export interface WSError {
  type: 'ERROR';
  payload: {
    code: string;
    message: string;
  };
}

export type WebSocketEvent =
  | WSChatMessage
  | WSTypingIndicator
  | WSSessionEnd
  | WSMatchFound
  | WSAck
  | WSSummaryReady
  | WSQueuePosition
  | WSError;
