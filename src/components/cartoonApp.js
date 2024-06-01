import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchFilms, addToFavorites } from "../redux/actions";
import Link from 'next/link';
import Image from "next/image";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

const CartoonList = ({ films, loading, error, fetchFilms, addToFavorites, favorites }) => {
  const [hoveredFilmId, setHoveredFilmId] = useState(null); 
  const [clickedFilms, setClickedFilms] = useState([]); 

  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  if (loading) return <div className='loading'>
     <h1>Loading<span className="loading-dots">...</span></h1>
     <Image src="https://i.postimg.cc/cJb2BLqJ/boy-playing-yoyo-animation-animated-isolated-2d-male-teenager-with-toy-adolescent-boredom-cartoon-fl.png" width={600} height={600} alt="loading-img" className='loading-img'/>
   </div>;
   if (error) return <div className="error">
     <h1>Error: {error}</h1>
     <Image src="https://i.postimg.cc/zB4qf1qy/electricity-saving-ecology-awareness-or-reduce-electric-cost-and-expense-concept-man-pulling-electri.png" width={400} height={400} alt="loading-img" className='error-img'/>
   </div>;


  const handleHeartHover = (filmId) => {
    setHoveredFilmId(filmId);
  };

  const handleHeartClick = (film) => {
    addToFavorites(film);
    setClickedFilms(prevState => [...prevState, film.imdbID]); // Add the clicked film ID to state
  };

  return (
    <div>
      <h2 className="main-cartoon-title">Cartoons</h2>
      <div className="cartoons">
        {films.map((film) => (
          <div className="cartoon-item" key={film.imdbID}>
            <Link href={`/films/${film.imdbID}/page`} style={{ textDecoration: 'none' }}>
              <div className="cartoon-item-content">
                <img src={film.Poster} alt={film.Title} style={{ width: '50%', height: '14rem' }} className="cartoon-img" />
                <h3 className="cartoon-title">{film.Title}</h3>
              </div>
            </Link>
            <button
              onClick={() => handleHeartClick(film)}
              onMouseEnter={() => handleHeartHover(film.imdbID)}
              onMouseLeave={() => setHoveredFilmId(null)}
              className="love-icon"
            >
              {(hoveredFilmId === film.imdbID || clickedFilms.includes(film.imdbID) || (favorites && favorites.some(fav => fav.imdbID === film.imdbID))) ? (
                <IoMdHeart size={40} color="red" /> 
              ) : (
                <IoMdHeartEmpty size={40} /> 
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  films: state.films,
  loading: state.loading,
  error: state.error,
  favorites: state.favorites,
});

const mapDispatchToProps = {
  fetchFilms,
  addToFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartoonList);
