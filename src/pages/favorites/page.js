import React from 'react';
import { connect } from 'react-redux';
import { removeFromFavorites, resetFavorites } from '../../redux/actions'; 
import { RiDeleteBin2Fill } from "react-icons/ri";
import Head from "next/head";

const FavoritesPage = ({ favorites, removeFromFavorites, resetFavorites }) => {

  const metaData = {
    title: "Favorites"
  };

    
  return (
    <div>
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content="List of cartoon favorites" />
      </Head>
      {favorites.length === 0 ? (
        <h2 className="no-favorite">No favorites</h2>
      ) : (
        <div className="favorites">
           <h2 className="favorite-title">Favorites</h2>
          <ul className='favorite-list'>
            {favorites.map((favorite) => (
              <li key={favorite.imdbID} className="each-favorite">
                <img src={favorite.Poster} alt={favorite.Title} style={{ width: '60%', height: '15rem' }} className='fav-img'/>
  
              <h2 className="favorite-each-title"> {favorite.Title} </h2>
                <button onClick={() => removeFromFavorites(favorite.imdbID)} className="remove-each"><RiDeleteBin2Fill size={30}/></button>
              
              </li>
            ))}
          </ul>
            <button onClick={resetFavorites} className="remove-all"><b>Remove All</b></button> 
          </div>

      )}
       </div>
  );
};

const mapStateToProps = (state) => ({
  favorites: state.favorites || [], 
});

const mapDispatchToProps = {
  removeFromFavorites,
  resetFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
