import { CurriculumLevel } from "./curriculum-data";

export const UPDATED_COMPLETE_CHEMISTRY_CURRICULUM: CurriculumLevel[] = [
  {
    id: "igcse-chemistry-edexcel",
    name: "IGCSE Chemistry Edexcel",
    grades: ["10", "11"],
    specificationYear: "2024",
    examBoard: "Edexcel",
    overallAssessmentStructure: {
      papers: [
        {
          paperNumber: 1,
          name: "Paper 1C",
          duration: 120,
          marks: 90,
          questionTypes: ["multiple choice", "short answer", "structured"],
          topicCoverage: ["topic-1", "topic-2", "topic-3", "topic-4"]
        },
        {
          paperNumber: 2,
          name: "Paper 2C",
          duration: 120,
          marks: 90,
          questionTypes: ["short answer", "structured", "extended writing"],
          topicCoverage: ["topic-1", "topic-2", "topic-3", "topic-4"]
        }
      ]
    },
    topics: [
      {
        id: "topic-1",
        name: "Principles of Chemistry",
        description: "Fundamental concepts including atomic structure, bonding, and basic chemical principles",
        specificationCode: "1",
        timeAllocation: 35,
        assessmentNotes: "Foundation topic assessed across both papers",
        subtopics: [
          {
            id: "1a",
            name: "States of Matter",
            description: "Kinetic theory, changes of state, and particle behavior",
            objectives: [
              {
                id: "1.1",
                code: "1.1",
                statement: "Describe the three states of matter in terms of particle arrangement and movement",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["kinetic theory", "particle model", "states of matter"]
              },
              {
                id: "1.2",
                code: "1.2",
                statement: "Explain changes of state in terms of particle movement and energy",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.1"],
                keywords: ["melting", "boiling", "sublimation", "energy"]
              },
              {
                id: "1.3",
                code: "1.3",
                statement: "Interpret heating and cooling curves",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["interpret", "analyze"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.1", "1.2"],
                keywords: ["heating curves", "cooling curves", "temperature"]
              }
            ],
            practicalWork: ["Investigating melting and boiling points", "Observing changes of state"],
            mathematicalSkills: ["Graph interpretation", "Temperature calculations"]
          },
          {
            id: "1b",
            name: "Atomic Structure",
            description: "Structure of atoms, subatomic particles, and electronic configuration",
            objectives: [
              {
                id: "1.14",
                code: "1.14",
                statement: "Describe the structure of an atom as a nucleus containing protons and neutrons, surrounded by electrons in shells",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "state"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["nucleus", "protons", "neutrons", "electrons", "shells"]
              },
              {
                id: "1.15",
                code: "1.15",
                statement: "State the relative masses and charges of protons, neutrons and electrons",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["state", "recall"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.14"],
                keywords: ["relative mass", "charge", "subatomic particles"]
              },
              {
                id: "1.16",
                code: "1.16",
                statement: "Define atomic number and mass number",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["define", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.14"],
                keywords: ["atomic number", "mass number", "proton number"]
              },
              {
                id: "1.17",
                code: "1.17",
                statement: "Determine the number of protons, neutrons and electrons in atoms and ions",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.14", "1.15", "1.16"],
                keywords: ["calculation", "atoms", "ions", "subatomic particles"]
              }
            ],
            practicalWork: ["Flame tests for metal ions", "Building atomic models"],
            mathematicalSkills: ["Atomic number calculations", "Mass number calculations"]
          },
          {
            id: "1c",
            name: "Isotopes",
            description: "Understanding isotopes and their properties",
            objectives: [
              {
                id: "1.18",
                code: "1.18",
                statement: "Define isotopes as atoms of the same element with different mass numbers",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["define", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.16"],
                keywords: ["isotopes", "mass number", "same element"]
              },
              {
                id: "1.19",
                code: "1.19",
                statement: "Calculate relative atomic mass from isotope abundances",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.18"],
                keywords: ["relative atomic mass", "isotope abundance", "weighted average"]
              }
            ],
            practicalWork: ["Mass spectrometry analysis"],
            mathematicalSkills: ["Weighted average calculations", "Percentage calculations"]
          },
          {
            id: "1d",
            name: "Electronic Structure",
            description: "Electron arrangement in atoms and electronic configuration",
            objectives: [
              {
                id: "1.20",
                code: "1.20",
                statement: "Describe the arrangement of electrons in shells",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.14"],
                keywords: ["electron shells", "electron arrangement", "energy levels"]
              },
              {
                id: "1.21",
                code: "1.21",
                statement: "Work out the electronic configuration of the first 20 elements",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["work out", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.20"],
                keywords: ["electronic configuration", "electron shells", "first 20 elements"]
              }
            ],
            practicalWork: ["Electron shell diagrams", "Periodic table patterns"],
            mathematicalSkills: ["Shell filling rules", "Electron counting"]
          },
          {
            id: "1e",
            name: "Chemical Formulae and Equations",
            description: "Writing formulae, balancing equations, and stoichiometry",
            objectives: [
              {
                id: "1.22",
                code: "1.22",
                statement: "Write word and symbol equations for chemical reactions",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["write", "construct"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.14"],
                keywords: ["chemical equations", "word equations", "symbol equations"]
              },
              {
                id: "1.23",
                code: "1.23",
                statement: "Balance chemical equations",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["balance", "complete"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.22"],
                keywords: ["balanced equations", "conservation of mass", "coefficients"]
              }
            ],
            practicalWork: ["Precipitation reactions", "Acid-base neutralization"],
            mathematicalSkills: ["Balancing equations", "Stoichiometric calculations"]
          },
          {
            id: "1f",
            name: "Ionic Bonding",
            description: "Formation of ionic compounds and their properties",
            objectives: [
              {
                id: "1.37",
                code: "1.37",
                statement: "Explain how ionic bonds are formed by electron transfer",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.21"],
                keywords: ["ionic bonding", "electron transfer", "cations", "anions"]
              },
              {
                id: "1.38",
                code: "1.38",
                statement: "Draw dot and cross diagrams for ionic compounds",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["draw", "construct"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.37"],
                keywords: ["dot and cross diagrams", "ionic compounds", "electron transfer"]
              }
            ],
            practicalWork: ["Ionic compound formation", "Conductivity testing"],
            mathematicalSkills: ["Charge calculations", "Formula predictions"]
          }
        ]
      },
      {
        id: "topic-2",
        name: "Inorganic Chemistry",
        description: "Study of inorganic compounds, the periodic table, and chemical reactions",
        specificationCode: "2",
        timeAllocation: 40,
        assessmentNotes: "Major topic with significant practical component",
        subtopics: [
          {
            id: "2a",
            name: "The Periodic Table",
            description: "Structure of the periodic table and periodic trends",
            objectives: [
              {
                id: "2.1",
                code: "2.1",
                statement: "Describe the arrangement of elements in the periodic table",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.16"],
                keywords: ["periodic table", "periods", "groups", "atomic number"]
              },
              {
                id: "2.2",
                code: "2.2",
                statement: "Explain the relationship between electronic configuration and position in the periodic table",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "relate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.21", "2.1"],
                keywords: ["electronic configuration", "periodic table", "electron shells"]
              }
            ],
            practicalWork: ["Periodic trends investigation", "Element classification"],
            mathematicalSkills: ["Trend analysis", "Graph interpretation"]
          },
          {
            id: "2b",
            name: "Group 1 Elements",
            description: "Alkali metals - properties, reactions, and trends",
            objectives: [
              {
                id: "2.10",
                code: "2.10",
                statement: "Describe the properties of Group 1 elements",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "state"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["2.1"],
                keywords: ["alkali metals", "Group 1", "properties", "trends"]
              },
              {
                id: "2.11",
                code: "2.11",
                statement: "Explain the reactions of Group 1 elements with water and oxygen",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.10"],
                keywords: ["reactions", "water", "oxygen", "alkali metals"]
              }
            ],
            practicalWork: ["Alkali metal reactions", "Flame tests"],
            mathematicalSkills: ["Reaction calculations", "Trend analysis"]
          },
          {
            id: "2c",
            name: "Group 7 Elements",
            description: "Halogens - properties, reactions, and trends",
            objectives: [
              {
                id: "2.15",
                code: "2.15",
                statement: "Describe the properties of Group 7 elements",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "state"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["2.1"],
                keywords: ["halogens", "Group 7", "properties", "trends"]
              },
              {
                id: "2.16",
                code: "2.16",
                statement: "Explain displacement reactions of halogens",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "predict"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.15"],
                keywords: ["displacement reactions", "reactivity", "halogens"]
              }
            ],
            practicalWork: ["Halogen displacement reactions", "Halide ion tests"],
            mathematicalSkills: ["Reactivity series", "Prediction calculations"]
          },
          {
            id: "2d",
            name: "Oxygen and Oxides",
            description: "Properties of oxygen and classification of oxides",
            objectives: [
              {
                id: "2.20",
                code: "2.20",
                statement: "Describe the preparation and properties of oxygen",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["oxygen", "preparation", "properties", "combustion"]
              },
              {
                id: "2.21",
                code: "2.21",
                statement: "Classify oxides as acidic, basic, or amphoteric",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["classify", "categorize"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.20"],
                keywords: ["oxides", "acidic", "basic", "amphoteric"]
              }
            ],
            practicalWork: ["Oxygen preparation", "Oxide classification tests"],
            mathematicalSkills: ["Gas collection calculations", "pH measurements"]
          },
          {
            id: "2e",
            name: "Hydrogen and Water",
            description: "Properties of hydrogen and water, including tests",
            objectives: [
              {
                id: "2.25",
                code: "2.25",
                statement: "Describe the preparation and properties of hydrogen",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["hydrogen", "preparation", "properties", "test"]
              },
              {
                id: "2.26",
                code: "2.26",
                statement: "Describe tests for water and water purity",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["water", "purity", "tests", "distillation"]
              }
            ],
            practicalWork: ["Hydrogen preparation", "Water purity tests"],
            mathematicalSkills: ["Gas calculations", "Purity measurements"]
          },
          {
            id: "2f",
            name: "Reactivity Series",
            description: "Metal reactivity and displacement reactions",
            objectives: [
              {
                id: "2.30",
                code: "2.30",
                statement: "Arrange metals in order of reactivity",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["arrange", "order"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.10"],
                keywords: ["reactivity series", "metals", "displacement", "reactions"]
              },
              {
                id: "2.31",
                code: "2.31",
                statement: "Predict the products of displacement reactions",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["predict", "determine"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.30"],
                keywords: ["displacement reactions", "predictions", "metal compounds"]
              }
            ],
            practicalWork: ["Metal displacement reactions", "Reactivity investigations"],
            mathematicalSkills: ["Reaction predictions", "Stoichiometry"]
          }
        ]
      },
      {
        id: "topic-3",
        name: "Physical Chemistry",
        description: "Chemical calculations, energetics, and reaction rates",
        specificationCode: "3",
        timeAllocation: 30,
        assessmentNotes: "Heavy emphasis on calculations and mathematical skills",
        subtopics: [
          {
            id: "3a",
            name: "Chemical Calculations",
            description: "Moles, concentration, and stoichiometry",
            objectives: [
              {
                id: "3.1",
                code: "3.1",
                statement: "Calculate relative molecular mass and relative formula mass",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.19"],
                keywords: ["relative molecular mass", "relative formula mass", "calculations"]
              },
              {
                id: "3.2",
                code: "3.2",
                statement: "Calculate empirical and molecular formulae",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["3.1"],
                keywords: ["empirical formula", "molecular formula", "composition"]
              }
            ],
            practicalWork: ["Empirical formula determination", "Composition analysis"],
            mathematicalSkills: ["Mole calculations", "Percentage composition", "Formula determination"]
          },
          {
            id: "3b",
            name: "Energetics",
            description: "Enthalpy changes and calorimetry",
            objectives: [
              {
                id: "3.10",
                code: "3.10",
                statement: "Define enthalpy change and describe different types",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["define", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["enthalpy change", "combustion", "formation", "neutralization"]
              },
              {
                id: "3.11",
                code: "3.11",
                statement: "Calculate enthalpy changes from experimental data",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["3.10"],
                keywords: ["calorimetry", "enthalpy calculations", "experimental data"]
              }
            ],
            practicalWork: ["Calorimetry experiments", "Enthalpy measurements"],
            mathematicalSkills: ["Enthalpy calculations", "Graph analysis", "Energy conversions"]
          },
          {
            id: "3c",
            name: "Rates of Reaction",
            description: "Factors affecting reaction rates and collision theory",
            objectives: [
              {
                id: "3.15",
                code: "3.15",
                statement: "Explain factors affecting rates of reaction",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["reaction rates", "temperature", "concentration", "surface area", "catalyst"]
              },
              {
                id: "3.16",
                code: "3.16",
                statement: "Interpret rate of reaction graphs",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["interpret", "analyze"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["3.15"],
                keywords: ["rate graphs", "gradient", "collision theory"]
              }
            ],
            practicalWork: ["Rate experiments", "Catalyst investigations"],
            mathematicalSkills: ["Rate calculations", "Graph analysis", "Gradient calculations"]
          },
          {
            id: "3d",
            name: "Reversible Reactions and Equilibrium",
            description: "Dynamic equilibrium and Le Chatelier's principle",
            objectives: [
              {
                id: "3.20",
                code: "3.20",
                statement: "Explain reversible reactions and dynamic equilibrium",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["reversible reactions", "dynamic equilibrium", "closed system"]
              },
              {
                id: "3.21",
                code: "3.21",
                statement: "Apply Le Chatelier's principle to predict equilibrium changes",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["predict", "apply"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["3.20"],
                keywords: ["Le Chatelier's principle", "equilibrium position", "conditions"]
              }
            ],
            practicalWork: ["Equilibrium demonstrations", "Haber process simulation"],
            mathematicalSkills: ["Equilibrium calculations", "Yield predictions"]
          }
        ]
      },
      {
        id: "topic-4",
        name: "Organic Chemistry",
        description: "Study of carbon compounds and their reactions",
        specificationCode: "4",
        timeAllocation: 25,
        assessmentNotes: "Focus on nomenclature, reactions, and synthetic pathways",
        subtopics: [
          {
            id: "4a",
            name: "Introduction to Organic Chemistry",
            description: "Basic concepts and nomenclature",
            objectives: [
              {
                id: "4.1",
                code: "4.1",
                statement: "Explain what is meant by organic chemistry",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["explain", "define"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["organic chemistry", "carbon compounds", "hydrocarbons"]
              },
              {
                id: "4.2",
                code: "4.2",
                statement: "Represent organic molecules using different formulae",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["represent", "draw"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.1"],
                keywords: ["molecular formula", "structural formula", "displayed formula"]
              }
            ],
            practicalWork: ["Molecular modeling", "Formula representations"],
            mathematicalSkills: ["Formula calculations", "Isomer counting"]
          },
          {
            id: "4b",
            name: "Crude Oil and Hydrocarbons",
            description: "Fossil fuels and hydrocarbon chemistry",
            objectives: [
              {
                id: "4.7",
                code: "4.7",
                statement: "Describe the composition and separation of crude oil",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.1"],
                keywords: ["crude oil", "fractional distillation", "hydrocarbons", "fractions"]
              },
              {
                id: "4.8",
                code: "4.8",
                statement: "Explain the uses of different fractions from crude oil",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.7"],
                keywords: ["petroleum fractions", "uses", "boiling points", "molecular size"]
              }
            ],
            practicalWork: ["Fractional distillation demonstration", "Hydrocarbon testing"],
            mathematicalSkills: ["Boiling point trends", "Molecular size calculations"]
          },
          {
            id: "4c",
            name: "Alkanes",
            description: "Saturated hydrocarbons and their properties",
            objectives: [
              {
                id: "4.19",
                code: "4.19",
                statement: "Describe the properties of alkanes",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.2"],
                keywords: ["alkanes", "saturated hydrocarbons", "properties", "homologous series"]
              },
              {
                id: "4.20",
                code: "4.20",
                statement: "Name and draw structures of alkanes",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["name", "draw"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.19"],
                keywords: ["alkane nomenclature", "structural formulas", "isomers"]
              }
            ],
            practicalWork: ["Alkane models", "Combustion reactions"],
            mathematicalSkills: ["Structural analysis", "Combustion calculations"]
          },
          {
            id: "4d",
            name: "Alkenes",
            description: "Unsaturated hydrocarbons and addition reactions",
            objectives: [
              {
                id: "4.23",
                code: "4.23",
                statement: "Describe the properties of alkenes",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.19"],
                keywords: ["alkenes", "unsaturated hydrocarbons", "double bond", "properties"]
              },
              {
                id: "4.24",
                code: "4.24",
                statement: "Describe addition reactions of alkenes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.23"],
                keywords: ["addition reactions", "bromine water", "hydrogen", "steam"]
              }
            ],
            practicalWork: ["Alkene tests", "Addition reactions"],
            mathematicalSkills: ["Reaction stoichiometry", "Yield calculations"]
          },
          {
            id: "4e",
            name: "Polymers",
            description: "Synthetic polymers and polymerization",
            objectives: [
              {
                id: "4.44",
                code: "4.44",
                statement: "Explain addition polymerization",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.24"],
                keywords: ["polymerization", "addition polymers", "monomers", "polymers"]
              },
              {
                id: "4.45",
                code: "4.45",
                statement: "Describe the environmental impact of polymers",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "evaluate"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.44"],
                keywords: ["environmental impact", "biodegradability", "recycling", "disposal"]
              }
            ],
            practicalWork: ["Polymer synthesis", "Polymer testing"],
            mathematicalSkills: ["Polymer calculations", "Environmental data analysis"]
          }
        ]
      }
    ]
  },
  {
    id: "a-level-chemistry-edexcel",
    name: "A Level Chemistry Edexcel",
    grades: ["12", "13"],
    specificationYear: "2024",
    examBoard: "Edexcel",
    overallAssessmentStructure: {
      papers: [
        {
          paperNumber: 1,
          name: "Advanced Inorganic and Physical Chemistry",
          duration: 105,
          marks: 90,
          questionTypes: ["multiple choice", "short answer", "structured", "extended writing"],
          topicCoverage: ["topic-1", "topic-2", "topic-3", "topic-4", "topic-5", "topic-8", "topic-10", "topic-11", "topic-12", "topic-13", "topic-14", "topic-15"]
        },
        {
          paperNumber: 2,
          name: "Advanced Organic and Physical Chemistry",
          duration: 105,
          marks: 90,
          questionTypes: ["multiple choice", "short answer", "structured", "extended writing"],
          topicCoverage: ["topic-2", "topic-3", "topic-5", "topic-6", "topic-7", "topic-9", "topic-16", "topic-17", "topic-18", "topic-19"]
        },
        {
          paperNumber: 3,
          name: "General and Practical Principles in Chemistry",
          duration: 150,
          marks: 120,
          questionTypes: ["structured", "extended writing", "synoptic"],
          topicCoverage: ["topic-1", "topic-2", "topic-3", "topic-4", "topic-5", "topic-6", "topic-7", "topic-8", "topic-9", "topic-10", "topic-11", "topic-12", "topic-13", "topic-14", "topic-15", "topic-16", "topic-17", "topic-18", "topic-19"]
        }
      ]
    },
    topics: [
      {
        id: "topic-1",
        name: "Atomic Structure and the Periodic Table",
        description: "Advanced atomic theory, electronic configuration, and periodic trends",
        specificationCode: "1",
        timeAllocation: 25,
        assessmentNotes: "Foundation topic with mathematical applications",
        subtopics: [
          {
            id: "1a",
            name: "Fundamental Particles",
            description: "Subatomic particles and atomic structure",
            objectives: [
              {
                id: "1.1",
                code: "1.1",
                statement: "Define relative atomic mass and relative isotopic mass",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["define", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["relative atomic mass", "relative isotopic mass", "carbon-12"]
              },
              {
                id: "1.2",
                code: "1.2",
                statement: "Calculate relative atomic mass from mass spectra",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.1"],
                keywords: ["mass spectrometry", "abundance", "calculations"]
              }
            ],
            practicalWork: ["Mass spectrometry data analysis"],
            mathematicalSkills: ["Weighted average calculations", "Statistical analysis"]
          },
          {
            id: "1b",
            name: "Electronic Configuration",
            description: "Electron arrangement in atoms and ions",
            objectives: [
              {
                id: "1.10",
                code: "1.10",
                statement: "Describe electron configuration using s, p, d notation",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "write"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.1"],
                keywords: ["electron configuration", "orbitals", "s p d f", "subshells"]
              },
              {
                id: "1.11",
                code: "1.11",
                statement: "Predict electronic configurations of atoms and ions",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["predict", "determine"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.10"],
                keywords: ["electronic configuration", "ions", "transition metals"]
              }
            ],
            practicalWork: ["Electron configuration models", "Orbital diagrams"],
            mathematicalSkills: ["Electron counting", "Orbital filling rules"]
          },
          {
            id: "1c",
            name: "Ionization Energy",
            description: "Successive ionization energies and trends",
            objectives: [
              {
                id: "1.15",
                code: "1.15",
                statement: "Define first ionization energy and successive ionization energies",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["define", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.10"],
                keywords: ["ionization energy", "first ionization", "successive ionization"]
              },
              {
                id: "1.16",
                code: "1.16",
                statement: "Explain factors affecting ionization energy",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "analyze"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.15"],
                keywords: ["nuclear charge", "atomic radius", "shielding", "ionization trends"]
              }
            ],
            practicalWork: ["Ionization energy data analysis"],
            mathematicalSkills: ["Trend analysis", "Graph interpretation"]
          },
          {
            id: "1d",
            name: "Periodic Trends",
            description: "Trends in atomic properties across the periodic table",
            objectives: [
              {
                id: "1.20",
                code: "1.20",
                statement: "Explain trends in atomic radius across periods and down groups",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.16"],
                keywords: ["atomic radius", "periodic trends", "nuclear charge", "shielding"]
              },
              {
                id: "1.21",
                code: "1.21",
                statement: "Explain trends in electronegativity",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.20"],
                keywords: ["electronegativity", "Pauling scale", "periodic trends"]
              }
            ],
            practicalWork: ["Periodic trends investigation"],
            mathematicalSkills: ["Trend analysis", "Data interpretation"]
          }
        ]
      },
      {
        id: "topic-2",
        name: "Bonding and Structure",
        description: "Chemical bonding, molecular geometry, and intermolecular forces",
        specificationCode: "2",
        timeAllocation: 30,
        assessmentNotes: "Core topic linking to many other areas",
        subtopics: [
          {
            id: "2a",
            name: "Ionic Bonding",
            description: "Ionic compounds and their properties",
            objectives: [
              {
                id: "2.1",
                code: "2.1",
                statement: "Explain the formation of ionic bonds",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.11"],
                keywords: ["ionic bonding", "electron transfer", "lattice structure"]
              },
              {
                id: "2.2",
                code: "2.2",
                statement: "Predict the properties of ionic compounds",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["predict", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.1"],
                keywords: ["ionic properties", "melting point", "conductivity", "solubility"]
              }
            ],
            practicalWork: ["Ionic compound synthesis", "Property testing"],
            mathematicalSkills: ["Lattice energy calculations", "Born-Haber cycles"]
          },
          {
            id: "2b",
            name: "Covalent Bonding",
            description: "Covalent bonds and molecular structures",
            objectives: [
              {
                id: "2.10",
                code: "2.10",
                statement: "Explain the formation of covalent bonds",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.21"],
                keywords: ["covalent bonding", "electron sharing", "orbital overlap"]
              },
              {
                id: "2.11",
                code: "2.11",
                statement: "Draw Lewis structures and predict molecular shapes",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["draw", "predict"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.10"],
                keywords: ["Lewis structures", "VSEPR theory", "molecular geometry"]
              }
            ],
            practicalWork: ["Molecular modeling", "Bond angle measurements"],
            mathematicalSkills: ["Bond angle calculations", "Geometry predictions"]
          },
          {
            id: "2c",
            name: "Metallic Bonding",
            description: "Metallic bonding and properties of metals",
            objectives: [
              {
                id: "2.20",
                code: "2.20",
                statement: "Explain metallic bonding",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.11"],
                keywords: ["metallic bonding", "delocalized electrons", "electron sea"]
              },
              {
                id: "2.21",
                code: "2.21",
                statement: "Relate metallic bonding to properties of metals",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["relate", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.20"],
                keywords: ["metallic properties", "conductivity", "malleability", "ductility"]
              }
            ],
            practicalWork: ["Metallic property testing", "Conductivity measurements"],
            mathematicalSkills: ["Conductivity calculations", "Property correlations"]
          },
          {
            id: "2d",
            name: "Intermolecular Forces",
            description: "Van der Waals forces and hydrogen bonding",
            objectives: [
              {
                id: "2.30",
                code: "2.30",
                statement: "Explain types of intermolecular forces",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.11"],
                keywords: ["intermolecular forces", "van der Waals", "hydrogen bonding", "dipole-dipole"]
              },
              {
                id: "2.31",
                code: "2.31",
                statement: "Relate intermolecular forces to physical properties",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["relate", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.30"],
                keywords: ["boiling point", "melting point", "viscosity", "surface tension"]
              }
            ],
            practicalWork: ["Intermolecular force demonstrations", "Boiling point measurements"],
            mathematicalSkills: ["Property predictions", "Force calculations"]
          }
        ]
      },
      {
        id: "topic-3",
        name: "Redox I",
        description: "Oxidation and reduction reactions",
        specificationCode: "3",
        timeAllocation: 20,
        assessmentNotes: "Foundation for electrochemistry and transition metals",
        subtopics: [
          {
            id: "3a",
            name: "Oxidation and Reduction",
            description: "Definitions and identification of redox reactions",
            objectives: [
              {
                id: "3.1",
                code: "3.1",
                statement: "Define oxidation and reduction in terms of electron transfer",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["define", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["oxidation", "reduction", "electron transfer", "OIL RIG"]
              },
              {
                id: "3.2",
                code: "3.2",
                statement: "Assign oxidation states to atoms in compounds",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["assign", "calculate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["3.1"],
                keywords: ["oxidation states", "oxidation numbers", "rules"]
              }
            ],
            practicalWork: ["Redox reaction identification", "Oxidation state practice"],
            mathematicalSkills: ["Oxidation state calculations", "Electron counting"]
          },
          {
            id: "3b",
            name: "Redox Equations",
            description: "Writing and balancing redox equations",
            objectives: [
              {
                id: "3.10",
                code: "3.10",
                statement: "Write half-equations for redox reactions",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["write", "construct"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["3.2"],
                keywords: ["half-equations", "oxidation half-reaction", "reduction half-reaction"]
              },
              {
                id: "3.11",
                code: "3.11",
                statement: "Combine half-equations to form overall redox equations",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["combine", "balance"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["3.10"],
                keywords: ["redox equations", "balancing", "electron balance"]
              }
            ],
            practicalWork: ["Redox titrations", "Equation balancing exercises"],
            mathematicalSkills: ["Equation balancing", "Stoichiometry"]
          }
        ]
      },
      {
        id: "topic-4",
        name: "Inorganic Chemistry and the Periodic Table",
        description: "Group chemistry and periodic trends",
        specificationCode: "4",
        timeAllocation: 25,
        assessmentNotes: "Links to atomic structure and bonding",
        subtopics: [
          {
            id: "4a",
            name: "Group 2 Elements",
            description: "Alkaline earth metals and their compounds",
            objectives: [
              {
                id: "4.1",
                code: "4.1",
                statement: "Describe trends in Group 2 elements",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.16"],
                keywords: ["Group 2", "alkaline earth metals", "trends", "reactivity"]
              },
              {
                id: "4.2",
                code: "4.2",
                statement: "Explain reactions of Group 2 elements and compounds",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.1"],
                keywords: ["Group 2 reactions", "oxides", "hydroxides", "carbonates"]
              }
            ],
            practicalWork: ["Group 2 reactions", "Flame tests", "Precipitate formation"],
            mathematicalSkills: ["Solubility calculations", "pH calculations"]
          },
          {
            id: "4b",
            name: "Group 7 Elements",
            description: "Halogens and their compounds",
            objectives: [
              {
                id: "4.10",
                code: "4.10",
                statement: "Describe trends in Group 7 elements",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.16"],
                keywords: ["Group 7", "halogens", "trends", "reactivity"]
              },
              {
                id: "4.11",
                code: "4.11",
                statement: "Explain reactions of halogens and halide ions",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.10"],
                keywords: ["halogen reactions", "displacement", "halide tests", "disproportionation"]
              }
            ],
            practicalWork: ["Halogen displacement reactions", "Halide ion tests", "Reaction kinetics"],
            mathematicalSkills: ["Rate calculations", "Equilibrium expressions"]
          }
        ]
      },
      {
        id: "topic-5",
        name: "Formulae, Equations and Amounts of Substance",
        description: "Chemical calculations and stoichiometry",
        specificationCode: "5",
        timeAllocation: 20,
        assessmentNotes: "Mathematical foundation for all chemistry",
        subtopics: [
          {
            id: "5a",
            name: "Atomic and Molecular Masses",
            description: "Relative masses and the mole concept",
            objectives: [
              {
                id: "5.1",
                code: "5.1",
                statement: "Calculate relative molecular mass and relative formula mass",
                bloomsLevel: "apply",
                difficulty: "basic",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.1"],
                keywords: ["relative molecular mass", "relative formula mass", "molar mass"]
              },
              {
                id: "5.2",
                code: "5.2",
                statement: "Use the mole concept in calculations",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "use"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 5,
                prerequisiteObjectives: ["5.1"],
                keywords: ["mole", "Avogadro constant", "amount of substance"]
              }
            ],
            practicalWork: ["Molar mass determinations", "Mole calculations"],
            mathematicalSkills: ["Mole calculations", "Unit conversions", "Proportional reasoning"]
          },
          {
            id: "5b",
            name: "Empirical and Molecular Formulae",
            description: "Determining formulae from composition data",
            objectives: [
              {
                id: "5.10",
                code: "5.10",
                statement: "Calculate empirical formulae from composition data",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["5.2"],
                keywords: ["empirical formula", "composition", "percentage by mass"]
              },
              {
                id: "5.11",
                code: "5.11",
                statement: "Calculate molecular formulae from empirical formulae",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["5.10"],
                keywords: ["molecular formula", "molecular mass", "empirical formula"]
              }
            ],
            practicalWork: ["Combustion analysis", "Formula determination"],
            mathematicalSkills: ["Ratio calculations", "Formula determination", "Data analysis"]
          },
          {
            id: "5c",
            name: "Reacting Masses and Volumes",
            description: "Stoichiometric calculations",
            objectives: [
              {
                id: "5.20",
                code: "5.20",
                statement: "Calculate reacting masses using balanced equations",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["5.2"],
                keywords: ["stoichiometry", "reacting masses", "balanced equations"]
              },
              {
                id: "5.21",
                code: "5.21",
                statement: "Calculate gas volumes and concentrations",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["5.20"],
                keywords: ["gas volumes", "molar volume", "concentration", "molarity"]
              }
            ],
            practicalWork: ["Stoichiometry experiments", "Gas volume measurements"],
            mathematicalSkills: ["Volume calculations", "Concentration calculations", "Gas law applications"]
          }
        ]
      },
      {
        id: "topic-6",
        name: "Organic Chemistry I",
        description: "Introduction to organic chemistry and basic functional groups",
        specificationCode: "6",
        timeAllocation: 35,
        assessmentNotes: "Foundation for advanced organic chemistry",
        subtopics: [
          {
            id: "6a",
            name: "Introduction to Organic Chemistry",
            description: "Basic concepts and nomenclature",
            objectives: [
              {
                id: "6.1",
                code: "6.1",
                statement: "Explain the term organic chemistry",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["explain", "define"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["organic chemistry", "carbon compounds", "hydrocarbons"]
              },
              {
                id: "6.2",
                code: "6.2",
                statement: "Represent organic molecules using different types of formulae",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["represent", "draw"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["6.1"],
                keywords: ["molecular formula", "structural formula", "displayed formula", "skeletal formula"]
              }
            ],
            practicalWork: ["Molecular modeling", "Formula representations"],
            mathematicalSkills: ["Formula analysis", "Isomer counting"]
          },
          {
            id: "6b",
            name: "Alkanes",
            description: "Saturated hydrocarbons and their reactions",
            objectives: [
              {
                id: "6.10",
                code: "6.10",
                statement: "Describe the structure and properties of alkanes",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["6.2"],
                keywords: ["alkanes", "saturated hydrocarbons", "homologous series", "properties"]
              },
              {
                id: "6.11",
                code: "6.11",
                statement: "Explain the reactions of alkanes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["6.10"],
                keywords: ["combustion", "substitution", "free radical mechanism", "chlorination"]
              }
            ],
            practicalWork: ["Alkane combustion", "Substitution reactions", "Free radical investigations"],
            mathematicalSkills: ["Combustion calculations", "Reaction mechanisms"]
          },
          {
            id: "6c",
            name: "Alkenes",
            description: "Unsaturated hydrocarbons and addition reactions",
            objectives: [
              {
                id: "6.20",
                code: "6.20",
                statement: "Describe the structure and properties of alkenes",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["6.10"],
                keywords: ["alkenes", "unsaturated hydrocarbons", "double bond", "geometric isomerism"]
              },
              {
                id: "6.21",
                code: "6.21",
                statement: "Explain addition reactions of alkenes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["6.20"],
                keywords: ["addition reactions", "electrophilic addition", "Markovnikov's rule", "carbocation"]
              }
            ],
            practicalWork: ["Alkene tests", "Addition reactions", "Isomerism investigations"],
            mathematicalSkills: ["Reaction stoichiometry", "Yield calculations"]
          },
          {
            id: "6d",
            name: "Halogenoalkanes",
            description: "Alkyl halides and their reactions",
            objectives: [
              {
                id: "6.30",
                code: "6.30",
                statement: "Describe the structure and properties of halogenoalkanes",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["6.10"],
                keywords: ["halogenoalkanes", "alkyl halides", "properties", "polarity"]
              },
              {
                id: "6.31",
                code: "6.31",
                statement: "Explain nucleophilic substitution reactions of halogenoalkanes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["6.30"],
                keywords: ["nucleophilic substitution", "SN1", "SN2", "mechanism", "leaving group"]
              }
            ],
            practicalWork: ["Halogenoalkane synthesis", "Substitution reactions", "Mechanism studies"],
            mathematicalSkills: ["Reaction rates", "Mechanism analysis"]
          },
          {
            id: "6e",
            name: "Alcohols",
            description: "Alcohol structure, properties, and reactions",
            objectives: [
              {
                id: "6.40",
                code: "6.40",
                statement: "Describe the structure and classification of alcohols",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "classify"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["6.2"],
                keywords: ["alcohols", "primary", "secondary", "tertiary", "functional group"]
              },
              {
                id: "6.41",
                code: "6.41",
                statement: "Explain the reactions of alcohols",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["6.40"],
                keywords: ["oxidation", "dehydration", "esterification", "elimination"]
              }
            ],
            practicalWork: ["Alcohol oxidation", "Dehydration reactions", "Esterification"],
            mathematicalSkills: ["Oxidation calculations", "Yield determinations"]
          }
        ]
      },
      {
        id: "topic-7",
        name: "Modern Analytical Techniques I",
        description: "Spectroscopic methods for structure determination",
        specificationCode: "7",
        timeAllocation: 20,
        assessmentNotes: "Links to organic structure determination",
        subtopics: [
          {
            id: "7a",
            name: "Mass Spectrometry",
            description: "Molecular ion peaks and fragmentation patterns",
            objectives: [
              {
                id: "7.1",
                code: "7.1",
                statement: "Explain the principles of mass spectrometry",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.2"],
                keywords: ["mass spectrometry", "molecular ion", "fragmentation", "base peak"]
              },
              {
                id: "7.2",
                code: "7.2",
                statement: "Interpret mass spectra to determine molecular structure",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["interpret", "analyze"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["7.1"],
                keywords: ["mass spectra", "fragmentation patterns", "molecular structure", "isotope peaks"]
              }
            ],
            practicalWork: ["Mass spectra analysis", "Fragmentation pattern recognition"],
            mathematicalSkills: ["Mass calculations", "Isotope pattern analysis"]
          },
          {
            id: "7b",
            name: "Infrared Spectroscopy",
            description: "IR spectra and functional group identification",
            objectives: [
              {
                id: "7.10",
                code: "7.10",
                statement: "Explain the principles of infrared spectroscopy",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["infrared spectroscopy", "molecular vibrations", "bond stretching", "fingerprint region"]
              },
              {
                id: "7.11",
                code: "7.11",
                statement: "Interpret IR spectra to identify functional groups",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["interpret", "identify"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["7.10"],
                keywords: ["IR spectra", "functional groups", "wavenumbers", "absorption bands"]
              }
            ],
            practicalWork: ["IR spectroscopy", "Functional group identification"],
            mathematicalSkills: ["Wavenumber analysis", "Peak interpretation"]
          },
          {
            id: "7c",
            name: "NMR Spectroscopy",
            description: "1H NMR and structure determination",
            objectives: [
              {
                id: "7.20",
                code: "7.20",
                statement: "Explain the principles of 1H NMR spectroscopy",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: [],
                keywords: ["1H NMR", "chemical shift", "integration", "splitting patterns"]
              },
              {
                id: "7.21",
                code: "7.21",
                statement: "Interpret 1H NMR spectra to determine structure",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["interpret", "analyze"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 6,
                prerequisiteObjectives: ["7.20"],
                keywords: ["NMR spectra", "chemical environments", "coupling", "structure determination"]
              }
            ],
            practicalWork: ["NMR spectroscopy", "Structure determination exercises"],
            mathematicalSkills: ["Integration ratios", "Coupling constant analysis"]
          }
        ]
      },
      {
        id: "topic-8",
        name: "Energetics I",
        description: "Enthalpy changes and thermochemistry",
        specificationCode: "8",
        timeAllocation: 25,
        assessmentNotes: "Foundation for advanced thermodynamics",
        subtopics: [
          {
            id: "8a",
            name: "Enthalpy Changes",
            description: "Types of enthalpy changes and their measurement",
            objectives: [
              {
                id: "8.1",
                code: "8.1",
                statement: "Define standard enthalpy changes",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["define", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["enthalpy change", "standard conditions", "formation", "combustion", "neutralization"]
              },
              {
                id: "8.2",
                code: "8.2",
                statement: "Calculate enthalpy changes from calorimetry data",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["8.1"],
                keywords: ["calorimetry", "specific heat capacity", "enthalpy calculations", "heat transfer"]
              }
            ],
            practicalWork: ["Calorimetry experiments", "Enthalpy measurements"],
            mathematicalSkills: ["Enthalpy calculations", "Heat capacity calculations", "Error analysis"]
          },
          {
            id: "8b",
            name: "Hess's Law",
            description: "Using Hess's Law for enthalpy calculations",
            objectives: [
              {
                id: "8.10",
                code: "8.10",
                statement: "State and apply Hess's Law",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["state", "apply"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["8.1"],
                keywords: ["Hess's Law", "enthalpy cycle", "indirect determination", "conservation of energy"]
              },
              {
                id: "8.11",
                code: "8.11",
                statement: "Calculate enthalpy changes using formation and combustion data",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["8.10"],
                keywords: ["formation data", "combustion data", "enthalpy calculations", "thermochemical equations"]
              }
            ],
            practicalWork: ["Hess's Law experiments", "Enthalpy cycle construction"],
            mathematicalSkills: ["Enthalpy calculations", "Cycle analysis", "Data manipulation"]
          },
          {
            id: "8c",
            name: "Bond Enthalpies",
            description: "Bond breaking and making in chemical reactions",
            objectives: [
              {
                id: "8.20",
                code: "8.20",
                statement: "Define bond enthalpy and explain its use",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["define", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["8.1"],
                keywords: ["bond enthalpy", "bond breaking", "bond making", "endothermic", "exothermic"]
              },
              {
                id: "8.21",
                code: "8.21",
                statement: "Calculate enthalpy changes using bond enthalpies",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["8.20"],
                keywords: ["bond enthalpy calculations", "reaction enthalpy", "bond data"]
              }
            ],
            practicalWork: ["Bond enthalpy investigations", "Reaction enthalpy measurements"],
            mathematicalSkills: ["Bond enthalpy calculations", "Energy balance analysis"]
          }
        ]
      },
      {
        id: "topic-9",
        name: "Kinetics I",
        description: "Reaction rates and mechanisms",
        specificationCode: "9",
        timeAllocation: 25,
        assessmentNotes: "Foundation for advanced kinetics",
        subtopics: [
          {
            id: "9a",
            name: "Reaction Rates",
            description: "Measuring and calculating reaction rates",
            objectives: [
              {
                id: "9.1",
                code: "9.1",
                statement: "Define rate of reaction and describe methods of measurement",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["define", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["reaction rate", "rate measurement", "concentration change", "time"]
              },
              {
                id: "9.2",
                code: "9.2",
                statement: "Calculate reaction rates from experimental data",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["9.1"],
                keywords: ["rate calculations", "concentration-time graphs", "tangent method", "initial rates"]
              }
            ],
            practicalWork: ["Rate measurement experiments", "Concentration-time studies"],
            mathematicalSkills: ["Rate calculations", "Graph analysis", "Tangent calculations"]
          },
          {
            id: "9b",
            name: "Collision Theory",
            description: "Factors affecting reaction rates",
            objectives: [
              {
                id: "9.10",
                code: "9.10",
                statement: "Explain collision theory and activation energy",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["9.1"],
                keywords: ["collision theory", "activation energy", "successful collisions", "energy barriers"]
              },
              {
                id: "9.11",
                code: "9.11",
                statement: "Explain the effect of temperature, concentration, and catalysts on reaction rates",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["9.10"],
                keywords: ["temperature effects", "concentration effects", "catalysts", "Maxwell-Boltzmann distribution"]
              }
            ],
            practicalWork: ["Temperature effect studies", "Catalyst investigations", "Concentration effect experiments"],
            mathematicalSkills: ["Arrhenius equation", "Rate constant calculations", "Energy distribution analysis"]
          },
          {
            id: "9c",
            name: "Rate Equations",
            description: "Rate laws and reaction orders",
            objectives: [
              {
                id: "9.20",
                code: "9.20",
                statement: "Write rate equations and define reaction order",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["write", "define"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["9.2"],
                keywords: ["rate equation", "reaction order", "rate constant", "overall order"]
              },
              {
                id: "9.21",
                code: "9.21",
                statement: "Determine reaction orders from experimental data",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["determine", "analyze"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["9.20"],
                keywords: ["reaction order determination", "initial rates method", "rate-concentration graphs"]
              }
            ],
            practicalWork: ["Rate equation determination", "Order analysis experiments"],
            mathematicalSkills: ["Rate equation manipulation", "Order determination", "Rate constant calculations"]
          }
        ]
      },
      {
        id: "topic-10",
        name: "Equilibrium I",
        description: "Chemical equilibrium and equilibrium constants",
        specificationCode: "10",
        timeAllocation: 20,
        assessmentNotes: "Foundation for advanced equilibrium",
        subtopics: [
          {
            id: "10a",
            name: "Dynamic Equilibrium",
            description: "Concept of dynamic equilibrium",
            objectives: [
              {
                id: "10.1",
                code: "10.1",
                statement: "Explain the concept of dynamic equilibrium",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["explain", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["dynamic equilibrium", "reversible reactions", "closed system", "equilibrium position"]
              },
              {
                id: "10.2",
                code: "10.2",
                statement: "Apply Le Chatelier's principle to predict equilibrium changes",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["apply", "predict"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["10.1"],
                keywords: ["Le Chatelier's principle", "equilibrium shifts", "concentration", "temperature", "pressure"]
              }
            ],
            practicalWork: ["Equilibrium demonstrations", "Le Chatelier investigations"],
            mathematicalSkills: ["Equilibrium calculations", "Prediction analysis"]
          },
          {
            id: "10b",
            name: "Equilibrium Constants",
            description: "Kc and Kp calculations",
            objectives: [
              {
                id: "10.10",
                code: "10.10",
                statement: "Write expressions for equilibrium constants Kc and Kp",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["write", "construct"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["10.1"],
                keywords: ["equilibrium constant", "Kc", "Kp", "equilibrium expression"]
              },
              {
                id: "10.11",
                code: "10.11",
                statement: "Calculate equilibrium constants and equilibrium concentrations",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["10.10"],
                keywords: ["equilibrium calculations", "ICE tables", "equilibrium concentrations"]
              }
            ],
            practicalWork: ["Equilibrium constant determination", "Concentration analysis"],
            mathematicalSkills: ["Equilibrium calculations", "ICE table construction", "Algebraic manipulation"]
          }
        ]
      }
    ]
  }
];