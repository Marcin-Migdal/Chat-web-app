import { Login, Signup, Chat } from 'components';
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
      <Switch>
        <Chat exact path="/" component={Chat} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
};
