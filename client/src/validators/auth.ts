export const TOKEN_KEY = "@accessToken";
export const USER_KEY = "@currentUser";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token : any, user : any) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const ONG_KEY = "@currentONG";
export const ONGlogin = (token : any, ong : any) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ONG_KEY, JSON.stringify(ong));
};
export const ONGlogout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ONG_KEY);
};
