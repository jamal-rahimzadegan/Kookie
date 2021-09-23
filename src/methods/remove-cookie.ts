const expiredCookieBase = '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

function removeSingleCookie(name: string, res?: any) {
  try {
    if (typeof document !== 'undefined') document.cookie = name + expiredCookieBase;
    if (res?.setHeader) res.setHeader('Set-Cookie', name + expiredCookieBase);
  } catch (e) {
    return { ['errOnRemove' + name]: e };
  }
}

async function removeMultipleCookies(names: string[], res?: any) {
  try {
    names.map((name) => {
      res ? res.setHeader('Set-Cookie', name + expiredCookieBase) : removeSingleCookie(name, res);
    });
    await res?.send();
  } catch (e) {
    return { errOnRemoveCookies: e };
  }
}

async function removeAllCookies(req?: any, res?: any) {
  try {
    let allCookies = [];
    if (req) allCookies = req.headers.cookie.split(';');
    if (typeof document !== 'undefined') allCookies = document.cookie.split(';');
    allCookies.map((cookieItem) => removeSingleCookie(cookieItem.split('=')[0], res));

    await removeMultipleCookies(allCookies, res);
  } catch (e) {
    return { errOnRemoveCookies: e };
  }
}

export { removeSingleCookie, removeMultipleCookies, removeAllCookies };
