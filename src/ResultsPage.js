import React, { useState, useEffect } from "react";
import {
  Loader2,
  BrainCircuit,
  ArrowLeft,
  FileText,
  Activity,
  Moon,
  Sun,
} from "lucide-react";
import HeadacheAssessment from "./HeadacheAssessment";
import MovementDisorderAssessment from "./MovementDisorderAssessment";
import DementiaAssessment from "./DementiaAssessment";
import NeurodegenerativeAssessment from "./NeurodegenerativeAssessment";
import CognitiveAssessment from "./CognitiveAssessment";
import SeizureAssessment from "./SeizureAssessment";
import PsychomaticAssessment from "./PsychomaticAssessment";
import VisionAssessment from "./VisionAssessment";

const ResultsPage = ({ answers, isDark, setIsDark, onReset }) => {
  const [predictions, setPredictions] = useState(null);
  const [showHeadacheAssessment, setShowHeadacheAssessment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showAllModels, setShowAllModels] = useState(false);
  const [error, setError] = useState(null);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const ASSESSMENT_MAPPING = {
    "movement disorder": "MovementAssessment",
    dementia: "DementiaAssessment",
    "neurogenerative disorder": "NeurodegenerativeAssessment",
    "cognitive disorder": "CognitiveAssessment",
    headache: "HeadacheAssessment",
    "seizure disorder": "SeizureAssessment",
    "psychomatic disorder": "PsychomaticAssessment",
    "vision disorder": "VisionAssessment",
  };

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch(
          "https://neuro-prediction-app-f95c50a3f746.herokuapp.com/predict",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(answers),
          }
        );
        if (!response.ok) throw new Error("Failed to fetch predictions");
        const data = await response.json();
        setPredictions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    //For testing purposes ONLY
    // setTimeout(() => {
    //   setPredictions({
    //     GB: "Neurogenerative Disorder",
    //     RF: "Psychomatic Disorder",
    //     SVM: "Cognitive Disorder",
    //   });
    //   setLoading(false);
    // }, 2000);

    //Uncomment for real API:
    fetchPredictions();
  }, [answers]);

  const modelDetails = {
    GB: {
      name: "Gradient Boosting",
      description: "Our most comprehensive analysis system",
      accuracy: "94%",
      features: [
        "In-depth symptom analysis",
        "Advanced pattern recognition",
        "High accuracy prediction",
      ],
    },
    RF: {
      name: "Random Forest",
      description: "Balanced analysis considering multiple factors",
      accuracy: "92%",
      features: [
        "Multiple data point consideration",
        "Balanced assessment approach",
        "Reliable predictions",
      ],
    },
    SVM: {
      name: "Support Vector Machine",
      description: "Clear and straightforward analysis",
      accuracy: "90%",
      features: [
        "Clear decision making",
        "Straightforward assessment",
        "Direct results",
      ],
    },
  };

  const handleFurtherAssessment = () => {
    const diagnosis = predictions[selectedModel].toLowerCase();
    for (const [key, value] of Object.entries(ASSESSMENT_MAPPING)) {
      if (diagnosis.includes(key)) {
        setCurrentAssessment(value);
        return;
      }
    }
    if (diagnosis.includes("no disorder")) {
      console.log("No further assessment needed");
    }
  };
  if (currentAssessment) {
    switch (currentAssessment) {
      case "HeadacheAssessment":
        return (
          <HeadacheAssessment
            isDark={isDark}
            setIsDark={setIsDark}
            previousDiagnosis={predictions[selectedModel]}
            onComplete={(answers) => {
              setCurrentAssessment(null);
            }}
          />
        );

      case "MovementAssessment":
        return (
          <MovementDisorderAssessment
            isDark={isDark}
            setIsDark={setIsDark}
            previousDiagnosis={predictions[selectedModel]}
            onComplete={(answers) => {
              setCurrentAssessment(null);
            }}
          />
        );

      case "DementiaAssessment":
        return (
          <DementiaAssessment
            isDark={isDark}
            setIsDark={setIsDark}
            previousDiagnosis={predictions[selectedModel]}
            onComplete={(answers) => {
              setCurrentAssessment(null);
            }}
          />
        );

      case "NeurodegenerativeAssessment":
        return (
          <NeurodegenerativeAssessment
            isDark={isDark}
            setIsDark={setIsDark}
            previousDiagnosis={predictions[selectedModel]}
            onComplete={(answers) => {
              setCurrentAssessment(null);
            }}
          />
        );

      case "CognitiveAssessment":
        return (
          <CognitiveAssessment
            isDark={isDark}
            setIsDark={setIsDark}
            previousDiagnosis={predictions[selectedModel]}
            onComplete={(answers) => {
              setCurrentAssessment(null);
            }}
          />
        );

      case "SeizureAssessment":
        return (
          <SeizureAssessment
            isDark={isDark}
            setIsDark={setIsDark}
            previousDiagnosis={predictions[selectedModel]}
            onComplete={(answers) => {
              setCurrentAssessment(null);
            }}
          />
        );

      case "PsychomaticAssessment":
        return (
          <PsychomaticAssessment
            isDark={isDark}
            setIsDark={setIsDark}
            previousDiagnosis={predictions[selectedModel]}
            onComplete={(answers) => {
              setCurrentAssessment(null);
            }}
          />
        );

      case "VisionAssessment":
        return (
          <VisionAssessment
            isDark={isDark}
            setIsDark={setIsDark}
            previousDiagnosis={predictions[selectedModel]}
            onComplete={(answers) => {
              setCurrentAssessment(null);
            }}
          />
        );

      default:
        return null;
    }
  }

  if (loading) {
    return (
      <div
        className={`w-full min-h-screen ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        } 
        flex items-center justify-center`}
      >
        <div
          className={`text-center p-12 rounded-2xl shadow-xl max-w-2xl
          ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
        >
          <Loader2 className="w-16 h-16 text-blue-500 mx-auto mb-6 animate-spin" />
          <h2 className="text-2xl font-bold mb-4">Analyzing Your Results</h2>
          <p className="text-lg">
            Just a moment while we process your assessment...
          </p>
        </div>
      </div>
    );
  }

  if (selectedModel && !showAllModels) {
    const model = modelDetails[selectedModel];
    return (
      <div
        className={`w-full min-h-screen ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        } p-6`}
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
        <div className="max-w-3xl mx-auto">
          <div
            className={`p-8 rounded-2xl shadow-xl
            ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
          >
            <button
              onClick={() => setSelectedModel(null)}
              className="flex items-center mb-6 text-blue-500 hover:text-blue-600"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Analysis Options
            </button>

            <div className="text-center mb-8">
              <BrainCircuit className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">{model.name}</h2>
              <p className="text-lg text-gray-500">{model.description}</p>
            </div>

            <div
              className={`mb-8 p-6 rounded-xl 
              ${isDark ? "bg-gray-700" : "bg-blue-50"}`}
            >
              <h3 className="text-xl font-semibold mb-4">Your Results</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg">Assessment Outcome:</span>
                <span className="text-xl font-bold">
                  {predictions[selectedModel]}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Confidence Level:</span>
                <span className="font-medium">{model.accuracy}</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Analysis Features</h3>
              <div className="space-y-3">
                {model.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Activity className="w-5 h-5 text-blue-500 mr-3" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={onReset}
                className="flex items-center justify-center px-6 py-3 rounded-xl
                  bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all"
              >
                Start New Assessment
              </button>
              <button
                onClick={handleFurtherAssessment}
                className="flex items-center justify-center px-6 py-3 rounded-xl
                  bg-green-500 hover:bg-green-600 text-white transition-all"
              >
                Further Assessment
              </button>
              <button
                className="flex items-center justify-center px-6 py-3 rounded-xl
                  bg-blue-500 hover:bg-blue-600 text-white transition-all"
              >
                <FileText className="w-5 h-5 mr-2" />
                Get Detailed Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      } p-6`}
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
      <div className="max-w-4xl mx-auto">
        <div
          className={`p-8 rounded-2xl shadow-xl mb-6
          ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
        >
          <div className="text-center mb-8">
            <BrainCircuit className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Your Results</h2>
            <p className="text-lg text-gray-500">
              Choose your preferred analysis method
            </p>
          </div>

          <div className="mb-8">
            <button
              onClick={() => setShowAllModels(!showAllModels)}
              className={`w-full p-4 rounded-xl mb-6 text-center transition-all
                ${
                  isDark
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                }
                text-white font-semibold`}
            >
              {showAllModels ? "Hide Comparison" : "Compare All Analyses"}
            </button>

            <div className="grid gap-6">
              {Object.entries(modelDetails).map(([key, details]) => (
                <div
                  key={key}
                  className={`p-6 rounded-xl border transition-all cursor-pointer
                    ${
                      isDark
                        ? "border-gray-700 hover:border-blue-500"
                        : "border-gray-200 hover:border-blue-500"
                    }
                    ${showAllModels ? "opacity-100" : ""}`}
                  onClick={() => !showAllModels && setSelectedModel(key)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{details.name}</h3>
                      <p className="text-sm text-gray-500">
                        {details.description}
                      </p>
                    </div>
                  </div>

                  {showAllModels && (
                    <div
                      className={`mt-4 p-4 rounded-lg 
                      ${isDark ? "bg-gray-700" : "bg-blue-50"}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Result:</span>
                        <span className="text-lg">{predictions[key]}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">
                          Confidence:
                        </span>
                        <span className="font-medium">{details.accuracy}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
