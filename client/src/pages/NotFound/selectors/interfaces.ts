import { Map }    from 'immutable';
import { PAGES_KEYS } from '../../../../../common';

export interface IState {
  [PAGES_KEYS.NOT_FOUND]: Map<string, any>;
}
