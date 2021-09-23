function getSingleCookie(name: string, req?: any) {
  try {
    let cookies = '';
    if (typeof document !== 'undefined') cookies = document.cookie;
    if (req) cookies = req.headers.cookie;
    const targetCookie = cookies.match(`(^|;) ?${name}=([^;]*)(;|$)`);

    if (cookies && targetCookie) {
      const unescapedName = unescape(targetCookie[2]);
      return [`[`, `{`].some((el) => unescapedName.includes(el)) ? JSON.parse(unescapedName) : unescapedName;
    }
  } catch (e) {
    return { ['errIn' + name]: e };
  }
}

function getMultipleCookie(names: string[], req?: any) {
  try {
    const cookies = getAllCookies();
    let matchCookies = {};
    names.map((name) => (matchCookies[name] = cookies[name]));
    return matchCookies;
  } catch (e) {
    return { errOnGetMultiCookies: e };
  }
}

function getAllCookies(req?: any) {
  try {
    let formattedCookies = [];
    let allCookies = {};
    if (typeof document !== 'undefined') formattedCookies = document.cookie.split(';');
    if (req) formattedCookies = req?.headers?.cookie?.split(';');

    formattedCookies.map((cookie) => {
      const target = cookie.split('=')[0].trim();
      allCookies[target] = getSingleCookie(target, req);
    });

    return allCookies;
  } catch (e) {
    return { errInGetAllCookies: e };
  }
}

export { getSingleCookie, getMultipleCookie, getAllCookies };
