import { CurriculumLevel } from "./curriculum-data";

export const COMPLETE_EDEXCEL_CURRICULUM: CurriculumLevel[] = [
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
          name: "Paper 1C (4CH1/1C)",
          duration: 120,
          marks: 110,
          questionTypes: ["multiple choice", "short answer", "structured"],
          topicCoverage: ["topic-1", "topic-2", "topic-3", "topic-4"]
        },
        {
          paperNumber: 2,
          name: "Paper 2C (4CH1/2C)",
          duration: 120,
          marks: 110,
          questionTypes: ["structured", "extended writing"],
          topicCoverage: ["topic-1", "topic-2", "topic-3", "topic-4"]
        }
      ]
    },
    topics: [
      {
        id: "igcse-topic-1",
        name: "Principles of Chemistry",
        description: "Fundamental concepts of chemistry including atomic structure, bonding, and basic principles",
        specificationCode: "1",
        timeAllocation: 40,
        assessmentNotes: "Foundation topic assessed across both papers with mathematical calculations",
        subtopics: [
          {
            id: "1.1",
            name: "States of Matter",
            description: "Kinetic theory and particle behavior in different states",
            objectives: [
              {
                id: "1.1.1",
                code: "1.1",
                statement: "Understand the three states of matter in terms of arrangement, movement and energy of particles",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["kinetic theory", "particle model", "solid", "liquid", "gas", "arrangement", "movement", "energy"]
              },
              {
                id: "1.1.2",
                code: "1.2",
                statement: "Describe the changes of state in terms of melting, boiling, evaporation, freezing, condensation and sublimation",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["melting", "boiling", "evaporation", "freezing", "condensation", "sublimation", "state changes"]
              },
              {
                id: "1.1.3",
                code: "1.3",
                statement: "Understand how results of experiments involving dilution of coloured solutions and diffusion of gases can be explained",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["dilution", "diffusion", "concentration", "particles", "movement", "kinetic theory"]
              },
              {
                id: "1.1.4",
                code: "1.4",
                statement: "Know that a pure substance has a fixed melting and boiling point, but mixtures may melt or boil over a range of temperatures",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.1.2"],
                keywords: ["pure substance", "mixtures", "melting point", "boiling point", "temperature range"]
              }
            ],
            practicalWork: ["Investigation of melting and boiling points", "Diffusion experiments", "Dilution investigations"],
            mathematicalSkills: ["Graph interpretation", "Temperature measurements", "Concentration calculations"]
          },
          {
            id: "1.2",
            name: "Elements, Compounds and Mixtures",
            description: "Classification of matter and separation techniques",
            objectives: [
              {
                id: "1.2.1",
                code: "1.5",
                statement: "Understand the basic definitions of elements, compounds and mixtures",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "define"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["elements", "compounds", "mixtures", "pure substances", "chemical composition"]
              },
              {
                id: "1.2.2",
                code: "1.6",
                statement: "Describe experimental techniques for separation of mixtures",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["separation", "distillation", "filtration", "crystallisation", "chromatography", "evaporation"]
              },
              {
                id: "1.2.3",
                code: "1.7",
                statement: "Know what is meant by the terms solvent, solute and solution",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "define"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["solvent", "solute", "solution", "dissolving", "solubility"]
              },
              {
                id: "1.2.4",
                code: "1.8",
                statement: "Know that chromatography involves a stationary and a mobile phase and be able to interpret a chromatogram",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["know", "interpret"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.2.2"],
                keywords: ["chromatography", "stationary phase", "mobile phase", "chromatogram", "Rf values"]
              }
            ],
            practicalWork: ["Separation techniques practical", "Chromatography experiments", "Crystallisation investigations"],
            mathematicalSkills: ["Rf value calculations", "Percentage yield calculations", "Purity determinations"]
          },
          {
            id: "1.3",
            name: "Atomic Structure",
            description: "Structure of atoms and subatomic particles",
            objectives: [
              {
                id: "1.3.1",
                code: "1.15",
                statement: "Know the structure of an atom in terms of positions, relative masses and relative charges of sub-atomic particles",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["atom", "nucleus", "protons", "neutrons", "electrons", "relative mass", "relative charge"]
              },
              {
                id: "1.3.2",
                code: "1.16",
                statement: "Know what is meant by atomic number, mass number, isotopes and relative atomic mass",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["know", "define"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.3.1"],
                keywords: ["atomic number", "mass number", "isotopes", "relative atomic mass", "proton number"]
              },
              {
                id: "1.3.3",
                code: "1.17",
                statement: "Be able to calculate the relative atomic mass of an element from isotopic abundances",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.3.2"],
                keywords: ["relative atomic mass", "isotopic abundance", "weighted average", "calculations"]
              }
            ],
            practicalWork: ["Atomic structure models", "Isotope investigations", "Mass spectrometry data analysis"],
            mathematicalSkills: ["Relative atomic mass calculations", "Isotopic abundance calculations", "Atomic mass units"]
          },
          {
            id: "1.4",
            name: "The Periodic Table",
            description: "Organisation of elements and periodic trends",
            objectives: [
              {
                id: "1.4.1",
                code: "1.33",
                statement: "Understand how elements are arranged in the periodic table in order of atomic number, in groups and periods",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.3.2"],
                keywords: ["periodic table", "atomic number", "groups", "periods", "arrangement"]
              },
              {
                id: "1.4.2",
                code: "1.34",
                statement: "Know the electronic configurations of the first 20 elements from their positions in the periodic table",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "work out"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.4.1"],
                keywords: ["electronic configuration", "electron shells", "first 20 elements", "periodic table position"]
              },
              {
                id: "1.4.3",
                code: "1.35",
                statement: "Use electrical conductivity and acid-base character of oxides to classify elements as metals or non-metals",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["use", "classify"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.4.1"],
                keywords: ["electrical conductivity", "acid-base character", "oxides", "metals", "non-metals", "classification"]
              }
            ],
            practicalWork: ["Periodic table investigations", "Electronic configuration practice", "Metal/non-metal classification"],
            mathematicalSkills: ["Electronic configuration notation", "Periodic trend analysis", "Group and period calculations"]
          },
          {
            id: "1.5",
            name: "Chemical Formulae, Equations and Calculations",
            description: "Writing formulae, balancing equations, and quantitative chemistry",
            objectives: [
              {
                id: "1.5.1",
                code: "1.17",
                statement: "Write word equations and symbol equations to show how reactants form products",
                bloomsLevel: "apply",
                difficulty: "basic",
                commandWords: ["write", "construct"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.3.1"],
                keywords: ["word equations", "symbol equations", "reactants", "products", "chemical reactions"]
              },
              {
                id: "1.5.2",
                code: "1.18",
                statement: "Calculate relative formula masses from relative atomic masses",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.3.2"],
                keywords: ["relative formula mass", "relative atomic mass", "molecular mass", "formula mass"]
              },
              {
                id: "1.5.3",
                code: "1.19",
                statement: "Know what is meant by empirical formula and molecular formula",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["know", "define"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.5.2"],
                keywords: ["empirical formula", "molecular formula", "simplest ratio", "actual ratio"]
              },
              {
                id: "1.5.4",
                code: "1.20",
                statement: "Calculate empirical and molecular formulae from experimental data",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 6,
                prerequisiteObjectives: ["1.5.3"],
                keywords: ["empirical formula calculation", "molecular formula calculation", "experimental data", "percentage composition"]
              },
              {
                id: "1.5.5",
                code: "1.21",
                statement: "Calculate reacting masses using experimental data and chemical equations",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.5.2"],
                keywords: ["reacting masses", "stoichiometry", "chemical equations", "mass calculations"]
              },
              {
                id: "1.5.6",
                code: "1.22",
                statement: "Calculate percentage yield and percentage purity",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.5.5"],
                keywords: ["percentage yield", "percentage purity", "theoretical yield", "actual yield"]
              },
              {
                id: "1.5.7",
                code: "1.23",
                statement: "Understand how to carry out calculations involving amount of substance in moles",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 6,
                prerequisiteObjectives: ["1.5.2"],
                keywords: ["moles", "amount of substance", "Avogadro constant", "molar mass", "mole calculations"]
              }
            ],
            practicalWork: ["Formula determination experiments", "Stoichiometry investigations", "Yield calculations"],
            mathematicalSkills: ["Mole calculations", "Percentage calculations", "Stoichiometric ratios", "Formula mass calculations"]
          },
          {
            id: "1.6",
            name: "Ionic Bonding",
            description: "Formation and properties of ionic compounds",
            objectives: [
              {
                id: "1.6.1",
                code: "1.18",
                statement: "Understand how ionic bonds are formed by electron transfer, limited to combinations of elements from Groups 1, 2, 6 and 7 only",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.4.2"],
                keywords: ["ionic bonding", "electron transfer", "cations", "anions", "Groups 1, 2, 6, 7"]
              },
              {
                id: "1.6.2",
                code: "1.19",
                statement: "Understand how to use dot-and-cross diagrams to represent ionic bonding",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["understand", "draw"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.6.1"],
                keywords: ["dot-and-cross diagrams", "ionic bonding", "electron representation", "ionic compounds"]
              },
              {
                id: "1.6.3",
                code: "1.20",
                statement: "Know the structure of ionic compounds as a lattice of oppositely charged ions",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.6.1"],
                keywords: ["ionic lattice", "crystal structure", "oppositely charged ions", "ionic compounds"]
              },
              {
                id: "1.6.4",
                code: "1.21",
                statement: "Understand why compounds with ionic bonding conduct electricity when molten or in aqueous solution",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.6.3"],
                keywords: ["electrical conductivity", "molten", "aqueous solution", "mobile ions", "ionic compounds"]
              }
            ],
            practicalWork: ["Ionic compound formation", "Conductivity testing", "Ionic lattice models"],
            mathematicalSkills: ["Charge calculations", "Formula predictions", "Lattice structure analysis"]
          },
          {
            id: "1.7",
            name: "Covalent Bonding",
            description: "Formation and properties of covalent compounds",
            objectives: [
              {
                id: "1.7.1",
                code: "1.24",
                statement: "Understand how covalent bonds are formed by sharing electrons",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.4.2"],
                keywords: ["covalent bonding", "electron sharing", "electron pairs", "non-metals"]
              },
              {
                id: "1.7.2",
                code: "1.25",
                statement: "Understand how to use dot-and-cross diagrams to represent covalent bonding",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["understand", "draw"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.7.1"],
                keywords: ["dot-and-cross diagrams", "covalent bonding", "shared electrons", "molecular compounds"]
              },
              {
                id: "1.7.3",
                code: "1.26",
                statement: "Know the structure of giant covalent substances such as diamond, graphite and silicon dioxide",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.7.1"],
                keywords: ["giant covalent", "diamond", "graphite", "silicon dioxide", "network structures"]
              },
              {
                id: "1.7.4",
                code: "1.27",
                statement: "Understand why covalent compounds do not conduct electricity",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.7.1"],
                keywords: ["electrical conductivity", "covalent compounds", "no mobile electrons", "insulators"]
              }
            ],
            practicalWork: ["Covalent compound models", "Conductivity testing", "Structure investigations"],
            mathematicalSkills: ["Electron counting", "Bond formation calculations", "Molecular geometry"]
          },
          {
            id: "1.8",
            name: "Metallic Bonding",
            description: "Structure and properties of metals",
            objectives: [
              {
                id: "1.8.1",
                code: "1.30",
                statement: "Know that metals have a giant structure",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["metals", "giant structure", "metallic lattice", "metal atoms"]
              },
              {
                id: "1.8.2",
                code: "1.31",
                statement: "Understand how metallic bonding occurs",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.8.1"],
                keywords: ["metallic bonding", "electron sea", "delocalized electrons", "metal cations"]
              },
              {
                id: "1.8.3",
                code: "1.32",
                statement: "Understand why metals are good conductors of heat and electricity",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.8.2"],
                keywords: ["electrical conductivity", "thermal conductivity", "mobile electrons", "delocalized electrons"]
              }
            ],
            practicalWork: ["Metallic structure models", "Conductivity experiments", "Metal property investigations"],
            mathematicalSkills: ["Conductivity measurements", "Property correlations", "Structure analysis"]
          }
        ]
      },
      {
        id: "igcse-topic-2",
        name: "Inorganic Chemistry",
        description: "Chemistry of elements and compounds, focusing on groups in the periodic table",
        specificationCode: "2",
        timeAllocation: 45,
        assessmentNotes: "Extensive practical work and trend analysis required",
        subtopics: [
          {
            id: "2.1",
            name: "Group 1 Elements (Alkali Metals)",
            description: "Properties and reactions of alkali metals",
            objectives: [
              {
                id: "2.1.1",
                code: "2.1",
                statement: "Know the general properties of the Group 1 elements lithium, sodium and potassium",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.4.1"],
                keywords: ["Group 1", "alkali metals", "lithium", "sodium", "potassium", "properties"]
              },
              {
                id: "2.1.2",
                code: "2.2",
                statement: "Understand how the electronic configuration of these elements relates to their position in the periodic table",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "relate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.4.2", "2.1.1"],
                keywords: ["electronic configuration", "periodic table", "Group 1", "outer electron"]
              },
              {
                id: "2.1.3",
                code: "2.3",
                statement: "Know the reactions of lithium, sodium and potassium with water",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.1.1"],
                keywords: ["reactions", "water", "lithium", "sodium", "potassium", "hydrogen gas", "hydroxide"]
              },
              {
                id: "2.1.4",
                code: "2.4",
                statement: "Understand that the reactivity of the Group 1 elements increases going down the group",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.1.3"],
                keywords: ["reactivity", "Group 1", "trend", "increases", "down the group"]
              }
            ],
            practicalWork: ["Group 1 reactions with water", "Flame tests", "Reactivity investigations"],
            mathematicalSkills: ["Trend analysis", "Reaction calculations", "Graph interpretation"]
          },
          {
            id: "2.2",
            name: "Group 7 Elements (Halogens)",
            description: "Properties and reactions of halogens",
            objectives: [
              {
                id: "2.2.1",
                code: "2.5",
                statement: "Know the colours, physical states and trends in physical properties of chlorine, bromine and iodine",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.4.1"],
                keywords: ["Group 7", "halogens", "chlorine", "bromine", "iodine", "colours", "physical states", "trends"]
              },
              {
                id: "2.2.2",
                code: "2.6",
                statement: "Use knowledge of trends in Group 7 to predict the properties of other halogens",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["use", "predict"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.2.1"],
                keywords: ["trends", "Group 7", "predict", "properties", "halogens"]
              },
              {
                id: "2.2.3",
                code: "2.7",
                statement: "Understand how displacement reactions involving halogens and halides provide evidence for the trend in reactivity",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.2.1"],
                keywords: ["displacement reactions", "halogens", "halides", "reactivity", "evidence"]
              },
              {
                id: "2.2.4",
                code: "2.8",
                statement: "Know the reactions of chlorine and bromine with potassium iodide solution",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["2.2.3"],
                keywords: ["reactions", "chlorine", "bromine", "potassium iodide", "displacement"]
              }
            ],
            practicalWork: ["Halogen displacement reactions", "Halogen properties investigation", "Halide tests"],
            mathematicalSkills: ["Reactivity series", "Trend analysis", "Reaction predictions"]
          },
          {
            id: "2.3",
            name: "Oxygen and Oxides",
            description: "Properties of oxygen and oxide classification",
            objectives: [
              {
                id: "2.3.1",
                code: "2.9",
                statement: "Know the chemical test for oxygen",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["oxygen", "chemical test", "glowing splint", "relights"]
              },
              {
                id: "2.3.2",
                code: "2.10",
                statement: "Understand how metals and non-metals react with oxygen",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.3.1"],
                keywords: ["metals", "non-metals", "oxygen", "reactions", "oxides", "combustion"]
              },
              {
                id: "2.3.3",
                code: "2.11",
                statement: "Describe the reactions of metal oxides with water and with dilute acids",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.3.2"],
                keywords: ["metal oxides", "water", "dilute acids", "reactions", "basic oxides"]
              },
              {
                id: "2.3.4",
                code: "2.12",
                statement: "Describe the thermal decomposition of metal carbonates",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.3.2"],
                keywords: ["thermal decomposition", "metal carbonates", "carbon dioxide", "metal oxides"]
              }
            ],
            practicalWork: ["Oxygen preparation and testing", "Oxide reactions", "Thermal decomposition experiments"],
            mathematicalSkills: ["Gas collection calculations", "Decomposition equations", "Yield calculations"]
          },
          {
            id: "2.4",
            name: "Hydrogen and Water",
            description: "Properties and tests for hydrogen and water",
            objectives: [
              {
                id: "2.4.1",
                code: "2.15",
                statement: "Know the chemical test for hydrogen",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["hydrogen", "chemical test", "burning splint", "squeaky pop"]
              },
              {
                id: "2.4.2",
                code: "2.16",
                statement: "Understand how hydrogen is produced industrially and in the laboratory",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.4.1"],
                keywords: ["hydrogen production", "industrial", "laboratory", "electrolysis", "metal-acid reactions"]
              },
              {
                id: "2.4.3",
                code: "2.17",
                statement: "Know the chemical test for water and distinguish between pure water and sea water",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "distinguish"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["water test", "anhydrous copper sulfate", "pure water", "sea water", "cobalt chloride"]
              }
            ],
            practicalWork: ["Hydrogen preparation and testing", "Water tests", "Electrolysis experiments"],
            mathematicalSkills: ["Gas calculations", "Electrolysis calculations", "Concentration measurements"]
          },
          {
            id: "2.5",
            name: "Reactivity Series",
            description: "Metal reactivity and displacement reactions",
            objectives: [
              {
                id: "2.5.1",
                code: "2.18",
                statement: "Know the order of reactivity of metals: potassium, sodium, lithium, calcium, magnesium, aluminium, zinc, iron, copper, silver, gold",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "recall"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["reactivity series", "metals", "order", "potassium", "sodium", "lithium", "calcium", "magnesium", "aluminium", "zinc", "iron", "copper", "silver", "gold"]
              },
              {
                id: "2.5.2",
                code: "2.19",
                statement: "Understand how reactions with water and dilute acids can be used to deduce the order of reactivity of metals",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "deduce"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.5.1"],
                keywords: ["reactions", "water", "dilute acids", "order of reactivity", "metals", "evidence"]
              },
              {
                id: "2.5.3",
                code: "2.20",
                statement: "Understand how displacement reactions can be used to deduce the order of reactivity of metals",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "deduce"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.5.1"],
                keywords: ["displacement reactions", "order of reactivity", "metals", "metal salts", "evidence"]
              }
            ],
            practicalWork: ["Metal reactivity investigations", "Displacement experiments", "Reactivity series construction"],
            mathematicalSkills: ["Reactivity predictions", "Displacement calculations", "Trend analysis"]
          },
          {
            id: "2.6",
            name: "Extraction and Uses of Metals",
            description: "Metal extraction methods and applications",
            objectives: [
              {
                id: "2.6.1",
                code: "2.21",
                statement: "Understand the relationship between the method of extraction of a metal and its position in the reactivity series",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "relate"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.5.1"],
                keywords: ["extraction methods", "reactivity series", "reduction", "electrolysis", "native metals"]
              },
              {
                id: "2.6.2",
                code: "2.22",
                statement: "Know that some metals, such as aluminium, are extracted by electrolysis",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.6.1"],
                keywords: ["electrolysis", "aluminium", "extraction", "electric current", "molten ore"]
              },
              {
                id: "2.6.3",
                code: "2.23",
                statement: "Know that some metals, such as iron, are extracted by reduction",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.6.1"],
                keywords: ["reduction", "iron", "extraction", "carbon", "blast furnace", "reducing agent"]
              }
            ],
            practicalWork: ["Metal extraction demonstrations", "Electrolysis experiments", "Reduction reactions"],
            mathematicalSkills: ["Extraction calculations", "Electrolysis calculations", "Yield determinations"]
          },
          {
            id: "2.7",
            name: "Acids and Alkalis",
            description: "Properties and reactions of acids and alkalis",
            objectives: [
              {
                id: "2.7.1",
                code: "2.29",
                statement: "Understand how to use the pH scale from 0-14 to classify solutions as strongly acidic, weakly acidic, neutral, weakly alkaline or strongly alkaline",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "classify"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["pH scale", "acidic", "alkaline", "neutral", "strongly acidic", "weakly acidic", "strongly alkaline", "weakly alkaline"]
              },
              {
                id: "2.7.2",
                code: "2.30",
                statement: "Describe the use of universal indicator to measure approximate pH",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["2.7.1"],
                keywords: ["universal indicator", "pH measurement", "colour changes", "approximate pH"]
              },
              {
                id: "2.7.3",
                code: "2.31",
                statement: "Know the reactions of acids with metals to produce a salt plus hydrogen",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.7.1"],
                keywords: ["acids", "metals", "reactions", "salt", "hydrogen", "metal salt"]
              },
              {
                id: "2.7.4",
                code: "2.32",
                statement: "Know the reactions of acids with metal oxides to produce a salt plus water",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.7.1"],
                keywords: ["acids", "metal oxides", "reactions", "salt", "water", "neutralisation"]
              },
              {
                id: "2.7.5",
                code: "2.33",
                statement: "Know the reactions of acids with metal hydroxides to produce a salt plus water",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.7.1"],
                keywords: ["acids", "metal hydroxides", "reactions", "salt", "water", "neutralisation"]
              },
              {
                id: "2.7.6",
                code: "2.34",
                statement: "Know the reactions of acids with metal carbonates to produce a salt plus water plus carbon dioxide",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.7.1"],
                keywords: ["acids", "metal carbonates", "reactions", "salt", "water", "carbon dioxide"]
              }
            ],
            practicalWork: ["pH measurements", "Acid-metal reactions", "Neutralisation experiments", "Gas collection"],
            mathematicalSkills: ["pH calculations", "Neutralisation calculations", "Gas volume calculations"]
          },
          {
            id: "2.8",
            name: "Chemical Tests",
            description: "Identification tests for ions and gases",
            objectives: [
              {
                id: "2.8.1",
                code: "2.21",
                statement: "Know the chemical test for ammonia, including details of preparation and collection",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["ammonia", "chemical test", "preparation", "collection", "litmus paper", "alkaline"]
              },
              {
                id: "2.8.2",
                code: "2.22",
                statement: "Know the chemical test for carbon dioxide",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["carbon dioxide", "chemical test", "limewater", "milky", "precipitate"]
              },
              {
                id: "2.8.3",
                code: "2.23",
                statement: "Know the chemical test for chlorine",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["chlorine", "chemical test", "litmus paper", "bleaching", "damp"]
              },
              {
                id: "2.8.4",
                code: "2.24",
                statement: "Know the chemical test for oxygen",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["oxygen", "chemical test", "glowing splint", "relights"]
              }
            ],
            practicalWork: ["Gas identification tests", "Ion testing", "Qualitative analysis"],
            mathematicalSkills: ["Test interpretation", "Observation recording", "Result analysis"]
          }
        ]
      },
      {
        id: "igcse-topic-3",
        name: "Physical Chemistry",
        description: "Energy changes, reaction rates, and equilibrium",
        specificationCode: "3",
        timeAllocation: 35,
        assessmentNotes: "Includes quantitative analysis and mathematical calculations",
        subtopics: [
          {
            id: "3.1",
            name: "Energetics",
            description: "Energy changes in chemical reactions",
            objectives: [
              {
                id: "3.1.1",
                code: "3.1",
                statement: "Understand the difference between exothermic and endothermic reactions",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "distinguish"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["exothermic", "endothermic", "energy changes", "temperature", "heat", "reactions"]
              },
              {
                id: "3.1.2",
                code: "3.2",
                statement: "Know that bond breaking is endothermic and bond making is exothermic",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["3.1.1"],
                keywords: ["bond breaking", "bond making", "endothermic", "exothermic", "energy", "bonds"]
              },
              {
                id: "3.1.3",
                code: "3.3",
                statement: "Use bond energies to calculate the enthalpy change for a reaction",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["use", "calculate"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["3.1.2"],
                keywords: ["bond energies", "enthalpy change", "calculations", "energy diagrams", "reaction enthalpy"]
              }
            ],
            practicalWork: ["Temperature change experiments", "Calorimetry investigations", "Energy diagrams"],
            mathematicalSkills: ["Enthalpy calculations", "Bond energy calculations", "Energy diagrams"]
          },
          {
            id: "3.2",
            name: "Rates of Reaction",
            description: "Factors affecting reaction rates",
            objectives: [
              {
                id: "3.2.1",
                code: "3.6",
                statement: "Know that chemical reactions occur when reactant particles collide with sufficient energy",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "understand"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["collision theory", "activation energy", "particles", "sufficient energy", "reactions"]
              },
              {
                id: "3.2.2",
                code: "3.7",
                statement: "Know the factors that affect the rate of chemical reactions",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "identify"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["3.2.1"],
                keywords: ["reaction rate", "factors", "concentration", "temperature", "surface area", "catalysts"]
              },
              {
                id: "3.2.3",
                code: "3.10",
                statement: "Describe the effects of changes in surface area, concentration, pressure, temperature and catalysts on reaction rate",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 6,
                prerequisiteObjectives: ["3.2.2"],
                keywords: ["surface area", "concentration", "pressure", "temperature", "catalysts", "reaction rate", "effects"]
              }
            ],
            practicalWork: ["Rate experiments", "Catalyst investigations", "Collision theory demonstrations"],
            mathematicalSkills: ["Rate calculations", "Graph analysis", "Collision frequency calculations"]
          },
          {
            id: "3.3",
            name: "Reversible Reactions and Equilibrium",
            description: "Dynamic equilibrium and Le Chatelier's principle",
            objectives: [
              {
                id: "3.3.1",
                code: "3.13",
                statement: "Understand that some chemical reactions are reversible",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "recognize"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["reversible reactions", "forward reaction", "reverse reaction", "equilibrium"]
              },
              {
                id: "3.3.2",
                code: "3.14",
                statement: "Know that a reversible reaction can reach dynamic equilibrium in a closed system",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "understand"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["3.3.1"],
                keywords: ["dynamic equilibrium", "closed system", "reversible reactions", "equal rates"]
              },
              {
                id: "3.3.3",
                code: "3.17",
                statement: "Understand how changing conditions affects the position of equilibrium (Le Chatelier's principle)",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "predict"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["3.3.2"],
                keywords: ["Le Chatelier's principle", "equilibrium position", "temperature", "pressure", "concentration"]
              }
            ],
            practicalWork: ["Equilibrium demonstrations", "Le Chatelier investigations", "Industrial applications"],
            mathematicalSkills: ["Equilibrium calculations", "Condition effects", "Yield predictions"]
          }
        ]
      },
      {
        id: "igcse-topic-4",
        name: "Organic Chemistry",
        description: "Carbon compounds and their reactions",
        specificationCode: "4",
        timeAllocation: 30,
        assessmentNotes: "Includes nomenclature, structure, and reaction mechanisms",
        subtopics: [
          {
            id: "4.1",
            name: "Introduction to Organic Chemistry",
            description: "Basic concepts and nomenclature",
            objectives: [
              {
                id: "4.1.1",
                code: "4.1",
                statement: "Know that a homologous series is a group of organic compounds with the same functional group",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "define"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["homologous series", "functional group", "organic compounds", "similar properties"]
              },
              {
                id: "4.1.2",
                code: "4.2",
                statement: "Understand what is meant by the general formula of a homologous series",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.1.1"],
                keywords: ["general formula", "homologous series", "algebraic formula", "pattern"]
              },
              {
                id: "4.1.3",
                code: "4.4",
                statement: "Understand what is meant by structural and displayed formulae",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "draw"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.1.2"],
                keywords: ["structural formula", "displayed formula", "bonds", "atoms", "arrangement"]
              }
            ],
            practicalWork: ["Molecular model building", "Formula writing practice", "Homologous series investigation"],
            mathematicalSkills: ["Formula calculations", "Molecular mass calculations", "Structural analysis"]
          },
          {
            id: "4.2",
            name: "Alkanes",
            description: "Saturated hydrocarbons",
            objectives: [
              {
                id: "4.2.1",
                code: "4.5",
                statement: "Know the general formula for alkanes",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.1.2"],
                keywords: ["alkanes", "general formula", "CnH2n+2", "saturated hydrocarbons"]
              },
              {
                id: "4.2.2",
                code: "4.10",
                statement: "Know the products of complete combustion of alkanes",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.2.1"],
                keywords: ["complete combustion", "alkanes", "carbon dioxide", "water", "oxygen"]
              }
            ],
            practicalWork: ["Alkane combustion experiments", "Hydrocarbon testing", "Fuel investigations"],
            mathematicalSkills: ["Combustion calculations", "Hydrocarbon analysis", "Equation balancing"]
          },
          {
            id: "4.3",
            name: "Alkenes",
            description: "Unsaturated hydrocarbons",
            objectives: [
              {
                id: "4.3.1",
                code: "4.11",
                statement: "Know the general formula for alkenes",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.1.2"],
                keywords: ["alkenes", "general formula", "CnH2n", "unsaturated hydrocarbons"]
              },
              {
                id: "4.3.2",
                code: "4.15",
                statement: "Know the test for unsaturation using bromine water",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.3.1"],
                keywords: ["unsaturation test", "bromine water", "alkenes", "decolourisation", "addition reaction"]
              }
            ],
            practicalWork: ["Alkene testing", "Bromine water tests", "Unsaturation investigations"],
            mathematicalSkills: ["Alkene calculations", "Addition reactions", "Molecular formulae"]
          },
          {
            id: "4.4",
            name: "Alcohols",
            description: "Hydroxyl functional group compounds",
            objectives: [
              {
                id: "4.4.1",
                code: "4.17",
                statement: "Know the general formula for alcohols",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.1.2"],
                keywords: ["alcohols", "general formula", "CnH2n+1OH", "hydroxyl group"]
              },
              {
                id: "4.4.2",
                code: "4.22",
                statement: "Know that alcohols can be produced by fermentation",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.4.1"],
                keywords: ["fermentation", "alcohols", "ethanol", "yeast", "glucose", "anaerobic"]
              }
            ],
            practicalWork: ["Alcohol testing", "Fermentation experiments", "Alcohol production"],
            mathematicalSkills: ["Alcohol calculations", "Fermentation equations", "Percentage calculations"]
          },
          {
            id: "4.5",
            name: "Carboxylic Acids",
            description: "Organic acids with carboxyl group",
            objectives: [
              {
                id: "4.5.1",
                code: "4.25",
                statement: "Know the general formula for carboxylic acids",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.1.2"],
                keywords: ["carboxylic acids", "general formula", "CnH2n+1COOH", "carboxyl group"]
              },
              {
                id: "4.5.2",
                code: "4.26",
                statement: "Know the reactions of carboxylic acids with metals and metal carbonates",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.5.1"],
                keywords: ["carboxylic acids", "reactions", "metals", "metal carbonates", "salt", "hydrogen", "carbon dioxide"]
              }
            ],
            practicalWork: ["Carboxylic acid reactions", "Acid strength testing", "Organic acid preparations"],
            mathematicalSkills: ["Acid calculations", "Reaction equations", "Yield calculations"]
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
          name: "Advanced Inorganic and Physical Chemistry (9CH0/01)",
          duration: 105,
          marks: 90,
          questionTypes: ["multiple choice", "short answer", "extended response"],
          topicCoverage: ["topic-1", "topic-2", "topic-3", "topic-4", "topic-5", "topic-8", "topic-9", "topic-10", "topic-11"]
        },
        {
          paperNumber: 2,
          name: "Advanced Organic and Physical Chemistry (9CH0/02)",
          duration: 105,
          marks: 90,
          questionTypes: ["multiple choice", "short answer", "extended response"],
          topicCoverage: ["topic-1", "topic-5", "topic-6", "topic-7", "topic-12", "topic-13", "topic-16", "topic-17", "topic-18", "topic-19"]
        },
        {
          paperNumber: 3,
          name: "General and Practical Principles in Chemistry (9CH0/03)",
          duration: 150,
          marks: 120,
          questionTypes: ["structured questions", "extended response", "practical analysis"],
          topicCoverage: ["topic-1", "topic-2", "topic-3", "topic-4", "topic-5", "topic-6", "topic-7", "topic-8", "topic-9", "topic-10", "topic-11", "topic-12", "topic-13", "topic-14", "topic-15", "topic-16", "topic-17", "topic-18", "topic-19"]
        }
      ]
    },
    topics: [
      {
        id: "topic-1",
        name: "Atomic Structure and the Periodic Table",
        description: "Advanced atomic theory, electronic structure, and periodic trends",
        specificationCode: "1",
        timeAllocation: 20,
        assessmentNotes: "Foundation topic with mathematical calculations and mass spectrometry",
        subtopics: [
          {
            id: "1.1",
            name: "Atomic Structure and Mass Spectrometry",
            description: "Structure of atoms, isotopes, and mass spectrometry applications",
            objectives: [
              {
                id: "1.1.1",
                code: "1.1",
                statement: "Know the structure of the atom in terms of electrons, protons and neutrons",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["atomic structure", "electrons", "protons", "neutrons", "nucleus", "electron shells"]
              },
              {
                id: "1.1.2",
                code: "1.2",
                statement: "Understand isotopes and their significance in chemistry",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["isotopes", "atomic mass", "mass number", "relative atomic mass", "applications"]
              },
              {
                id: "1.1.3",
                code: "1.3",
                statement: "Understand how mass spectrometry is used to determine relative atomic mass and analyze compounds",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "interpret"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.1.2"],
                keywords: ["mass spectrometry", "relative atomic mass", "molecular ion", "fragmentation", "isotope patterns"]
              }
            ],
            practicalWork: ["Mass spectrometry analysis", "Isotope investigations", "Atomic mass calculations"],
            mathematicalSkills: ["Relative atomic mass calculations", "Mass spectrum interpretation", "Isotope abundance calculations"]
          },
          {
            id: "1.2",
            name: "Electronic Configuration and Ionisation Energy",
            description: "Electronic structure and ionisation energy trends",
            objectives: [
              {
                id: "1.2.1",
                code: "1.4",
                statement: "Be able to determine electronic configurations using s, p, d notation up to element 36",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["determine", "apply"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["electronic configuration", "s orbital", "p orbital", "d orbital", "aufbau principle", "Hund's rule"]
              },
              {
                id: "1.2.2",
                code: "1.5",
                statement: "Understand successive ionisation energies and their significance",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["ionisation energy", "successive ionisation", "electronic structure", "shielding", "nuclear charge"]
              }
            ],
            practicalWork: ["Electronic configuration exercises", "Ionisation energy data analysis", "Periodic trend investigations"],
            mathematicalSkills: ["Electronic configuration notation", "Ionisation energy calculations", "Graph interpretation"]
          },
          {
            id: "1.3",
            name: "Periodic Trends",
            description: "Trends in atomic and ionic properties across the periodic table",
            objectives: [
              {
                id: "1.3.1",
                code: "1.6",
                statement: "Understand periodic trends in atomic radius, ionisation energy and electronegativity",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.2.2"],
                keywords: ["atomic radius", "ionisation energy", "electronegativity", "periodic trends", "periods", "groups"]
              }
            ],
            practicalWork: ["Periodic trends investigation", "Property measurements", "Trend analysis"],
            mathematicalSkills: ["Trend analysis", "Data interpretation", "Periodic calculations"]
          }
        ]
      },
      {
        id: "topic-2",
        name: "Bonding and Structure",
        description: "Chemical bonding theory, molecular shapes, and intermolecular forces",
        specificationCode: "2",
        timeAllocation: 25,
        assessmentNotes: "Includes VSEPR theory, bonding models, and molecular polarity",
        subtopics: [
          {
            id: "2.1",
            name: "Ionic Bonding and Lattice Energy",
            description: "Ionic compounds, lattice structures, and Born-Haber cycles",
            objectives: [
              {
                id: "2.1.1",
                code: "2.1",
                statement: "Understand ionic bonding and the factors affecting lattice energy",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["ionic bonding", "lattice energy", "Born-Haber cycle", "electrostatic attraction", "ionic radius"]
              },
              {
                id: "2.1.2",
                code: "2.2",
                statement: "Know how to construct and use Born-Haber cycles",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["construct", "use"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["2.1.1"],
                keywords: ["Born-Haber cycle", "lattice energy", "enthalpy changes", "ionic compounds", "thermodynamics"]
              }
            ],
            practicalWork: ["Ionic lattice models", "Born-Haber cycle construction", "Lattice energy calculations"],
            mathematicalSkills: ["Born-Haber cycle calculations", "Lattice energy calculations", "Enthalpy calculations"]
          },
          {
            id: "2.2",
            name: "Covalent Bonding and Molecular Shapes",
            description: "Covalent bonding theory, VSEPR theory, and molecular geometry",
            objectives: [
              {
                id: "2.2.1",
                code: "2.3",
                statement: "Understand covalent bonding and how to predict molecular shapes using VSEPR theory",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "predict"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["covalent bonding", "VSEPR theory", "molecular shapes", "bond angles", "electron pairs"]
              },
              {
                id: "2.2.2",
                code: "2.4",
                statement: "Understand polarization and the continuum of bonding",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.2.1"],
                keywords: ["polarization", "electronegativity", "bond polarity", "dipole moments", "bonding continuum"]
              }
            ],
            practicalWork: ["Molecular model building", "Shape predictions", "Polarity investigations"],
            mathematicalSkills: ["Bond angle calculations", "Molecular geometry", "Dipole moment calculations"]
          },
          {
            id: "2.3",
            name: "Intermolecular Forces",
            description: "Van der Waals forces, hydrogen bonding, and their effects on properties",
            objectives: [
              {
                id: "2.3.1",
                code: "2.5",
                statement: "Understand intermolecular forces and their effects on physical properties",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.2.2"],
                keywords: ["intermolecular forces", "van der Waals", "hydrogen bonding", "dipole interactions", "physical properties"]
              }
            ],
            practicalWork: ["Intermolecular force demonstrations", "Boiling point investigations", "Hydrogen bonding studies"],
            mathematicalSkills: ["Property correlations", "Trend analysis", "Force strength comparisons"]
          }
        ]
      },
      {
        id: "topic-3",
        name: "Redox I",
        description: "Introduction to oxidation and reduction reactions",
        specificationCode: "3",
        timeAllocation: 15,
        assessmentNotes: "Foundation redox concepts and oxidation states",
        subtopics: [
          {
            id: "3.1",
            name: "Oxidation and Reduction",
            description: "Basic redox concepts and oxidation state rules",
            objectives: [
              {
                id: "3.1.1",
                code: "3.1",
                statement: "Understand oxidation and reduction in terms of electron transfer and oxidation states",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["oxidation", "reduction", "electron transfer", "oxidation states", "redox reactions"]
              },
              {
                id: "3.1.2",
                code: "3.2",
                statement: "Know how to assign oxidation states and balance redox equations",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["assign", "balance"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["3.1.1"],
                keywords: ["oxidation states", "redox equations", "balancing", "half-equations", "electron counting"]
              }
            ],
            practicalWork: ["Redox reaction demonstrations", "Oxidation state assignments", "Equation balancing"],
            mathematicalSkills: ["Oxidation state calculations", "Redox equation balancing", "Electron counting"]
          }
        ]
      },
      {
        id: "topic-4",
        name: "Inorganic Chemistry and the Periodic Table",
        description: "Group chemistry and periodic trends in inorganic compounds",
        specificationCode: "4",
        timeAllocation: 20,
        assessmentNotes: "Group 2 and Group 7 chemistry with industrial applications",
        subtopics: [
          {
            id: "4.1",
            name: "Group 2 Elements (Alkaline Earth Metals)",
            description: "Properties and reactions of Group 2 elements and their compounds",
            objectives: [
              {
                id: "4.1.1",
                code: "4.1",
                statement: "Know the properties and reactions of Group 2 elements and their compounds",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.3.1"],
                keywords: ["Group 2", "alkaline earth metals", "reactions", "compounds", "solubility", "thermal stability"]
              },
              {
                id: "4.1.2",
                code: "4.2",
                statement: "Understand the trends in Group 2 compounds and their industrial applications",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.1.1"],
                keywords: ["trends", "solubility", "thermal stability", "industrial applications", "uses"]
              }
            ],
            practicalWork: ["Group 2 reactions", "Solubility investigations", "Thermal decomposition"],
            mathematicalSkills: ["Trend analysis", "Solubility calculations", "Thermal stability comparisons"]
          },
          {
            id: "4.2",
            name: "Group 7 Elements (Halogens)",
            description: "Properties and reactions of Group 7 elements and their compounds",
            objectives: [
              {
                id: "4.2.1",
                code: "4.3",
                statement: "Know the properties and reactions of Group 7 elements and their compounds",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.3.1"],
                keywords: ["Group 7", "halogens", "reactions", "compounds", "displacement reactions", "disproportionation"]
              },
              {
                id: "4.2.2",
                code: "4.4",
                statement: "Understand halogen chemistry and industrial processes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.2.1"],
                keywords: ["halogen chemistry", "industrial processes", "water treatment", "bleaching", "reactions"]
              }
            ],
            practicalWork: ["Halogen reactions", "Displacement reactions", "Disproportionation investigations"],
            mathematicalSkills: ["Reactivity series", "Displacement calculations", "Industrial process analysis"]
          }
        ]
      },
      {
        id: "topic-5",
        name: "Formulae, Equations and Amounts of Substance",
        description: "Chemical calculations, stoichiometry, and quantitative analysis",
        specificationCode: "5",
        timeAllocation: 18,
        assessmentNotes: "Foundation for all quantitative chemistry calculations",
        subtopics: [
          {
            id: "5.1",
            name: "Moles and Stoichiometry",
            description: "The mole concept and stoichiometric calculations",
            objectives: [
              {
                id: "5.1.1",
                code: "5.1",
                statement: "Understand the mole concept and perform stoichiometric calculations",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["mole", "Avogadro's constant", "stoichiometry", "molar mass", "calculations"]
              },
              {
                id: "5.1.2",
                code: "5.2",
                statement: "Know how to calculate concentrations and perform solution calculations",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "perform"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["5.1.1"],
                keywords: ["concentration", "molarity", "solutions", "dilutions", "solution calculations"]
              }
            ],
            practicalWork: ["Mole calculations", "Solution preparation", "Concentration measurements"],
            mathematicalSkills: ["Mole calculations", "Stoichiometry", "Solution calculations"]
          },
          {
            id: "5.2",
            name: "Gas Laws and Ideal Gas Equation",
            description: "Gas behavior and calculations",
            objectives: [
              {
                id: "5.2.1",
                code: "5.3",
                statement: "Understand gas laws and the ideal gas equation",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "apply"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["5.1.1"],
                keywords: ["gas laws", "ideal gas equation", "pressure", "volume", "temperature", "molar volume"]
              }
            ],
            practicalWork: ["Gas law investigations", "Molar volume measurements", "Gas calculations"],
            mathematicalSkills: ["Gas law calculations", "Ideal gas equation", "Molar volume calculations"]
          }
        ]
      },
      {
        id: "topic-6",
        name: "Organic Chemistry I",
        description: "Introduction to organic chemistry, alkanes, and alkenes",
        specificationCode: "6",
        timeAllocation: 25,
        assessmentNotes: "Foundation organic chemistry with nomenclature and basic reactions",
        subtopics: [
          {
            id: "6.1",
            name: "Introduction to Organic Chemistry",
            description: "Basic principles, nomenclature, and isomerism",
            objectives: [
              {
                id: "6.1.1",
                code: "6.1",
                statement: "Understand organic chemistry principles including nomenclature and isomerism",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "name"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.2.1"],
                keywords: ["organic chemistry", "nomenclature", "isomerism", "functional groups", "homologous series"]
              }
            ],
            practicalWork: ["Organic model building", "Nomenclature practice", "Isomer identification"],
            mathematicalSkills: ["Molecular formula calculations", "Isomer counting", "Structure determination"]
          },
          {
            id: "6.2",
            name: "Alkanes",
            description: "Saturated hydrocarbons and their reactions",
            objectives: [
              {
                id: "6.2.1",
                code: "6.2",
                statement: "Know the properties and reactions of alkanes",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["6.1.1"],
                keywords: ["alkanes", "combustion", "substitution reactions", "cracking", "petroleum"]
              }
            ],
            practicalWork: ["Alkane combustion", "Substitution reactions", "Cracking demonstrations"],
            mathematicalSkills: ["Combustion calculations", "Substitution mechanisms", "Cracking calculations"]
          },
          {
            id: "6.3",
            name: "Alkenes",
            description: "Unsaturated hydrocarbons and addition reactions",
            objectives: [
              {
                id: "6.3.1",
                code: "6.3",
                statement: "Know the properties and reactions of alkenes",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["6.2.1"],
                keywords: ["alkenes", "addition reactions", "polymerization", "Markovnikov's rule", "alkene tests"]
              }
            ],
            practicalWork: ["Alkene addition reactions", "Polymerization", "Alkene tests"],
            mathematicalSkills: ["Addition reaction calculations", "Polymer calculations", "Mechanism analysis"]
          }
        ]
      },
      {
        id: "topic-7",
        name: "Modern Analytical Techniques I",
        description: "Introduction to analytical chemistry techniques",
        specificationCode: "7",
        timeAllocation: 15,
        assessmentNotes: "Foundation analytical techniques for structure determination",
        subtopics: [
          {
            id: "7.1",
            name: "Mass Spectrometry",
            description: "Mass spectrometry principles and applications in organic chemistry",
            objectives: [
              {
                id: "7.1.1",
                code: "7.1",
                statement: "Understand mass spectrometry and its applications in organic structure determination",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "interpret"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.1.3"],
                keywords: ["mass spectrometry", "molecular ion", "fragmentation", "base peak", "structural determination"]
              }
            ],
            practicalWork: ["Mass spectrum interpretation", "Fragmentation analysis", "Molecular weight determination"],
            mathematicalSkills: ["Mass spectrum analysis", "Fragmentation patterns", "Molecular weight calculations"]
          },
          {
            id: "7.2",
            name: "Infrared Spectroscopy",
            description: "IR spectroscopy for functional group identification",
            objectives: [
              {
                id: "7.2.1",
                code: "7.2",
                statement: "Understand IR spectroscopy and its use in identifying functional groups",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "identify"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["6.1.1"],
                keywords: ["IR spectroscopy", "functional groups", "wavenumbers", "fingerprint region", "bond vibrations"]
              }
            ],
            practicalWork: ["IR spectrum interpretation", "Functional group identification", "Compound identification"],
            mathematicalSkills: ["Wavenumber analysis", "Peak identification", "Functional group correlation"]
          }
        ]
      },
      {
        id: "topic-8",
        name: "Energetics I",
        description: "Thermodynamics and energy changes in chemical reactions",
        specificationCode: "8",
        timeAllocation: 20,
        assessmentNotes: "Foundation thermodynamics with calorimetry and Hess's Law",
        subtopics: [
          {
            id: "8.1",
            name: "Enthalpy Changes",
            description: "Types of enthalpy changes and their measurement",
            objectives: [
              {
                id: "8.1.1",
                code: "8.1",
                statement: "Understand different types of enthalpy changes and calorimetry",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["5.1.1"],
                keywords: ["enthalpy changes", "calorimetry", "standard conditions", "formation", "combustion"]
              }
            ],
            practicalWork: ["Calorimetry experiments", "Enthalpy measurements", "Heat capacity calculations"],
            mathematicalSkills: ["Enthalpy calculations", "Calorimetry calculations", "Heat capacity calculations"]
          },
          {
            id: "8.2",
            name: "Hess's Law",
            description: "Hess's Law and enthalpy cycles",
            objectives: [
              {
                id: "8.2.1",
                code: "8.2",
                statement: "Understand Hess's Law and its applications",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "apply"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["8.1.1"],
                keywords: ["Hess's Law", "enthalpy cycles", "indirect determination", "state function"]
              }
            ],
            practicalWork: ["Hess's Law experiments", "Enthalpy cycle construction", "Indirect enthalpy determination"],
            mathematicalSkills: ["Hess's Law calculations", "Enthalpy cycle construction", "Energy calculations"]
          }
        ]
      },
      {
        id: "topic-9",
        name: "Kinetics I",
        description: "Rate of reaction and factors affecting reaction rates",
        specificationCode: "9",
        timeAllocation: 18,
        assessmentNotes: "Foundation kinetics with collision theory and rate factors",
        subtopics: [
          {
            id: "9.1",
            name: "Rate of Reaction",
            description: "Definition and measurement of reaction rates",
            objectives: [
              {
                id: "9.1.1",
                code: "9.1",
                statement: "Understand the concept of rate of reaction and how it can be measured",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "measure"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["5.1.1"],
                keywords: ["rate of reaction", "measurement", "concentration", "time", "rate expression"]
              }
            ],
            practicalWork: ["Rate measurements", "Rate experiments", "Graph analysis"],
            mathematicalSkills: ["Rate calculations", "Graph interpretation", "Tangent calculations"]
          },
          {
            id: "9.2",
            name: "Collision Theory and Activation Energy",
            description: "Collision theory and activation energy concept",
            objectives: [
              {
                id: "9.2.1",
                code: "9.2",
                statement: "Understand collision theory and the concept of activation energy",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["9.1.1"],
                keywords: ["collision theory", "activation energy", "Maxwell-Boltzmann distribution", "catalysts"]
              }
            ],
            practicalWork: ["Collision theory demonstrations", "Activation energy investigations", "Catalyst studies"],
            mathematicalSkills: ["Arrhenius equation", "Activation energy calculations", "Distribution curves"]
          }
        ]
      },
      {
        id: "topic-10",
        name: "Equilibrium I",
        description: "Chemical equilibrium and Le Chatelier's principle",
        specificationCode: "10",
        timeAllocation: 16,
        assessmentNotes: "Foundation equilibrium concepts with Kc calculations",
        subtopics: [
          {
            id: "10.1",
            name: "Dynamic Equilibrium",
            description: "Equilibrium concepts and Le Chatelier's principle",
            objectives: [
              {
                id: "10.1.1",
                code: "10.1",
                statement: "Understand dynamic equilibrium and Le Chatelier's principle",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "predict"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["5.1.1"],
                keywords: ["dynamic equilibrium", "Le Chatelier's principle", "reversible reactions", "equilibrium position"]
              }
            ],
            practicalWork: ["Equilibrium demonstrations", "Le Chatelier investigations", "Equilibrium studies"],
            mathematicalSkills: ["Equilibrium calculations", "Le Chatelier predictions", "Equilibrium constants"]
          },
          {
            id: "10.2",
            name: "Equilibrium Constant Kc",
            description: "Equilibrium constant expressions and calculations",
            objectives: [
              {
                id: "10.2.1",
                code: "10.2",
                statement: "Understand equilibrium constants and their calculations",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["10.1.1"],
                keywords: ["equilibrium constant", "Kc", "concentration", "equilibrium expression", "calculations"]
              }
            ],
            practicalWork: ["Kc determinations", "Equilibrium constant measurements", "Equilibrium calculations"],
            mathematicalSkills: ["Kc calculations", "Equilibrium expressions", "Concentration calculations"]
          }
        ]
      },
      {
        id: "topic-11",
        name: "Equilibrium II",
        description: "Advanced equilibrium concepts and gas phase equilibria",
        specificationCode: "11",
        timeAllocation: 14,
        assessmentNotes: "Advanced equilibrium with Kp and heterogeneous equilibria",
        subtopics: [
          {
            id: "11.1",
            name: "Gas Phase Equilibria",
            description: "Equilibrium constant Kp and gas phase reactions",
            objectives: [
              {
                id: "11.1.1",
                code: "11.1",
                statement: "Understand gas phase equilibria and Kp calculations",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["10.2.1"],
                keywords: ["gas phase equilibria", "Kp", "partial pressures", "gas equilibrium", "pressure calculations"]
              }
            ],
            practicalWork: ["Gas equilibrium studies", "Kp measurements", "Pressure calculations"],
            mathematicalSkills: ["Kp calculations", "Partial pressure calculations", "Gas equilibrium analysis"]
          }
        ]
      },
      {
        id: "topic-12",
        name: "Acid-Base Equilibria",
        description: "Acid-base theory, pH calculations, and buffer solutions",
        specificationCode: "12",
        timeAllocation: 22,
        assessmentNotes: "Comprehensive acid-base chemistry with titrations and buffers",
        subtopics: [
          {
            id: "12.1",
            name: "Acid-Base Theory and pH",
            description: "Brønsted-Lowry theory and pH calculations",
            objectives: [
              {
                id: "12.1.1",
                code: "12.1",
                statement: "Understand Brønsted-Lowry acid-base theory and pH calculations",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["10.2.1"],
                keywords: ["Brønsted-Lowry", "pH", "pKa", "Ka", "acid-base theory", "weak acids"]
              }
            ],
            practicalWork: ["pH measurements", "Acid-base titrations", "Ka determinations"],
            mathematicalSkills: ["pH calculations", "Ka calculations", "pKa calculations"]
          },
          {
            id: "12.2",
            name: "Buffer Solutions",
            description: "Buffer solutions and their applications",
            objectives: [
              {
                id: "12.2.1",
                code: "12.2",
                statement: "Understand buffer solutions and their pH calculations",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["12.1.1"],
                keywords: ["buffer solutions", "Henderson-Hasselbalch", "buffer capacity", "pH control"]
              }
            ],
            practicalWork: ["Buffer preparation", "Buffer studies", "pH control investigations"],
            mathematicalSkills: ["Buffer calculations", "Henderson-Hasselbalch equation", "pH calculations"]
          },
          {
            id: "12.3",
            name: "Titration Curves",
            description: "Acid-base titration curves and indicators",
            objectives: [
              {
                id: "12.3.1",
                code: "12.3",
                statement: "Understand titration curves and indicator selection",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "interpret"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["12.1.1"],
                keywords: ["titration curves", "indicators", "equivalence point", "end point", "strong acids", "weak acids"]
              }
            ],
            practicalWork: ["Titration curve construction", "Indicator studies", "Equivalence point determination"],
            mathematicalSkills: ["Titration calculations", "Curve analysis", "Indicator selection"]
          }
        ]
      },
      {
        id: "topic-13",
        name: "Energetics II",
        description: "Advanced thermodynamics including entropy and Gibbs free energy",
        specificationCode: "13",
        timeAllocation: 18,
        assessmentNotes: "Advanced thermodynamics with spontaneity and feasibility",
        subtopics: [
          {
            id: "13.1",
            name: "Entropy and Gibbs Free Energy",
            description: "Entropy, Gibbs free energy, and thermodynamic feasibility",
            objectives: [
              {
                id: "13.1.1",
                code: "13.1",
                statement: "Understand entropy, Gibbs free energy, and thermodynamic feasibility",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["8.2.1"],
                keywords: ["entropy", "Gibbs free energy", "spontaneity", "feasibility", "disorder"]
              }
            ],
            practicalWork: ["Entropy calculations", "Gibbs free energy studies", "Feasibility predictions"],
            mathematicalSkills: ["Entropy calculations", "Gibbs free energy calculations", "Feasibility analysis"]
          },
          {
            id: "13.2",
            name: "Lattice Energy and Born-Haber Cycles",
            description: "Advanced Born-Haber cycles and lattice energy applications",
            objectives: [
              {
                id: "13.2.1",
                code: "13.2",
                statement: "Understand advanced Born-Haber cycles and lattice energy calculations",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.1.2"],
                keywords: ["lattice energy", "Born-Haber cycles", "ionic compounds", "thermodynamic cycles"]
              }
            ],
            practicalWork: ["Advanced Born-Haber cycles", "Lattice energy calculations", "Ionic compound analysis"],
            mathematicalSkills: ["Advanced Born-Haber calculations", "Lattice energy analysis", "Thermodynamic cycles"]
          }
        ]
      },
      {
        id: "topic-14",
        name: "Redox II",
        description: "Advanced redox chemistry including electrochemistry",
        specificationCode: "14",
        timeAllocation: 20,
        assessmentNotes: "Advanced redox with electrode potentials and electrochemical cells",
        subtopics: [
          {
            id: "14.1",
            name: "Electrode Potentials",
            description: "Standard electrode potentials and electrochemical cells",
            objectives: [
              {
                id: "14.1.1",
                code: "14.1",
                statement: "Understand standard electrode potentials and electrochemical cells",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["3.1.2"],
                keywords: ["electrode potentials", "standard conditions", "electrochemical cells", "cell emf", "feasibility"]
              }
            ],
            practicalWork: ["Electrochemical cell construction", "Electrode potential measurements", "Cell emf calculations"],
            mathematicalSkills: ["Electrode potential calculations", "Cell emf calculations", "Feasibility predictions"]
          },
          {
            id: "14.2",
            name: "Redox Titrations",
            description: "Redox titrations and quantitative analysis",
            objectives: [
              {
                id: "14.2.1",
                code: "14.2",
                statement: "Understand redox titrations and their calculations",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["14.1.1"],
                keywords: ["redox titrations", "manganate(VII)", "dichromate(VI)", "iodine-thiosulfate", "calculations"]
              }
            ],
            practicalWork: ["Redox titrations", "Manganate(VII) titrations", "Iodine-thiosulfate titrations"],
            mathematicalSkills: ["Redox titration calculations", "Stoichiometry", "Quantitative analysis"]
          }
        ]
      },
      {
        id: "topic-15",
        name: "Transition Metals",
        description: "Properties and reactions of transition metals and their compounds",
        specificationCode: "15",
        timeAllocation: 24,
        assessmentNotes: "Comprehensive transition metal chemistry with complex ions and catalysis",
        subtopics: [
          {
            id: "15.1",
            name: "Transition Metal Properties",
            description: "General properties and characteristics of transition metals",
            objectives: [
              {
                id: "15.1.1",
                code: "15.1",
                statement: "Understand the general properties of transition metals",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["transition metals", "d-block", "variable oxidation states", "colored compounds", "catalysis"]
              }
            ],
            practicalWork: ["Transition metal reactions", "Oxidation state investigations", "Color studies"],
            mathematicalSkills: ["Oxidation state calculations", "Electronic configurations", "Property correlations"]
          },
          {
            id: "15.2",
            name: "Complex Ions",
            description: "Formation and properties of complex ions",
            objectives: [
              {
                id: "15.2.1",
                code: "15.2",
                statement: "Understand complex ion formation and properties",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["15.1.1"],
                keywords: ["complex ions", "ligands", "coordination number", "shapes", "ligand exchange", "stability"]
              }
            ],
            practicalWork: ["Complex ion formation", "Ligand exchange reactions", "Stability studies"],
            mathematicalSkills: ["Complex ion calculations", "Stability constants", "Ligand exchange calculations"]
          },
          {
            id: "15.3",
            name: "Catalysis",
            description: "Transition metals as catalysts in industrial processes",
            objectives: [
              {
                id: "15.3.1",
                code: "15.3",
                statement: "Understand transition metal catalysis and industrial applications",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["15.1.1"],
                keywords: ["catalysis", "heterogeneous", "homogeneous", "industrial processes", "Contact process", "Haber process"]
              }
            ],
            practicalWork: ["Catalysis investigations", "Industrial catalyst studies", "Reaction mechanism studies"],
            mathematicalSkills: ["Catalysis calculations", "Rate enhancement", "Industrial process analysis"]
          }
        ]
      },
      {
        id: "topic-16",
        name: "Kinetics II",
        description: "Advanced kinetics including rate equations and mechanisms",
        specificationCode: "16",
        timeAllocation: 18,
        assessmentNotes: "Advanced kinetics with rate laws and reaction mechanisms",
        subtopics: [
          {
            id: "16.1",
            name: "Rate Equations",
            description: "Rate equations and order of reaction",
            objectives: [
              {
                id: "16.1.1",
                code: "16.1",
                statement: "Understand rate equations and order of reaction",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "determine"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["9.2.1"],
                keywords: ["rate equations", "order of reaction", "rate constant", "half-life", "initial rates"]
              }
            ],
            practicalWork: ["Rate equation determination", "Order of reaction studies", "Half-life measurements"],
            mathematicalSkills: ["Rate equation calculations", "Order determination", "Half-life calculations"]
          },
          {
            id: "16.2",
            name: "Reaction Mechanisms",
            description: "Reaction mechanisms and rate-determining steps",
            objectives: [
              {
                id: "16.2.1",
                code: "16.2",
                statement: "Understand reaction mechanisms and rate-determining steps",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "deduce"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["16.1.1"],
                keywords: ["reaction mechanisms", "rate-determining step", "intermediates", "elementary steps", "pre-equilibrium"]
              }
            ],
            practicalWork: ["Mechanism studies", "Rate-determining step investigations", "Intermediate detection"],
            mathematicalSkills: ["Mechanism analysis", "Rate-determining step calculations", "Kinetic modeling"]
          }
        ]
      },
      {
        id: "topic-17",
        name: "Organic Chemistry II",
        description: "Alcohols, aldehydes, ketones, and carboxylic acids",
        specificationCode: "17",
        timeAllocation: 26,
        assessmentNotes: "Core organic functional groups with mechanisms and synthesis",
        subtopics: [
          {
            id: "17.1",
            name: "Alcohols",
            description: "Properties, reactions, and synthesis of alcohols",
            objectives: [
              {
                id: "17.1.1",
                code: "17.1",
                statement: "Know the properties and reactions of alcohols",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["6.3.1"],
                keywords: ["alcohols", "primary", "secondary", "tertiary", "oxidation", "elimination", "substitution"]
              }
            ],
            practicalWork: ["Alcohol reactions", "Oxidation of alcohols", "Elimination reactions", "Substitution reactions"],
            mathematicalSkills: ["Alcohol reaction calculations", "Oxidation mechanisms", "Elimination mechanisms"]
          },
          {
            id: "17.2",
            name: "Aldehydes and Ketones",
            description: "Carbonyl compounds and their reactions",
            objectives: [
              {
                id: "17.2.1",
                code: "17.2",
                statement: "Know the properties and reactions of aldehydes and ketones",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["17.1.1"],
                keywords: ["aldehydes", "ketones", "carbonyl", "nucleophilic addition", "reduction", "oxidation", "tests"]
              }
            ],
            practicalWork: ["Carbonyl reactions", "Nucleophilic addition", "Carbonyl tests", "Reduction reactions"],
            mathematicalSkills: ["Carbonyl reaction calculations", "Addition mechanisms", "Test interpretations"]
          },
          {
            id: "17.3",
            name: "Carboxylic Acids and Derivatives",
            description: "Carboxylic acids and their derivatives",
            objectives: [
              {
                id: "17.3.1",
                code: "17.3",
                statement: "Know the properties and reactions of carboxylic acids and derivatives",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["17.2.1"],
                keywords: ["carboxylic acids", "acidity", "esterification", "acid chlorides", "amides", "derivatives"]
              }
            ],
            practicalWork: ["Carboxylic acid reactions", "Esterification", "Derivative formation", "Hydrolysis reactions"],
            mathematicalSkills: ["Acid reaction calculations", "Esterification calculations", "Derivative analysis"]
          }
        ]
      },
      {
        id: "topic-18",
        name: "Organic Chemistry III",
        description: "Advanced organic chemistry including aromatic compounds",
        specificationCode: "18",
        timeAllocation: 24,
        assessmentNotes: "Advanced organic chemistry with aromatic compounds and synthesis",
        subtopics: [
          {
            id: "18.1",
            name: "Aromatic Chemistry",
            description: "Benzene and aromatic compounds",
            objectives: [
              {
                id: "18.1.1",
                code: "18.1",
                statement: "Understand the structure and reactions of benzene and aromatic compounds",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["17.3.1"],
                keywords: ["aromatic compounds", "benzene", "electrophilic substitution", "directing effects", "resonance"]
              }
            ],
            practicalWork: ["Aromatic reactions", "Electrophilic substitution", "Directing effects", "Aromatic synthesis"],
            mathematicalSkills: ["Aromatic reaction calculations", "Substitution patterns", "Resonance analysis"]
          },
          {
            id: "18.2",
            name: "Amines and Amides",
            description: "Nitrogen-containing organic compounds",
            objectives: [
              {
                id: "18.2.1",
                code: "18.2",
                statement: "Know the properties and reactions of amines and amides",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["18.1.1"],
                keywords: ["amines", "amides", "basicity", "acylation", "substitution", "preparation", "reactions"]
              }
            ],
            practicalWork: ["Amine reactions", "Basicity studies", "Amide formation", "Amine preparation"],
            mathematicalSkills: ["Amine reaction calculations", "Basicity calculations", "Substitution mechanisms"]
          },
          {
            id: "18.3",
            name: "Organic Synthesis",
            description: "Synthetic pathways and multi-step synthesis",
            objectives: [
              {
                id: "18.3.1",
                code: "18.3",
                statement: "Understand organic synthesis and multi-step reaction planning",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "plan"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["18.2.1"],
                keywords: ["organic synthesis", "multi-step synthesis", "retrosynthesis", "functional group transformations", "reaction planning"]
              }
            ],
            practicalWork: ["Synthetic planning", "Multi-step synthesis", "Reaction optimization", "Yield calculations"],
            mathematicalSkills: ["Synthesis calculations", "Yield optimization", "Route planning", "Retrosynthetic analysis"]
          }
        ]
      },
      {
        id: "topic-19",
        name: "Equilibrium III",
        description: "Solubility equilibria and advanced equilibrium applications",
        specificationCode: "19",
        timeAllocation: 16,
        assessmentNotes: "Advanced equilibrium with solubility and precipitation",
        subtopics: [
          {
            id: "19.1",
            name: "Solubility Equilibria",
            description: "Solubility products and precipitation reactions",
            objectives: [
              {
                id: "19.1.1",
                code: "19.1",
                statement: "Understand solubility equilibria and solubility products",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["11.1.1"],
                keywords: ["solubility equilibria", "solubility product", "Ksp", "precipitation", "common ion effect"]
              }
            ],
            practicalWork: ["Solubility measurements", "Precipitation reactions", "Common ion investigations"],
            mathematicalSkills: ["Ksp calculations", "Solubility calculations", "Precipitation predictions"]
          },
          {
            id: "19.2",
            name: "Complex Ion Equilibria",
            description: "Complex ion formation and stability",
            objectives: [
              {
                id: "19.2.1",
                code: "19.2",
                statement: "Understand complex ion equilibria and stability constants",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["19.1.1"],
                keywords: ["complex ion equilibria", "stability constants", "ligand exchange", "chelate effect"]
              }
            ],
            practicalWork: ["Complex ion equilibria", "Stability constant determination", "Ligand exchange studies"],
            mathematicalSkills: ["Stability constant calculations", "Complex ion equilibrium", "Ligand exchange calculations"]
          }
        ]
      },
      {
        id: "topic-20",
        name: "Modern Analytical Techniques II",
        description: "Advanced analytical techniques including NMR spectroscopy",
        specificationCode: "20",
        timeAllocation: 20,
        assessmentNotes: "Advanced analytical methods for structure determination",
        subtopics: [
          {
            id: "20.1",
            name: "NMR Spectroscopy",
            description: "1H and 13C NMR spectroscopy",
            objectives: [
              {
                id: "20.1.1",
                code: "20.1",
                statement: "Understand 1H NMR spectroscopy and its applications",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "interpret"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["7.2.1"],
                keywords: ["1H NMR", "chemical shifts", "coupling", "integration", "splitting patterns", "structure determination"]
              },
              {
                id: "20.1.2",
                code: "20.2",
                statement: "Understand 13C NMR spectroscopy and its applications",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "interpret"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["20.1.1"],
                keywords: ["13C NMR", "carbon environments", "chemical shifts", "structure determination", "carbon framework"]
              }
            ],
            practicalWork: ["NMR spectrum interpretation", "Structure determination", "Chemical shift analysis"],
            mathematicalSkills: ["NMR analysis", "Chemical shift calculations", "Integration analysis"]
          },
          {
            id: "20.2",
            name: "Chromatography",
            description: "Chromatographic techniques and their applications",
            objectives: [
              {
                id: "20.2.1",
                code: "20.3",
                statement: "Understand chromatographic techniques and their applications",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "apply"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["20.1.2"],
                keywords: ["chromatography", "TLC", "GC", "HPLC", "separation", "identification", "retention time"]
              }
            ],
            practicalWork: ["Chromatographic separations", "TLC analysis", "GC-MS analysis"],
            mathematicalSkills: ["Retention time calculations", "Rf calculations", "Chromatographic analysis"]
          },
          {
            id: "20.3",
            name: "Combined Analytical Techniques",
            description: "Using multiple analytical techniques for structure determination",
            objectives: [
              {
                id: "20.3.1",
                code: "20.4",
                statement: "Understand how to combine analytical techniques for complete structure determination",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "combine"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["20.2.1"],
                keywords: ["combined techniques", "structure determination", "analytical methods", "spectroscopy", "complementary information"]
              }
            ],
            practicalWork: ["Combined analysis", "Structure determination problems", "Multi-technique analysis"],
            mathematicalSkills: ["Combined analysis", "Structure determination", "Data integration"]
          }
        ]
      }
    ]
  }
];