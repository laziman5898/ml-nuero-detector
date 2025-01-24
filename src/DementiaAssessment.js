import React, { useState } from "react";
import {
  Loader2,
  BrainCircuit,
  ArrowRight,
  Activity,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import DiagnosticsResultView from "./DiagnosticsResultView.js";

const DementiaAssessment = ({
  isDark,
  setIsDark,
  previousDiagnosis,
  onComplete,
}) => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const dementiaTypes = [
    "Alzheimer's Disease",
    "Vascular Dementia",
    "Lewy Body Dementia",
    "Frontotemporal Dementia",
    "Mixed Dementia",
    "Parkinson's Dementia",
  ];

  const questions = [
    {
      id: "Age",
      text: "What is your age?",
      type: "number",
      min: 50,
      max: 100,
    },
    {
      id: "Gender",
      text: "What is your gender?",
      options: ["Male", "Female"],
    },
    {
      id: "Memory_Issues",
      text: "Do you experience memory issues?",
      options: ["Yes", "No"],
    },
    {
      id: "Confusion_in_Familiar_Places",
      text: "Do you get confused in familiar places?",
      options: ["Yes", "No"],
    },
    {
      id: "Difficulty_Multitasking",
      text: "Do you have difficulty multitasking?",
      options: ["Yes", "No"],
    },
    {
      id: "Hallucinations",
      text: "Do you experience hallucinations?",
      options: ["Yes", "No"],
    },
    {
      id: "Mood_Changes",
      text: "Have you experienced significant mood changes?",
      options: ["Yes", "No"],
    },
    {
      id: "Personality_Changes",
      text: "Have you noticed changes in your personality?",
      options: ["Yes", "No"],
    },
    {
      id: "Speech_Issues",
      text: "Do you experience speech difficulties?",
      options: ["Yes", "No"],
    },
    {
      id: "Difficulty_Walking_or_Balance",
      text: "Do you have difficulty walking or maintaining balance?",
      options: ["Yes", "No"],
    },
    {
      id: "Vision_Problems",
      text: "Do you experience vision problems?",
      options: ["Yes", "No"],
    },
    {
      id: "Tremors",
      text: "Do you experience tremors?",
      options: ["Yes", "No"],
    },
    {
      id: "Family_History_Dementia",
      text: "Do you have a family history of dementia?",
      options: ["Yes", "No"],
    },
    {
      id: "Smoking_History",
      text: "Do you have a smoking history?",
      options: ["Yes", "No"],
    },
    {
      id: "Alcohol_Consumption",
      text: "Do you consume alcohol?",
      options: ["Yes", "No"],
    },
  ];

  const handleInputChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
    setError("");
  };

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
          `Please enter a value between ${currentQuestion.min} and ${currentQuestion.max}`
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCurrentAnswer()) return;

    setLoading(true);
    try {
      const response = await fetch(
        "https://neuro-prediction-app-f95c50a3f746.herokuapp.com/predict_dementia",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answers),
        }
      );

      if (!response.ok) throw new Error("Failed to submit assessment");

      const data = await response.json();
      setPredictions(data);
      setShowResults(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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

  if (showResults && predictions) {
    return (
      <DiagnosticsResultView
        predictions={predictions}
        isDark={isDark}
        setIsDark={setIsDark}
        onReset={() => {
          setShowResults(false);
          setShowWelcome(true);
          setAnswers({});
          onComplete(predictions);
        }}
      />
    );
  }

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

        <div
          className={`text-center p-12 rounded-2xl shadow-xl max-w-3xl mx-auto
          ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
        >
          <div className="mb-8">
            <BrainCircuit className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm
              ${
                isDark
                  ? "bg-blue-500/20 text-blue-300"
                  : "bg-blue-100 text-blue-700"
              } mb-4`}
            >
              <Activity className="w-4 h-4" />
              Initial Diagnosis: {previousDiagnosis}
            </div>
            <h1 className="text-3xl font-bold mt-4">
              Detailed Dementia Assessment
            </h1>
            <div
              className={`h-1 w-24 mx-auto mt-4 ${
                isDark ? "bg-blue-400" : "bg-blue-500"
              }`}
            />
          </div>

          <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            Based on your initial assessment showing cognitive-related symptoms,
            we'll conduct a specialized evaluation to determine the specific
            type and characteristics of potential cognitive decline.
          </p>

          <div className={`grid md:grid-cols-2 gap-6 mb-8`}>
            <div
              className={`rounded-xl p-6 ${
                isDark ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <h2 className="font-semibold mb-4 text-lg">
                Assessment Coverage
              </h2>
              <ul className="space-y-3 text-left">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Cognitive function analysis
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Symptom progression
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Associated neurological symptoms
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Impact on daily functioning
                </li>
              </ul>
            </div>

            <div
              className={`rounded-xl p-6 ${
                isDark ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <h2 className="font-semibold mb-4 text-lg">
                Possible Classifications
              </h2>
              <div className="grid grid-cols-2 gap-2 text-left">
                {dementiaTypes.map((type, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    <span className="text-sm">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowWelcome(false)}
            className="px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 
              transition-colors duration-300 shadow-lg hover:shadow-xl
              transform hover:-translate-y-1 flex items-center justify-center mx-auto"
          >
            Start Detailed Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
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

      <div className="w-full max-w-3xl mx-auto p-6">
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
                  disabled={loading}
                  className={`px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 
                    transition-all duration-300 shadow-lg hover:shadow-xl
                    transform hover:-translate-y-1 flex items-center ${
                      loading ? "opacity-50" : ""
                    }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Assessment"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center px-6 py-3 rounded-xl transition-all
                    bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DementiaAssessment;
