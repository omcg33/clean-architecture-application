import { Map }    from 'immutable';
import { PAGES_KEYS } from '../../../../../common';

export interface IState {
  [PAGES_KEYS.DOGS_LIST]: Map<string, any>;
}
