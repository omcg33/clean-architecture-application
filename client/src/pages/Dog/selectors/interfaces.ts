import { Map }    from 'immutable';
import { PAGES_KEYS } from '../../../../../common/dist';

export interface IState {
  [PAGES_KEYS.DOG]: Map<string, any>;
}
