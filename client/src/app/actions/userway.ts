export const USERWAY = {
  SEND:   "USERWAY/SEND",
};

export const sendToUserway = (payload: Object) => ({
  type: USERWAY.SEND,
  payload
});
