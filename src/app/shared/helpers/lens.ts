import { lens, Lens, equals, view, set, curry } from 'ramda';

export const immLens = key => lens((x: any) => x.get(key), (val, x) => x.set(key, val));
export const eqLens = curry((l: Lens, a: any, b: any) => equals(view(l, a), view(l, b)));
export const setWith = curry((l: Lens, a: any, b: any) => set(l, view(l, a), b));
export const setWithIfEq = curry((eq: Lens, set: Lens, a: any, b: any) => eqLens(eq, a, b) ? setWith(set, a, b) : b);
