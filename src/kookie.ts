import { setMultipleCookies, setSingleCookie } from './methods/set-cookie';
import { getAllCookies, getMultipleCookie, getSingleCookie } from './methods/get-cookie';
import { removeAllCookies, removeMultipleCookies, removeSingleCookie } from './methods/remove-cookie';
import { MultiCookieType, KookieOptionsType } from './methods/kookie-types';

class Kookie {
  set = (name: string, value: any, { res, expires, path, secure }: KookieOptionsType = {}) => {
    setSingleCookie(name, value, { res, expires, path, secure });
  };
  setMultiple = (cookieList: MultiCookieType, res?: any) => setMultipleCookies(cookieList, res);

  get = (name: string, req?: any) => getSingleCookie(name, req);
  getMultiple = (names: string[], req?: any) => getMultipleCookie(names, req);
  getAll = (req?: any) => getAllCookies(req);

  remove = (name: string, res?: any) => removeSingleCookie(name, res);
  removeMultiple = (names: string[], res?: any) => removeMultipleCookies(names, res);
  removeAll = (req?: any, res?: any) => removeAllCookies(req, res);
}

export default new Kookie();
