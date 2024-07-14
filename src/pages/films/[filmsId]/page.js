import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import Head from "next/head";

const FilmDetailPage = () => {

  const metaData = {
    title: "Cartoons details"
  };
  const router = useRouter();
  const { filmsId } = router.query; 

  const [filmDetails, setFilmDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${filmsId}&apikey=34c8137`);
        if (!response.ok) {
          throw new Error('Failed to fetch film details');
        }
        const data = await response.json();
        setFilmDetails(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (filmsId) {
      fetchData();
    }
  }, [filmsId]);

  if (loading) return <div className='loading'>
     <h1>Loading<span className="loading-dots">...</span></h1>
     <Image src="https://i.postimg.cc/cJb2BLqJ/boy-playing-yoyo-animation-animated-isolated-2d-male-teenager-with-toy-adolescent-boredom-cartoon-fl.png" width={600} height={600} alt="loading-img" className='loading-img'/>
   </div>;
  if (error) return <div className="error">
     <h1>Error: {error}</h1>
     <Image src="https://i.postimg.cc/zB4qf1qy/electricity-saving-ecology-awareness-or-reduce-electric-cost-and-expense-concept-man-pulling-electri.png" width={400} height={400} alt="loading-img" className="error-img"/>
   </div>;
  if (!filmDetails) return <div>No film details found</div>;

  return (
        <div className="film-details-container">
          <Head>
            <title>{metaData.title}</title>
            <meta name="description" content="cartoon details" />
          </Head>
        <img src={filmDetails.Poster} alt={filmDetails.Title} className='detail-img'/>
        <div className="cartoon-details">
          <h1><span className="bold">Title: </span>{filmDetails.Title}</h1>
          <p><span className="bold">Year:</span> {filmDetails.Year}</p>
          <p><span className="bold">Rated:</span> {filmDetails.Rated}</p>
          <p><span className="bold">Released:</span> {filmDetails.Released}</p>
          <p><span className="bold">Runtime:</span> {filmDetails.Runtime}</p>
          <p><span className="bold">Genre:</span> {filmDetails.Genre}</p>
          <p><span className="bold">Director:</span> {filmDetails.Director}</p>
          <p><span className="bold">Writer:</span> {filmDetails.Writer}</p>
          <p><span className="bold">Actors:</span> {filmDetails.Actors}</p>
          <p><span className="bold">Plot:</span> {filmDetails.Plot}</p>
          <p><span className="bold">Language:</span> {filmDetails.Language}</p>
          <p><span className="bold">Country:</span> {filmDetails.Country}</p>
          <p><span className="bold">Awards:</span> {filmDetails.Awards}</p>
          <p><span className="bold">Metascore:</span> {filmDetails.Metascore}</p>
          <p><span className="bold">IMDB Rating:</span> {filmDetails.imdbRating}</p>
          <p><span className="bold">IMDB Votes:</span> {filmDetails.imdbVotes}</p>
          <p><span className="bold">Type:</span> {filmDetails.Type}</p>
          <p><span className="bold">DVD:</span> {filmDetails.DVD}</p>
          <p><span className="bold">Website:</span> <a href="https://spacetoon.com">https://spacetoon.com</a>/</p>
      </div>
    </div>
  );
}
export default FilmDetailPage;
