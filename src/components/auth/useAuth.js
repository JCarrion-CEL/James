import { useState, useEffect, useContext, createContext, useCallback } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {loadStripe} from '@stripe/stripe-js';


// import { useHistory } from 'react-router-dom';
// Initialize Firebase
// firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FB_API,
//   authDomain: process.env.REACT_APP_FB_DOMAIN,
//   projectId: process.env.REACT_APP_FB_PROJECT,
//   storageBucket: process.env.REACT_APP_FB_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FB_SENDER,
//   appID: process.env.REACT_APP_FB_APP,
// });

firebase.initializeApp({
  apiKey: "AIzaSyA4nHPZfi-Jm8lUnxY7jxze9xqOJOoBAvw",
  authDomain: "biosolids-pro-180.firebaseapp.com",
  projectId: "biosolids-pro-180",
  storageBucket: "biosolids-pro-180.appspot.com",
  messagingSenderId: "173001902367",
  appId: "1:173001902367:web:5adaac06a3b4af5d16082a",
  measurementId: "G-5JPNGMXFFW"
});

// class SessionAlreadyExists extends Error {
//   name = "SessionAlreadyExists"
// }

// class IPAlreadyExists extends Error {
//   name = "IPAlreadyExists"
// }

const AuthContext = createContext();
// export const db = firebase;
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider hook that creates auth object and handles state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(null)
  const [hasPlan, setHasPlan] = useState(null) // -1 0 1 three states
  const [subscription, setSubscription ] = useState(null) //-1 0 1 three states
  // const [ip, setIP] = useState(null);

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  // Investigae if useHistory can stop issue with manual refresh breaking private route pages
  // const history = useHistory();

  const db = firebase.firestore();

  // TODO: Move this implementation to firebase function with our own implementaiton
  // const getIP = async () => {
  //   const res = await fetch('https://geolocation-db.com/json/')
  //   console.log(res.data);
  //   const newIP = {...ip}
  //   newIP['currentIP'] = res.data.IPv4
  //   setIP(newIP)
  //   return res.data.IPv4
  // }
  const signInAnonymously = async () => {
    console.log('signing in');
    await firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        return true;
      });
  };
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const sendSignInLinkToEmail = (email, successUrl) => {
    return firebase
      .auth()
      .sendSignInLinkToEmail(email, {
        url: successUrl,
        handleCodeInApp: true,
      })
      .then(() => {
        return true;
      });
  };

  const signInWithEmailLink = (email, successUrl = null) => {
    const url = successUrl ? successUrl : window.location.origin
    return firebase
      .auth()
      .signInWithEmailLink(email, url)
      .then(result=>{
        debugger
        setUser(result.user);
        return true;
      })
  };


  const createUser = async (email) => {
    const password = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("The email address is already in use");
          return "auth/email-already-in-use"
        } else if (error.code === "auth/invalid-email") {
          console.log("The email address is not valid.");
          return "auth/invalid-email"
        }
        //  else if (error.code == "auth/operation-not-allowed") {
        //   console.log("Operation not allowed.");
        // } else if (error.code == "auth/weak-password") {
        //   console.log("The password is too weak.");
        // }
      });
  }

  // const getUserRef = userId => databaseInstance.ref(`/users/${userId}`);

//   const ensureUserSession = user => {
//     debugger
//     // const userRef = getUserRef(userId);
 
//     return userRef.once("value").then(snapshot => {
//         if (!snapshot.exists()) {
//             return userRef.set({
//                 last_seen: databaseInstance.ServerValue.TIMESTAMP
//             });
//         }
 
//         const user = snapshot.val();
 
//         if (user.is_online) {
//             throw new SessionAlreadyExists("User Already Online.");
//         }
        
//         return Promise.resolve();
//     });
// };

  const loadCheckout = async (priceId, user) => {
    const docRef = await db.collection("customers").doc(user.uid).collection("checkout_sessions").add({
        price: priceId,
        success_url: `${window.location.origin}/successful_purchase`,
        cancel_url: `${window.location.origin}/unsuccessful_purchase`
    })
    docRef.onSnapshot(async (snap) => {
        const { error, sessionId } = snap.data()
        console.log('error sessionId', error, sessionId)
        if (error) {
            alert(`An error occured: ${error.message} `)
        }
        if (sessionId) {
            console.log('sessionID', sessionId)
            const stripe = await loadStripe(process.env.REACT_APP_LOADSTRIPEPRD)
            stripe.redirectToCheckout({ sessionId });
        }
    })
  }

  const getSubscription = useCallback(async () => {
    return db.collection('customers').doc(user.uid).collection('subscriptions').get().then(snapshot => {
      console.log('snapshot', snapshot)
      snapshot.forEach(subs => {
        console.log('subscription', subs.data())
        setSubscription({
          role: subs.data().role,
          current_period_start: subs.data().current_period_start.seconds,
          current_period_end: subs.data().current_period_end.seconds
        })
      })
    })
  }, [user, db])

  const checkCurrentPlan = useCallback(async () => {
    const role = await products?.name?.toLowerCase().includes(subscription?.role)
    const endDate = new Date(subscription.current_period_start);
    const today = new Date();
    const plan = role && (today > endDate)
    setHasPlan(plan)
  }, [products, subscription])

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  // TODO: Use in multiple places move to useAuth
  const getProducts = useCallback(async () => {
    return db.collection('products').where('active', '==', true).get().then(snapshot => {
        console.log('products snapshot',snapshot)
        const products = {};
        // currently only supporting one subs. But we can easily expand to support multiple subscriptions
        let currentSubId
        snapshot.forEach(async productDoc => {
            // NOTE: Remove once we support multiple subscriptions
            currentSubId = productDoc.id
            products[productDoc.id] = productDoc.data();
            const priceSnap = await productDoc.ref.collection("prices").get();
            console.log('rpiceSnap', priceSnap)
            priceSnap.forEach(priceDoc => {
                products[productDoc.id].prices = {
                    priceId: priceDoc.id,
                    priceData: priceDoc.data()
                    }
            })
        })
        // Refactor to support multiple products once we start supporting more subs types
        // setProducts(products)
        const currentProd = {}
        currentProd[currentSubId] = products[currentSubId]
        setProducts(Object.values(currentProd)[0])
        //
    })
  }, [db])


  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      setIsAuthenticating(false);
      // ensureUserSession(user.uid)
      //       .then(() => {
      //           const userRef = getUserRef(user.uid);
      //           return userRef
      //               .onDisconnect()
      //               .set({
      //                   is_online: false,
      //                   last_seen: firebase.database.ServerValue.TIMESTAMP
      //               }).then(() => 
      //                   userRef.set({
      //                       is_online: true,
      //                       last_seen: firebase.database.ServerValue.TIMESTAMP
      //                   })
      //               )
      //       }).catch(err => {
      //         console.error(err);
      //         if (err instanceof SessionAlreadyExists) {
      //             return firebase.auth().signOut();
      //         }
      //     });
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [getProducts]);

  const values = {
    signInAnonymously,
    user,
    isAuthenticating,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    logout,
    loadCheckout, 
    createUser,
    getProducts,
    products,
    getSubscription, 
    subscription,
    checkCurrentPlan,
    hasPlan,
    db
  };

  return (
    <AuthContext.Provider value={values}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  );
};
