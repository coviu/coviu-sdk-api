/* @flow */
/*::
import type { Fee, JSONFee } from './types'
*/
exports.toFee = function (value /*: ?JSONFee */) /*: ?Fee */ {
  if (!value) return;
  try {
    var result = JSON.parse(value);
    if (!result.amount || !result.currency) return;
    return result;
  } catch (e) {
    return;
  }
};