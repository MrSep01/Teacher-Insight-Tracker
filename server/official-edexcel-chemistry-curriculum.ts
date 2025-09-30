import { CurriculumLevel } from "./curriculum-data";

export const OFFICIAL_EDEXCEL_CHEMISTRY_CURRICULUM: CurriculumLevel[] = [
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
          marks: 110,
          questionTypes: ["multiple choice", "short answer", "structured"],
          topicCoverage: ["topic-1", "topic-2", "topic-3", "topic-4"]
        },
        {
          paperNumber: 2,
          name: "Paper 2C",
          duration: 120,
          marks: 110,
          questionTypes: ["short answer", "structured", "extended writing"],
          topicCoverage: ["topic-1", "topic-2", "topic-3", "topic-4"]
        }
      ]
    },
    topics: [
      {
        id: "igcse-topic-1",
        name: "Topic 1: Principles of Chemistry",
        description: "Fundamental concepts including atomic structure, bonding, and chemical principles",
        specificationCode: "1",
        timeAllocation: 40,
        assessmentNotes: "Foundation topic assessed across both papers",
        subtopics: [
          {
            id: "1a",
            name: "1a. States of matter",
            description: "Kinetic theory, changes of state, and particle behavior",
            objectives: [
              {
                id: "1.1",
                code: "1.1",
                statement: "Understand the three states of matter in terms of the arrangement, movement and energy of particles",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["kinetic theory", "particle model", "states of matter"]
              },
              {
                id: "1.2",
                code: "1.2",
                statement: "Describe the changes of state at the melting point and boiling point",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.1"],
                keywords: ["melting", "boiling", "sublimation", "energy changes"]
              },
              {
                id: "1.3",
                code: "1.3",
                statement: "Explain the results of experiments involving the dilution of coloured solutions and diffusion of gases",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["explain", "interpret"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.1"],
                keywords: ["diffusion", "dilution", "concentration", "particle movement"]
              },
              {
                id: "1.4",
                code: "1.4",
                statement: "Know what is meant by the term solvent, solute, solution and solubility",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "define"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["solvent", "solute", "solution", "solubility"]
              },
              {
                id: "1.5",
                code: "1.5",
                statement: "Investigate the solubility of substances in different solvents",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["investigate", "compare"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.4"],
                keywords: ["solubility", "practical work", "investigation"]
              }
            ],
            practicalWork: ["Investigating melting and boiling points", "Diffusion experiments", "Solubility investigations"],
            mathematicalSkills: ["Graph interpretation", "Temperature calculations", "Concentration calculations"]
          },
          {
            id: "1b",
            name: "1b. Elements, compounds and mixtures",
            description: "Classification of matter and separation techniques",
            objectives: [
              {
                id: "1.6",
                code: "1.6",
                statement: "Understand the difference between elements, compounds and mixtures",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "distinguish"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["elements", "compounds", "mixtures", "pure substances"]
              },
              {
                id: "1.7",
                code: "1.7",
                statement: "Describe techniques for separation of mixtures: filtration, crystallisation, simple distillation, fractional distillation, paper chromatography",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.6"],
                keywords: ["separation techniques", "filtration", "distillation", "chromatography"]
              },
              {
                id: "1.8",
                code: "1.8",
                statement: "Understand the use of melting point and boiling point data to distinguish pure substances from mixtures",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "interpret"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.6"],
                keywords: ["melting point", "boiling point", "purity", "mixtures"]
              },
              {
                id: "1.9",
                code: "1.9",
                statement: "Calculate Rf values from chromatograms",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.7"],
                keywords: ["Rf values", "chromatography", "calculations"]
              }
            ],
            practicalWork: ["Separation techniques practical", "Chromatography experiments", "Crystallisation"],
            mathematicalSkills: ["Rf value calculations", "Percentage purity calculations"]
          },
          {
            id: "1c",
            name: "1c. Atomic structure",
            description: "Structure of atoms, subatomic particles, and electronic configuration",
            objectives: [
              {
                id: "1.10",
                code: "1.10",
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
                id: "1.11",
                code: "1.11",
                statement: "State the relative masses and relative charges of protons, neutrons and electrons",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["state", "recall"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.10"],
                keywords: ["relative mass", "relative charge", "subatomic particles"]
              },
              {
                id: "1.12",
                code: "1.12",
                statement: "Define atomic number, mass number, isotopes and relative atomic mass",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["define", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.10"],
                keywords: ["atomic number", "mass number", "isotopes", "relative atomic mass"]
              },
              {
                id: "1.13",
                code: "1.13",
                statement: "Calculate the relative atomic mass of an element from isotopic abundances",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.12"],
                keywords: ["relative atomic mass", "isotopic abundance", "calculations"]
              },
              {
                id: "1.14",
                code: "1.14",
                statement: "Deduce the electronic configurations of atoms and ions up to Z = 20",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["deduce", "write"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.10"],
                keywords: ["electronic configuration", "electron shells", "ions"]
              }
            ],
            practicalWork: ["Flame tests for metal ions", "Building atomic models"],
            mathematicalSkills: ["Atomic calculations", "Isotope abundance calculations", "Electronic configuration notation"]
          },
          {
            id: "1d",
            name: "1d. The periodic table",
            description: "Organization of elements and periodic trends",
            objectives: [
              {
                id: "1.15",
                code: "1.15",
                statement: "Understand the terms group and period in relation to the periodic table",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["groups", "periods", "periodic table"]
              },
              {
                id: "1.16",
                code: "1.16",
                statement: "Deduce the electronic configurations of elements from their position in the periodic table",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["deduce", "determine"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.14", "1.15"],
                keywords: ["electronic configuration", "periodic table position"]
              },
              {
                id: "1.17",
                code: "1.17",
                statement: "Identify elements as metals or non-metals according to their position in the periodic table",
                bloomsLevel: "apply",
                difficulty: "basic",
                commandWords: ["identify", "classify"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.15"],
                keywords: ["metals", "non-metals", "metalloids", "classification"]
              },
              {
                id: "1.18",
                code: "1.18",
                statement: "Understand how the electronic configuration of an atom determines its chemical properties",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.14", "1.16"],
                keywords: ["electronic configuration", "chemical properties", "reactivity"]
              }
            ],
            practicalWork: ["Periodic table investigations", "Group properties experiments"],
            mathematicalSkills: ["Periodic trend analysis", "Electronic configuration patterns"]
          },
          {
            id: "1e",
            name: "1e. Chemical formulae, equations and calculations",
            description: "Writing formulae, balancing equations, and quantitative chemistry",
            objectives: [
              {
                id: "1.19",
                code: "1.19",
                statement: "Write word equations and balanced chemical equations including state symbols",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["write", "balance"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: [],
                keywords: ["word equations", "balanced equations", "state symbols"]
              },
              {
                id: "1.20",
                code: "1.20",
                statement: "Calculate relative formula masses from relative atomic masses",
                bloomsLevel: "apply",
                difficulty: "basic",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.12"],
                keywords: ["relative formula mass", "Mr", "calculations"]
              },
              {
                id: "1.21",
                code: "1.21",
                statement: "Calculate empirical and molecular formulae from experimental data",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.20"],
                keywords: ["empirical formula", "molecular formula", "percentage composition"]
              },
              {
                id: "1.22",
                code: "1.22",
                statement: "Calculate reacting masses and volumes of gases using chemical equations",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.19", "1.20"],
                keywords: ["reacting masses", "gas volumes", "stoichiometry", "mole calculations"]
              },
              {
                id: "1.23",
                code: "1.23",
                statement: "Calculate percentage yield and understand limiting reagents",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.22"],
                keywords: ["percentage yield", "limiting reagents", "theoretical yield"]
              }
            ],
            practicalWork: ["Reacting mass investigations", "Yield calculations experiments"],
            mathematicalSkills: ["Stoichiometric calculations", "Percentage calculations", "Mole calculations"]
          },
          {
            id: "1f",
            name: "1f. Ionic bonding",
            description: "Formation and properties of ionic compounds",
            objectives: [
              {
                id: "1.24",
                code: "1.24",
                statement: "Understand ionic bonding as electrostatic attraction between oppositely charged ions",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.14"],
                keywords: ["ionic bonding", "electrostatic attraction", "ions"]
              },
              {
                id: "1.25",
                code: "1.25",
                statement: "Understand how ions are formed by electron transfer between atoms",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.24"],
                keywords: ["ion formation", "electron transfer", "oxidation", "reduction"]
              },
              {
                id: "1.26",
                code: "1.26",
                statement: "Draw dot and cross diagrams for ionic compounds",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["draw", "represent"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.25"],
                keywords: ["dot and cross diagrams", "ionic compounds", "electron transfer"]
              },
              {
                id: "1.27",
                code: "1.27",
                statement: "Understand the lattice structure of ionic compounds and explain their properties",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.24"],
                keywords: ["lattice structure", "ionic properties", "melting point", "conductivity"]
              }
            ],
            practicalWork: ["Ionic compound models", "Conductivity tests", "Solubility investigations"],
            mathematicalSkills: ["Ion charge calculations", "Formula determination"]
          },
          {
            id: "1g",
            name: "1g. Covalent bonding",
            description: "Formation and properties of covalent compounds",
            objectives: [
              {
                id: "1.28",
                code: "1.28",
                statement: "Understand covalent bonding as sharing of electron pairs between atoms",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.14"],
                keywords: ["covalent bonding", "electron sharing", "bonding pairs"]
              },
              {
                id: "1.29",
                code: "1.29",
                statement: "Draw dot and cross diagrams for simple covalent molecules",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["draw", "represent"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.28"],
                keywords: ["dot and cross diagrams", "covalent molecules", "electron pairs"]
              },
              {
                id: "1.30",
                code: "1.30",
                statement: "Understand the difference between simple molecular and giant covalent structures",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "compare"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.28"],
                keywords: ["simple molecular", "giant covalent", "diamond", "graphite"]
              },
              {
                id: "1.31",
                code: "1.31",
                statement: "Explain the properties of substances with covalent bonding",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "relate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.30"],
                keywords: ["covalent properties", "melting point", "electrical conductivity", "solubility"]
              }
            ],
            practicalWork: ["Molecular model building", "Property investigations"],
            mathematicalSkills: ["Bonding calculations", "Structure analysis"]
          },
          {
            id: "1h",
            name: "1h. Metallic bonding",
            description: "Structure and properties of metals",
            objectives: [
              {
                id: "1.32",
                code: "1.32",
                statement: "Understand metallic bonding in terms of delocalised electrons",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.14"],
                keywords: ["metallic bonding", "delocalised electrons", "sea of electrons"]
              },
              {
                id: "1.33",
                code: "1.33",
                statement: "Explain the properties of metals in terms of metallic bonding",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["explain", "relate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.32"],
                keywords: ["metal properties", "conductivity", "malleability", "ductility"]
              },
              {
                id: "1.34",
                code: "1.34",
                statement: "Compare and contrast ionic, covalent and metallic bonding",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["compare", "contrast", "evaluate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.24", "1.28", "1.32"],
                keywords: ["bonding comparison", "structure-property relationships"]
              }
            ],
            practicalWork: ["Metal property investigations", "Conductivity comparisons"],
            mathematicalSkills: ["Property correlations", "Structure analysis"]
          }
        ]
      },
      {
        id: "igcse-topic-2",
        name: "Topic 2: Inorganic Chemistry",
        description: "Properties and reactions of inorganic compounds and groups",
        specificationCode: "2",
        timeAllocation: 35,
        assessmentNotes: "Focus on group properties and chemical tests",
        subtopics: [
          {
            id: "2a",
            name: "2a. Group 1 (alkali metals)",
            description: "Properties and reactions of alkali metals",
            objectives: [
              {
                id: "2.1",
                code: "2.1",
                statement: "Know the physical properties of the alkali metals",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.15"],
                keywords: ["alkali metals", "physical properties", "group 1"]
              },
              {
                id: "2.2",
                code: "2.2",
                statement: "Describe the reactions of lithium, sodium and potassium with water",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "write equations"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.1"],
                keywords: ["alkali metal reactions", "water", "hydroxides", "hydrogen"]
              },
              {
                id: "2.3",
                code: "2.3",
                statement: "Explain the trend in reactivity of the alkali metals",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["explain", "predict"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.2", "1.14"],
                keywords: ["reactivity trend", "atomic radius", "ionization energy"]
              },
              {
                id: "2.4",
                code: "2.4",
                statement: "Predict properties of other alkali metals from trends",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["predict", "deduce"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.3"],
                keywords: ["trends", "predictions", "rubidium", "caesium"]
              }
            ],
            practicalWork: ["Alkali metal demonstrations", "Flame tests", "Reactivity comparisons"],
            mathematicalSkills: ["Trend analysis", "Pattern recognition"]
          },
          {
            id: "2b",
            name: "2b. Group 7 (halogens)",
            description: "Properties and reactions of halogens",
            objectives: [
              {
                id: "2.5",
                code: "2.5",
                statement: "Know the colours and physical states of the halogens at room temperature",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.15"],
                keywords: ["halogens", "colours", "physical states", "group 7"]
              },
              {
                id: "2.6",
                code: "2.6",
                statement: "Describe the displacement reactions of halogens with halide ions",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "write equations"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.5"],
                keywords: ["displacement reactions", "halide ions", "reactivity"]
              },
              {
                id: "2.7",
                code: "2.7",
                statement: "Explain the trend in reactivity of the halogens",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["explain", "predict"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.6", "1.14"],
                keywords: ["reactivity trend", "electron affinity", "atomic size"]
              },
              {
                id: "2.8",
                code: "2.8",
                statement: "Understand the use of chlorine in water treatment and bleaching",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["2.5"],
                keywords: ["chlorine", "water treatment", "bleaching", "disinfection"]
              }
            ],
            practicalWork: ["Halogen displacement reactions", "Tests for halide ions"],
            mathematicalSkills: ["Trend analysis", "Oxidation number calculations"]
          },
          {
            id: "2c",
            name: "2c. Oxygen and oxides",
            description: "Properties and reactions of oxygen and oxides",
            objectives: [
              {
                id: "2.9",
                code: "2.9",
                statement: "Describe the laboratory preparation of oxygen",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["oxygen preparation", "hydrogen peroxide", "catalytic decomposition"]
              },
              {
                id: "2.10",
                code: "2.10",
                statement: "Describe the reactions of oxygen with metals and non-metals",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "write equations"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.9"],
                keywords: ["combustion", "oxidation", "metal oxides", "non-metal oxides"]
              },
              {
                id: "2.11",
                code: "2.11",
                statement: "Classify oxides as acidic, basic or amphoteric",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["classify", "identify"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.10"],
                keywords: ["acidic oxides", "basic oxides", "amphoteric oxides"]
              }
            ],
            practicalWork: ["Oxygen preparation", "Combustion experiments", "Oxide testing"],
            mathematicalSkills: ["Gas volume calculations", "Percentage composition"]
          },
          {
            id: "2d",
            name: "2d. Reactivity series",
            description: "Metal reactivity and displacement reactions",
            objectives: [
              {
                id: "2.12",
                code: "2.12",
                statement: "Understand the reactivity series of metals",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "order"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["reactivity series", "metal reactivity", "displacement"]
              },
              {
                id: "2.13",
                code: "2.13",
                statement: "Use the reactivity series to predict displacement reactions",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["predict", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.12"],
                keywords: ["displacement reactions", "predictions", "metal competition"]
              },
              {
                id: "2.14",
                code: "2.14",
                statement: "Relate the reactivity of metals to the tendency to form positive ions",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["relate", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.12", "1.25"],
                keywords: ["ion formation", "oxidation", "electron loss"]
              }
            ],
            practicalWork: ["Displacement reactions", "Metal reactivity comparisons"],
            mathematicalSkills: ["Reactivity predictions", "Equation balancing"]
          },
          {
            id: "2e",
            name: "2e. Extraction and uses of metals",
            description: "Methods of metal extraction and applications",
            objectives: [
              {
                id: "2.15",
                code: "2.15",
                statement: "Relate the method of extraction of a metal to its position in the reactivity series",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["relate", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.12"],
                keywords: ["metal extraction", "reduction", "electrolysis", "carbon reduction"]
              },
              {
                id: "2.16",
                code: "2.16",
                statement: "Describe the extraction of iron in the blast furnace",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.15"],
                keywords: ["blast furnace", "iron extraction", "reduction", "carbon monoxide"]
              },
              {
                id: "2.17",
                code: "2.17",
                statement: "Describe the extraction of aluminium by electrolysis",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.15"],
                keywords: ["aluminium extraction", "electrolysis", "bauxite", "cryolite"]
              },
              {
                id: "2.18",
                code: "2.18",
                statement: "Discuss the environmental and economic aspects of metal extraction",
                bloomsLevel: "evaluate",
                difficulty: "advanced",
                commandWords: ["discuss", "evaluate"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.16", "2.17"],
                keywords: ["environmental impact", "recycling", "sustainability", "energy costs"]
              }
            ],
            practicalWork: ["Reduction experiments", "Electrolysis demonstrations"],
            mathematicalSkills: ["Energy calculations", "Cost-benefit analysis"]
          },
          {
            id: "2f",
            name: "2f. Acids and alkalis",
            description: "Properties and reactions of acids and bases",
            objectives: [
              {
                id: "2.19",
                code: "2.19",
                statement: "Describe the characteristic properties of acids and alkalis",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "identify"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["acids", "alkalis", "pH", "indicators"]
              },
              {
                id: "2.20",
                code: "2.20",
                statement: "Describe neutralisation reactions and their applications",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.19"],
                keywords: ["neutralisation", "salt formation", "applications"]
              },
              {
                id: "2.21",
                code: "2.21",
                statement: "Describe the reactions of acids with metals, metal oxides and metal carbonates",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "write equations"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 5,
                prerequisiteObjectives: ["2.19"],
                keywords: ["acid reactions", "salt formation", "gas evolution"]
              },
              {
                id: "2.22",
                code: "2.22",
                statement: "Know the formulae of common acids and alkalis",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "recall"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["acid formulae", "alkali formulae", "common acids and bases"]
              }
            ],
            practicalWork: ["Acid-base titrations", "pH investigations", "Neutralisation experiments"],
            mathematicalSkills: ["pH calculations", "Concentration calculations", "Titration calculations"]
          },
          {
            id: "2g",
            name: "2g. Preparation of salts",
            description: "Methods for preparing pure salts",
            objectives: [
              {
                id: "2.23",
                code: "2.23",
                statement: "Describe methods of preparing soluble salts from acids",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.20", "2.21"],
                keywords: ["salt preparation", "soluble salts", "crystallisation"]
              },
              {
                id: "2.24",
                code: "2.24",
                statement: "Describe the preparation of insoluble salts by precipitation",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.23"],
                keywords: ["precipitation", "insoluble salts", "ionic equations"]
              },
              {
                id: "2.25",
                code: "2.25",
                statement: "Suggest methods for preparing named salts",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["suggest", "design"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.23", "2.24"],
                keywords: ["salt preparation design", "method selection"]
              }
            ],
            practicalWork: ["Salt preparation practicals", "Crystallisation techniques", "Precipitation reactions"],
            mathematicalSkills: ["Yield calculations", "Purity determinations"]
          },
          {
            id: "2h",
            name: "2h. Chemical tests",
            description: "Qualitative analysis and identification tests",
            objectives: [
              {
                id: "2.26",
                code: "2.26",
                statement: "Describe tests for common gases: hydrogen, oxygen, carbon dioxide, ammonia, chlorine",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "identify"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: [],
                keywords: ["gas tests", "identification", "qualitative analysis"]
              },
              {
                id: "2.27",
                code: "2.27",
                statement: "Describe tests for cations using flame tests and sodium hydroxide solution",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "identify"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: [],
                keywords: ["cation tests", "flame tests", "precipitation tests"]
              },
              {
                id: "2.28",
                code: "2.28",
                statement: "Describe tests for anions: carbonate, chloride, bromide, iodide, sulfate",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "identify"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: [],
                keywords: ["anion tests", "precipitation", "gas evolution"]
              },
              {
                id: "2.29",
                code: "2.29",
                statement: "Describe tests for water using anhydrous copper sulfate and cobalt chloride",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["water tests", "anhydrous compounds", "colour changes"]
              }
            ],
            practicalWork: ["Qualitative analysis practical", "Unknown identification", "Test tube reactions"],
            mathematicalSkills: ["Observation recording", "Deduction skills"]
          }
        ]
      },
      {
        id: "igcse-topic-3",
        name: "Topic 3: Physical Chemistry",
        description: "Energy changes, rates of reaction, equilibrium and electrolysis",
        specificationCode: "3",
        timeAllocation: 30,
        assessmentNotes: "Emphasis on practical investigations and calculations",
        subtopics: [
          {
            id: "3a",
            name: "3a. Energetics",
            description: "Energy changes in chemical reactions",
            objectives: [
              {
                id: "3.1",
                code: "3.1",
                statement: "Know that chemical reactions can be exothermic or endothermic",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "identify"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["exothermic", "endothermic", "energy changes"]
              },
              {
                id: "3.2",
                code: "3.2",
                statement: "Describe simple calorimetry experiments to determine enthalpy changes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "calculate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["3.1"],
                keywords: ["calorimetry", "enthalpy change", "heat capacity"]
              },
              {
                id: "3.3",
                code: "3.3",
                statement: "Calculate energy changes from bond energies",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["3.1"],
                keywords: ["bond energies", "energy calculations", "bond breaking and making"]
              },
              {
                id: "3.4",
                code: "3.4",
                statement: "Draw and interpret energy level diagrams for reactions",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["draw", "interpret"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["3.1"],
                keywords: ["energy level diagrams", "activation energy", "enthalpy change"]
              }
            ],
            practicalWork: ["Calorimetry experiments", "Temperature change measurements", "Enthalpy investigations"],
            mathematicalSkills: ["Energy calculations", "Graph plotting", "Heat capacity calculations"]
          },
          {
            id: "3b",
            name: "3b. Rates of reaction",
            description: "Factors affecting reaction rates and collision theory",
            objectives: [
              {
                id: "3.5",
                code: "3.5",
                statement: "Describe experiments to investigate factors affecting rate of reaction",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "plan"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 5,
                prerequisiteObjectives: [],
                keywords: ["rate of reaction", "concentration", "temperature", "surface area", "catalyst"]
              },
              {
                id: "3.6",
                code: "3.6",
                statement: "Explain the effects of factors on reaction rate using collision theory",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["explain", "interpret"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["3.5"],
                keywords: ["collision theory", "activation energy", "successful collisions"]
              },
              {
                id: "3.7",
                code: "3.7",
                statement: "Interpret graphs showing rate of reaction data",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["interpret", "analyze"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["3.5"],
                keywords: ["rate graphs", "gradient", "tangent", "initial rate"]
              },
              {
                id: "3.8",
                code: "3.8",
                statement: "Understand the role of catalysts in reactions",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["3.6"],
                keywords: ["catalysts", "activation energy", "alternative pathway"]
              }
            ],
            practicalWork: ["Rate investigations", "Effect of variables on rate", "Catalyst demonstrations"],
            mathematicalSkills: ["Rate calculations", "Graph analysis", "Gradient determination"]
          },
          {
            id: "3c",
            name: "3c. Reversible reactions and equilibria",
            description: "Dynamic equilibrium and factors affecting equilibrium position",
            objectives: [
              {
                id: "3.9",
                code: "3.9",
                statement: "Understand that some reactions are reversible",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "identify"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["reversible reactions", "forward reaction", "backward reaction"]
              },
              {
                id: "3.10",
                code: "3.10",
                statement: "Describe dynamic equilibrium in reversible reactions",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["3.9"],
                keywords: ["dynamic equilibrium", "equal rates", "closed system"]
              },
              {
                id: "3.11",
                code: "3.11",
                statement: "Predict the effects of changes in conditions on equilibrium position using Le Chatelier's principle",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["predict", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 5,
                prerequisiteObjectives: ["3.10"],
                keywords: ["Le Chatelier's principle", "equilibrium shift", "temperature", "pressure", "concentration"]
              },
              {
                id: "3.12",
                code: "3.12",
                statement: "Apply equilibrium concepts to industrial processes",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["apply", "evaluate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["3.11"],
                keywords: ["Haber process", "Contact process", "industrial applications"]
              }
            ],
            practicalWork: ["Equilibrium demonstrations", "Effect of temperature on equilibrium"],
            mathematicalSkills: ["Equilibrium predictions", "Yield optimization"]
          },
          {
            id: "3d",
            name: "3d. Electrolysis",
            description: "Principles and applications of electrolysis",
            objectives: [
              {
                id: "3.13",
                code: "3.13",
                statement: "Understand electrolysis as the decomposition of compounds using electricity",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.24"],
                keywords: ["electrolysis", "decomposition", "electrolyte", "electrodes"]
              },
              {
                id: "3.14",
                code: "3.14",
                statement: "Predict the products of electrolysis of molten salts and aqueous solutions",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["predict", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 5,
                prerequisiteObjectives: ["3.13"],
                keywords: ["electrode reactions", "discharge", "preferential discharge"]
              },
              {
                id: "3.15",
                code: "3.15",
                statement: "Write half-equations for reactions at electrodes",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["write", "construct"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["3.14"],
                keywords: ["half-equations", "oxidation", "reduction", "electron transfer"]
              },
              {
                id: "3.16",
                code: "3.16",
                statement: "Describe industrial applications of electrolysis",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["3.13"],
                keywords: ["electroplating", "purification", "extraction", "industrial electrolysis"]
              }
            ],
            practicalWork: ["Electrolysis experiments", "Copper plating", "Electrolysis of solutions"],
            mathematicalSkills: ["Electrode equations", "Charge calculations", "Faraday calculations"]
          }
        ]
      },
      {
        id: "igcse-topic-4",
        name: "Topic 4: Organic Chemistry",
        description: "Introduction to organic compounds and their reactions",
        specificationCode: "4",
        timeAllocation: 25,
        assessmentNotes: "Focus on functional groups and systematic nomenclature",
        subtopics: [
          {
            id: "4a",
            name: "4a. Introduction to organic chemistry",
            description: "Basic concepts and homologous series",
            objectives: [
              {
                id: "4.1",
                code: "4.1",
                statement: "Know that organic compounds contain carbon and hydrogen",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["organic compounds", "carbon", "hydrogen", "hydrocarbons"]
              },
              {
                id: "4.2",
                code: "4.2",
                statement: "Understand the concept of homologous series",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.1"],
                keywords: ["homologous series", "functional group", "general formula"]
              },
              {
                id: "4.3",
                code: "4.3",
                statement: "Name and draw structures of simple organic compounds",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["name", "draw"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.2"],
                keywords: ["nomenclature", "structural formula", "displayed formula"]
              }
            ],
            practicalWork: ["Molecular model building", "Structure drawing practice"],
            mathematicalSkills: ["Formula writing", "Molecular mass calculations"]
          },
          {
            id: "4b",
            name: "4b. Crude oil",
            description: "Formation, composition and refining of crude oil",
            objectives: [
              {
                id: "4.4",
                code: "4.4",
                statement: "Know that crude oil is a mixture of hydrocarbons",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.1"],
                keywords: ["crude oil", "petroleum", "hydrocarbon mixture"]
              },
              {
                id: "4.5",
                code: "4.5",
                statement: "Describe the separation of crude oil by fractional distillation",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.4", "1.7"],
                keywords: ["fractional distillation", "fractions", "boiling points"]
              },
              {
                id: "4.6",
                code: "4.6",
                statement: "Know the main fractions and their uses",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.5"],
                keywords: ["petroleum fractions", "gasoline", "diesel", "bitumen"]
              }
            ],
            practicalWork: ["Distillation demonstrations", "Viscosity investigations"],
            mathematicalSkills: ["Boiling point trends", "Carbon chain analysis"]
          },
          {
            id: "4c",
            name: "4c. Alkanes",
            description: "Properties and reactions of saturated hydrocarbons",
            objectives: [
              {
                id: "4.7",
                code: "4.7",
                statement: "Know the general formula and structure of alkanes",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "write"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.2"],
                keywords: ["alkanes", "general formula", "CnH2n+2", "saturated"]
              },
              {
                id: "4.8",
                code: "4.8",
                statement: "Describe combustion of alkanes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "write equations"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.7"],
                keywords: ["combustion", "complete combustion", "incomplete combustion"]
              },
              {
                id: "4.9",
                code: "4.9",
                statement: "Understand substitution reactions of alkanes with halogens",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.7", "2.5"],
                keywords: ["substitution", "halogenation", "chlorination", "UV light"]
              }
            ],
            practicalWork: ["Combustion demonstrations", "Alkane properties investigations"],
            mathematicalSkills: ["Combustion equation balancing", "Product ratio calculations"]
          },
          {
            id: "4d",
            name: "4d. Alkenes",
            description: "Properties and reactions of unsaturated hydrocarbons",
            objectives: [
              {
                id: "4.10",
                code: "4.10",
                statement: "Know the general formula and structure of alkenes",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "write"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.2"],
                keywords: ["alkenes", "general formula", "CnH2n", "unsaturated", "double bond"]
              },
              {
                id: "4.11",
                code: "4.11",
                statement: "Describe addition reactions of alkenes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "write equations"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 5,
                prerequisiteObjectives: ["4.10"],
                keywords: ["addition reactions", "hydrogenation", "hydration", "halogenation"]
              },
              {
                id: "4.12",
                code: "4.12",
                statement: "Describe the test for unsaturation using bromine water",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.11"],
                keywords: ["bromine water test", "decolourisation", "unsaturation test"]
              },
              {
                id: "4.13",
                code: "4.13",
                statement: "Understand addition polymerisation of alkenes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.11"],
                keywords: ["polymerisation", "addition polymers", "poly(ethene)", "plastics"]
              }
            ],
            practicalWork: ["Bromine water test", "Polymerisation demonstrations"],
            mathematicalSkills: ["Polymer formula determination", "Monomer calculations"]
          },
          {
            id: "4e",
            name: "4e. Alcohols",
            description: "Properties and reactions of alcohols",
            objectives: [
              {
                id: "4.14",
                code: "4.14",
                statement: "Know the functional group and general formula of alcohols",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "identify"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.2"],
                keywords: ["alcohols", "hydroxyl group", "-OH", "functional group"]
              },
              {
                id: "4.15",
                code: "4.15",
                statement: "Describe the production of ethanol by fermentation and hydration of ethene",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "compare"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.14"],
                keywords: ["fermentation", "hydration", "ethanol production", "industrial methods"]
              },
              {
                id: "4.16",
                code: "4.16",
                statement: "Describe combustion and oxidation reactions of alcohols",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "write equations"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.14"],
                keywords: ["alcohol combustion", "oxidation", "carboxylic acids", "aldehydes"]
              }
            ],
            practicalWork: ["Fermentation practical", "Oxidation of alcohols"],
            mathematicalSkills: ["Percentage yield calculations", "Combustion calculations"]
          },
          {
            id: "4f",
            name: "4f. Carboxylic acids",
            description: "Properties and reactions of carboxylic acids",
            objectives: [
              {
                id: "4.17",
                code: "4.17",
                statement: "Know the functional group and general formula of carboxylic acids",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "identify"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.2"],
                keywords: ["carboxylic acids", "carboxyl group", "-COOH", "functional group"]
              },
              {
                id: "4.18",
                code: "4.18",
                statement: "Describe the acidic properties of carboxylic acids",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.17", "2.19"],
                keywords: ["weak acids", "dissociation", "pH", "neutralisation"]
              },
              {
                id: "4.19",
                code: "4.19",
                statement: "Describe reactions of carboxylic acids with metals, carbonates and alcohols",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "write equations"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.18"],
                keywords: ["acid reactions", "salt formation", "esterification"]
              }
            ],
            practicalWork: ["Acid properties investigations", "Esterification reactions"],
            mathematicalSkills: ["pH calculations", "Reaction stoichiometry"]
          },
          {
            id: "4g",
            name: "4g. Esters",
            description: "Formation and properties of esters",
            objectives: [
              {
                id: "4.20",
                code: "4.20",
                statement: "Know the functional group of esters",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "identify"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.2"],
                keywords: ["esters", "ester group", "-COO-", "functional group"]
              },
              {
                id: "4.21",
                code: "4.21",
                statement: "Describe the formation of esters from carboxylic acids and alcohols",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "write equations"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.16", "4.19"],
                keywords: ["esterification", "condensation reaction", "reversible reaction"]
              },
              {
                id: "4.22",
                code: "4.22",
                statement: "Know the uses of esters",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.20"],
                keywords: ["ester uses", "flavourings", "perfumes", "solvents"]
              }
            ],
            practicalWork: ["Ester preparation", "Properties of esters"],
            mathematicalSkills: ["Yield calculations", "Molecular formula determination"]
          },
          {
            id: "4h",
            name: "4h. Synthetic polymers",
            description: "Types, properties and environmental impact of polymers",
            objectives: [
              {
                id: "4.23",
                code: "4.23",
                statement: "Understand addition and condensation polymerisation",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "compare"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.13"],
                keywords: ["addition polymerisation", "condensation polymerisation", "monomers", "polymers"]
              },
              {
                id: "4.24",
                code: "4.24",
                statement: "Know examples of synthetic polymers and their uses",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.23"],
                keywords: ["synthetic polymers", "plastics", "nylon", "polyester"]
              },
              {
                id: "4.25",
                code: "4.25",
                statement: "Discuss the environmental impact of polymer use and disposal",
                bloomsLevel: "evaluate",
                difficulty: "advanced",
                commandWords: ["discuss", "evaluate"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.24"],
                keywords: ["environmental impact", "recycling", "biodegradability", "pollution"]
              }
            ],
            practicalWork: ["Polymer synthesis", "Polymer property testing"],
            mathematicalSkills: ["Molecular mass calculations", "Degree of polymerisation"]
          }
        ]
      }
    ]
  },
  {
    id: "alevel-chemistry-edexcel",
    name: "A Level Chemistry Edexcel",
    grades: ["12", "13"],
    specificationYear: "2024",
    examBoard: "Edexcel",
    overallAssessmentStructure: {
      papers: [
        {
          paperNumber: 1,
          name: "Paper 1: Advanced Inorganic and Physical Chemistry",
          duration: 105,
          marks: 90,
          questionTypes: ["multiple choice", "short answer", "calculations", "extended response"],
          topicCoverage: ["topic-1", "topic-2", "topic-3", "topic-4", "topic-5", "topic-8", "topic-9", "topic-10", "topic-11", "topic-12", "topic-13", "topic-14", "topic-15", "topic-16"]
        },
        {
          paperNumber: 2,
          name: "Paper 2: Advanced Organic Chemistry and Physical Chemistry",
          duration: 105,
          marks: 90,
          questionTypes: ["multiple choice", "short answer", "mechanisms", "extended response"],
          topicCoverage: ["topic-2", "topic-5", "topic-6", "topic-7", "topic-8", "topic-9", "topic-10", "topic-17", "topic-18", "topic-19"]
        },
        {
          paperNumber: 3,
          name: "Paper 3: General and Practical Principles in Chemistry",
          duration: 150,
          marks: 120,
          questionTypes: ["data analysis", "synoptic", "practical-based", "extended response"],
          topicCoverage: ["All topics"]
        }
      ]
    },
    topics: [
      {
        id: "alevel-topic-1",
        name: "Topic 1: Atomic Structure and the Periodic Table",
        description: "Advanced atomic structure, periodicity and trends",
        specificationCode: "1",
        timeAllocation: 18,
        assessmentNotes: "Foundation topic with emphasis on electronic structure",
        subtopics: [
          {
            id: "1.1",
            name: "Atomic Structure",
            description: "Subatomic particles and electronic configuration",
            objectives: [
              {
                id: "1.1.1",
                code: "1.1.1",
                statement: "Know the structure of atoms in terms of protons, neutrons and electrons",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["atomic structure", "subatomic particles"]
              },
              {
                id: "1.1.2",
                code: "1.1.2",
                statement: "Understand the concept of isotopes and calculate relative atomic mass",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["isotopes", "relative atomic mass", "mass spectrometry"]
              },
              {
                id: "1.1.3",
                code: "1.1.3",
                statement: "Write electronic configurations using s, p, d notation and understand orbital shapes",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["write", "understand"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["electronic configuration", "orbitals", "s, p, d notation"]
              },
              {
                id: "1.1.4",
                code: "1.1.4",
                statement: "Understand ionisation energies and factors affecting them",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.1.3"],
                keywords: ["ionisation energy", "successive ionisation", "shielding", "nuclear charge"]
              }
            ],
            practicalWork: ["Mass spectrometry analysis", "Flame emission spectroscopy"],
            mathematicalSkills: ["Isotope calculations", "Electronic configuration notation"]
          },
          {
            id: "1.2",
            name: "Periodicity",
            description: "Periodic trends and properties",
            objectives: [
              {
                id: "1.2.1",
                code: "1.2.1",
                statement: "Explain trends in atomic radius, ionisation energy and electronegativity across periods and down groups",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["explain", "compare"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.1.4"],
                keywords: ["periodic trends", "atomic radius", "electronegativity"]
              },
              {
                id: "1.2.2",
                code: "1.2.2",
                statement: "Understand the chemical properties of Period 3 elements and their oxides",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["Period 3", "element properties", "oxide reactions"]
              },
              {
                id: "1.2.3",
                code: "1.2.3",
                statement: "Explain the trend in melting points across Period 3",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["explain", "relate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.2.2"],
                keywords: ["melting points", "structure and bonding", "Period 3 trends"]
              }
            ],
            practicalWork: ["Period 3 oxide investigations", "Property trend analysis"],
            mathematicalSkills: ["Trend analysis", "Graph interpretation"]
          }
        ]
      },
      {
        id: "alevel-topic-2",
        name: "Topic 2: Bonding and Structure",
        description: "Advanced bonding concepts, intermolecular forces and structure",
        specificationCode: "2",
        timeAllocation: 16,
        assessmentNotes: "Links to physical properties and behaviour",
        subtopics: [
          {
            id: "2.1",
            name: "Ionic and Covalent Bonding",
            description: "Advanced bonding concepts",
            objectives: [
              {
                id: "2.1.1",
                code: "2.1.1",
                statement: "Understand ionic bonding including lattice structures and Born-Haber cycles",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["understand", "construct"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: [],
                keywords: ["ionic bonding", "lattice enthalpy", "Born-Haber cycles"]
              },
              {
                id: "2.1.2",
                code: "2.1.2",
                statement: "Explain covalent bonding including dative bonds and resonance structures",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["explain", "draw"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: [],
                keywords: ["covalent bonding", "dative bonds", "resonance", "delocalization"]
              },
              {
                id: "2.1.3",
                code: "2.1.3",
                statement: "Apply VSEPR theory to predict molecular shapes and bond angles",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["predict", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["2.1.2"],
                keywords: ["VSEPR theory", "molecular shapes", "bond angles", "lone pairs"]
              },
              {
                id: "2.1.4",
                code: "2.1.4",
                statement: "Understand electronegativity and bond polarity",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.1.2"],
                keywords: ["electronegativity", "bond polarity", "dipole moments"]
              }
            ],
            practicalWork: ["Molecular shape models", "Polarity investigations"],
            mathematicalSkills: ["Bond angle predictions", "Born-Haber calculations"]
          },
          {
            id: "2.2",
            name: "Intermolecular Forces",
            description: "Types and effects of intermolecular forces",
            objectives: [
              {
                id: "2.2.1",
                code: "2.2.1",
                statement: "Understand types of intermolecular forces: London forces, dipole-dipole, hydrogen bonding",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "compare"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.1.4"],
                keywords: ["London forces", "dipole-dipole", "hydrogen bonding"]
              },
              {
                id: "2.2.2",
                code: "2.2.2",
                statement: "Explain effects of intermolecular forces on physical properties",
                bloomsLevel: "analyze",
                difficulty: "intermediate",
                commandWords: ["explain", "relate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.2.1"],
                keywords: ["boiling points", "solubility", "viscosity", "surface tension"]
              },
              {
                id: "2.2.3",
                code: "2.2.3",
                statement: "Understand the anomalous properties of water due to hydrogen bonding",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.2.1"],
                keywords: ["water properties", "ice structure", "density anomaly"]
              }
            ],
            practicalWork: ["Boiling point determinations", "Solubility investigations"],
            mathematicalSkills: ["Property correlations", "Trend analysis"]
          }
        ]
      },
      {
        id: "alevel-topic-3",
        name: "Topic 3: Redox I",
        description: "Oxidation states and redox reactions",
        specificationCode: "3",
        timeAllocation: 10,
        assessmentNotes: "Foundation for electrochemistry",
        subtopics: [
          {
            id: "3.1",
            name: "Oxidation States and Redox",
            description: "Assigning oxidation states and balancing redox equations",
            objectives: [
              {
                id: "3.1.1",
                code: "3.1.1",
                statement: "Assign oxidation states to atoms in compounds and ions",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["assign", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: [],
                keywords: ["oxidation states", "oxidation numbers", "rules"]
              },
              {
                id: "3.1.2",
                code: "3.1.2",
                statement: "Identify redox reactions using oxidation state changes",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["identify", "classify"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["3.1.1"],
                keywords: ["redox reactions", "oxidation", "reduction"]
              },
              {
                id: "3.1.3",
                code: "3.1.3",
                statement: "Balance redox equations using half-equations",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["balance", "construct"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 5,
                prerequisiteObjectives: ["3.1.2"],
                keywords: ["half-equations", "electron transfer", "balancing"]
              },
              {
                id: "3.1.4",
                code: "3.1.4",
                statement: "Understand disproportionation reactions",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "identify"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["3.1.2"],
                keywords: ["disproportionation", "simultaneous oxidation and reduction"]
              }
            ],
            practicalWork: ["Redox titrations", "Displacement reactions"],
            mathematicalSkills: ["Oxidation state calculations", "Equation balancing"]
          }
        ]
      },
      {
        id: "alevel-topic-4",
        name: "Topic 4: Inorganic Chemistry and the Periodic Table",
        description: "Group 2, Group 7 and Period 3 chemistry",
        specificationCode: "4",
        timeAllocation: 14,
        assessmentNotes: "Trends and patterns in inorganic chemistry",
        subtopics: [
          {
            id: "4.1",
            name: "Group 2",
            description: "Alkaline earth metals",
            objectives: [
              {
                id: "4.1.1",
                code: "4.1.1",
                statement: "Understand trends in properties of Group 2 elements and compounds",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: [],
                keywords: ["Group 2", "alkaline earth metals", "trends", "reactivity"]
              },
              {
                id: "4.1.2",
                code: "4.1.2",
                statement: "Describe reactions of Group 2 elements with water, oxygen and acids",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "write equations"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.1.1"],
                keywords: ["Group 2 reactions", "hydroxides", "oxides", "carbonates"]
              },
              {
                id: "4.1.3",
                code: "4.1.3",
                statement: "Explain trends in solubility of Group 2 compounds",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["explain", "predict"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.1.2"],
                keywords: ["solubility trends", "sulfates", "hydroxides", "carbonates"]
              }
            ],
            practicalWork: ["Group 2 reactions", "Solubility investigations", "Thermal stability"],
            mathematicalSkills: ["Trend analysis", "Solubility calculations"]
          },
          {
            id: "4.2",
            name: "Group 7",
            description: "The halogens",
            objectives: [
              {
                id: "4.2.1",
                code: "4.2.1",
                statement: "Understand trends in properties of Group 7 elements",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: [],
                keywords: ["Group 7", "halogens", "trends", "electronegativity"]
              },
              {
                id: "4.2.2",
                code: "4.2.2",
                statement: "Describe redox reactions and displacement reactions of halogens",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "predict"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.2.1", "3.1.2"],
                keywords: ["halogen displacement", "redox reactions", "oxidizing power"]
              },
              {
                id: "4.2.3",
                code: "4.2.3",
                statement: "Understand reactions of halide ions including tests",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.2.1"],
                keywords: ["halide tests", "silver nitrate", "concentrated sulfuric acid"]
              }
            ],
            practicalWork: ["Halogen displacement reactions", "Halide ion tests"],
            mathematicalSkills: ["Redox calculations", "Trend predictions"]
          }
        ]
      },
      {
        id: "alevel-topic-5",
        name: "Topic 5: Formulae, Equations and Amounts of Substance",
        description: "Quantitative chemistry and calculations",
        specificationCode: "5",
        timeAllocation: 12,
        assessmentNotes: "Essential calculation skills",
        subtopics: [
          {
            id: "5.1",
            name: "Quantitative Chemistry",
            description: "Mole concept and calculations",
            objectives: [
              {
                id: "5.1.1",
                code: "5.1.1",
                statement: "Use the concept of amount of substance in calculations",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 5,
                prerequisiteObjectives: [],
                keywords: ["mole", "Avogadro constant", "molar mass"]
              },
              {
                id: "5.1.2",
                code: "5.1.2",
                statement: "Calculate empirical and molecular formulae from data",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["5.1.1"],
                keywords: ["empirical formula", "molecular formula", "percentage composition"]
              },
              {
                id: "5.1.3",
                code: "5.1.3",
                statement: "Perform calculations involving solutions and gases",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["5.1.1"],
                keywords: ["concentration", "molarity", "ideal gas equation", "gas volumes"]
              },
              {
                id: "5.1.4",
                code: "5.1.4",
                statement: "Calculate yields and atom economy",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "evaluate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["5.1.1"],
                keywords: ["percentage yield", "atom economy", "limiting reagent"]
              }
            ],
            practicalWork: ["Titrations", "Gas collection experiments", "Yield determinations"],
            mathematicalSkills: ["Mole calculations", "Solution calculations", "Gas law calculations"]
          }
        ]
      },
      {
        id: "alevel-topic-6",
        name: "Topic 6: Organic Chemistry I",
        description: "Introduction to organic chemistry, alkanes and halogenoalkanes",
        specificationCode: "6",
        timeAllocation: 16,
        assessmentNotes: "Foundation organic chemistry",
        subtopics: [
          {
            id: "6.1",
            name: "Introduction to Organic Chemistry",
            description: "Nomenclature, isomerism and organic reactions",
            objectives: [
              {
                id: "6.1.1",
                code: "6.1.1",
                statement: "Apply IUPAC nomenclature rules for organic compounds",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["name", "draw"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: [],
                keywords: ["IUPAC nomenclature", "systematic naming", "functional groups"]
              },
              {
                id: "6.1.2",
                code: "6.1.2",
                statement: "Understand structural and stereoisomerism",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "identify"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["6.1.1"],
                keywords: ["structural isomerism", "stereoisomerism", "E-Z isomerism", "optical isomerism"]
              },
              {
                id: "6.1.3",
                code: "6.1.3",
                statement: "Understand types of organic reactions and mechanisms",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "classify"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: [],
                keywords: ["reaction types", "mechanisms", "curly arrows", "heterolytic fission"]
              }
            ],
            practicalWork: ["Molecular model building", "Isomer investigations"],
            mathematicalSkills: ["Isomer counting", "Optical rotation calculations"]
          },
          {
            id: "6.2",
            name: "Alkanes and Halogenoalkanes",
            description: "Properties and reactions",
            objectives: [
              {
                id: "6.2.1",
                code: "6.2.1",
                statement: "Understand free radical substitution in alkanes",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "describe mechanism"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["6.1.3"],
                keywords: ["free radical substitution", "initiation", "propagation", "termination"]
              },
              {
                id: "6.2.2",
                code: "6.2.2",
                statement: "Understand nucleophilic substitution reactions of halogenoalkanes",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "describe mechanism"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["6.1.3"],
                keywords: ["nucleophilic substitution", "SN1", "SN2", "reaction kinetics"]
              },
              {
                id: "6.2.3",
                code: "6.2.3",
                statement: "Understand elimination reactions of halogenoalkanes",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "describe mechanism"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["6.2.2"],
                keywords: ["elimination", "dehydrohalogenation", "Zaitsev's rule"]
              }
            ],
            practicalWork: ["Halogenation reactions", "Nucleophilic substitution experiments"],
            mathematicalSkills: ["Rate calculations", "Product ratios"]
          }
        ]
      },
      {
        id: "alevel-topic-7",
        name: "Topic 7: Modern Analytical Techniques I",
        description: "Mass spectrometry and infrared spectroscopy",
        specificationCode: "7",
        timeAllocation: 8,
        assessmentNotes: "Data interpretation skills",
        subtopics: [
          {
            id: "7.1",
            name: "Analytical Techniques",
            description: "MS and IR spectroscopy",
            objectives: [
              {
                id: "7.1.1",
                code: "7.1.1",
                statement: "Interpret mass spectra to determine molecular structure",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["interpret", "deduce"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: [],
                keywords: ["mass spectrometry", "molecular ion", "fragmentation", "isotope patterns"]
              },
              {
                id: "7.1.2",
                code: "7.1.2",
                statement: "Use infrared spectroscopy to identify functional groups",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["identify", "interpret"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: [],
                keywords: ["IR spectroscopy", "functional groups", "absorption frequencies", "fingerprint region"]
              },
              {
                id: "7.1.3",
                code: "7.1.3",
                statement: "Combine spectroscopic techniques to determine structure",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["combine", "deduce"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["7.1.1", "7.1.2"],
                keywords: ["combined techniques", "structure determination"]
              }
            ],
            practicalWork: ["Spectroscopy data analysis", "Unknown compound identification"],
            mathematicalSkills: ["m/z calculations", "Frequency-wavelength conversions"]
          }
        ]
      },
      {
        id: "alevel-topic-8",
        name: "Topic 8: Energetics I",
        description: "Enthalpy changes and Hess's Law",
        specificationCode: "8",
        timeAllocation: 10,
        assessmentNotes: "Thermochemistry calculations",
        subtopics: [
          {
            id: "8.1",
            name: "Enthalpy Changes",
            description: "Types of enthalpy change and calculations",
            objectives: [
              {
                id: "8.1.1",
                code: "8.1.1",
                statement: "Define and use standard enthalpy changes",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["define", "calculate"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: [],
                keywords: ["enthalpy of formation", "combustion", "neutralisation", "standard conditions"]
              },
              {
                id: "8.1.2",
                code: "8.1.2",
                statement: "Use Hess's Law to calculate enthalpy changes",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "construct"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["8.1.1"],
                keywords: ["Hess's Law", "energy cycles", "indirect determination"]
              },
              {
                id: "8.1.3",
                code: "8.1.3",
                statement: "Calculate enthalpy changes from experimental data",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "evaluate"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: [],
                keywords: ["calorimetry", "heat capacity", "temperature change", "experimental errors"]
              }
            ],
            practicalWork: ["Calorimetry experiments", "Enthalpy of neutralisation", "Enthalpy of combustion"],
            mathematicalSkills: ["Energy calculations", "Error analysis", "Graph plotting"]
          }
        ]
      },
      {
        id: "alevel-topic-9",
        name: "Topic 9: Kinetics I",
        description: "Reaction rates and rate equations",
        specificationCode: "9",
        timeAllocation: 10,
        assessmentNotes: "Rate calculations and mechanisms",
        subtopics: [
          {
            id: "9.1",
            name: "Reaction Kinetics",
            description: "Rate equations and reaction mechanisms",
            objectives: [
              {
                id: "9.1.1",
                code: "9.1.1",
                statement: "Understand factors affecting reaction rates",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["reaction rate", "collision theory", "activation energy", "Maxwell-Boltzmann"]
              },
              {
                id: "9.1.2",
                code: "9.1.2",
                statement: "Determine rate equations from experimental data",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["determine", "calculate"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["9.1.1"],
                keywords: ["rate equation", "order of reaction", "rate constant", "initial rates"]
              },
              {
                id: "9.1.3",
                code: "9.1.3",
                statement: "Understand the role of catalysts in reactions",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["9.1.1"],
                keywords: ["catalysts", "heterogeneous", "homogeneous", "enzyme catalysis"]
              }
            ],
            practicalWork: ["Rate investigations", "Effect of concentration on rate", "Catalyst efficiency"],
            mathematicalSkills: ["Rate calculations", "Graph analysis", "Half-life calculations"]
          }
        ]
      },
      {
        id: "alevel-topic-10",
        name: "Topic 10: Equilibrium I",
        description: "Chemical equilibrium and Kc",
        specificationCode: "10",
        timeAllocation: 8,
        assessmentNotes: "Equilibrium calculations",
        subtopics: [
          {
            id: "10.1",
            name: "Chemical Equilibrium",
            description: "Dynamic equilibrium and equilibrium constants",
            objectives: [
              {
                id: "10.1.1",
                code: "10.1.1",
                statement: "Understand dynamic equilibrium and Le Chatelier's principle",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "predict"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: [],
                keywords: ["dynamic equilibrium", "Le Chatelier", "equilibrium position"]
              },
              {
                id: "10.1.2",
                code: "10.1.2",
                statement: "Calculate and use equilibrium constants Kc",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["10.1.1"],
                keywords: ["equilibrium constant", "Kc", "equilibrium concentrations"]
              },
              {
                id: "10.1.3",
                code: "10.1.3",
                statement: "Understand the effect of conditions on Kc",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["10.1.2"],
                keywords: ["temperature effect", "catalyst effect", "Kc variation"]
              }
            ],
            practicalWork: ["Equilibrium investigations", "Kc determinations"],
            mathematicalSkills: ["Kc calculations", "ICE table method", "Quadratic equations"]
          }
        ]
      },
      {
        id: "alevel-topic-11",
        name: "Topic 11: Equilibrium II",
        description: "Kp and equilibrium in gaseous systems",
        specificationCode: "11",
        timeAllocation: 8,
        assessmentNotes: "Gas equilibria",
        subtopics: [
          {
            id: "11.1",
            name: "Gas Equilibria",
            description: "Kp and partial pressures",
            objectives: [
              {
                id: "11.1.1",
                code: "11.1.1",
                statement: "Calculate and use Kp for gaseous equilibria",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["10.1.2"],
                keywords: ["Kp", "partial pressure", "mole fractions"]
              },
              {
                id: "11.1.2",
                code: "11.1.2",
                statement: "Understand the relationship between Kp and Kc",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "derive"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["11.1.1"],
                keywords: ["Kp-Kc relationship", "gas constant", "temperature"]
              },
              {
                id: "11.1.3",
                code: "11.1.3",
                statement: "Apply equilibrium principles to industrial processes",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["apply", "evaluate"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["11.1.1"],
                keywords: ["Haber process", "Contact process", "optimization"]
              }
            ],
            practicalWork: ["Gas equilibrium studies", "Pressure effect investigations"],
            mathematicalSkills: ["Kp calculations", "Partial pressure calculations", "Unit conversions"]
          }
        ]
      },
      {
        id: "alevel-topic-12",
        name: "Topic 12: Acid-Base Equilibria",
        description: "pH, buffers and indicators",
        specificationCode: "12",
        timeAllocation: 12,
        assessmentNotes: "pH calculations and titrations",
        subtopics: [
          {
            id: "12.1",
            name: "Acids, Bases and pH",
            description: "Strong and weak acids/bases, pH calculations",
            objectives: [
              {
                id: "12.1.1",
                code: "12.1.1",
                statement: "Calculate pH for strong and weak acids and bases",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: [],
                keywords: ["pH", "pKa", "pKb", "dissociation constant", "weak acids"]
              },
              {
                id: "12.1.2",
                code: "12.1.2",
                statement: "Understand buffer solutions and calculate buffer pH",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["12.1.1"],
                keywords: ["buffer solutions", "Henderson-Hasselbalch", "buffer capacity"]
              },
              {
                id: "12.1.3",
                code: "12.1.3",
                statement: "Understand pH curves and indicator selection",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "select"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["12.1.1"],
                keywords: ["pH curves", "titration curves", "indicators", "equivalence point"]
              }
            ],
            practicalWork: ["pH measurements", "Buffer preparation", "Acid-base titrations"],
            mathematicalSkills: ["pH calculations", "Logarithms", "Buffer calculations"]
          }
        ]
      },
      {
        id: "alevel-topic-13",
        name: "Topic 13: Energetics II",
        description: "Lattice energy and entropy",
        specificationCode: "13",
        timeAllocation: 10,
        assessmentNotes: "Advanced thermodynamics",
        subtopics: [
          {
            id: "13.1",
            name: "Lattice Energy and Entropy",
            description: "Born-Haber cycles and entropy changes",
            objectives: [
              {
                id: "13.1.1",
                code: "13.1.1",
                statement: "Construct and use Born-Haber cycles",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["construct", "calculate"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["2.1.1"],
                keywords: ["Born-Haber cycle", "lattice energy", "enthalpy of formation"]
              },
              {
                id: "13.1.2",
                code: "13.1.2",
                statement: "Understand entropy and calculate entropy changes",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: [],
                keywords: ["entropy", "disorder", "second law", "entropy change"]
              },
              {
                id: "13.1.3",
                code: "13.1.3",
                statement: "Calculate and use Gibbs free energy",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "predict"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["13.1.2"],
                keywords: ["Gibbs free energy", "spontaneity", "feasibility"]
              }
            ],
            practicalWork: ["Solubility investigations", "Spontaneous reactions"],
            mathematicalSkills: ["Energy cycle calculations", "Entropy calculations", "Free energy calculations"]
          }
        ]
      },
      {
        id: "alevel-topic-14",
        name: "Topic 14: Redox II",
        description: "Electrochemical cells and electrode potentials",
        specificationCode: "14",
        timeAllocation: 10,
        assessmentNotes: "Electrochemistry",
        subtopics: [
          {
            id: "14.1",
            name: "Electrochemistry",
            description: "Cells, electrode potentials and applications",
            objectives: [
              {
                id: "14.1.1",
                code: "14.1.1",
                statement: "Understand electrochemical cells and electrode potentials",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["3.1.3"],
                keywords: ["electrochemical cells", "electrode potential", "standard hydrogen electrode"]
              },
              {
                id: "14.1.2",
                code: "14.1.2",
                statement: "Use electrode potentials to predict feasibility",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["predict", "calculate"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["14.1.1"],
                keywords: ["cell potential", "feasibility", "electrochemical series"]
              },
              {
                id: "14.1.3",
                code: "14.1.3",
                statement: "Understand commercial applications of electrochemistry",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["14.1.1"],
                keywords: ["batteries", "fuel cells", "corrosion", "electroplating"]
              }
            ],
            practicalWork: ["Cell construction", "Electrode potential measurements", "Electrolysis"],
            mathematicalSkills: ["Cell potential calculations", "Nernst equation applications"]
          }
        ]
      },
      {
        id: "alevel-topic-15",
        name: "Topic 15: Transition Metals",
        description: "d-block elements and complexes",
        specificationCode: "15",
        timeAllocation: 12,
        assessmentNotes: "Complex ion chemistry",
        subtopics: [
          {
            id: "15.1",
            name: "Transition Metal Chemistry",
            description: "Properties, complexes and reactions",
            objectives: [
              {
                id: "15.1.1",
                code: "15.1.1",
                statement: "Understand the characteristic properties of transition metals",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.1.3"],
                keywords: ["transition metals", "d-orbitals", "variable oxidation states", "catalysis"]
              },
              {
                id: "15.1.2",
                code: "15.1.2",
                statement: "Understand complex ion formation and shapes",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "predict"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["15.1.1"],
                keywords: ["complex ions", "ligands", "coordination number", "shapes"]
              },
              {
                id: "15.1.3",
                code: "15.1.3",
                statement: "Explain the origin of colour in transition metal complexes",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["explain", "relate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["15.1.2"],
                keywords: ["d-d transitions", "crystal field theory", "complementary colours"]
              },
              {
                id: "15.1.4",
                code: "15.1.4",
                statement: "Understand ligand substitution and stability constants",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["15.1.2"],
                keywords: ["ligand substitution", "stability constants", "chelate effect"]
              }
            ],
            practicalWork: ["Complex synthesis", "Colorimetry", "Ligand substitution reactions"],
            mathematicalSkills: ["Stability constant calculations", "Colorimetry calculations"]
          }
        ]
      },
      {
        id: "alevel-topic-16",
        name: "Topic 16: Kinetics II",
        description: "Advanced kinetics and reaction mechanisms",
        specificationCode: "16",
        timeAllocation: 8,
        assessmentNotes: "Detailed mechanism studies",
        subtopics: [
          {
            id: "16.1",
            name: "Advanced Kinetics",
            description: "Rate determining steps and Arrhenius equation",
            objectives: [
              {
                id: "16.1.1",
                code: "16.1.1",
                statement: "Deduce reaction mechanisms from rate equations",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["deduce", "propose"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["9.1.2"],
                keywords: ["reaction mechanism", "rate determining step", "intermediates"]
              },
              {
                id: "16.1.2",
                code: "16.1.2",
                statement: "Use the Arrhenius equation in calculations",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["9.1.1"],
                keywords: ["Arrhenius equation", "activation energy", "pre-exponential factor"]
              },
              {
                id: "16.1.3",
                code: "16.1.3",
                statement: "Understand the effect of temperature on rate constants",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["16.1.2"],
                keywords: ["temperature dependence", "rate constant variation"]
              }
            ],
            practicalWork: ["Temperature-rate investigations", "Activation energy determination"],
            mathematicalSkills: ["Arrhenius calculations", "Logarithmic plots", "Activation energy determination"]
          }
        ]
      },
      {
        id: "alevel-topic-17",
        name: "Topic 17: Organic Chemistry II",
        description: "Alcohols, halogenoalkanes, and organic synthesis",
        specificationCode: "17",
        timeAllocation: 14,
        assessmentNotes: "Organic reactions and mechanisms",
        subtopics: [
          {
            id: "17.1",
            name: "Alcohols and Phenols",
            description: "Reactions and synthesis",
            objectives: [
              {
                id: "17.1.1",
                code: "17.1.1",
                statement: "Understand reactions of alcohols including oxidation",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: [],
                keywords: ["alcohol oxidation", "primary", "secondary", "tertiary", "aldehydes", "ketones"]
              },
              {
                id: "17.1.2",
                code: "17.1.2",
                statement: "Understand the acidity of phenols",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["phenol acidity", "resonance stabilization", "substituent effects"]
              }
            ],
            practicalWork: ["Alcohol oxidation", "Lucas test", "Phenol reactions"],
            mathematicalSkills: ["Yield calculations", "Product ratio determination"]
          },
          {
            id: "17.2",
            name: "Carbonyl Compounds",
            description: "Aldehydes and ketones",
            objectives: [
              {
                id: "17.2.1",
                code: "17.2.1",
                statement: "Understand nucleophilic addition reactions of carbonyl compounds",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "describe mechanism"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: [],
                keywords: ["nucleophilic addition", "HCN addition", "reduction", "Grignard reagents"]
              },
              {
                id: "17.2.2",
                code: "17.2.2",
                statement: "Distinguish between aldehydes and ketones using chemical tests",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["distinguish", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["17.2.1"],
                keywords: ["Tollens' test", "Fehling's test", "iodoform test", "2,4-DNP"]
              }
            ],
            practicalWork: ["Aldehyde/ketone tests", "Nucleophilic addition reactions"],
            mathematicalSkills: ["Stereochemistry predictions", "Product calculations"]
          }
        ]
      },
      {
        id: "alevel-topic-18",
        name: "Topic 18: Organic Chemistry III",
        description: "Carboxylic acids, derivatives, and aromatic chemistry",
        specificationCode: "18",
        timeAllocation: 14,
        assessmentNotes: "Advanced organic synthesis",
        subtopics: [
          {
            id: "18.1",
            name: "Carboxylic Acids and Derivatives",
            description: "Acyl compounds and their reactions",
            objectives: [
              {
                id: "18.1.1",
                code: "18.1.1",
                statement: "Understand reactions of carboxylic acids and acyl chlorides",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: [],
                keywords: ["carboxylic acids", "acyl chlorides", "esterification", "amide formation"]
              },
              {
                id: "18.1.2",
                code: "18.1.2",
                statement: "Understand hydrolysis of esters and amides",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "describe mechanism"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["18.1.1"],
                keywords: ["ester hydrolysis", "amide hydrolysis", "acid catalysis", "base catalysis"]
              }
            ],
            practicalWork: ["Ester synthesis", "Aspirin preparation", "Hydrolysis reactions"],
            mathematicalSkills: ["Yield calculations", "Purity determinations"]
          },
          {
            id: "18.2",
            name: "Aromatic Chemistry",
            description: "Benzene and electrophilic substitution",
            objectives: [
              {
                id: "18.2.1",
                code: "18.2.1",
                statement: "Understand the structure and stability of benzene",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["benzene structure", "aromaticity", "delocalization", "resonance"]
              },
              {
                id: "18.2.2",
                code: "18.2.2",
                statement: "Understand electrophilic substitution reactions of benzene",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "describe mechanism"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["18.2.1"],
                keywords: ["electrophilic substitution", "nitration", "halogenation", "Friedel-Crafts"]
              },
              {
                id: "18.2.3",
                code: "18.2.3",
                statement: "Understand directing effects of substituents",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "predict"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["18.2.2"],
                keywords: ["directing effects", "activating groups", "deactivating groups", "ortho/para/meta"]
              }
            ],
            practicalWork: ["Nitration of benzene", "Bromination reactions", "Diazonium salt reactions"],
            mathematicalSkills: ["Product ratio predictions", "Isomer calculations"]
          }
        ]
      },
      {
        id: "alevel-topic-19",
        name: "Topic 19: Modern Analytical Techniques II",
        description: "NMR spectroscopy and chromatography",
        specificationCode: "19",
        timeAllocation: 10,
        assessmentNotes: "Advanced structure determination",
        subtopics: [
          {
            id: "19.1",
            name: "NMR Spectroscopy",
            description: "1H and 13C NMR",
            objectives: [
              {
                id: "19.1.1",
                code: "19.1.1",
                statement: "Interpret 1H NMR spectra to determine structure",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["interpret", "deduce"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: [],
                keywords: ["1H NMR", "chemical shift", "integration", "splitting patterns", "coupling"]
              },
              {
                id: "19.1.2",
                code: "19.1.2",
                statement: "Use 13C NMR spectra in structure determination",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["use", "interpret"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["13C NMR", "chemical environments", "DEPT", "decoupling"]
              },
              {
                id: "19.1.3",
                code: "19.1.3",
                statement: "Combine analytical techniques for structure elucidation",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["combine", "deduce"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["19.1.1", "19.1.2", "7.1.1", "7.1.2"],
                keywords: ["combined spectroscopy", "structure determination", "unknown analysis"]
              }
            ],
            practicalWork: ["NMR data analysis", "Unknown structure determination"],
            mathematicalSkills: ["Integration ratios", "Coupling constant calculations", "Chemical shift predictions"]
          },
          {
            id: "19.2",
            name: "Chromatography",
            description: "Separation techniques",
            objectives: [
              {
                id: "19.2.1",
                code: "19.2.1",
                statement: "Understand principles of GC and HPLC",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["gas chromatography", "HPLC", "retention time", "separation"]
              },
              {
                id: "19.2.2",
                code: "19.2.2",
                statement: "Interpret chromatograms for analysis",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["interpret", "analyze"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["19.2.1"],
                keywords: ["chromatogram interpretation", "peak analysis", "quantification"]
              }
            ],
            practicalWork: ["TLC analysis", "Column chromatography", "GC-MS analysis"],
            mathematicalSkills: ["Retention factor calculations", "Peak area analysis"]
          }
        ]
      }
    ]
  }
];