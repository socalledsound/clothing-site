import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import './App.css';
import { GlobalStyle } from './global.styles';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInPage from './pages/sign-in-page/sign-in-page.component';

import { auth, createUserProfileDocument} from './firebase/firebase.utils';
// import { , addCollectionAndDocuments } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

export const HatsPage = () => (
  <div>
    <h1>hats page</h1>
  </div>
)


class App extends React.Component {
  


  unsubscribeFromAuth = null;
  
  componentDidMount(){

    const { setCurrentUser } = this.props;
    // const { collectionsArray } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
            setCurrentUser({    
              id: snapShot.id,
              ...snapShot.data()
          })
        });
        
      }
      setCurrentUser(userAuth);
      // console.log('collectionsArray', collectionsArray);
      //  addCollectionAndDocuments('collection', collectionsArray.map(({title, items}) => ({title, items})));
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div >
        <GlobalStyle />
        <Header  />
        <Switch>
          <Route exact path='/' component={HomePage} /> 
          <Route path='/shop' component={ShopPage} /> 
          <Route exact path='/checkout' component={CheckoutPage} /> 
          <Route 
            exact 
            path='/signin' 
            render={ () => 
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInPage />
              )
            } 
          /> 
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})
  



const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
