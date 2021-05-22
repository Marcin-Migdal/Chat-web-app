import { useEffect, useState } from "react";
import { fb } from "service"

export const useAuth = () => {
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    const unSubscribe = fb.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return unSubscribe;
  }, []);

  return {
    authUser,
  };
}