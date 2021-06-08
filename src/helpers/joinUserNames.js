export const joinUserNames = (chatConfig, chat, sliceLength = 32) => {
  const usernameArray = '@' + chat.people
    .map(user => user.person.username)
    .filter(username => username !== chatConfig.userName)
    .join(', @');


  return usernameArray.length > sliceLength ? usernameArray.slice(0, sliceLength) + '...' : usernameArray;
}