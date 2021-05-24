export const joinUserNames = (chatConfig, chat) => {
  const usernameArray = '@' + chat.people
    .map(user => user.person.username)
    .filter(username => username !== chatConfig.userName)
    .join(', @');


  return usernameArray.length > 32 ? usernameArray.slice(0, 32) + '...' : usernameArray;
}