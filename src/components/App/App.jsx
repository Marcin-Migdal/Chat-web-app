import { useAuth } from 'hooks';
import { useEffect } from 'react';
import { useResolved } from 'hooks';
import { ChatProvider } from 'context';
import { Loader } from 'semantic-ui-react';
import { Login, Signup, Chat } from 'components';
import { Route, Switch, useHistory } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

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
        <div className="loader-position">
          <Loader active size="huge" />
        </div>
      )}
    </div>
  );
};
