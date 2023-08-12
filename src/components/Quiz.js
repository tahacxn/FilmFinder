import React, { useState } from 'react';
import QuizData from './QuizData';
import MovieRecommendations from './Movies';
import './styles/Quiz.css'

const moodToGenresMap = {
    'Happy': [12, 16, 35], // Map mood 'Happy' to genres: Animation, Comedy, Drama
    'Sad': [18], // Map mood 'Sad' to genre: Drama
    'Adventurous': [28, 12, 16], // Map mood 'Adventurous' to genres: Action, Animation, Comedy
    'Thought-provoking': [99, 18], // Map mood 'Thought-provoking' to genres: Documentary, Drama
    'Ready for a scare': [27, 53], // Map mood 'Ready for a scare' to genres: Horror, Thriller
    'Relaxed': [35, 10749], // Map mood 'Relaxed' to genres: Comedy, Romance
  };

function Quiz() {
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAge, setSelectedAge] = useState("Doesn't matter");
  const [showResults, setShowResults] = useState(false);
  const [selectedMood, setSelectedMood] = useState('');

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QuizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleMoodSelection = (mood) => {
    setSelectedMood(mood);

    // Update selectedGenres based on mood selection
    if (moodToGenresMap.hasOwnProperty(mood)) {
      setSelectedGenres(moodToGenresMap[mood]);
    } else {
      setSelectedGenres([]);
    }
  };

  const handleGenreSelection = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const handleAgeSelection = (age) => {
    setSelectedAge(age);
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  if (!quizStarted) {
    return (
      <div className='quiz-start'>
        <h1 className='quiz-header'>Answer 3 questions and we'll get your movies ready for you</h1>
        <button className='quiz-button start-btn' onClick={handleStartQuiz}>Start Quiz</button>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className='recommendations-section'>
        <MovieRecommendations
          selectedGenres={selectedGenres}
          selectedAge={selectedAge}
          selectedMood={selectedMood}
        />
      </div>
    );
  }
  const currentQuestion = QuizData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === QuizData.length - 1;
  return (
    <div className='general-cont'>
      <h2 className='quiz-question'>{currentQuestion.question}</h2>
    <div  className={`quiz-container quiz-options-container ${currentQuestionIndex === 1 ? 'two-columns' : ''}`}>
      {currentQuestion.options.map((option, optionIndex) => (
        <label key={optionIndex} className='quiz-option-label'>
          <input
          className='quiz-option-input'
            type={currentQuestion.id === 2 ? 'checkbox' : 'radio'}
            checked={
              currentQuestion.id === 1
                ? selectedMood === option
                : currentQuestion.id === 2
                ? selectedGenres.includes(currentQuestion.genreIds[optionIndex])
                : selectedAge === option
            }
            onChange={() => {
              if (currentQuestion.id === 1) {
                handleMoodSelection(option);
              } else if (currentQuestion.id === 2) {
                handleGenreSelection(currentQuestion.genreIds[optionIndex]);
              } else {
                handleAgeSelection(option);
              }
            }}
          />
          {option}
        </label>
      ))}
      {!isLastQuestion && (
        <button className='quiz-button' onClick={handleNextQuestion}>Next Question</button>
      )}
      {isLastQuestion && (
        <button className='quiz-button' onClick={handleShowResults}>Show Recommendations</button>
      )}
    </div>
    </div>
  );
}

export default Quiz;
