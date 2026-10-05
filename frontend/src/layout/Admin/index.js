import { Route, Switch } from 'react-router-dom';
import { routes } from '../../Router';
import NotFound from '../../pages/NotFound';

const Admin = () => {

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }

  return (
    <Switch>
      {getRoutes(routes)}
      <Route component={NotFound} />
    </Switch>
  )
}

export default Admin;
