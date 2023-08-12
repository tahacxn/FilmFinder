import React, { useEffect, useState } from 'react';
import './styles/Movies.css'

function MovieRecommendations({ selectedGenres, selectedAge, selectedMood }) {
  const [recommendations, setRecommendations] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    const API_KEY = 'cdfcc66265bb9ce3e0331806959d6474';
    const AGE_RANGES = {
      'Published in the last 5 years': 5,
      'Published in the last 10 years': 10,
      'Published in the last 20 years': 20,
      'Published in the last 30 years': 30,
      'Published in the last 40 years': 40,
    };
    const MAX_PAGES = 5; // Fetch up to 5 pages of recommendations

    const calculateDateRange = () => {
      if (selectedAge === "") {
        return { startDate: null, endDate: null }; // No specific date range
      }

      const yearsAgo = AGE_RANGES[selectedAge];
      const currentDate = new Date();
      const startYear = currentDate.getFullYear() - yearsAgo;
      const startDate = new Date(startYear, 0, 1);
      const endDate = currentDate;
      return { startDate, endDate };
    };
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      const fetchMovies = async (page) => {
        try {
          const { startDate, endDate } = calculateDateRange();
          const formattedStartDate = startDate ? formatDate(startDate) : '';
          const formattedEndDate = endDate ? formatDate(endDate) : '';
          let RECOMMENDATIONS_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenres.join(',')}&release_date.gte=${formattedStartDate}&release_date.lte=${formattedEndDate}&page=${page}`;

          if (selectedMood) {
            // Modify the API endpoint to include mood filter
            RECOMMENDATIONS_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenres.join(',')}&release_date.gte=${formattedStartDate}&release_date.lte=${formattedEndDate}&with_keywords=${selectedMood}&page=${page}`;
          }

          const response = await fetch(RECOMMENDATIONS_API_URL);
          const data = await response.json();

           const moviesWithTrailers = await Promise.all(data.results.map(async (movie) => {
      const trailersResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`);
      const trailersData = await trailersResponse.json();
      const trailer = trailersData.results.find(result => result.type === 'Trailer');
      return {
        ...movie,
        trailerKey: trailer ? trailer.key : null,
      };
    }));

    return moviesWithTrailers;
        } catch (error) {
          console.error('Error fetching movie recommendations:', error);
          return [];
        }
      };

      const loadRecommendations = async () => {
        const { startDate, endDate } = calculateDateRange();

        let page = 1;
        let allMovies = [];

        while (page <= MAX_PAGES) {
            const moviesWithTrailers = await fetchMovies(page);

            if (moviesWithTrailers.length === 0) {
              break; // No more movies to fetch
            }
          const filteredMovies = moviesWithTrailers.filter(movie => {
            const releaseDate = new Date(movie.release_date);
            return startDate <= releaseDate && releaseDate <= endDate;
          });


          allMovies = [...allMovies, ...filteredMovies];
          page++;
        }

        allMovies.sort((a, b) => {
          const releaseDateA = new Date(a.release_date);
          const releaseDateB = new Date(b.release_date);
          return releaseDateA - releaseDateB;
        });

        setRecommendations(allMovies);
      };


    loadRecommendations();
  }, [selectedGenres, selectedAge,selectedMood]);
  const handleGenerateAnotherMovie = () => {
    if (currentMovieIndex < recommendations.length - 1) {
      setCurrentMovieIndex(currentMovieIndex + 1);
    } else {
      // If user reaches the end of recommendations, loop back to the beginning
      setCurrentMovieIndex(0);
    }
  };

  const currentMovie = recommendations[currentMovieIndex];
  return (
    <div className="recommendations-section">
  <h2 className="movie-header">Here is your Movies</h2>
  {recommendations.length > 0 ? (
    <div className="movie-container">
      <div className="movie-details">
        <h3 className="movie-title">{currentMovie.title}</h3>
        <p className="movie-overview">{currentMovie.overview}</p>
        <button
          className="generate-another-button"
          onClick={handleGenerateAnotherMovie}
        >
          Generate Another Movie
        </button>
      </div>
      {currentMovie.trailerKey ? (
        <iframe
          className="movie-trailer"
          src={`https://www.youtube.com/embed/${currentMovie.trailerKey}`}
          title="Movie Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w500/${currentMovie.poster_path}`}
          alt={`${currentMovie.title} Poster`}
        />
      )}
    </div>
  ) : (
    <p>No recommendations available.</p>
  )}
</div>

  );

}

export default MovieRecommendations;
