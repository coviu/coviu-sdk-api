var representations = require('./representations');

module.exports = function(service) {
  var get = service.get();
  var post = service.post().json(true);
  var put = service.put().json(true);
  var del = service.del();

  return {

    /*
     * Create a new session
     * @param: session  - {
     *  "session_name": optional display name for the session
     *  "start_time": utc date string,
     *  "end_time": utc date string,
     *  "picture": optional url for room image,
     *  "participants": [{
     *    "display_name": optional string for participant display name,
     *    "picture": option url for participant avatar,
     *    "role": *required* - "guest", or "host",
     *    "state": option content for client use
     *   }, ...]
     * }
     */
    createSession: function(session) {
      return post.path('/sessions')
      .bodyShape(representations.createSessionReqeust)
      .body(session);
    },

    /*
     * Get a session by id
     * @param: sessionId - string
     */
    getSession: function(sessionId) {
      return get.path('/sessions/').subpath(sessionId);
    },

    /*
     * Get the a page of sessions
     * @param: query - {
     *    "page": optional number,
     *    "page_size": optional number,
     *    "start_time": optional utc date string,
     *    "end_time": optional utc date string
     *  }
     */
    getSessions: function(query) {
      return get.path('/sessions')
      .queryShape(representations.getSessionPageQuery)
      .query(query);
    },

    /*
     * Update a session
     * @param: sessionId - string
     * @param: update - {
     *    "session_name": optional display name for the session
     *    "start_time": optional utc date string,
     *    "end_time": optional utc date string,
     *    "picture": optional utc url for room image,
     *  }
     */
    updateSession: function(sessionId, update) {
      return put.path('/sessions/').subpath(sessionId)
      .bodyShape(representations.updateSessionRequest)
      .body(update);
    },

    /*
     * Cancel a session
     * @param: sessionId - string
     */
    deleteSession: function(sessionId) {
      return del.path('/sessions/').subpath(sessionId);
    },

    /*
     * Get the participants of a session
     * @param: sessionId - string
     */
    getSessionParticipants: function(sessionId) {
      return get.path('/sessions/').subpath(sessionId)
      .subpath('/participants');
    },

    /*
     * Add a participant to a session
     * @param: sessionId - string, the session to add the participant to.
     * @param: participant - {
     *    "display_name": optional string for entry display name,
     *    "picture": optional url for participant avatar,
     *    "role": *required* - "guest", or "host",
     *    "state": optional content for client use
     *  }
     */
    addParticipant: function(sessionId, participant) {
      return post.path('/sessions/').subpath(sessionId)
      .subpath('/participants')
      .bodyShape(representations.createParticipantRequest)
      .body(participant);
    },

    /*
     * Get a participant by id.
     * @param: participantId - string, the id of the participatn.
     */
    getParticipant: function(participantId) {
      return get.path('/participants/').subpath(participantId)
    },

    /*
     * Update a participant
     * @param: participantId - string
     * @param: update - {
     *    "display_name": optional string for entry display name,
     *    "picture": optional url for participant avatar,
     *    "role":  optional "guest", or "host",
     *    "state": optional content for client use
     *  }
     */
    updateParticipant: function(participantId, update) {
      return put.path('/participants/').subpath(participantId)
      .bodyShape(representations.updateParticipantRequest)
      .body(update);
    },

    /*
     * Remove a participant.
     * @param: particpantId - string, the id of the participant
     */
    deleteParticipant: function(participantId) {
      del.path('/participants/').subpath(participantId);
    }
  };
};
