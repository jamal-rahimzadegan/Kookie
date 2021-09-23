import { KookieOptionsType, MultiCookieType } from './kookie-types';

function setSingleCookie(name: string, value: any, { res, expires, path, secure }: KookieOptionsType = {}) {
  try {
    const cookie = `${name}=${value};${secure ? 'secure' : ''};path=${path || '/'};expires=${setExpireDate(
      expires,
      res
    )};`;
    if (typeof document !== 'undefined') document.cookie += cookie;
    if (res?.setHeader) res.setHeader('Set-Cookie', cookie);
  } catch (e) {
    return { errInSetSingleCookie: e };
  }
}

async function setMultipleCookies(cookieList: MultiCookieType, res?: any) {
  try {
    await cookieList.map(({ name, value, ...rest }) => {
      !!res ? res.cookie(name, value) : setSingleCookie(name, value, { res, ...rest });
    });

    // await res?.send();
  } catch (e) {
    return { errInSetMultipleCookies: e };
  }
}

function setExpireDate(expires: number = 365, res: any) {
  try {
    const expireTime = 24 * 60 * 60 * 1000 * expires;

    if (res) return expireTime;
    else {
      let date = new Date();
      date.setTime(date.getTime() + expireTime);
      return date.toUTCString();
    }
  } catch (e) {
    return { errInExpireTime: e };
  }
}

export { setSingleCookie, setMultipleCookies };
