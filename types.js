/* @flow */

// The standard runnable actions
export type Runnable<T> = {
  run: () => Promise<?T>
};

export type ParticipantRole = 'HOST' | 'GUEST';

// Defines the options for new participants
export type NewParticipant = {
  +display_name: string,
  +fee?: JSONFee,
  +role: ParticipantRole,
  +picture?: string,
  +state?: string
};

// Defines the options for updating participants
export type UpdateParticipant = {
  +display_name?: string,
  +fee?: JSONFee,
  +role?: ParticipantRole,
  +picture?: string,
  +state?: string
};

// Defines the options for creating a new session
export type SessionCreate = {
  session_name: string,
  start_time: string,
  end_time: string,
  picture?: string,
  participants?: Array<NewParticipant>
};

// Defines the options for when updating an existing session
export type SessionUpdate = {
  session_name: ?string,
  start_time: string,
  end_time: string,
  picture: ?string
};

// Defines the options for when querying the sessions
export type SessionPageQuery = {|
  page?: number,
  page_size?: number,
  start_time?: string,
  end_time?: string,
  included_canceled?: boolean
|};

// The response from a paged query
export type PagedResponse<T> = {|
  content: Array<T>,
  more: boolean,
  page: number,
  page_size: number
|};

// Alias for the fee (this may be replaced at some point as it's currently stored as a JSON string)
export type JSONFee = string;

// The structure for the fee that is stored within the JSONFee string
export type Fee = {
  amount: number,
  description: ?string,
  currency: string
};

// The information for the participant in a call
export type CallParticipant = {|
  client_id: string,
  deleted_at?: string,
  display_name: string,
  entry_url: string,
  fee?: JSONFee,
  participant_id: string,
  picture: ?string,
  role: ParticipantRole,
  session_id: string,
  state: ?string
|};

// The information for a created call session
export type CallSession = {|
  +session_id: string,
  +session_name: ?string,
  +start_time: string,
  +end_time: string,
  +picture: ?string,
  +team_id: string,
  +client_id: string,
  +participants: Array<CallParticipant>
|};

export type CoviuClientSDK = {|
  sessions: {
    addParticipant: (sessionId: string, participant: NewParticipant) => Runnable<CallParticipant>,
    cancelSession: (sessionId: string) => Runnable<any>,
    createSession: (SessionCreate) => Runnable<?CallSession>,
    deleteParticipant: (participantId: string) => Runnable<any>,
    deleteSession: (sessionId: string) => Runnable<?any>,
    getParticipant: (participantId: string) => Runnable<CallParticipant>,
    getSession: (sessionId: string) => Runnable<CallSession>,
    getSessionParticipants: (sessionId: string) => Runnable<Array<CallParticipant>>,
    getSessions: (query: SessionPageQuery) => Runnable<PagedResponse<CallSession>>,
    updateParticipant: (participantId: string, update: UpdateParticipant) => Runnable<CallParticipant>,
    updateSession: (sessionId: string, update: SessionUpdate) => Runnable<CallSession>,
  }
|};