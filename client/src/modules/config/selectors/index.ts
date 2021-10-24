import { createSelector } from '../../../utils/memoization';


export const getConfig: (
  state: any,
  key?: Array<string> | string
) => any = createSelector(
  (state: any, key: Array<string> | string = []) => {
    const newKey = Array.isArray(key) ? key : [key];
    return state.config.getIn(newKey);
  },
    (value: any) => value
);


// export const isLangAvailable = createSelector(
// 	state => getConfig(state, 'availableLang'),
// 	(state, lang: string) => lang,
// 	(available, lang) : boolean => !! available.find(v => v === lang)
// );
//
//
//
// export const getDefaultLang = createSelector(
// 	state => getConfig(state, 'defaultLang'),
// 	(lang: string) => lang
// );


export default {};
