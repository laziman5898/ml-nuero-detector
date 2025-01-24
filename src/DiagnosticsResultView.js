import React from "react";
import {
  BrainCircuit,
  FileText,
  RefreshCcw,
  ArrowRight,
  Sun,
  Moon,
  Activity,
  Stethoscope,
} from "lucide-react";

const DiagnosticsResultView = ({ predictions, isDark, setIsDark, onReset }) => {
  const diagnosisInfo = {
    // Vision Disorders
    "Optic Neuritis": {
      category: "Vision Disorder",
      description:
        "Inflammation of the optic nerve, often causing pain and temporary vision loss in one eye.",
      symptoms: [
        "Pain with eye movement",
        "Blurred or dimmed vision",
        "Color vision changes",
        "Loss of vision in one eye",
      ],
      nextSteps: [
        "Neurological evaluation (rule out multiple sclerosis)",
        "MRI imaging",
        "Corticosteroid therapy",
        "Monitor for recurrence",
      ],
    },
    Hemianopia: {
      category: "Vision Disorder",
      description:
        "Loss of vision in half of the visual field in one or both eyes, often caused by brain injury or stroke.",
      symptoms: [
        "Blindness in half of the visual field",
        "Difficulty navigating spaces",
        "Bumping into objects on the affected side",
      ],
      nextSteps: [
        "Neurological consultation",
        "Imaging studies (MRI/CT)",
        "Vision therapy or rehabilitation",
        "Identify and manage underlying cause",
      ],
    },
    Nystagmus: {
      category: "Vision Disorder",
      description:
        "Involuntary, repetitive eye movements that can affect vision and depth perception.",
      symptoms: [
        "Involuntary eye movements",
        "Blurred or unstable vision",
        "Dizziness or balance issues",
      ],
      nextSteps: [
        "Ophthalmologist or neurologist consultation",
        "Underlying condition evaluation",
        "Corrective lenses or prisms",
        "Surgical or medical treatment if needed",
      ],
    },
    "Charles Bonnet Syndrome": {
      category: "Vision Disorder",
      description:
        "A condition in which visually impaired individuals experience visual hallucinations.",
      symptoms: [
        "Complex visual hallucinations",
        "Hallucinations are not distressing",
        "Normal cognitive function",
      ],
      nextSteps: [
        "Ophthalmologist evaluation",
        "Reassurance and education about the condition",
        "Manage underlying vision loss",
        "Referral to a specialist if hallucinations worsen",
      ],
    },
    Prosopagnosia: {
      category: "Vision Disorder",
      description:
        "Also known as face blindness, this condition impairs the ability to recognize familiar faces.",
      symptoms: [
        "Difficulty recognizing faces",
        "Reliance on other cues (e.g., voice, clothing)",
        "Normal vision otherwise",
      ],
      nextSteps: [
        "Neurological assessment",
        "Cognitive testing",
        "Compensatory strategies (e.g., using contextual clues)",
        "Support groups or therapy for coping",
      ],
    },
    Glaucoma: {
      category: "Vision Disorder",
      description:
        "A group of eye conditions that damage the optic nerve, often due to high intraocular pressure, leading to vision loss.",
      symptoms: [
        "Gradual loss of peripheral vision",
        "Tunnel vision (in advanced stages)",
        "Eye pain or pressure (acute cases)",
        "Blurred vision",
      ],
      nextSteps: [
        "Regular eye exams to monitor pressure",
        "Medications to lower intraocular pressure",
        "Laser or surgical treatment if needed",
        "Lifestyle modifications to protect vision",
      ],
    },

    // Cognitive Disorders
    "Mild Cognitive Impairment (MCI)": {
      category: "Cognitive Disorder",
      description:
        "A condition involving noticeable, measurable decline in cognitive abilities that does not interfere significantly with daily life.",
      symptoms: [
        "Memory lapses",
        "Difficulty concentrating",
        "Struggling with complex tasks",
        "Increased forgetfulness",
      ],
      nextSteps: [
        "Neurological evaluation",
        "Cognitive testing",
        "Regular monitoring",
        "Lifestyle changes (e.g., mental exercises, physical activity)",
      ],
    },
    "Amnestic Syndrome": {
      category: "Cognitive Disorder",
      description:
        "A condition characterized by severe memory loss, often caused by brain damage or disease, while other cognitive functions remain intact.",
      symptoms: [
        "Severe memory impairment",
        "Difficulty forming new memories",
        "Preservation of long-term memory",
        "Normal reasoning and language skills",
      ],
      nextSteps: [
        "Neurological evaluation and imaging",
        "Identify and treat underlying cause",
        "Rehabilitation and memory aids",
        "Supportive therapy",
      ],
    },
    "TBI-related Cognitive Disorder": {
      category: "Cognitive Disorder",
      description:
        "Cognitive impairments resulting from traumatic brain injury (TBI), affecting memory, attention, and executive functions.",
      symptoms: [
        "Memory problems",
        "Difficulty focusing",
        "Impaired problem-solving",
        "Emotional instability",
      ],
      nextSteps: [
        "Neurological evaluation",
        "Cognitive rehabilitation",
        "Occupational therapy",
        "Address underlying psychological issues (e.g., depression, PTSD)",
      ],
    },
    "Substance-Induced Cognitive Disorder": {
      category: "Cognitive Disorder",
      description:
        "Cognitive impairments caused by chronic substance use or exposure, affecting memory, attention, and decision-making.",
      symptoms: [
        "Memory lapses",
        "Difficulty concentrating",
        "Slowed thinking",
        "Behavioral changes",
      ],
      nextSteps: [
        "Discontinuation of substance use",
        "Detoxification and rehabilitation",
        "Cognitive therapy",
        "Lifestyle changes to support brain health",
      ],
    },
    "Frontal Lobe Syndrome": {
      category: "Cognitive Disorder",
      description:
        "A condition caused by damage to the frontal lobe, affecting behavior, personality, and executive functioning.",
      symptoms: [
        "Personality changes",
        "Impaired judgment",
        "Loss of social inhibitions",
        "Difficulty with planning and organization",
      ],
      nextSteps: [
        "Neurological evaluation",
        "Brain imaging studies",
        "Behavioral therapy",
        "Occupational therapy for daily functioning",
      ],
    },
    "Wernicke-Korsakoff Syndrome": {
      category: "Cognitive Disorder",
      description:
        "A condition caused by thiamine (vitamin B1) deficiency, often linked to alcohol abuse, leading to memory loss and confusion.",
      symptoms: [
        "Confusion",
        "Memory impairment",
        "Loss of coordination",
        "Hallucinations (in severe cases)",
      ],
      nextSteps: [
        "Immediate thiamine supplementation",
        "Address underlying cause (e.g., alcohol cessation)",
        "Nutritional support",
        "Rehabilitation for memory and motor functions",
      ],
    },

    // Movement Disorders
    "Parkinson's Disease": {
      category: "Movement Disorder",
      description:
        "A progressive neurological condition affecting movement, often characterized by tremors, stiffness, and slow movement.",
      symptoms: [
        "Tremors",
        "Muscle stiffness",
        "Bradykinesia (slowness of movement)",
        "Impaired balance",
      ],
      nextSteps: [
        "Neurologist consultation",
        "Medications (e.g., levodopa)",
        "Physical therapy",
        "Deep brain stimulation (if needed)",
      ],
    },
    "Essential Tremor": {
      category: "Movement Disorder",
      description:
        "A neurological condition causing rhythmic shaking, often affecting the hands, head, or voice.",
      symptoms: [
        "Shaking in hands, head, or voice",
        "Worsened by movement",
        "Improves with alcohol in some cases",
      ],
      nextSteps: [
        "Neurologist evaluation",
        "Medications (e.g., beta-blockers)",
        "Lifestyle modifications",
        "Surgical options (in severe cases)",
      ],
    },
    Dystonia: {
      category: "Movement Disorder",
      description:
        "A condition causing involuntary muscle contractions, leading to repetitive movements or abnormal postures.",
      symptoms: [
        "Involuntary muscle contractions",
        "Twisting or repetitive movements",
        "Painful muscle spasms",
      ],
      nextSteps: [
        "Consult movement disorder specialist",
        "Botox injections",
        "Physical and occupational therapy",
        "Medications (e.g., muscle relaxants)",
      ],
    },
    "Huntington's Disease": {
      category: "Movement Disorder",
      description:
        "A genetic condition causing progressive degeneration of nerve cells in the brain, affecting movement, cognition, and emotions.",
      symptoms: [
        "Involuntary jerking movements",
        "Impaired coordination",
        "Cognitive decline",
        "Mood changes",
      ],
      nextSteps: [
        "Genetic testing and counseling",
        "Symptom management",
        "Supportive therapy",
        "Physical and occupational therapy",
      ],
    },
    Ataxia: {
      category: "Movement Disorder",
      description:
        "A condition characterized by a lack of muscle control and coordination, often due to damage to the cerebellum.",
      symptoms: [
        "Impaired coordination",
        "Unsteady gait",
        "Difficulty with fine motor tasks",
        "Slurred speech",
      ],
      nextSteps: [
        "Neurological evaluation",
        "Physical therapy",
        "Speech therapy",
        "Management of underlying cause",
      ],
    },
    "Tourette Syndrome": {
      category: "Movement Disorder",
      description:
        "A neurological disorder characterized by repetitive, involuntary movements and vocalizations called tics.",
      symptoms: [
        "Motor tics (e.g., blinking, jerking movements)",
        "Vocal tics (e.g., grunting, throat clearing)",
        "Worsening with stress or excitement",
      ],
      nextSteps: [
        "Behavioral therapy",
        "Medications (if severe)",
        "Education and support groups",
        "Relaxation techniques",
      ],
    },
    "Restless Legs Syndrome": {
      category: "Movement Disorder",
      description:
        "A condition causing an uncontrollable urge to move the legs, often accompanied by uncomfortable sensations.",
      symptoms: [
        "Urge to move legs",
        "Worse during inactivity or at night",
        "Temporary relief with movement",
        "Sleep disturbances",
      ],
      nextSteps: [
        "Neurological evaluation",
        "Medications (e.g., dopamine agonists)",
        "Improved sleep hygiene",
        "Iron supplements (if deficient)",
      ],
    },

    // Headache Types
    Migraine: {
      category: "Headache",
      description:
        "Recurring headaches with intense throbbing pain and sensory sensitivity.",
      symptoms: [
        "Pulsating pain",
        "Light/sound sensitivity",
        "Nausea",
        "Visual aura",
      ],
      nextSteps: [
        "Headache diary",
        "Trigger identification",
        "Preventive medication",
        "Lifestyle changes",
      ],
    },
    Cluster: {
      category: "Headache",
      description:
        "Severe and recurring headaches, often around one eye, with possible tearing or nasal congestion.",
      symptoms: [
        "Intense pain around one eye",
        "Tearing",
        "Nasal congestion",
        "Restlessness",
      ],
      nextSteps: [
        "Consult neurologist",
        "Oxygen therapy",
        "Medications (e.g., triptans)",
        "Avoid triggers",
      ],
    },
    "Medication Overuse": {
      category: "Headache",
      description:
        "Chronic headaches caused by frequent or excessive use of headache medications.",
      symptoms: [
        "Daily headaches",
        "Worsening headache with medication use",
        "Dependence on pain relievers",
      ],
      nextSteps: [
        "Reduce medication use",
        "Consult physician",
        "Preventive therapy",
        "Behavioral changes",
      ],
    },
    Migraine: {
      category: "Headache",
      description:
        "Recurring headaches with intense throbbing pain and sensory sensitivity.",
      symptoms: [
        "Pulsating pain",
        "Light/sound sensitivity",
        "Nausea",
        "Visual aura",
      ],
      nextSteps: [
        "Headache diary",
        "Trigger identification",
        "Preventive medication",
        "Lifestyle changes",
      ],
    },
    "New Daily Persistent": {
      category: "Headache",
      description:
        "Headaches that start suddenly and become persistent, lasting for months or more.",
      symptoms: [
        "Constant daily headache",
        "Moderate to severe pain",
        "Pressure-like or throbbing sensation",
      ],
      nextSteps: [
        "Consult headache specialist",
        "Imaging studies (MRI/CT scan)",
        "Medications (e.g., antidepressants)",
        "Physical therapy",
      ],
    },
    "Post-Traumatic": {
      category: "Headache",
      description:
        "Headaches caused by head trauma or injury, occurring days to weeks after the incident.",
      symptoms: [
        "Head pain after trauma",
        "Dizziness",
        "Memory problems",
        "Fatigue",
      ],
      nextSteps: [
        "Rest and recovery",
        "Pain management",
        "Cognitive therapy",
        "Follow-up with neurologist",
      ],
    },
    "Tension-Type": {
      category: "Headache",
      description:
        "Common headaches characterized by mild to moderate pain, often described as a tight band around the head.",
      symptoms: [
        "Mild to moderate pain",
        "Tightness or pressure sensation",
        "Pain on both sides of the head",
        "Neck/shoulder tension",
      ],
      nextSteps: [
        "Stress management",
        "Physical therapy",
        "Over-the-counter pain relievers",
        "Regular exercise",
      ],
    },

    // Seizure Types
    "Focal Aware": {
      category: "Seizure",
      description:
        "A type of seizure that originates in one area of the brain, during which the person remains fully aware.",
      symptoms: [
        "Localized twitching or jerking",
        "Unusual sensory experiences (e.g., tingling, smells, tastes)",
        "Emotional changes (e.g., fear, deja vu)",
      ],
      nextSteps: [
        "Consult neurologist",
        "EEG testing",
        "Medications (e.g., anti-epileptics)",
        "Lifestyle management to avoid triggers",
      ],
    },
    "Focal Impaired Awareness": {
      category: "Seizure",
      description:
        "A type of seizure that originates in one area of the brain, during which the person’s awareness is impaired.",
      symptoms: [
        "Blank stare or unresponsiveness",
        "Automatisms (e.g., lip-smacking, hand movements)",
        "Confusion after the seizure",
      ],
      nextSteps: [
        "Neurological evaluation",
        "MRI/CT imaging",
        "Seizure management medications",
        "Monitor for patterns or triggers",
      ],
    },
    Absence: {
      category: "Seizure",
      description:
        "A type of generalized seizure often characterized by brief, sudden lapses in awareness, usually lasting a few seconds.",
      symptoms: [
        "Blank stare",
        "Sudden stop in activity",
        "No response during the episode",
        "May appear as daydreaming",
      ],
      nextSteps: [
        "Pediatric or adult neurology consult",
        "EEG testing to confirm",
        "Anti-epileptic medications",
        "Regular follow-ups for medication adjustments",
      ],
    },
    "Tonic-Clonic": {
      category: "Seizure",
      description:
        "A generalized seizure involving a loss of consciousness, stiffening of muscles (tonic phase), and rhythmic jerking (clonic phase).",
      symptoms: [
        "Loss of consciousness",
        "Body stiffening",
        "Jerking movements",
        "Possible tongue-biting or incontinence",
      ],
      nextSteps: [
        "Emergency care during the seizure",
        "Neurologist consultation",
        "Seizure medications",
        "Safety measures to prevent injury",
      ],
    },
    Myoclonic: {
      category: "Seizure",
      description:
        "A type of seizure characterized by sudden, brief jerking or twitching movements, typically involving muscles on both sides of the body.",
      symptoms: [
        "Sudden muscle jerks",
        "Brief and rapid movements",
        "Occur without warning",
        "May cluster in a short time frame",
      ],
      nextSteps: [
        "Neurological evaluation",
        "EEG testing for diagnosis",
        "Medications like valproic acid",
        "Lifestyle modifications to reduce triggers",
      ],
    },
    "Parkinson's Disease": {
      category: "Neurological Disorder",
      description:
        "A progressive disorder of the nervous system that affects movement and can lead to tremors, stiffness, and slowed movement.",
      symptoms: [
        "Tremors",
        "Muscle stiffness",
        "Bradykinesia (slowed movement)",
        "Impaired balance and coordination",
      ],
      nextSteps: [
        "Neurologist consultation",
        "Medications (e.g., levodopa/carbidopa)",
        "Physical therapy",
        "Deep brain stimulation (if advanced)",
      ],
    },
    "ALS (Amyotrophic Lateral Sclerosis)": {
      category: "Neurological Disorder",
      description:
        "A progressive disease that affects nerve cells in the brain and spinal cord, leading to loss of muscle control.",
      symptoms: [
        "Muscle weakness",
        "Difficulty speaking or swallowing",
        "Twitching or cramping muscles",
        "Progressive paralysis",
      ],
      nextSteps: [
        "Neurologist evaluation",
        "Supportive therapies (e.g., physical, speech therapy)",
        "Assistive devices for mobility",
        "Symptom management with medications (e.g., riluzole)",
      ],
    },
    "Huntington's Disease": {
      category: "Neurological Disorder",
      description:
        "A genetic disorder that causes the progressive breakdown of nerve cells in the brain, affecting movement, cognition, and behavior.",
      symptoms: [
        "Involuntary jerking or writhing movements",
        "Difficulty with coordination and balance",
        "Cognitive decline",
        "Mood and personality changes",
      ],
      nextSteps: [
        "Genetic testing and counseling",
        "Symptom management",
        "Physical and occupational therapy",
        "Emotional and psychological support",
      ],
    },
    "Frontotemporal Dementia": {
      category: "Neurological Disorder",
      description:
        "A group of disorders caused by progressive nerve cell loss in the brain’s frontal or temporal lobes, affecting behavior, language, and personality.",
      symptoms: [
        "Personality and behavior changes",
        "Language difficulties",
        "Impaired judgment",
        "Loss of social inhibitions",
      ],
      nextSteps: [
        "Neurological evaluation",
        "Behavioral therapy",
        "Support for caregivers",
        "Speech and language therapy (if needed)",
      ],
    },
    "PSP (Progressive Supranuclear Palsy)": {
      category: "Neurological Disorder",
      description:
        "A rare brain disorder that causes problems with balance, movement, and eye movements, as well as cognitive difficulties.",
      symptoms: [
        "Difficulty with balance and walking",
        "Frequent falls",
        "Problems with eye movement",
        "Speech and swallowing difficulties",
      ],
      nextSteps: [
        "Neurologist consultation",
        "Physical therapy for mobility",
        "Speech therapy",
        "Medications for symptom relief (e.g., Parkinsonian drugs)",
      ],
    },
    "MSA (Multiple System Atrophy)": {
      category: "Neurological Disorder",
      description:
        "A rare, progressive neurodegenerative disorder affecting autonomic functions like blood pressure, as well as movement.",
      symptoms: [
        "Impaired movement and coordination",
        "Low blood pressure (orthostatic hypotension)",
        "Bladder dysfunction",
        "Speech and swallowing difficulties",
      ],
      nextSteps: [
        "Neurological evaluation",
        "Medications to manage symptoms (e.g., blood pressure support)",
        "Physical therapy",
        "Assistive devices for mobility and daily tasks",
      ],
    },
    "CBD (Corticobasal Degeneration)": {
      category: "Neurological Disorder",
      description:
        "A rare progressive disorder characterized by problems with movement, coordination, and cognition due to brain cell degeneration.",
      symptoms: [
        "Asymmetric movement difficulties",
        "Muscle stiffness and rigidity",
        "Involuntary jerking movements",
        "Cognitive and language issues",
      ],
      nextSteps: [
        "Neurologist evaluation",
        "Physical and occupational therapy",
        "Speech therapy (if needed)",
        "Medications to manage symptoms (e.g., muscle relaxants)",
      ],
    },
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Vision Disorder": "blue",
      "Cognitive Disorder": "purple",
      "Movement Disorder": "green",
      Headache: "red",
      "Seizure Disorder": "orange",
      "Psychomatic Disorder": "pink",
      "Neurogenerative Disorder": "indigo",
    };
    return colors[category] || "gray";
  };

  // majority prediction or first prediction if all different
  const getPrimaryDiagnosis = () => {
    const predictions_array = [
      predictions.Gradient_Boosting_Prediction,
      predictions.Random_Forest_Prediction,
      predictions.SVM_Prediction,
    ];
    return predictions_array.reduce((a, b) =>
      predictions_array.filter((v) => v === a).length >=
      predictions_array.filter((v) => v === b).length
        ? a
        : b
    );
  };

  const primaryDiagnosis = getPrimaryDiagnosis();
  const info = diagnosisInfo[primaryDiagnosis] || {
    category: "Unspecified",
    description:
      "Please consult with a healthcare provider for detailed information about your condition.",
    symptoms: ["Varied symptoms may be present"],
    nextSteps: [
      "Consult healthcare provider",
      "Keep symptom diary",
      "Follow up regularly",
    ],
  };

  const categoryColor = getCategoryColor(info.category);

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
            <h2 className="text-3xl font-bold mb-2">Assessment Results</h2>
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm
              ${
                isDark
                  ? `bg-${categoryColor}-500/20 text-${categoryColor}-300`
                  : `bg-${categoryColor}-100 text-${categoryColor}-700`
              } mt-4`}
            >
              <Activity className="w-4 h-4" />
              {info.category}: {primaryDiagnosis}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {Object.entries(predictions).map(([model, prediction]) => (
              <div
                key={model}
                className={`p-4 rounded-xl ${
                  isDark ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <h3 className="font-medium text-sm text-gray-500 mb-2">
                  {model.replace(/_/g, " ")}
                </h3>
                <p className="text-lg font-semibold">{prediction}</p>
              </div>
            ))}
          </div>

          <div
            className={`mb-8 p-6 rounded-xl ${
              isDark ? "bg-gray-700" : `bg-${categoryColor}-50`
            }`}
          >
            <h3 className="text-xl font-semibold mb-4">About Your Diagnosis</h3>
            <p className="text-lg mb-6">{info.description}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Common Symptoms</h4>
                <ul className="space-y-2">
                  {info.symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-center">
                      <span
                        className={`w-2 h-2 bg-${categoryColor}-500 rounded-full mr-3`}
                      />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Recommended Next Steps</h4>
                <ul className="space-y-2">
                  {info.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onReset}
              className="flex items-center justify-center px-6 py-3 rounded-xl
                bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              New Assessment
            </button>

            <button
              className="flex items-center justify-center px-6 py-3 rounded-xl
                bg-blue-500 hover:bg-blue-600 text-white transition-all"
            >
              <FileText className="w-5 h-5 mr-2" />
              Download Report
            </button>

            <button
              className="flex items-center justify-center px-6 py-3 rounded-xl
                bg-green-500 hover:bg-green-600 text-white transition-all"
            >
              <Stethoscope className="w-5 h-5 mr-2" />
              Find Specialist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticsResultView;
