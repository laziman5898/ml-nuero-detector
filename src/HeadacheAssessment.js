import React, { useState } from "react";
import {
  Loader2,
  BrainCircuit,
  ArrowLeft,
  ArrowRight,
  Activity,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import DiagnosticsResultView from "./DiagnosticsResultView.js";

const HeadacheAssessment = ({
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

  const headacheTypes = [
    "Cluster",
    "Medication Overuse",
    "Migraine",
    "New Daily Persistent",
    "Post-Traumatic",
    "Tension-Type",
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
        "https://neuro-prediction-app-f95c50a3f746.herokuapp.com/predict_headache",
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
      setPredictions(data); // Set the predictions
      setShowResults(true); // Show the DiagnosticsResultView
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const questions = [
    {
      id: "Age",
      text: "What is your age?",
      type: "number",
      min: 18,
      max: 100,
    },
    {
      id: "Gender",
      text: "What is your gender?",
      options: ["Male", "Female"],
    },
    {
      id: "Onset_Type",
      text: "How did your headaches begin?",
      options: ["Sudden", "Gradual"],
    },
    {
      id: "Headache_Frequency",
      text: "How many days per month do you experience headaches?",
      type: "number",
      min: 1,
      max: 31,
    },
    {
      id: "Headache_Duration (Hours)",
      text: "How long do your headaches typically last (in hours)?",
      type: "number",
      min: 0.5,
      max: 72,
    },
    {
      id: "Pain_Severity (1-10)",
      text: "On a scale of 1-10, how severe is your headache pain?",
      type: "number",
      min: 1,
      max: 10,
    },
    {
      id: "Pain_Location",
      text: "Where is your headache pain typically located?",
      options: ["Unilateral", "Bilateral"],
    },
    {
      id: "Pain_Type",
      text: "What type of pain do you experience?",
      options: ["Pulsating", "Pressing"],
    },
    {
      id: "Triggers",
      text: "What typically triggers your headaches?",
      options: ["Stress", "Alcohol", "None"],
    },
    {
      id: "Aura",
      text: "Do you experience aura before headaches?",
      options: ["Yes", "No"],
    },
    {
      id: "Photophobia",
      text: "Are you sensitive to light during headaches?",
      options: ["Yes", "No"],
    },
    {
      id: "Phonophobia",
      text: "Are you sensitive to sound during headaches?",
      options: ["Yes", "No"],
    },
    {
      id: "Nausea/Vomiting",
      text: "Do you experience nausea or vomiting with headaches?",
      options: ["Yes", "No"],
    },
    {
      id: "Family_History",
      text: "Do you have a family history of headaches?",
      options: ["Yes", "No"],
    },
    {
      id: "Mental_Health",
      text: "Do you have any mental health conditions?",
      options: ["None", "Anxiety", "Depression"],
    },
    {
      id: "Caffeine_Consumption (Cups/Day)",
      text: "How many cups of caffeine do you consume daily?",
      type: "number",
      min: 0,
      max: 10,
    },
    {
      id: "Alcohol_Use",
      text: "Do you consume alcohol?",
      options: ["Yes", "No"],
    },
    {
      id: "Stress_Level (%)",
      text: "Rate your stress level (0-100%)",
      type: "number",
      min: 0,
      max: 100,
    },
    {
      id: "Analgesic_Overuse",
      text: "Do you frequently use pain medication?",
      options: ["Yes", "No"],
    },
    {
      id: "Smoking_History",
      text: "Do you smoke?",
      options: ["Yes", "No"],
    },
    {
      id: "Facial_Sweating",
      text: "Do you experience facial sweating during headaches?",
      options: ["Yes", "No"],
    },
    {
      id: "Eye_Symptoms",
      text: "Do you experience eye symptoms during headaches?",
      options: ["Yes", "No"],
    },
    {
      id: "Nasal_Congestion",
      text: "Do you experience nasal congestion during headaches?",
      options: ["Yes", "No"],
    },
    {
      id: "Headache_Fluctuation",
      text: "How would you describe your headache pattern?",
      options: ["Constant", "Fluctuating"],
    },
    {
      id: "Infection_History",
      text: "Do you have any recent history of infections?",
      options: ["Yes", "No"],
    },
    {
      id: "Cognitive_Impairments",
      text: "Do you experience cognitive difficulties during headaches?",
      options: ["Yes", "No"],
    },
    {
      id: "Concussion_Symptoms",
      text: "Do you experience any concussion-like symptoms?",
      options: ["Yes", "No"],
    },
  ];

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
              Detailed Headache Assessment
            </h1>
            <div
              className={`h-1 w-24 mx-auto mt-4 ${
                isDark ? "bg-blue-400" : "bg-blue-500"
              }`}
            />
          </div>

          <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            Based on your initial assessment showing indications of headache
            symptoms, we'll conduct a specialized evaluation to determine the
            specific type and characteristics.
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
                  Pain characteristics & patterns
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Duration & frequency analysis
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Trigger identification
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  Associated symptoms
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
                {headacheTypes.map((type, index) => (
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
                    step={
                      questions[currentSlide].id === "Headache_Duration (Hours)"
                        ? "0.5"
                        : "1"
                    }
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

export default HeadacheAssessment;
