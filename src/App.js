//router
import LayoutsRoute from './router/layouts-route';

//scss files
import './assets/css/bootstrap.min.css'
import './assets/css/typography.css'
import './assets/css/style.css';
import './assets/css/responsive.css'
import { useEffect } from 'react';
import { useAuth } from './components/auth/useAuth'
// import  './assets/css/custom.css';

function App() {
  const { 
    getProducts,
    getSubscription,
    checkCurrentPlan,
    products,
    subscription,
    hasPlan,
    user
  } = useAuth();


  useEffect(() => {
    if (!products){
      debugger
      getProducts()
    }
    if (user && !subscription) {
      debugger
      getSubscription()
    }
    if (subscription && hasPlan === null) {
      debugger
      checkCurrentPlan()
    }
  }, [products, subscription, hasPlan, user, checkCurrentPlan, getProducts, getSubscription])
  
  return (
    <div className="App">
      <LayoutsRoute />
    </div>
  );
}

export default App;
