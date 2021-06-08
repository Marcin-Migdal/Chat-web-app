export const sortChats = (a, b) => {
  if (a.last_message.id && b.last_message.id) {
    return b.last_message.id - a.last_message.id;
  } else {
    const date_1 = a.last_message.created
      ? a.last_message.created
      : a.created;
    const date_2 = b.last_message.created
      ? b.last_message.created
      : b.created;
    return new Date(date_2) - new Date(date_1);
  }
};