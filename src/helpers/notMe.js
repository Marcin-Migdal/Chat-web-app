export const notMe = (chatConfig, chatObj) => {
  return chatObj.people.find(user => user.person.username !== chatConfig.userName)?.person?.username;
}
