import { CurriculumLevel } from './curriculum-data';

export const COMPLETE_CHEMISTRY_CURRICULUM: CurriculumLevel[] = [
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
        timeAllocation: 35,
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
              },
              {
                id: "1.1.3",
                code: "1.1.3",
                statement: "Explain the effects of temperature and pressure on gas behaviour",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "predict"],
                estimatedTeachingMinutes: 35,
                assessmentWeight: 0.06,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["gas laws", "temperature", "pressure", "volume"]
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
                estimatedTeachingMinutes: 40,
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
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.07,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["isotope", "relative atomic mass", "abundance"]
              },
              {
                id: "1.2.3",
                code: "1.2.3",
                statement: "Describe electron configuration and electronic structure",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "write"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["electron configuration", "shells", "subshells", "orbitals"]
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
                statement: "Balance chemical equations and state symbols",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["balance", "complete"],
                estimatedTeachingMinutes: 40,
                assessmentWeight: 0.07,
                prerequisiteObjectives: ["1.3.1"],
                keywords: ["balancing equations", "state symbols", "reactants", "products"]
              },
              {
                id: "1.3.3",
                code: "1.3.3",
                statement: "Calculate relative formula mass and percentage composition",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 35,
                assessmentWeight: 0.06,
                prerequisiteObjectives: ["1.3.1"],
                keywords: ["relative formula mass", "percentage composition", "molar mass"]
              }
            ],
            mathematicalSkills: ["Percentage calculations", "Ratio calculations", "Formula mass calculations"]
          },
          {
            id: "subtopic-1-4",
            name: "Chemical Bonding",
            description: "Types of chemical bonding and molecular structure",
            objectives: [
              {
                id: "1.4.1",
                code: "1.4.1",
                statement: "Describe ionic bonding and properties of ionic compounds",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["ionic bonding", "electrostatic attraction", "lattice structure", "ionic properties"]
              },
              {
                id: "1.4.2",
                code: "1.4.2",
                statement: "Describe covalent bonding and properties of covalent compounds",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["covalent bonding", "electron sharing", "molecular structure", "covalent properties"]
              },
              {
                id: "1.4.3",
                code: "1.4.3",
                statement: "Describe metallic bonding and properties of metals",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 35,
                assessmentWeight: 0.06,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["metallic bonding", "sea of electrons", "metallic properties", "conductivity"]
              }
            ]
          }
        ]
      },
      {
        id: "topic-2",
        name: "Inorganic Chemistry",
        description: "Properties and reactions of inorganic compounds",
        specificationCode: "2",
        timeAllocation: 40,
        assessmentNotes: "Major topic assessed in Paper 1 and Paper 2",
        subtopics: [
          {
            id: "subtopic-2-1",
            name: "Group 1 Elements",
            description: "Alkali metals and their compounds",
            objectives: [
              {
                id: "2.1.1",
                code: "2.1.1",
                statement: "Describe the properties and reactions of Group 1 elements",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["1.2.1", "1.4.1"],
                keywords: ["alkali metals", "reactivity", "oxidation", "water reactions"]
              },
              {
                id: "2.1.2",
                code: "2.1.2",
                statement: "Explain trends in reactivity down Group 1",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["explain", "compare"],
                estimatedTeachingMinutes: 35,
                assessmentWeight: 0.06,
                prerequisiteObjectives: ["2.1.1"],
                keywords: ["reactivity trends", "ionization energy", "atomic size"]
              }
            ],
            practicalWork: ["Reactions of lithium, sodium, potassium with water", "Flame tests for Group 1 cations"]
          },
          {
            id: "subtopic-2-2",
            name: "Group 7 Elements",
            description: "Halogens and their compounds",
            objectives: [
              {
                id: "2.2.1",
                code: "2.2.1",
                statement: "Describe the properties and reactions of Group 7 elements",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["1.2.1", "1.4.2"],
                keywords: ["halogens", "diatomic molecules", "reactivity", "displacement reactions"]
              },
              {
                id: "2.2.2",
                code: "2.2.2",
                statement: "Explain trends in reactivity up Group 7",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["explain", "compare"],
                estimatedTeachingMinutes: 35,
                assessmentWeight: 0.06,
                prerequisiteObjectives: ["2.2.1"],
                keywords: ["reactivity trends", "electron affinity", "atomic size"]
              }
            ],
            practicalWork: ["Displacement reactions of halogens", "Tests for halide ions"]
          },
          {
            id: "subtopic-2-3",
            name: "Transition Elements",
            description: "Properties and uses of transition metals",
            objectives: [
              {
                id: "2.3.1",
                code: "2.3.1",
                statement: "Describe the properties of transition elements",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 40,
                assessmentWeight: 0.07,
                prerequisiteObjectives: ["1.2.3", "1.4.3"],
                keywords: ["transition metals", "variable oxidation states", "colored compounds", "catalysis"]
              }
            ],
            practicalWork: ["Preparation of transition metal compounds", "Catalytic reactions"]
          }
        ]
      },
      {
        id: "topic-3",
        name: "Physical Chemistry",
        description: "Energy changes, rates of reaction, and equilibrium",
        specificationCode: "3",
        timeAllocation: 30,
        assessmentNotes: "Quantitative calculations emphasized",
        subtopics: [
          {
            id: "subtopic-3-1",
            name: "Energetics",
            description: "Energy changes in chemical reactions",
            objectives: [
              {
                id: "3.1.1",
                code: "3.1.1",
                statement: "Describe exothermic and endothermic reactions",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "identify"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 0.05,
                prerequisiteObjectives: [],
                keywords: ["exothermic", "endothermic", "energy changes", "enthalpy"]
              },
              {
                id: "3.1.2",
                code: "3.1.2",
                statement: "Calculate energy changes from bond enthalpies",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["3.1.1"],
                keywords: ["bond enthalpies", "energy calculations", "bond breaking", "bond forming"]
              }
            ],
            practicalWork: ["Calorimetry experiments", "Measuring temperature changes"],
            mathematicalSkills: ["Energy calculations", "Enthalpy change calculations"]
          },
          {
            id: "subtopic-3-2",
            name: "Rates of Reaction",
            description: "Factors affecting reaction rates",
            objectives: [
              {
                id: "3.2.1",
                code: "3.2.1",
                statement: "Describe factors affecting rates of reaction",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 40,
                assessmentWeight: 0.07,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["reaction rate", "concentration", "temperature", "surface area", "catalyst"]
              },
              {
                id: "3.2.2",
                code: "3.2.2",
                statement: "Explain collision theory and activation energy",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 35,
                assessmentWeight: 0.06,
                prerequisiteObjectives: ["3.2.1"],
                keywords: ["collision theory", "activation energy", "successful collisions"]
              }
            ],
            practicalWork: ["Rate experiments with different conditions", "Catalyst investigations"]
          },
          {
            id: "subtopic-3-3",
            name: "Reversible Reactions and Equilibrium",
            description: "Dynamic equilibrium and Le Chatelier's principle",
            objectives: [
              {
                id: "3.3.1",
                code: "3.3.1",
                statement: "Describe reversible reactions and dynamic equilibrium",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 35,
                assessmentWeight: 0.06,
                prerequisiteObjectives: ["3.2.1"],
                keywords: ["reversible reactions", "dynamic equilibrium", "equilibrium position"]
              },
              {
                id: "3.3.2",
                code: "3.3.2",
                statement: "Apply Le Chatelier's principle to predict equilibrium changes",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["predict", "explain"],
                estimatedTeachingMinutes: 40,
                assessmentWeight: 0.07,
                prerequisiteObjectives: ["3.3.1"],
                keywords: ["Le Chatelier's principle", "equilibrium shifts", "conditions"]
              }
            ]
          }
        ]
      },
      {
        id: "topic-4",
        name: "Organic Chemistry",
        description: "Hydrocarbons and their reactions",
        specificationCode: "4",
        timeAllocation: 25,
        assessmentNotes: "Structural formulas and reaction mechanisms",
        subtopics: [
          {
            id: "subtopic-4-1",
            name: "Alkanes",
            description: "Saturated hydrocarbons",
            objectives: [
              {
                id: "4.1.1",
                code: "4.1.1",
                statement: "Describe the structure and properties of alkanes",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "identify"],
                estimatedTeachingMinutes: 35,
                assessmentWeight: 0.06,
                prerequisiteObjectives: ["1.4.2"],
                keywords: ["alkanes", "saturated hydrocarbons", "homologous series"]
              },
              {
                id: "4.1.2",
                code: "4.1.2",
                statement: "Describe combustion reactions of alkanes",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "write"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 0.05,
                prerequisiteObjectives: ["4.1.1"],
                keywords: ["combustion", "complete combustion", "incomplete combustion"]
              }
            ]
          },
          {
            id: "subtopic-4-2",
            name: "Alkenes",
            description: "Unsaturated hydrocarbons",
            objectives: [
              {
                id: "4.2.1",
                code: "4.2.1",
                statement: "Describe the structure and properties of alkenes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "identify"],
                estimatedTeachingMinutes: 35,
                assessmentWeight: 0.06,
                prerequisiteObjectives: ["1.4.2"],
                keywords: ["alkenes", "unsaturated hydrocarbons", "double bond"]
              },
              {
                id: "4.2.2",
                code: "4.2.2",
                statement: "Describe addition reactions of alkenes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "write"],
                estimatedTeachingMinutes: 40,
                assessmentWeight: 0.07,
                prerequisiteObjectives: ["4.2.1"],
                keywords: ["addition reactions", "bromine water", "polymerization"]
              }
            ],
            practicalWork: ["Testing for unsaturation with bromine water", "Polymerization reactions"]
          },
          {
            id: "subtopic-4-3",
            name: "Alcohols",
            description: "Organic compounds containing hydroxyl groups",
            objectives: [
              {
                id: "4.3.1",
                code: "4.3.1",
                statement: "Describe the structure and properties of alcohols",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "identify"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 0.05,
                prerequisiteObjectives: ["1.4.2"],
                keywords: ["alcohols", "hydroxyl group", "functional group"]
              },
              {
                id: "4.3.2",
                code: "4.3.2",
                statement: "Describe reactions of alcohols including oxidation",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "write"],
                estimatedTeachingMinutes: 35,
                assessmentWeight: 0.06,
                prerequisiteObjectives: ["4.3.1"],
                keywords: ["alcohol reactions", "oxidation", "fermentation"]
              }
            ],
            practicalWork: ["Oxidation of alcohols", "Fermentation experiments"]
          }
        ]
      },
      {
        id: "topic-5",
        name: "Chemistry in Society",
        description: "Applications of chemistry in everyday life",
        specificationCode: "5",
        timeAllocation: 20,
        assessmentNotes: "Practical applications and environmental chemistry",
        subtopics: [
          {
            id: "subtopic-5-1",
            name: "Extraction and Uses of Metals",
            description: "Methods of metal extraction and applications",
            objectives: [
              {
                id: "5.1.1",
                code: "5.1.1",
                statement: "Describe methods of metal extraction",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 40,
                assessmentWeight: 0.07,
                prerequisiteObjectives: ["2.1.1"],
                keywords: ["metal extraction", "reduction", "electrolysis", "reactivity series"]
              },
              {
                id: "5.1.2",
                code: "5.1.2",
                statement: "Explain recycling of metals and environmental impacts",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "evaluate"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 0.05,
                prerequisiteObjectives: ["5.1.1"],
                keywords: ["recycling", "environmental impact", "sustainability"]
              }
            ]
          },
          {
            id: "subtopic-5-2",
            name: "Crude Oil and Fuels",
            description: "Petroleum products and alternative fuels",
            objectives: [
              {
                id: "5.2.1",
                code: "5.2.1",
                statement: "Describe fractional distillation of crude oil",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 35,
                assessmentWeight: 0.06,
                prerequisiteObjectives: ["4.1.1"],
                keywords: ["crude oil", "fractional distillation", "petroleum fractions"]
              },
              {
                id: "5.2.2",
                code: "5.2.2",
                statement: "Evaluate use of fossil fuels and alternatives",
                bloomsLevel: "evaluate",
                difficulty: "intermediate",
                commandWords: ["evaluate", "compare"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 0.05,
                prerequisiteObjectives: ["5.2.1"],
                keywords: ["fossil fuels", "alternative fuels", "environmental impact"]
              }
            ]
          }
        ]
      }
    ],
    overallAssessmentStructure: {
      papers: [
        {
          paperNumber: 1,
          name: "Principles of Chemistry and Chemistry in Society",
          duration: 120,
          marks: 90,
          questionTypes: ["multiple choice", "short answer", "structured"],
          topicCoverage: ["topic-1", "topic-5"]
        },
        {
          paperNumber: 2,
          name: "Chemistry of the Elements and Physical Chemistry",
          duration: 90,
          marks: 60,
          questionTypes: ["structured", "extended response"],
          topicCoverage: ["topic-2", "topic-3", "topic-4"]
        }
      ]
    }
  },
  {
    id: "alevel-chemistry-edexcel",
    name: "A Level Chemistry Edexcel",
    grades: ["12", "13"],
    specificationYear: "2023",
    examBoard: "Edexcel",
    topics: [
      {
        id: "as-topic-1",
        name: "Atomic Structure and the Periodic Table",
        description: "Advanced atomic theory and periodic trends",
        specificationCode: "1",
        timeAllocation: 45,
        assessmentNotes: "Foundation for all A Level chemistry",
        subtopics: [
          {
            id: "as-subtopic-1-1",
            name: "Atomic Structure",
            description: "Detailed atomic structure and electron configuration",
            objectives: [
              {
                id: "1.1.1",
                code: "1.1.1",
                statement: "Describe the structure of atoms in terms of electrons, protons and neutrons",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: [],
                keywords: ["atomic structure", "subatomic particles", "mass spectrometry"]
              },
              {
                id: "1.1.2",
                code: "1.1.2",
                statement: "Explain electron configuration and orbital theory",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "write"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 0.10,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["electron configuration", "orbitals", "quantum numbers", "Hund's rule"]
              },
              {
                id: "1.1.3",
                code: "1.1.3",
                statement: "Explain ionisation energy trends and factors affecting ionisation energy",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["explain", "predict"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["1.1.2"],
                keywords: ["ionisation energy", "successive ionisation", "trends", "nuclear charge"]
              }
            ],
            practicalWork: ["Mass spectrometry analysis", "Electron configuration investigations"],
            mathematicalSkills: ["Ionisation energy calculations", "Mass spectrometry data analysis"]
          },
          {
            id: "as-subtopic-1-2",
            name: "Periodic Table",
            description: "Periodic trends and patterns",
            objectives: [
              {
                id: "1.2.1",
                code: "1.2.1",
                statement: "Explain periodic trends in atomic radius, ionisation energy and electronegativity",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["explain", "compare"],
                estimatedTeachingMinutes: 55,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["1.1.3"],
                keywords: ["periodic trends", "atomic radius", "electronegativity", "effective nuclear charge"]
              },
              {
                id: "1.2.2",
                code: "1.2.2",
                statement: "Predict and explain properties of Period 3 elements and compounds",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["predict", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 0.10,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["Period 3", "oxides", "chlorides", "acid-base properties"]
              }
            ],
            practicalWork: ["Period 3 element reactions", "Oxide and chloride investigations"]
          }
        ]
      },
      {
        id: "as-topic-2",
        name: "Bonding and Structure",
        description: "Advanced bonding theories and molecular structure",
        specificationCode: "2",
        timeAllocation: 40,
        assessmentNotes: "Emphasizes three-dimensional structures and intermolecular forces",
        subtopics: [
          {
            id: "as-subtopic-2-1",
            name: "Ionic Bonding and Structure",
            description: "Ionic bonding, lattice structures and properties",
            objectives: [
              {
                id: "2.1.1",
                code: "2.1.1",
                statement: "Explain ionic bonding in terms of electrostatic attractions",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["1.1.2"],
                keywords: ["ionic bonding", "lattice enthalpy", "Born-Haber cycle", "electrostatic attraction"]
              },
              {
                id: "2.1.2",
                code: "2.1.2",
                statement: "Describe lattice structures and predict properties of ionic compounds",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["describe", "predict"],
                estimatedTeachingMinutes: 40,
                assessmentWeight: 0.07,
                prerequisiteObjectives: ["2.1.1"],
                keywords: ["lattice structures", "ionic properties", "solubility", "conductivity"]
              }
            ],
            practicalWork: ["Ionic compound synthesis", "Lattice structure models"],
            mathematicalSkills: ["Lattice enthalpy calculations", "Born-Haber cycle calculations"]
          },
          {
            id: "as-subtopic-2-2",
            name: "Covalent Bonding and Structure",
            description: "Covalent bonding, molecular shapes and properties",
            objectives: [
              {
                id: "2.2.1",
                code: "2.2.1",
                statement: "Explain covalent bonding in terms of orbital overlap",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["1.1.2"],
                keywords: ["covalent bonding", "orbital overlap", "sigma bonds", "pi bonds"]
              },
              {
                id: "2.2.2",
                code: "2.2.2",
                statement: "Predict molecular shapes using VSEPR theory",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["predict", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["2.2.1"],
                keywords: ["VSEPR theory", "molecular shapes", "bond angles", "electron pair repulsion"]
              },
              {
                id: "2.2.3",
                code: "2.2.3",
                statement: "Explain polarisation of covalent bonds and its effects",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["explain", "predict"],
                estimatedTeachingMinutes: 40,
                assessmentWeight: 0.07,
                prerequisiteObjectives: ["2.2.1"],
                keywords: ["bond polarity", "electronegativity", "dipole moments", "polar molecules"]
              }
            ],
            practicalWork: ["Molecular model building", "Polarity investigations"]
          },
          {
            id: "as-subtopic-2-3",
            name: "Intermolecular Forces",
            description: "Van der Waals forces and hydrogen bonding",
            objectives: [
              {
                id: "2.3.1",
                code: "2.3.1",
                statement: "Explain types of intermolecular forces and their relative strengths",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "compare"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["2.2.3"],
                keywords: ["van der Waals forces", "hydrogen bonding", "dipole-dipole forces", "induced dipole forces"]
              },
              {
                id: "2.3.2",
                code: "2.3.2",
                statement: "Predict effects of intermolecular forces on physical properties",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["predict", "explain"],
                estimatedTeachingMinutes: 40,
                assessmentWeight: 0.07,
                prerequisiteObjectives: ["2.3.1"],
                keywords: ["boiling point", "melting point", "solubility", "viscosity"]
              }
            ],
            practicalWork: ["Intermolecular force investigations", "Boiling point comparisons"]
          }
        ]
      },
      {
        id: "as-topic-3",
        name: "Redox I",
        description: "Oxidation and reduction reactions",
        specificationCode: "3",
        timeAllocation: 35,
        assessmentNotes: "Foundation for electrochemistry and transition metal chemistry",
        subtopics: [
          {
            id: "as-subtopic-3-1",
            name: "Oxidation and Reduction",
            description: "Redox reactions and electron transfer",
            objectives: [
              {
                id: "3.1.1",
                code: "3.1.1",
                statement: "Explain oxidation and reduction in terms of electron transfer",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["explain", "identify"],
                estimatedTeachingMinutes: 40,
                assessmentWeight: 0.07,
                prerequisiteObjectives: [],
                keywords: ["oxidation", "reduction", "electron transfer", "redox reactions"]
              },
              {
                id: "3.1.2",
                code: "3.1.2",
                statement: "Assign oxidation numbers and identify redox changes",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["assign", "identify"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["3.1.1"],
                keywords: ["oxidation numbers", "oxidation states", "redox identification"]
              },
              {
                id: "3.1.3",
                code: "3.1.3",
                statement: "Write and balance redox equations using half-equations",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["write", "balance"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["3.1.2"],
                keywords: ["half-equations", "redox equations", "electron balance"]
              }
            ],
            practicalWork: ["Redox titrations", "Displacement reactions"],
            mathematicalSkills: ["Balancing redox equations", "Electron counting"]
          }
        ]
      },
      {
        id: "as-topic-4",
        name: "Inorganic Chemistry and the Periodic Table",
        description: "Group chemistry and periodic trends",
        specificationCode: "4",
        timeAllocation: 45,
        assessmentNotes: "Detailed group chemistry with mechanisms",
        subtopics: [
          {
            id: "as-subtopic-4-1",
            name: "Group 2",
            description: "Alkaline earth metals and their compounds",
            objectives: [
              {
                id: "4.1.1",
                code: "4.1.1",
                statement: "Explain properties and reactions of Group 2 elements",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["alkaline earth metals", "Group 2 reactions", "oxidation", "thermal decomposition"]
              },
              {
                id: "4.1.2",
                code: "4.1.2",
                statement: "Explain trends in Group 2 compounds and their thermal stability",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["explain", "predict"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["4.1.1"],
                keywords: ["thermal stability", "carbonates", "hydroxides", "polarisation"]
              }
            ],
            practicalWork: ["Group 2 reactions", "Thermal decomposition experiments"],
            mathematicalSkills: ["Enthalpy calculations", "Thermal stability predictions"]
          },
          {
            id: "as-subtopic-4-2",
            name: "Group 17 (Halogens)",
            description: "Advanced halogen chemistry",
            objectives: [
              {
                id: "4.2.1",
                code: "4.2.1",
                statement: "Explain properties and reactions of Group 17 elements",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["halogens", "Group 17 reactions", "disproportionation", "oxidation states"]
              },
              {
                id: "4.2.2",
                code: "4.2.2",
                statement: "Explain reactions of halide ions and their identification",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["explain", "identify"],
                estimatedTeachingMinutes: 40,
                assessmentWeight: 0.07,
                prerequisiteObjectives: ["4.2.1"],
                keywords: ["halide ions", "precipitation reactions", "identification tests"]
              }
            ],
            practicalWork: ["Halogen displacement reactions", "Halide identification tests"]
          }
        ]
      },
      {
        id: "as-topic-5",
        name: "Formulae, Equations and Amounts of Substance",
        description: "Chemical calculations and stoichiometry",
        specificationCode: "5",
        timeAllocation: 40,
        assessmentNotes: "Mathematical foundation for all chemistry",
        subtopics: [
          {
            id: "as-subtopic-5-1",
            name: "Atomic Mass and the Mole",
            description: "The mole concept and Avogadro's number",
            objectives: [
              {
                id: "5.1.1",
                code: "5.1.1",
                statement: "Explain the mole concept and Avogadro's number",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["explain", "define"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: [],
                keywords: ["mole", "Avogadro's number", "molar mass", "molecular mass"]
              },
              {
                id: "5.1.2",
                code: "5.1.2",
                statement: "Calculate amounts of substance in moles and grams",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["5.1.1"],
                keywords: ["mole calculations", "mass calculations", "formula mass"]
              }
            ],
            mathematicalSkills: ["Mole calculations", "Mass-mole conversions", "Percentage calculations"]
          },
          {
            id: "as-subtopic-5-2",
            name: "Chemical Equations and Stoichiometry",
            description: "Balanced equations and quantitative relationships",
            objectives: [
              {
                id: "5.2.1",
                code: "5.2.1",
                statement: "Write balanced chemical equations and perform stoichiometric calculations",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["write", "calculate"],
                estimatedTeachingMinutes: 55,
                assessmentWeight: 0.10,
                prerequisiteObjectives: ["5.1.2"],
                keywords: ["stoichiometry", "balanced equations", "limiting reagent", "theoretical yield"]
              },
              {
                id: "5.2.2",
                code: "5.2.2",
                statement: "Calculate concentrations and perform titration calculations",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["5.2.1"],
                keywords: ["concentration", "molarity", "titration", "volumetric analysis"]
              }
            ],
            practicalWork: ["Titration experiments", "Stoichiometry investigations"],
            mathematicalSkills: ["Stoichiometric calculations", "Concentration calculations", "Titration calculations"]
          },
          {
            id: "as-subtopic-5-3",
            name: "The Ideal Gas Equation",
            description: "Gas laws and molar volume",
            objectives: [
              {
                id: "5.3.1",
                code: "5.3.1",
                statement: "Apply the ideal gas equation and calculate molar volume",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["apply", "calculate"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["5.1.2"],
                keywords: ["ideal gas equation", "molar volume", "STP", "gas laws"]
              }
            ],
            mathematicalSkills: ["Gas law calculations", "Molar volume calculations"]
          }
        ]
      },
      {
        id: "as-topic-6",
        name: "Organic Chemistry I",
        description: "Introduction to organic chemistry",
        specificationCode: "6",
        timeAllocation: 50,
        assessmentNotes: "Foundation for A2 organic chemistry",
        subtopics: [
          {
            id: "as-subtopic-6-1",
            name: "Introduction to Organic Chemistry",
            description: "Nomenclature, isomerism, and reaction mechanisms",
            objectives: [
              {
                id: "6.1.1",
                code: "6.1.1",
                statement: "Apply IUPAC nomenclature to organic compounds",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["name", "apply"],
                estimatedTeachingMinutes: 55,
                assessmentWeight: 0.10,
                prerequisiteObjectives: ["2.2.1"],
                keywords: ["IUPAC nomenclature", "organic naming", "functional groups", "systematic naming"]
              },
              {
                id: "6.1.2",
                code: "6.1.2",
                statement: "Identify and explain types of isomerism",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["identify", "explain"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["6.1.1"],
                keywords: ["structural isomerism", "stereoisomerism", "optical isomerism", "E-Z isomerism"]
              },
              {
                id: "6.1.3",
                code: "6.1.3",
                statement: "Explain reaction mechanisms using curly arrows",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["explain", "show"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 0.11,
                prerequisiteObjectives: ["6.1.1"],
                keywords: ["reaction mechanisms", "curly arrows", "electron movement", "nucleophiles", "electrophiles"]
              }
            ],
            practicalWork: ["Organic synthesis", "Isomer identification"],
            mathematicalSkills: ["Molecular formula calculations", "Percentage composition"]
          },
          {
            id: "as-subtopic-6-2",
            name: "Alkanes",
            description: "Saturated hydrocarbons and their reactions",
            objectives: [
              {
                id: "6.2.1",
                code: "6.2.1",
                statement: "Explain the properties and reactions of alkanes",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["6.1.1"],
                keywords: ["alkanes", "saturated hydrocarbons", "combustion", "substitution reactions"]
              },
              {
                id: "6.2.2",
                code: "6.2.2",
                statement: "Explain free radical substitution mechanism",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["6.2.1", "6.1.3"],
                keywords: ["free radical substitution", "initiation", "propagation", "termination"]
              }
            ],
            practicalWork: ["Alkane reactions", "Free radical investigations"]
          },
          {
            id: "as-subtopic-6-3",
            name: "Alkenes",
            description: "Unsaturated hydrocarbons and addition reactions",
            objectives: [
              {
                id: "6.3.1",
                code: "6.3.1",
                statement: "Explain the properties and reactions of alkenes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["6.1.1"],
                keywords: ["alkenes", "unsaturated hydrocarbons", "addition reactions", "pi bonds"]
              },
              {
                id: "6.3.2",
                code: "6.3.2",
                statement: "Explain addition reaction mechanisms including stereochemistry",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["explain", "predict"],
                estimatedTeachingMinutes: 55,
                assessmentWeight: 0.10,
                prerequisiteObjectives: ["6.3.1", "6.1.3"],
                keywords: ["addition mechanisms", "stereochemistry", "Markovnikov's rule", "carbocation stability"]
              }
            ],
            practicalWork: ["Alkene addition reactions", "Stereochemistry investigations"]
          },
          {
            id: "as-subtopic-6-4",
            name: "Halogenoalkanes",
            description: "Alkyl halides and their reactions",
            objectives: [
              {
                id: "6.4.1",
                code: "6.4.1",
                statement: "Explain the properties and reactions of halogenoalkanes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["6.1.1"],
                keywords: ["halogenoalkanes", "alkyl halides", "nucleophilic substitution", "elimination"]
              },
              {
                id: "6.4.2",
                code: "6.4.2",
                statement: "Explain nucleophilic substitution and elimination mechanisms",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["explain", "predict"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 0.11,
                prerequisiteObjectives: ["6.4.1", "6.1.3"],
                keywords: ["SN1 mechanism", "SN2 mechanism", "E1 mechanism", "E2 mechanism"]
              }
            ],
            practicalWork: ["Halogenoalkane reactions", "Mechanism investigations"]
          }
        ]
      },
      {
        id: "as-topic-7",
        name: "Modern Analytical Techniques I",
        description: "Spectroscopic methods for structure determination",
        specificationCode: "7",
        timeAllocation: 30,
        assessmentNotes: "Integration with organic chemistry",
        subtopics: [
          {
            id: "as-subtopic-7-1",
            name: "Mass Spectrometry",
            description: "Mass spectrometry and molecular ion peaks",
            objectives: [
              {
                id: "7.1.1",
                code: "7.1.1",
                statement: "Interpret mass spectra to determine molecular mass and structure",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["interpret", "identify"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 0.08,
                prerequisiteObjectives: ["6.1.1"],
                keywords: ["mass spectrometry", "molecular ion peak", "fragmentation", "isotope patterns"]
              }
            ],
            practicalWork: ["Mass spectrum analysis", "Molecular identification"],
            mathematicalSkills: ["Mass spectrum interpretation", "Isotope ratio calculations"]
          },
          {
            id: "as-subtopic-7-2",
            name: "Infrared Spectroscopy",
            description: "IR spectroscopy for functional group identification",
            objectives: [
              {
                id: "7.2.1",
                code: "7.2.1",
                statement: "Interpret infrared spectra to identify functional groups",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["interpret", "identify"],
                estimatedTeachingMinutes: 50,
                assessmentWeight: 0.09,
                prerequisiteObjectives: ["6.1.1"],
                keywords: ["infrared spectroscopy", "functional groups", "wavenumber", "absorption bands"]
              }
            ],
            practicalWork: ["IR spectrum analysis", "Functional group identification"]
          }
        ]
      }
    ],
    overallAssessmentStructure: {
      papers: [
        {
          paperNumber: 1,
          name: "Core Inorganic and Physical Chemistry",
          duration: 105,
          marks: 90,
          questionTypes: ["structured", "extended response"],
          topicCoverage: ["as-topic-1", "as-topic-2", "as-topic-3", "as-topic-4", "as-topic-5"]
        },
        {
          paperNumber: 2,
          name: "Core Organic and Analytical Chemistry",
          duration: 105,
          marks: 90,
          questionTypes: ["structured", "extended response"],
          topicCoverage: ["as-topic-6", "as-topic-7"]
        },
        {
          paperNumber: 3,
          name: "General and Practical Principles in Chemistry",
          duration: 90,
          marks: 50,
          questionTypes: ["practical", "data analysis"],
          topicCoverage: ["as-topic-1", "as-topic-2", "as-topic-3", "as-topic-4", "as-topic-5", "as-topic-6", "as-topic-7"]
        }
      ]
    }
  }
];