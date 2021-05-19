import React, { useEffect } from 'react';
import { fb } from 'service';

export const App = () => {
  useEffect(() => {
    fb.firestore
      .collection('chatUsers')
      .where('userName', '==', 'PepeTarou')
      .get()
      .then(res => {
        const user = res.docs[0]?.data();
        console.log(user);
      });
  }, []);

  return <div className="app">Hello</div>;
};
