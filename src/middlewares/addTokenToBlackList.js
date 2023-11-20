export const blacklistTokens = [];

export const addTokenToBlacklist = (token) => {
  blacklistTokens.push(token);
  return blacklistTokens;
};


