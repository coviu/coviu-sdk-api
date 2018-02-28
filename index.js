/* @flow */
/*::
import type { CoviuClientSDK } from './types'
*/

module.exports = function(service /*: any */) /*: CoviuClientSDK */ {
  return {
    sessions: require('./libs/sessions')(service)
  }
};
