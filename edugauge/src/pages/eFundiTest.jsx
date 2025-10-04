import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import './EFundiTest.css';

function EFundiTest() {
  const pages = [
    {
      question1: [
        {
          question: "Select the option to which one can access files, videos and etc provided by lecturers",
          options: ["1) Test & Quizzes", "2) Resources", "3) Profile Icon", "4) eFundi Icon"],
          name: "q1",
          image: "/question1.png",
        },
      ],
    },
    {
      question2: [
        {
          question: "Select the option to which one can locate the lecturer's contact information on site?",
          options: ["1) eFundi Icon", "2) Profile Icon", "3) Site Info", "4) View All Modules"],
          name: "q2",
          image: "/question2.png",
        },
      ],
    },
    {
      question3: [
        {
          question: "Which option allows a student to view and access their results?",
          options: ["1) View All Modules", "2) Study Guide", "3) Gradebook", "4) New Messages"],
          name: "q3",
          image: "/question3.png",
        },
      ],
    },
    {
      question4: [
        {
          question: "Select the option which allows a student to complete their Tests and Quizzes?",
          options: ["1) Assignments", "2) Test & Quizzes", "3) Site Info", "4) Contact Us"],
          name: "q4",
          image: "/question4.png",
        },
      ],
    },
    {
      question5: [
        {
          question: "Where can students find messages and announcements posted by their lecturers?",
          options: ["1) Announcements", "2) Module Tab", "3) Recent Announcements", "4) Gradebook", "5) Option 1) and 3)"],
          name: "q5",
          image: "/question5.png",
        },
      ],
    },
    {
      question6: [
        {
          question: "In the image above, which button would one submit their answers to a test and quiz?",
          options: ["1) Submit for Grading", "2) Previous", "3) Exit", "4) Save"],
          name: "q6",
          image: "/question6.png",
        },
      ],
    },
    {
      question7: [
        {
          question: "Where can one view all their modules?",
          options: ["1) Recent Announcements", "2) Module Tab", "3) View All Modules", "4) Help"],
          name: "q7",
          image: "/question7.png",
        },
      ],
    },
    {
      question8: [
        {
          question: "If a student is having trouble with eFundi, where can they find assistance?",
          options: ["1) Recent Announcements", "2) Module Tab", "3) View All Modules", "4) Help"],
          name: "q8",
          image: "/question8.png",
        },
      ],
    },
    {
      question9: [
        {
          question: "For a student to save their progress on a test and quiz, which button would they select?",
          options: ["1) Submit for Grading", "2) Previous", "3) Exit", "4) Save"],
          name: "q9",
          image: "/question6.png",
        },
      ],
    },
    {
      question10: [
        {
          question: "For a student to toggle or go backward and forward between questions, which button would they select?",
          options: ["1) Submit for Grading", "2) Both Option 2) and 3)", "3) Previous", "4) Next", "5) Save"],
          name: "q10",
          image: "/question10.png",
        },
      ],
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setSelectedOption(null);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setSelectedOption(null);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = () => {
    alert("Test submitted!");
  };

  const handleSave = () => {
    alert("Your answers have been saved!");
  };

  const currentQuestion =
    pages[currentPage]?.[Object.keys(pages[currentPage] || {})[0]]?.[0] || {
      question: "Question not found",
      options: [],
      name: `q-error-${currentPage}`,
      image: "",
    };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="efundi-test-page">
      <div className="layout">
        <main className="main">
          <header className="main-header">
            <h1 className="header-title">eFundi Readiness Test</h1>
            <div className="profile-section">
              <span className="profile-icon">👤</span>
              <span>Profile</span>
            </div>
          </header>

          <div className="content">
            <div className="content-body">
              <div className="content-box">
                <h2>Question {currentPage + 1}</h2>
                {currentQuestion.image && (
                  <img
                    src={currentQuestion.image}
                    alt={`Question ${currentPage + 1}`}
                    className="calendar-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
                <p>{currentQuestion.question}</p>
                <div className="options-container">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="option-item">
                      <input
                        type="radio"
                        id={option}
                        name={`question-${currentPage}`}
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleOptionChange}
                      />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  ))}
                </div>

                <section className="button-section">
                  <button
                    className="btn previous-btn"
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                  >
                    Previous
                  </button>
                  <div className="center-buttons">
                    {currentPage < pages.length - 1 ? (
                      <button className="btn next-btn" onClick={handleNext}>
                        Next
                      </button>
                    ) : (
                      <button className="btn submit-btn" onClick={handleSubmit}>
                        Submit
                      </button>
                    )}
                  </div>
                  {currentPage < pages.length - 1 && (
                    <button className="btn save-btn" onClick={handleSave}>
                      Save
                    </button>
                  )}
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default EFundiTest;