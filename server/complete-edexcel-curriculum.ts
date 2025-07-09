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
        description: "Advanced atomic theory and periodic trends",
        specificationCode: "1",
        timeAllocation: 20,
        assessmentNotes: "Foundation topic with mathematical calculations",
        subtopics: [
          {
            id: "1.1",
            name: "Atomic Structure",
            description: "Electronic structure and quantum theory",
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
                statement: "Understand the terms atomic number, mass number, relative atomic mass, relative isotopic mass and relative molecular mass",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "define"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["atomic number", "mass number", "relative atomic mass", "relative isotopic mass", "relative molecular mass", "isotopes"]
              },
              {
                id: "1.1.3",
                code: "1.3",
                statement: "Be able to determine the electronic configuration of atoms and ions, given the atomic number, using s, p, d notation",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["determine", "apply"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.1.2"],
                keywords: ["electronic configuration", "s orbital", "p orbital", "d orbital", "atoms", "ions", "electron arrangement"]
              }
            ],
            practicalWork: ["Atomic structure models", "Electronic configuration practice", "Isotope investigations"],
            mathematicalSkills: ["Electronic configuration notation", "Atomic calculations", "Isotope calculations"]
          },
          {
            id: "1.2",
            name: "Ionisation Energy",
            description: "Energy required to remove electrons",
            objectives: [
              {
                id: "1.2.1",
                code: "1.4",
                statement: "Know the definition of first ionisation energy",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "define"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.1.3"],
                keywords: ["first ionisation energy", "energy", "electron removal", "gaseous atoms", "cations"]
              },
              {
                id: "1.2.2",
                code: "1.5",
                statement: "Understand the factors that influence ionisation energy",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["ionisation energy", "nuclear charge", "distance", "shielding", "electron-electron repulsion"]
              }
            ],
            practicalWork: ["Ionisation energy data analysis", "Periodic trends investigation", "Graph interpretation"],
            mathematicalSkills: ["Ionisation energy calculations", "Graph analysis", "Trend predictions"]
          },
          {
            id: "1.3",
            name: "Periodic Table",
            description: "Periodic trends and properties",
            objectives: [
              {
                id: "1.3.1",
                code: "1.6",
                statement: "Know the meaning of the terms period and group in the periodic table",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "define"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.1.3"],
                keywords: ["period", "group", "periodic table", "horizontal rows", "vertical columns"]
              },
              {
                id: "1.3.2",
                code: "1.7",
                statement: "Understand the trends in atomic radius, ionisation energy and electronegativity across periods and down groups",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.2.2", "1.3.1"],
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
        description: "Chemical bonding and molecular structure",
        specificationCode: "2",
        timeAllocation: 25,
        assessmentNotes: "Includes 3D structure and bonding theory",
        subtopics: [
          {
            id: "2.1",
            name: "Ionic Bonding",
            description: "Ionic compounds and lattice structures",
            objectives: [
              {
                id: "2.1.1",
                code: "2.1",
                statement: "Know that ionic bonding is the electrostatic attraction between oppositely charged ions",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "define"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.1.3"],
                keywords: ["ionic bonding", "electrostatic attraction", "oppositely charged ions", "cations", "anions"]
              },
              {
                id: "2.1.2",
                code: "2.2",
                statement: "Know that ionic crystals are giant three-dimensional lattices of ions",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.1.1"],
                keywords: ["ionic crystals", "giant lattices", "three-dimensional", "crystal structure", "unit cell"]
              }
            ],
            practicalWork: ["Ionic lattice models", "Crystal structure investigation", "Ionic compound properties"],
            mathematicalSkills: ["Lattice energy calculations", "Crystal structure analysis", "Ionic radius calculations"]
          },
          {
            id: "2.2",
            name: "Covalent Bonding",
            description: "Molecular compounds and bonding theory",
            objectives: [
              {
                id: "2.2.1",
                code: "2.3",
                statement: "Know that covalent bonding is the strong electrostatic attraction between a shared pair of electrons and the nuclei of the bonded atoms",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "define"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.1.3"],
                keywords: ["covalent bonding", "shared electrons", "electrostatic attraction", "nuclei", "electron pairs"]
              },
              {
                id: "2.2.2",
                code: "2.4",
                statement: "Understand that covalent bonds can be single, double or triple",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "recognize"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.2.1"],
                keywords: ["single bonds", "double bonds", "triple bonds", "multiple bonds", "bond strength"]
              }
            ],
            practicalWork: ["Molecular models", "Covalent structure investigation", "Bond strength comparison"],
            mathematicalSkills: ["Bond energy calculations", "Molecular geometry", "Valence calculations"]
          },
          {
            id: "2.3",
            name: "Metallic Bonding",
            description: "Structure and properties of metals",
            objectives: [
              {
                id: "2.3.1",
                code: "2.5",
                statement: "Know that metallic bonding is the electrostatic attraction between the positive metal ions and the delocalised electrons",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "define"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.1.3"],
                keywords: ["metallic bonding", "positive metal ions", "delocalised electrons", "electron sea", "electrostatic attraction"]
              },
              {
                id: "2.3.2",
                code: "2.6",
                statement: "Understand how metallic bonding accounts for the properties of metals",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.3.1"],
                keywords: ["metallic properties", "electrical conductivity", "malleability", "ductility", "thermal conductivity"]
              }
            ],
            practicalWork: ["Metallic structure models", "Metal properties testing", "Conductivity experiments"],
            mathematicalSkills: ["Conductivity calculations", "Property correlations", "Metallic structure analysis"]
          }
        ]
      }
    ]
  }
];