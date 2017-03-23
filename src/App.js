import React from 'react';
import { 
  createStore,
  combineReducers, 
  applyMiddleware, 
  compose,
} from 'redux';
import { 
  Provider,
} from 'react-redux';
import { 
  Router,
  browserHistory,
  IndexRoute,
  Route,
} from 'react-router';
import { 
  syncHistoryWithStore,
  routerMiddleware, 
  routerReducer as routing,
} from 'react-router-redux';

import HomeIcon from 'material-ui/svg-icons/action/home';

import Layout from './containers/Layout/Layout';
import Menu from './containers/Layout/Menu';
import Home from './containers/Home/Home';
import NotFound from './containers/NotFound/NotFound';

import ui from './reducers';

const reducer = combineReducers({
  ui,
  routing,
});

const store = createStore(
  reducer, 
  compose(
  applyMiddleware(routerMiddleware(browserHistory)),
  window.devToolsExtension ? window.devToolsExtension() : f => f, 
));

const history = syncHistoryWithStore(browserHistory, store);

const menuItems = [
  {
    name: "Home",
    path: "/",
    icon: HomeIcon,
  },
];

const MenuComponent = () => (
  <Menu items={menuItems} />
);

const LayoutComponent = (props) => {
  const { children } = props;
  return (
    <Layout 
      title='EY App'
      menu={<MenuComponent />}
    >
      { children }
    </Layout>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={LayoutComponent}>
          <IndexRoute component={Home} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </Provider>
  );
};

export default App;
