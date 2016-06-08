// The expted shape for representation using for validatieon by the shapeful library.
var optionalString = {__optional: 'string'};
var optionalNumber = {__optional: 'number'};

var createParticipant = {
  "display_name": optionalString,
  "picture": optionalString,
  "role": "string",
  "state": "string"
};

var updateParticipant = {
  "display_name": optionalString,
  "picture": optionalString,
  "role": optionalString,
  "state": optionalString
};


var createSession = {
  "session_name": optionalString,
  "start_time": optionalString,
  "end_time": "string",
  "picture": "string",
  "participants": {__array: createParticipant}
};


var updateSession = {
  "session_name": optionalString,
  "start_time": optionalString,
  "end_time": optionalString,
  "picture": optionalString
};

var getSessionPageQuery = {
  "page": optionalNumber,
  "page_size": optionalNumber,
  "start_time": optionalString,
  "end_time": optionalString
};

module.exports = {
  createParticipantRequest: createParticipant,
  updateParticipantRequest: updateParticipant,
  createSessionReqeust: createSession,
  updateSessionRequest: updateSession,
  getSessionPageQuery: getSessionPageQuery
};
