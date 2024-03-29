import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { updateCollections } from '../../redux/shop/shop.actions';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage)


class ShopPage extends React.Component {
    
    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collection');
        collectionRef.onSnapshot(async snapshot => {
            // console.log(snapshot);
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        })
    }
    render(){
        const { match }  = this.props;
        const { loading } = this.state;
        console.log(this.props);
        
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} 
                render={props => (
                <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>
                )} 
                />
                <Route path={`${match.path}/:collectionId`} 
                render={props => (
                <CollectionsPageWithSpinner isLoading={loading} {...props} />
                )} 
                />
            </div>
            
                )
    }
        

    
}

const mapDispatchToProps = dispatch => ({

    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})


export default connect(null, mapDispatchToProps)(ShopPage)