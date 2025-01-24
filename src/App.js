import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  AlertCircle,
  Activity,
} from "lucide-react";
import ResultsPage from "./ResultsPage";

const QuestionCarousel = () => {
  // Define all state variables
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isDark, setIsDark] = useState(false);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Question Array
  const questions = [
    {
      id: "age",
      text: "What is your age?",
      type: "number",
      min: 18,
      max: 80,
    },
    {
      id: "gender",
      text: "What is your gender?",
      options: ["Male", "Female"],
    },
    {
      id: "ethnicity",
      text: "What is your ethnicity?",
      options: ["Caucasian", "Asian", "African American", "Hispanic", "Other"],
    },
    {
      id: "symptoms",
      text: "What are your primary symptoms?",
      options: [
        "Tremors",
        "Memory loss",
        "Headaches",
        "Seizures",
        "Vision issues",
        "Movement issues",
        "None",
      ],
    },
    {
      id: "vision_issues",
      text: "How severe are your vision issues?",
      options: ["None", "Mild", "Severe"],
    },
    {
      id: "movement_issues",
      text: "How severe are your movement issues?",
      options: ["None", "Mild", "Severe"],
    },
    {
      id: "memory_loss",
      text: "How severe is your memory loss and cognitive decline?",
      options: ["None", "Mild", "Severe"],
    },
    {
      id: "progression_speed",
      text: "How would you describe your symptom progression speed?",
      options: ["Slow", "Moderate", "Rapid"],
    },
    {
      id: "symptom_frequency",
      text: "How often do you experience symptoms?",
      options: ["Rarely", "Occasionally", "Frequently"],
    },
    {
      id: "family_history",
      text: "Do you have a family history of these conditions?",
      options: ["None", "Distant relative", "First-degree relative"],
    },
    {
      id: "motor_coordination",
      text: "How severe are your motor coordination issues?",
      options: ["None", "Mild", "Severe"],
    },
    {
      id: "symptom_duration",
      text: "How long have you been experiencing symptoms?",
      options: [
        "Short (<6 months)",
        "Medium (6 months–2 years)",
        "Long (>2 years)",
      ],
    },
    {
      id: "symptom_worsening",
      text: "How would you describe your symptom progression?",
      options: ["None", "Gradual", "Rapid"],
    },
    {
      id: "comorbidities",
      text: "Do you have any of the following conditions?",
      options: ["None", "Diabetes", "Hypertension", "Obesity"],
    },
    {
      id: "sleep_issues",
      text: "Do you experience sleep issues?",
      options: ["Yes", "No"],
    },
    {
      id: "sensory_abnormalities",
      text: "Do you experience any sensory abnormalities?",
      options: ["Yes", "No"],
    },
    {
      id: "seizure_triggers",
      text: "What triggers your seizures?",
      options: ["Stress", "Alcohol", "Fever", "None"],
    },
    {
      id: "seizure_duration",
      text: "How long do your seizures typically last?",
      options: ["Short", "Medium", "Long", "None"],
    },
  ];

  const validateCurrentAnswer = () => {
    const currentQuestion = questions[currentSlide];
    const currentAnswer = answers[currentQuestion.id];

    if (!currentAnswer) {
      setError("Please provide an answer before continuing");
      return false;
    }

    if (currentQuestion.type === "number") {
      const numValue = Number(currentAnswer);
      if (numValue < currentQuestion.min || numValue > currentQuestion.max) {
        setError(
          `Please enter an age between ${currentQuestion.min} and ${currentQuestion.max}`
        );
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleNext = () => {
    if (validateCurrentAnswer()) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setError("");
    }
  };

  const handleInputChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateCurrentAnswer()) {
      return;
    }
    setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setCurrentSlide(0);
    setAnswers({});
    setError("");
  };

  const ProgressBar = () => {
    const progress = ((currentSlide + 1) / questions.length) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  const WelcomeScreen = () => (
    <div
      className={`text-center p-12 rounded-2xl shadow-xl max-w-2xl mx-auto
      ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
    >
      <div className="mb-8">
        <Activity className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Medical Assessment</h1>
        <div
          className={`h-1 w-24 mx-auto ${
            isDark ? "bg-blue-400" : "bg-blue-500"
          }`}
        />
      </div>

      <p className="text-lg mb-8 leading-relaxed max-w-xl mx-auto">
        This comprehensive medical assessment will help evaluate your symptoms
        and medical history for accurate diagnosis and treatment planning.
      </p>

      <div
        className={`rounded-xl p-6 mb-8 
        ${isDark ? "bg-gray-700" : "bg-gray-50"}`}
      >
        <h2 className="font-semibold mb-4 text-lg">What to expect:</h2>
        <ul className="space-y-3 text-left">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
            5-10 minute completion time
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
            18 detailed health questions
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
            Secure & confidential assessment
          </li>
        </ul>
      </div>

      <button
        onClick={() => setShowWelcome(false)}
        className="px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 
          transition-colors duration-300 shadow-lg hover:shadow-xl
          transform hover:-translate-y-1"
      >
        Begin Assessment
      </button>
    </div>
  );

  if (showWelcome) {
    return (
      <div
        className={`w-full min-h-screen ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        } p-6 flex items-center`}
      >
        <button
          onClick={() => setIsDark(!isDark)}
          className="fixed top-6 right-6 p-3 rounded-full shadow-lg
            backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300"
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-800" />
          )}
        </button>
        <WelcomeScreen />
      </div>
    );
  }

  if (showResults) {
    return (
      <ResultsPage
        answers={answers}
        isDark={isDark}
        setIsDark={setIsDark}
        onReset={handleReset}
      />
    );
  }

  return (
    <div
      className={`w-full min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="w-full max-w-3xl mx-auto p-6">
        <button
          onClick={() => setIsDark(!isDark)}
          className="fixed top-6 right-6 p-3 rounded-full shadow-lg
            backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300"
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-800" />
          )}
        </button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className={`relative rounded-2xl shadow-xl p-8 
            ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
          >
            <ProgressBar />

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <div className="min-h-64">
              <h2 className="text-2xl font-bold mb-8">
                {questions[currentSlide].text}
              </h2>

              <div className="space-y-4">
                {questions[currentSlide].type === "number" ? (
                  <input
                    type="number"
                    min={questions[currentSlide].min}
                    max={questions[currentSlide].max}
                    value={answers[questions[currentSlide].id] || ""}
                    onChange={(e) =>
                      handleInputChange(
                        questions[currentSlide].id,
                        e.target.value
                      )
                    }
                    className={`w-full p-4 rounded-xl border text-lg transition-colors
                      ${
                        isDark
                          ? "bg-gray-700 border-gray-600 focus:border-blue-400"
                          : "bg-white border-gray-300 focus:border-blue-500"
                      }`}
                  />
                ) : (
                  questions[currentSlide].options.map((option) => (
                    <label
                      key={option}
                      className={`flex items-center p-4 rounded-xl cursor-pointer transition-all
                        ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"}
                        ${
                          answers[questions[currentSlide].id] === option
                            ? isDark
                              ? "bg-gray-700 ring-2 ring-blue-400"
                              : "bg-blue-50 ring-2 ring-blue-500"
                            : ""
                        }`}
                    >
                      <input
                        type="radio"
                        name={`question-${questions[currentSlide].id}`}
                        value={option}
                        checked={answers[questions[currentSlide].id] === option}
                        onChange={(e) =>
                          handleInputChange(
                            questions[currentSlide].id,
                            e.target.value
                          )
                        }
                        className="w-4 h-4 text-blue-500"
                      />
                      <span className="ml-3">{option}</span>
                    </label>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-between mt-12">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className={`flex items-center px-6 py-3 rounded-xl transition-all
                  ${
                    isDark
                      ? "bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800"
                      : "bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50"
                  }
                  disabled:opacity-50`}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </button>

              {currentSlide === questions.length - 1 ? (
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 
                    transition-all duration-300 shadow-lg hover:shadow-xl
                    transform hover:-translate-y-1"
                >
                  Submit Assessment
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className={`flex items-center px-6 py-3 rounded-xl transition-all
                    ${
                      isDark
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    }
                    text-white`}
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            {questions.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 transform
                  ${
                    currentSlide === index
                      ? "bg-blue-500 scale-125"
                      : isDark
                      ? "bg-gray-600"
                      : "bg-gray-300"
                  }`}
                aria-label={`Go to question ${index + 1}`}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionCarousel;
