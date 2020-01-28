/* ============
 * Actions for the TEMPLATE module
 * ============
 *
 * The actions that are available on the
 * TEMPLATE module.
 */

import {
  TEMPLATE_ADD,
  TEMPLATE_UPDATE,
  TEMPLATE_REMOVE,
  TEMPLATE_LIST,
} from './action-types';

export function add(payload) {
  return {
    type: TEMPLATE_ADD,
    payload
  }
}

export function update(payload) {
  return {
    type: TEMPLATE_UPDATE,
    payload
  }
}

export function remove(payload) {
  return {
    type: TEMPLATE_REMOVE,
    payload
  }
}

export function list(payload) {
  return {
    type: TEMPLATE_LIST,
    payload
  }
}