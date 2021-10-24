import {
	createSelectorCreator,
	defaultMemoize
}                     from 'reselect';
import { is, Map } from 'immutable';


export const createSelector = createSelectorCreator(defaultMemoize, is);

export function createStructuredSelector(selectors, selectorCreator = createSelector): any {
  if (typeof selectors !== 'object') {
    throw new Error(
      'createStructuredSelector expects first argument to be an object ' +
      `where each property is a selector, instead received a ${typeof selectors}`
    )
  }
  const objectKeys: string[] = Object.keys(selectors);
  return selectorCreator(
    objectKeys
      .map(key => selectors[key]),
    (...values) => (
      values.reduce(
        (composition, value, index) => {
          if (typeof value === "undefined")
            return composition;

          return (<Map<string, any>>composition).set(objectKeys[index], value)
        },
        Map<string, any>()
      )
    )
  )
}

export default {};
