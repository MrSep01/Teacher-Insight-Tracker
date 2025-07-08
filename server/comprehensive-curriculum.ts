import { CurriculumLevel } from './curriculum-data';

export const COMPREHENSIVE_CURRICULUM_DATA: CurriculumLevel[] = [
  {
    id: "igcse-chemistry-edexcel",
    name: "IGCSE Chemistry Edexcel",
    grades: ["10", "11"],
    specificationYear: "2023",
    examBoard: "Edexcel",
    topics: [
      {
        id: "topic-1",
        name: "Principles of Chemistry",
        description: "Fundamental concepts including atomic structure, bonding, and chemical quantities",
        specificationCode: "1",
        timeAllocation: 25,
        assessmentNotes: "Foundation concepts assessed across all papers",
        subtopics: [
          {
            id: "subtopic-1-1",
            name: "States of Matter",
            description: "Particle theory and changes of state",
            objectives: [
              {
                id: "1.1.1",
                code: "1.1.1",
                statement: "Describe the arrangement and movement of particles in solids, liquids and gases",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 0.05,
                prerequisiteObjectives: [],
                keywords: ["particle", "kinetic theory", "states of matter"]
              },
              {
                id: "1.1.2",
                code: "1.1.2",
                statement: "Explain the changes of state in terms of particle theory",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 25,
                assessmentWeight: 0.04,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["melting", "boiling", "evaporation", "condensation", "sublimation"]
              }
            ]
          },
          {
            id: "subtopic-1-2",
            name: "Atomic Structure",
            description: "Structure of atoms, isotopes, and electron configuration",
            objectives: [
              {
                id: "1.2.1",
                code: "1.2.1",
                statement: "Describe the structure of an atom in terms of protons, neutrons and electrons",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "identify"],
                estimatedTeachingMinutes: 35,
                assessmentWeight: 0.06,
                prerequisiteObjectives: [],
                keywords: ["proton", "neutron", "electron", "nucleus", "atomic number", "mass number"]
              },
              {
                id: "1.2.2",
                code: "1.2.2",
                statement: "Explain the concept of isotopes and calculate relative atomic mass",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["explain", "calculate"],
                estimatedTeachingMinutes: 40,
                assessmentWeight: 0.07,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["isotope", "relative atomic mass", "abundance"]
              }
            ],
            practicalWork: ["Flame tests for metal ions", "Atomic model investigations"],
            mathematicalSkills: ["Calculation of relative atomic mass", "Percentage abundance calculations"]
          },
          {
            id: "subtopic-1-3",
            name: "Chemical Formulae and Equations",
            description: "Writing formulae, balancing equations, and chemical calculations",
            objectives: [
              {
                id: "1.3.1",
                code: "1.3.1",
                statement: "Write chemical formulae for ionic and covalent compounds",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["write", "determine"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["chemical formula", "ionic compounds", "covalent compounds", "valency"]
              },
              {
                id: "1.3.2",
                code: "1.3.2",
                statement: "Balance chemical equations and perform mole calculations",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["balance", "calculate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 0.10,
                prerequisiteObjectives: ["1.3.1"],
                keywords: ["balanced equation", "mole", "stoichiometry", "molar mass"]
              }
            ],
            mathematicalSkills: ["Mole calculations", "Percentage composition", "Empirical and molecular formulae"]
          }
        ]
      },
      {
        id: "topic-2",
        name: "Inorganic Chemistry",
        description: "Properties and reactions of elements and compounds",
        specificationCode: "2",
        timeAllocation: 30,
        assessmentNotes: "Heavily weighted in practical assessments",
        subtopics: [
          {
            id: "subtopic-2-1",
            name: "Group 1 Elements (Alkali Metals)",
            description: "Properties, reactions and uses of alkali metals",
            objectives: [
              {
                id: "2.1.1",
                code: "2.1.1",
                statement: "Describe the properties of Group 1 elements and explain trends in reactivity",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["alkali metals", "reactivity", "hydroxides", "carbonates", "trends"]
              },
              {
                id: "2.1.2",
                code: "2.1.2",
                statement: "Predict and explain the reactions of Group 1 elements with water and oxygen",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["predict", "explain"],
                estimatedTeachingMinutes: 40,
                assessmentWeight: 0.07,
                prerequisiteObjectives: ["2.1.1"],
                keywords: ["lithium", "sodium", "potassium", "reactions", "oxides"]
              }
            ],
            practicalWork: ["Reactions of alkali metals with water", "Testing for metal ions"],
            crossCurricular: ["Physics - electron configuration", "Mathematics - patterns in data"]
          },
          {
            id: "subtopic-2-2",
            name: "Group 7 Elements (Halogens)",
            description: "Properties, reactions and uses of halogens",
            objectives: [
              {
                id: "2.2.1",
                code: "2.2.1",
                statement: "Describe the properties of Group 7 elements and explain trends in reactivity",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["describe", "explain", "predict"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["1.2.1", "2.1.1"],
                keywords: ["halogens", "displacement reactions", "reactivity trends", "electronegativity"]
              },
              {
                id: "2.2.2",
                code: "2.2.2",
                statement: "Explain displacement reactions of halogens and their industrial uses",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["explain", "predict"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["2.2.1"],
                keywords: ["chlorine", "bromine", "iodine", "bleaching", "disinfection"]
              }
            ],
            practicalWork: ["Halogen displacement reactions", "Testing for halide ions"],
            mathematicalSkills: ["Interpreting trends in data"]
          },
          {
            id: "subtopic-2-3",
            name: "Transition Elements",
            description: "Properties and uses of transition metals",
            objectives: [
              {
                id: "2.3.1",
                code: "2.3.1",
                statement: "Describe the characteristic properties of transition elements",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "identify"],
                estimatedTeachingMinutes: 35,
                assessmentWeight: 0.06,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["transition metals", "colored compounds", "variable oxidation states", "catalysis"]
              }
            ],
            practicalWork: ["Transition metal compound synthesis", "Catalysis investigations"]
          }
        ]
      },
      {
        id: "topic-3",
        name: "Physical Chemistry",
        description: "Energy changes, rates of reaction, and chemical equilibrium",
        specificationCode: "3",
        timeAllocation: 35,
        assessmentNotes: "Requires mathematical skills and graph interpretation",
        subtopics: [
          {
            id: "subtopic-3-1",
            name: "Energetics",
            description: "Energy changes in chemical reactions",
            objectives: [
              {
                id: "3.1.1",
                code: "3.1.1",
                statement: "Distinguish between exothermic and endothermic reactions",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["distinguish", "identify"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 0.06,
                prerequisiteObjectives: [],
                keywords: ["exothermic", "endothermic", "energy change", "temperature"]
              },
              {
                id: "3.1.2",
                code: "3.1.2",
                statement: "Calculate energy changes using bond energies and draw energy level diagrams",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine", "draw"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 0.10,
                prerequisiteObjectives: ["3.1.1"],
                keywords: ["bond energy", "enthalpy", "calculation", "energy level diagram"]
              }
            ],
            practicalWork: ["Measuring temperature changes in reactions", "Calorimetry experiments"],
            mathematicalSkills: ["Energy calculations", "Graph plotting and interpretation"]
          },
          {
            id: "subtopic-3-2",
            name: "Rates of Reaction",
            description: "Factors affecting reaction rates and collision theory",
            objectives: [
              {
                id: "3.2.1",
                code: "3.2.1",
                statement: "Explain factors affecting rates of reaction using collision theory",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["collision theory", "activation energy", "temperature", "concentration", "catalyst"]
              }
            ],
            practicalWork: ["Rate of reaction experiments", "Catalyst investigations"],
            mathematicalSkills: ["Rate calculations", "Graph analysis"]
          }
        ]
      },
      {
        id: "topic-4",
        name: "Organic Chemistry",
        description: "Carbon compounds and their reactions",
        specificationCode: "4",
        timeAllocation: 28,
        assessmentNotes: "Focus on structure-property relationships",
        subtopics: [
          {
            id: "subtopic-4-1",
            name: "Hydrocarbons",
            description: "Alkanes, alkenes, and their properties",
            objectives: [
              {
                id: "4.1.1",
                code: "4.1.1",
                statement: "Describe the structures and properties of alkanes and alkenes",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "compare"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["alkanes", "alkenes", "saturated", "unsaturated", "homologous series"]
              },
              {
                id: "4.1.2",
                code: "4.1.2",
                statement: "Explain addition reactions of alkenes and substitution reactions of alkanes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "predict"],
                estimatedTeachingMinutes: 55,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["4.1.1"],
                keywords: ["addition reaction", "substitution reaction", "polymerization"]
              }
            ],
            practicalWork: ["Testing for alkenes", "Cracking hydrocarbons"],
            crossCurricular: ["Biology - organic molecules in living systems"]
          },
          {
            id: "subtopic-4-2",
            name: "Alcohols and Carboxylic Acids",
            description: "Functional groups and their reactions",
            objectives: [
              {
                id: "4.2.1",
                code: "4.2.1",
                statement: "Describe the properties and reactions of alcohols and carboxylic acids",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["4.1.1"],
                keywords: ["alcohols", "carboxylic acids", "functional groups", "oxidation"]
              }
            ],
            practicalWork: ["Alcohol oxidation", "Ester synthesis"],
            crossCurricular: ["Biology - fermentation processes"]
          }
        ]
      }
    ],
    overallAssessmentStructure: {
      papers: [
        {
          paperNumber: 1,
          name: "Chemistry",
          duration: 120,
          marks: 110,
          questionTypes: ["multiple choice", "short answer", "extended writing"],
          topicCoverage: ["topic-1", "topic-2", "topic-3", "topic-4"]
        },
        {
          paperNumber: 2,
          name: "Chemistry",
          duration: 120,
          marks: 110,
          questionTypes: ["short answer", "extended writing", "calculations"],
          topicCoverage: ["topic-1", "topic-2", "topic-3", "topic-4"]
        }
      ]
    }
  },
  {
    id: "a-level-chemistry-edexcel",
    name: "A Level Chemistry Edexcel",
    grades: ["12", "13"],
    specificationYear: "2023",
    examBoard: "Edexcel",
    topics: [
      {
        id: "al-topic-1",
        name: "Atomic Structure and the Periodic Table",
        description: "Advanced atomic theory, electronic configuration, and periodic trends",
        specificationCode: "1",
        timeAllocation: 45,
        assessmentNotes: "Foundation for all other topics",
        subtopics: [
          {
            id: "al-subtopic-1-1",
            name: "Advanced Atomic Structure",
            description: "Electronic configuration and atomic orbitals",
            objectives: [
              {
                id: "AL1.1.1",
                code: "AL1.1.1",
                statement: "Explain the arrangement of electrons in atoms using s, p, d, and f sub-shells",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe", "predict"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 0.08,
                prerequisiteObjectives: [],
                keywords: ["electron configuration", "orbitals", "sub-shells", "aufbau principle"]
              },
              {
                id: "AL1.1.2",
                code: "AL1.1.2",
                statement: "Predict and explain ionization energies and their trends",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["predict", "explain", "analyze"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.10,
                prerequisiteObjectives: ["AL1.1.1"],
                keywords: ["ionization energy", "trends", "shielding", "nuclear charge"]
              }
            ],
            practicalWork: ["Flame tests and spectra analysis", "Ionization energy experiments"],
            mathematicalSkills: ["Interpreting ionization energy data", "Calculating successive ionization energies"]
          },
          {
            id: "al-subtopic-1-2",
            name: "Periodic Trends",
            description: "Advanced periodic trends and properties",
            objectives: [
              {
                id: "AL1.2.1",
                code: "AL1.2.1",
                statement: "Explain periodic trends in atomic radius, electronegativity, and metallic character",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["explain", "predict", "compare"],
                estimatedTeachingMinutes: 55,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["AL1.1.1"],
                keywords: ["periodic trends", "atomic radius", "electronegativity", "metallic character"]
              }
            ],
            crossCurricular: ["Physics - quantum mechanics", "Mathematics - graphical analysis"]
          }
        ]
      },
      {
        id: "al-topic-2",
        name: "Bonding and Structure",
        description: "Chemical bonding theories and molecular structures",
        specificationCode: "2",
        timeAllocation: 40,
        assessmentNotes: "Requires 3D visualization skills",
        subtopics: [
          {
            id: "al-subtopic-2-1",
            name: "Advanced Ionic Bonding",
            description: "Ionic compounds, lattice structures, and energetics",
            objectives: [
              {
                id: "AL2.1.1",
                code: "AL2.1.1",
                statement: "Explain the formation of ionic compounds and predict their properties using lattice energy",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "predict", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.07,
                prerequisiteObjectives: ["AL1.1.1"],
                keywords: ["ionic bonding", "lattice energy", "born-haber cycle", "polarization"]
              }
            ],
            practicalWork: ["Ionic compound synthesis", "Lattice energy determination"],
            mathematicalSkills: ["Born-Haber cycle calculations", "Lattice energy calculations"]
          },
          {
            id: "al-subtopic-2-2",
            name: "Advanced Covalent Bonding",
            description: "Molecular orbital theory, hybridization, and molecular shapes",
            objectives: [
              {
                id: "AL2.2.1",
                code: "AL2.2.1",
                statement: "Apply VSEPR theory to predict molecular shapes and explain hybridization",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["predict", "explain", "apply"],
                estimatedTeachingMinutes: 70,
                assessmentWeight: 0.12,
                prerequisiteObjectives: ["AL2.1.1"],
                keywords: ["VSEPR theory", "molecular geometry", "hybridization", "bond angles", "molecular orbital theory"]
              }
            ],
            practicalWork: ["Molecular model building", "Bond angle measurements"],
            mathematicalSkills: ["3D geometry calculations", "Bond angle predictions"]
          },
          {
            id: "al-subtopic-2-3",
            name: "Intermolecular Forces",
            description: "Van der Waals forces, hydrogen bonding, and their effects",
            objectives: [
              {
                id: "AL2.3.1",
                code: "AL2.3.1",
                statement: "Explain different types of intermolecular forces and their effects on physical properties",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "compare", "predict"],
                estimatedTeachingMinutes: 55,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["AL2.2.1"],
                keywords: ["van der Waals forces", "hydrogen bonding", "dipole interactions", "boiling point"]
              }
            ],
            practicalWork: ["Investigating boiling points", "Hydrogen bonding demonstrations"]
          }
        ]
      },
      {
        id: "al-topic-3",
        name: "Kinetics and Equilibrium",
        description: "Reaction rates, mechanisms, and chemical equilibrium",
        specificationCode: "3",
        timeAllocation: 50,
        assessmentNotes: "Heavy emphasis on mathematical analysis",
        subtopics: [
          {
            id: "al-subtopic-3-1",
            name: "Advanced Reaction Kinetics",
            description: "Rate laws, mechanisms, and catalysis",
            objectives: [
              {
                id: "AL3.1.1",
                code: "AL3.1.1",
                statement: "Determine rate laws from experimental data and explain reaction mechanisms",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["determine", "explain", "analyze"],
                estimatedTeachingMinutes: 80,
                assessmentWeight: 0.15,
                prerequisiteObjectives: ["AL2.2.1"],
                keywords: ["rate law", "reaction mechanism", "catalysis", "activation energy", "elementary steps"]
              }
            ],
            practicalWork: ["Clock reactions", "Catalysis investigations", "Rate determination experiments"],
            mathematicalSkills: ["Rate law calculations", "Arrhenius equation", "Graphical analysis"]
          },
          {
            id: "al-subtopic-3-2",
            name: "Chemical Equilibrium",
            description: "Dynamic equilibrium, Le Chatelier's principle, and equilibrium constants",
            objectives: [
              {
                id: "AL3.2.1",
                code: "AL3.2.1",
                statement: "Calculate equilibrium constants and predict the effects of changing conditions",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "predict", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 0.14,
                prerequisiteObjectives: ["AL3.1.1"],
                keywords: ["equilibrium constant", "Le Chatelier's principle", "dynamic equilibrium", "Kc", "Kp"]
              }
            ],
            practicalWork: ["Equilibrium position investigations", "Le Chatelier demonstrations"],
            mathematicalSkills: ["Equilibrium calculations", "Partial pressure calculations"]
          }
        ]
      },
      {
        id: "al-topic-4",
        name: "Advanced Organic Chemistry",
        description: "Complex organic reactions, mechanisms, and synthesis",
        specificationCode: "4",
        timeAllocation: 55,
        assessmentNotes: "Requires understanding of reaction mechanisms",
        subtopics: [
          {
            id: "al-subtopic-4-1",
            name: "Organic Reaction Mechanisms",
            description: "Nucleophilic and electrophilic mechanisms",
            objectives: [
              {
                id: "AL4.1.1",
                code: "AL4.1.1",
                statement: "Explain organic reaction mechanisms using curly arrows and predict reaction products",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["explain", "describe", "predict"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 0.18,
                prerequisiteObjectives: ["AL2.2.1"],
                keywords: ["nucleophile", "electrophile", "carbocation", "reaction mechanism", "curly arrows"]
              }
            ],
            practicalWork: ["Organic synthesis", "Mechanism investigations", "NMR spectroscopy"],
            crossCurricular: ["Physics - spectroscopy", "Mathematics - stereochemistry"]
          },
          {
            id: "al-subtopic-4-2",
            name: "Synthetic Pathways",
            description: "Multi-step organic synthesis and retrosynthesis",
            objectives: [
              {
                id: "AL4.2.1",
                code: "AL4.2.1",
                statement: "Plan multi-step synthetic routes and apply retrosynthetic analysis",
                bloomsLevel: "create",
                difficulty: "advanced",
                commandWords: ["plan", "design", "evaluate"],
                estimatedTeachingMinutes: 70,
                assessmentWeight: 0.13,
                prerequisiteObjectives: ["AL4.1.1"],
                keywords: ["synthetic pathways", "retrosynthesis", "protecting groups", "functional group transformations"]
              }
            ],
            practicalWork: ["Multi-step synthesis", "Purification techniques", "Yield calculations"],
            mathematicalSkills: ["Yield calculations", "Atom economy calculations"]
          }
        ]
      },
      {
        id: "al-topic-5",
        name: "Analytical Chemistry",
        description: "Spectroscopy, chromatography, and analytical techniques",
        specificationCode: "5",
        timeAllocation: 35,
        assessmentNotes: "Requires interpretation of spectra and data analysis",
        subtopics: [
          {
            id: "al-subtopic-5-1",
            name: "Spectroscopy",
            description: "NMR, IR, and Mass Spectrometry",
            objectives: [
              {
                id: "AL5.1.1",
                code: "AL5.1.1",
                statement: "Interpret NMR, IR, and mass spectra to determine molecular structure",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["interpret", "analyze", "deduce"],
                estimatedTeachingMinutes: 85,
                assessmentWeight: 0.16,
                prerequisiteObjectives: ["AL4.1.1"],
                keywords: ["NMR spectroscopy", "IR spectroscopy", "mass spectrometry", "chemical shift", "fragmentation"]
              }
            ],
            practicalWork: ["Spectral analysis", "Structure determination", "Sample preparation"],
            mathematicalSkills: ["Spectral interpretation", "Statistical analysis of data"]
          }
        ]
      }
    ],
    overallAssessmentStructure: {
      papers: [
        {
          paperNumber: 1,
          name: "Advanced Inorganic and Physical Chemistry",
          duration: 135,
          marks: 90,
          questionTypes: ["short answer", "extended writing", "calculations"],
          topicCoverage: ["al-topic-1", "al-topic-2", "al-topic-3"]
        },
        {
          paperNumber: 2,
          name: "Advanced Organic and Physical Chemistry",
          duration: 135,
          marks: 90,
          questionTypes: ["short answer", "extended writing", "calculations"],
          topicCoverage: ["al-topic-3", "al-topic-4"]
        },
        {
          paperNumber: 3,
          name: "General and Practical Applications",
          duration: 120,
          marks: 80,
          questionTypes: ["practical analysis", "extended writing", "synoptic questions"],
          topicCoverage: ["al-topic-1", "al-topic-2", "al-topic-3", "al-topic-4", "al-topic-5"]
        }
      ]
    }
  }
];