import React from 'react';
import { withRouter } from 'react-router-dom';
import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
    
    console.log(match);
    return (

        <div 
        onClick = {()=> history.push(`${match.url}${linkUrl}`)}
        className={`${size} menu-item`}
        >
            <div style={{
                backgroundImage: `url(${imageUrl})`
                }}
                className="background-image"
                />   
            <div className="content">
                <h1 className="title">{title.toUpperCase()}</h1>
                <span className="subtitle">shop now</span>    
            </div>
        </div>
    )

}

export default withRouter(MenuItem);