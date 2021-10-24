export const LOGIN  = "TOURIST/LOGIN";
export const LOGOUT = "TOURIST/LOGOUT";

export const login = (user: any) => ({
  type: LOGIN,
  payload: user
});

export const logout = () => ({
  type: LOGOUT,
});
