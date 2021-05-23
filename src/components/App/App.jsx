import { Login, Signup, Chat } from 'components';
import { ChatProvider } from 'context/ChatContext';
import { useAuth } from 'hooks';
import { useResolved } from 'hooks/useResolved';
import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

export const App = () => {
  const history = useHistory();
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);

  useEffect(() => {
    if (authResolved) {
      history.push(!!authUser ? '/' : '/login');
    }
  }, [authResolved, authUser, history]);

  return (
    <div className="app">
      {authResolved ? (
        <ChatProvider authUser={authUser}>
          <Switch>
            <Chat exact path="/" component={Chat} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </ChatProvider>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};
