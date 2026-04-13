export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

export const isTokenExpiringSoon = (token: string, thresholdMinutes = 5) => {
    const decoded = parseJwt(token);
    const exp = decoded.exp! * 1000;
    const now = Date.now();

    return now >= exp - thresholdMinutes * 60 * 1000;
}

export const isTokenExpired = (token: string) => {
  const decoded = parseJwt(token)
  const exp = decoded.exp! * 1000;
  const now = Date.now();

  return exp < now
}