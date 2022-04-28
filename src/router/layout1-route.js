import React, { useMemo } from 'react'
import {Switch,Route,Redirect, useLocation} from 'react-router-dom'
import {TransitionGroup,CSSTransition} from "react-transition-group";
import { useAuth } from '../components/auth/useAuth';
import Pricing from '../views/backend/main/pricing'

//blog
// import Blog from '../views/backend/blog/blog';
// import BlogDetail from '../views/backend/blog/blog-details';

//App
import UserProfile from '../views/backend/app/usermanagement/userprofile'
import UserAccountSettingList from '../views/backend/app/usermanagement/useraccountsetting'

//Extrapages
// import FAQ from '../views/backend/pages/faq'
import TermsOfUse from '../views/backend/pages/extrapages/termsOfUse'
import PrivacyPolicy from  '../views/backend/pages/extrapages/privacyPolicy'

import SuccessfulPurchase from '../views/backend/pages/extrapages/successful_purchase'
import UnsuccessfulPurchase from '../views/backend/pages/extrapages/unsuccessful_purchase'

// import AboutUs from '../views/backend/pages/about-us'
// import S3BubblePage from '../views/backend/pages/s3-bubble-page'

// import Contact from '../views/backend/pages/contact'
// import PricingPlan2 from '../views/backend/pages/pricing/pricing2';

// //Category
// import CategoryList from '../views/backend/category/category-list';

//Movie
// import AddTraining from '../views/backend/training/add-training';
// import TrainingList from '../views/backend/training/training-list';

//Show
import BiosolidsPro1 from '../views/backend/show/biosolids-land-application-training-video-part-1';
import BiosolidsPro2 from '../views/backend/show/biosolids-land-application-training-video-part-2';

// Home
import Homepage from '../views/backend/home/home'
import LoggedInHomepage from '../views/backend/home/logged_home'

const Layout1Route = () => {
    const { 
        user,
        subscription,
        checkCurrentPlan,
        hasPlan,
    } = useAuth();


    //  useEffect(() =>{
    //     if (user) getSubscription(user)
    //     if (subscription) {
    //         checkCurrentPlan(products, subscription)
    //     }
    //  }, [subscription, user])

    let location = useLocation();

    // Authenticated user
    const PrivateRoute = ({ children, ...rest }) => {
        return (
          <Route
            {...rest}
            render={() => (user ? children : <Redirect to="/extra-pages/login" />)}
          ></Route>
        );
      };

      // TODO: Unified this with home route
    const HomeRoute = useMemo(() => {
        if (subscription && user) checkCurrentPlan()
        if (hasPlan){
            return <PrivateRoute path="/" exact  component={LoggedInHomepage}/>
        }
        else {
            return <Route path="/" exact component={Homepage}/>
        }
    }, [subscription, user, hasPlan, checkCurrentPlan])
      
    if ((!user && location.search.search('apiKey=')) > 0) return (<Redirect to={`/extra-pages/login${location.search}`} />)
    return (
        <TransitionGroup>
            <CSSTransition
            // key={location.key}
            classNames="fade"
            timeout={300}
            >
                <Switch  location={location}>
                   
                    <Route path="/pricing-plan"           component={Pricing} />

                    {/* App */}
                    <PrivateRoute path="/manage-profile">
                        <UserProfile />
                    </PrivateRoute>
                    <PrivateRoute path="/setting">
                        <UserAccountSettingList />
                    </PrivateRoute>
                    {/* Blog */}
                    {/* <Route path="/blog"                     component={Blog} />
                    <Route path="/blog-details"             component={BlogDetail} />
                     */}
                    {/* Extrapages */}
                    {/* <Route path="/faq"                      component={FAQ} /> */}
                    <Route path="/terms-of-service"         component={TermsOfUse} />
                    <Route path="/privacy-policy"           component={PrivacyPolicy} />

                     {/* {Semi private Routes} */}
                    <Route path="/successful_purchase"         component={SuccessfulPurchase} />
                    <Route path="/unsuccessful_purchase"           component={UnsuccessfulPurchase} />
                    {/* <Route path="/about-us"                 component={AboutUs}/> */}
                    {/* <Route path="/s3-bubble-page"           component={S3BubblePage}/> */}

                    
                    {/* <Route path="/contact"                  component={Contact}/> */}
                    {/* <Route path="/pricing-plan-2"           component={PricingPlan2}/> */}
                   
                    {/* Category */}
                    {/* <Route path="/show-category"            component={CategoryList}/> */}
                    
                    {/* Movie */}
                    {/* <Route path="/training-details"            component={AddTraining}/> */}
                    {/* <Route path="/categories"           component={TrainingList}/> */}

                    {/* Show */}
                    <PrivateRoute path="/biosolids-pro-180-part-1">
                        <BiosolidsPro1 />
                    </PrivateRoute>
                    <PrivateRoute path="/biosolids-pro-180-part-2">
                        <BiosolidsPro2 />
                    </PrivateRoute>
                     {HomeRoute}
                     {/* TODO: Unify this with home route */}
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default Layout1Route