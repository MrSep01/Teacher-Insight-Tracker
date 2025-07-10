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
        timeAllocation: 50,
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
                code: "1.9",
                statement: "Know that a pure substance has a fixed melting and boiling point, but mixtures may melt or boil over a range of temperatures",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.1.2"],
                keywords: ["pure substance", "mixtures", "melting point", "boiling point", "temperature range"]
              },
              {
                id: "1.2.2",
                code: "1.10",
                statement: "Describe experimental techniques for separation of mixtures including simple distillation, fractional distillation, filtration, crystallisation, paper chromatography",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["describe", "explain"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["separation", "distillation", "fractional distillation", "filtration", "crystallisation", "chromatography"]
              },
              {
                id: "1.2.3",
                code: "1.11",
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
                code: "1.12",
                statement: "Know that chromatography involves a stationary and a mobile phase and be able to interpret a chromatogram including the calculation of Rf values",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["know", "interpret", "calculate"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.2.2"],
                keywords: ["chromatography", "stationary phase", "mobile phase", "chromatogram", "Rf values", "calculations"]
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
                statement: "Know what is meant by atomic number, mass number, isotopes and relative atomic mass (Ar)",
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
                code: "1.18",
                statement: "Write word equations and balanced chemical equations (including state symbols): for reactions studied in this specification",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["write", "balance"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["word equations", "balanced equations", "state symbols", "chemical reactions"]
              },
              {
                id: "1.5.2",
                code: "1.19",
                statement: "Calculate relative formula masses (Mr) from relative atomic masses (Ar)",
                bloomsLevel: "apply",
                difficulty: "basic",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.3.2"],
                keywords: ["relative formula mass", "Mr", "relative atomic mass", "Ar", "calculations"]
              },
              {
                id: "1.5.3",
                code: "1.20",
                statement: "Know what is meant by the terms empirical formula and molecular formula",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "define"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.5.2"],
                keywords: ["empirical formula", "molecular formula", "simplest ratio", "actual formula"]
              },
              {
                id: "1.5.4",
                code: "1.21",
                statement: "Calculate empirical and molecular formulae from experimental data",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.5.3"],
                keywords: ["empirical formula", "molecular formula", "experimental data", "percentage composition", "calculations"]
              },
              {
                id: "1.5.5",
                code: "1.22",
                statement: "Use chemical equations to calculate reacting masses (and vice versa)",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["use", "calculate"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.5.1", "1.5.2"],
                keywords: ["reacting masses", "stoichiometry", "mole calculations", "chemical equations"]
              },
              {
                id: "1.5.6",
                code: "1.23",
                statement: "Calculate percentage yield",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.5.5"],
                keywords: ["percentage yield", "actual yield", "theoretical yield", "efficiency"]
              }
            ],
            practicalWork: ["Formula determination experiments", "Reacting mass investigations", "Yield calculations"],
            mathematicalSkills: ["Stoichiometric calculations", "Formula calculations", "Percentage calculations"]
          },
          {
            id: "1.6",
            name: "Ionic Bonding",
            description: "Formation and properties of ionic compounds",
            objectives: [
              {
                id: "1.6.1",
                code: "1.24",
                statement: "Know what is meant by ionic bonding and understand how it occurs between metals and non-metals",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["know", "understand"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.4.3"],
                keywords: ["ionic bonding", "metals", "non-metals", "electron transfer", "ions"]
              },
              {
                id: "1.6.2",
                code: "1.25",
                statement: "Know that an ion is an atom or group of atoms with a positive or negative charge",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "define"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.6.1"],
                keywords: ["ion", "positive charge", "negative charge", "cation", "anion"]
              },
              {
                id: "1.6.3",
                code: "1.26",
                statement: "Know the charges of common ions in this specification",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "recall"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.6.2"],
                keywords: ["ion charges", "common ions", "metal ions", "non-metal ions", "polyatomic ions"]
              },
              {
                id: "1.6.4",
                code: "1.27",
                statement: "Use dot-and-cross diagrams to represent the electronic configurations of simple ions",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["use", "represent"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.4.2", "1.6.2"],
                keywords: ["dot-and-cross diagrams", "electronic configurations", "simple ions", "electron transfer"]
              },
              {
                id: "1.6.5",
                code: "1.28",
                statement: "Understand ionic bonding in terms of electrostatic attractions",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.6.1"],
                keywords: ["ionic bonding", "electrostatic attractions", "oppositely charged ions", "ionic lattice"]
              },
              {
                id: "1.6.6",
                code: "1.29",
                statement: "Understand why compounds with giant ionic lattices have high melting and boiling points",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.6.5"],
                keywords: ["giant ionic lattices", "high melting points", "high boiling points", "strong electrostatic forces"]
              },
              {
                id: "1.6.7",
                code: "1.30",
                statement: "Know that ionic compounds conduct electricity only when molten or in aqueous solution",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.6.5"],
                keywords: ["ionic compounds", "electrical conductivity", "molten", "aqueous solution", "mobile ions"]
              }
            ],
            practicalWork: ["Ionic bonding models", "Conductivity investigations", "Dot-and-cross diagram practice"],
            mathematicalSkills: ["Ion charge calculations", "Formula writing", "Lattice structure analysis"]
          },
          {
            id: "1.7",
            name: "Covalent Bonding",
            description: "Formation and properties of covalent compounds",
            objectives: [
              {
                id: "1.7.1",
                code: "1.31",
                statement: "Know what is meant by covalent bonding and understand how it occurs between atoms of non-metals",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["know", "understand"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.4.3"],
                keywords: ["covalent bonding", "non-metals", "electron sharing", "molecular compounds"]
              },
              {
                id: "1.7.2",
                code: "1.32",
                statement: "Use dot-and-cross diagrams to represent the electronic configurations of simple covalent compounds",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["use", "represent"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.4.2", "1.7.1"],
                keywords: ["dot-and-cross diagrams", "covalent compounds", "electron sharing", "bonding pairs"]
              },
              {
                id: "1.7.3",
                code: "1.33",
                statement: "Understand why substances with a simple molecular structure are gases or liquids, or solids with low melting and boiling points",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.7.1"],
                keywords: ["simple molecular structure", "weak intermolecular forces", "low melting points", "low boiling points"]
              },
              {
                id: "1.7.4",
                code: "1.34",
                statement: "Know that substances with giant covalent structures are solids with high melting and boiling points",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.7.1"],
                keywords: ["giant covalent structures", "high melting points", "high boiling points", "strong covalent bonds"]
              },
              {
                id: "1.7.5",
                code: "1.35",
                statement: "Know that substances with giant covalent structures do not conduct electricity, except for graphite",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.7.4"],
                keywords: ["giant covalent structures", "electrical conductivity", "graphite", "delocalised electrons"]
              }
            ],
            practicalWork: ["Covalent bonding models", "Property investigations", "Dot-and-cross diagram practice"],
            mathematicalSkills: ["Bonding pair calculations", "Structure analysis", "Property correlations"]
          },
          {
            id: "1.8",
            name: "Metallic Bonding",
            description: "Structure and properties of metals",
            objectives: [
              {
                id: "1.8.1",
                code: "1.36",
                statement: "Know what is meant by metallic bonding and understand how this explains the properties of metals",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["know", "understand"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.4.3"],
                keywords: ["metallic bonding", "metal properties", "delocalised electrons", "positive metal ions"]
              },
              {
                id: "1.8.2",
                code: "1.37",
                statement: "Understand why metals conduct heat and electricity",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.8.1"],
                keywords: ["thermal conductivity", "electrical conductivity", "delocalised electrons", "electron mobility"]
              },
              {
                id: "1.8.3",
                code: "1.38",
                statement: "Understand why metals are malleable and ductile",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.8.1"],
                keywords: ["malleability", "ductility", "layers of atoms", "metallic bonding", "deformation"]
              }
            ],
            practicalWork: ["Metallic structure models", "Conductivity experiments", "Malleability demonstrations"],
            mathematicalSkills: ["Property analysis", "Structure correlations", "Bonding theory applications"]
          }
        ]
      },
      {
        id: "igcse-topic-2",
        name: "Inorganic Chemistry",
        description: "Chemistry of metals, non-metals, and common compounds",
        specificationCode: "2",
        timeAllocation: 40,
        assessmentNotes: "Practical chemistry with metal extraction, acid-base reactions, and gas tests",
        subtopics: [
          {
            id: "2.1",
            name: "Group 1 (Alkali Metals)",
            description: "Properties and reactions of alkali metals",
            objectives: [
              {
                id: "2.1.1",
                code: "2.1",
                statement: "Know the trends in properties of Group 1 elements: lithium, sodium and potassium",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.4.2"],
                keywords: ["alkali metals", "Group 1", "lithium", "sodium", "potassium", "trends", "reactivity"]
              },
              {
                id: "2.1.2",
                code: "2.2",
                statement: "Understand the reactions of Group 1 elements with oxygen, water and halogens",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "predict"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.1.1"],
                keywords: ["alkali metal reactions", "oxygen", "water", "halogens", "metal oxides", "metal hydroxides"]
              }
            ],
            practicalWork: ["Group 1 metal reactions", "Flame tests", "Reactivity series investigation"],
            mathematicalSkills: ["Trend analysis", "Reaction predictions", "Equation balancing"]
          },
          {
            id: "2.2",
            name: "Group 7 (Halogens)",
            description: "Properties and reactions of halogens",
            objectives: [
              {
                id: "2.2.1",
                code: "2.3",
                statement: "Know the trends in properties of Group 7 elements: fluorine, chlorine, bromine and iodine",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.4.2"],
                keywords: ["halogens", "Group 7", "fluorine", "chlorine", "bromine", "iodine", "trends"]
              },
              {
                id: "2.2.2",
                code: "2.4",
                statement: "Understand the displacement reactions of halogens with halides",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "predict"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.2.1"],
                keywords: ["displacement reactions", "halides", "reactivity order", "oxidation", "reduction"]
              }
            ],
            practicalWork: ["Halogen displacement reactions", "Halide identification tests", "Reactivity investigations"],
            mathematicalSkills: ["Reactivity series", "Redox equations", "Trend analysis"]
          },
          {
            id: "2.3",
            name: "Oxygen and Oxides",
            description: "Chemistry of oxygen and oxide compounds",
            objectives: [
              {
                id: "2.3.1",
                code: "2.5",
                statement: "Know the tests for oxygen and understand how oxygen is obtained industrially",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["know", "understand"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.2.2"],
                keywords: ["oxygen", "oxygen test", "industrial production", "fractional distillation", "air"]
              },
              {
                id: "2.3.2",
                code: "2.6",
                statement: "Understand the formation of metal oxides by oxidation of metals in air",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.3.1"],
                keywords: ["metal oxides", "oxidation", "combustion", "corrosion", "rusting"]
              }
            ],
            practicalWork: ["Oxygen preparation", "Metal oxidation experiments", "Oxide formation studies"],
            mathematicalSkills: ["Oxidation equations", "Mass calculations", "Percentage composition"]
          },
          {
            id: "2.4",
            name: "Hydrogen and Water",
            description: "Properties and reactions of hydrogen and water",
            objectives: [
              {
                id: "2.4.1",
                code: "2.7",
                statement: "Know the test for hydrogen and understand how hydrogen is obtained industrially",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["know", "understand"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.2.2"],
                keywords: ["hydrogen", "hydrogen test", "industrial production", "electrolysis", "steam reforming"]
              },
              {
                id: "2.4.2",
                code: "2.8",
                statement: "Understand the reactions between hydrogen and oxygen, and between hydrogen and halogens",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "predict"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.4.1"],
                keywords: ["hydrogen reactions", "water formation", "hydrogen halides", "synthesis reactions"]
              }
            ],
            practicalWork: ["Hydrogen preparation", "Water electrolysis", "Hydrogen combustion"],
            mathematicalSkills: ["Electrolysis calculations", "Gas volume calculations", "Reaction equations"]
          },
          {
            id: "2.5",
            name: "Reactivity Series",
            description: "Metal reactivity and displacement reactions",
            objectives: [
              {
                id: "2.5.1",
                code: "2.9",
                statement: "Know the order of reactivity of metals: potassium, sodium, lithium, calcium, magnesium, aluminium, zinc, iron, copper, silver, gold",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.1.1"],
                keywords: ["reactivity series", "metal reactivity", "displacement", "metal extraction"]
              },
              {
                id: "2.5.2",
                code: "2.10",
                statement: "Understand displacement reactions between metals and solutions of metal salts",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "predict"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 5,
                prerequisiteObjectives: ["2.5.1"],
                keywords: ["displacement reactions", "metal salts", "more reactive metals", "less reactive metals"]
              }
            ],
            practicalWork: ["Reactivity series experiments", "Metal displacement reactions", "Competitive reactions"],
            mathematicalSkills: ["Reactivity predictions", "Displacement equations", "Competition analysis"]
          },
          {
            id: "2.6",
            name: "Tests for Ions and Gases",
            description: "Identification tests for common ions and gases",
            objectives: [
              {
                id: "2.6.1",
                code: "2.11",
                statement: "Know the tests for the gases: ammonia, carbon dioxide, chlorine, hydrogen, oxygen",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "identify"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.2.2"],
                keywords: ["gas tests", "ammonia", "carbon dioxide", "chlorine", "hydrogen", "oxygen", "identification"]
              },
              {
                id: "2.6.2",
                code: "2.12",
                statement: "Know the tests for the ions: chloride, bromide, iodide, sulfate, carbonate, nitrate, ammonium",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "identify"],
                estimatedTeachingMinutes: 120,
                assessmentWeight: 6,
                prerequisiteObjectives: ["2.6.1"],
                keywords: ["ion tests", "halide tests", "sulfate test", "carbonate test", "nitrate test", "ammonium test"]
              }
            ],
            practicalWork: ["Gas identification tests", "Ion identification tests", "Qualitative analysis"],
            mathematicalSkills: ["Test result interpretation", "Analytical procedures", "Systematic identification"]
          }
        ]
      },
      {
        id: "igcse-topic-3",
        name: "Physical Chemistry",
        description: "Energy changes, reaction rates, and equilibrium",
        specificationCode: "3",
        timeAllocation: 35,
        assessmentNotes: "Quantitative chemistry with calculations, energy changes, and reaction kinetics",
        subtopics: [
          {
            id: "3.1",
            name: "Energetics",
            description: "Energy changes in chemical reactions",
            objectives: [
              {
                id: "3.1.1",
                code: "3.1",
                statement: "Know that chemical reactions in which heat is given out are exothermic and those in which heat is taken in are endothermic",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "define"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.5.1"],
                keywords: ["exothermic", "endothermic", "heat energy", "energy transfer", "temperature change"]
              },
              {
                id: "3.1.2",
                code: "3.2",
                statement: "Understand the use of ΔH to represent enthalpy change and know that exothermic reactions have negative ΔH and endothermic reactions have positive ΔH",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "interpret"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["3.1.1"],
                keywords: ["enthalpy change", "ΔH", "energy diagrams", "activation energy", "bond breaking", "bond forming"]
              },
              {
                id: "3.1.3",
                code: "3.3",
                statement: "Know that bond breaking is endothermic and bond forming is exothermic",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["3.1.2"],
                keywords: ["bond breaking", "bond forming", "bond energies", "energy required", "energy released"]
              }
            ],
            practicalWork: ["Calorimetry experiments", "Energy change measurements", "Reaction temperature monitoring"],
            mathematicalSkills: ["Enthalpy calculations", "Energy change calculations", "Graph interpretation"]
          },
          {
            id: "3.2",
            name: "Rates of Reaction",
            description: "Factors affecting reaction rates",
            objectives: [
              {
                id: "3.2.1",
                code: "3.4",
                statement: "Know that the rate of a reaction can be changed by changing the concentration, pressure, temperature or by adding a catalyst",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["reaction rate", "concentration", "pressure", "temperature", "catalyst", "collision theory"]
              },
              {
                id: "3.2.2",
                code: "3.5",
                statement: "Understand the collision theory and explain how changing concentration, pressure, temperature or adding a catalyst affects the rate of reaction",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["3.2.1"],
                keywords: ["collision theory", "successful collisions", "activation energy", "frequency of collisions", "catalysts"]
              }
            ],
            practicalWork: ["Rate of reaction experiments", "Catalyst investigations", "Temperature effect studies"],
            mathematicalSkills: ["Rate calculations", "Graph analysis", "Data interpretation"]
          },
          {
            id: "3.3",
            name: "Reversible Reactions and Equilibrium",
            description: "Dynamic equilibrium and Le Chatelier's principle",
            objectives: [
              {
                id: "3.3.1",
                code: "3.6",
                statement: "Know that some reactions are reversible and understand what is meant by dynamic equilibrium",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["know", "understand"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["3.2.1"],
                keywords: ["reversible reactions", "dynamic equilibrium", "forward reaction", "backward reaction", "equal rates"]
              },
              {
                id: "3.3.2",
                code: "3.7",
                statement: "Understand how changing temperature, pressure or concentration affects the position of equilibrium",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "predict"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 5,
                prerequisiteObjectives: ["3.3.1"],
                keywords: ["Le Chatelier's principle", "equilibrium position", "temperature effect", "pressure effect", "concentration effect"]
              }
            ],
            practicalWork: ["Equilibrium demonstrations", "Le Chatelier's principle experiments", "Equilibrium shift investigations"],
            mathematicalSkills: ["Equilibrium predictions", "Effect analysis", "Principle applications"]
          }
        ]
      },
      {
        id: "igcse-topic-4",
        name: "Organic Chemistry",
        description: "Chemistry of carbon compounds and polymers",
        specificationCode: "4",
        timeAllocation: 30,
        assessmentNotes: "Organic chemistry including hydrocarbons, alcohols, acids, and synthetic polymers",
        subtopics: [
          {
            id: "4.1",
            name: "Introduction to Organic Chemistry",
            description: "Basic concepts of organic chemistry",
            objectives: [
              {
                id: "4.1.1",
                code: "4.1",
                statement: "Know that organic chemistry is the chemistry of compounds containing carbon",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "define"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.3.1"],
                keywords: ["organic chemistry", "carbon compounds", "hydrocarbons", "organic molecules"]
              },
              {
                id: "4.1.2",
                code: "4.2",
                statement: "Know that a functional group is the reactive part of an organic molecule",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "identify"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.1.1"],
                keywords: ["functional group", "reactive part", "organic molecule", "chemical behavior"]
              }
            ],
            practicalWork: ["Organic compound identification", "Functional group recognition", "Molecular model building"],
            mathematicalSkills: ["Molecular formula determination", "Structural formula representation", "Isomer identification"]
          },
          {
            id: "4.2",
            name: "Alkanes",
            description: "Saturated hydrocarbons",
            objectives: [
              {
                id: "4.2.1",
                code: "4.3",
                statement: "Know the general formula for alkanes and understand that they are saturated hydrocarbons",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["know", "understand"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.1.1"],
                keywords: ["alkanes", "CnH2n+2", "saturated hydrocarbons", "single bonds", "homologous series"]
              },
              {
                id: "4.2.2",
                code: "4.4",
                statement: "Know the molecular and structural formulae of methane, ethane, propane and butane",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "write"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.2.1"],
                keywords: ["methane", "ethane", "propane", "butane", "molecular formula", "structural formula"]
              }
            ],
            practicalWork: ["Alkane combustion experiments", "Molecular model construction", "Hydrocarbon properties"],
            mathematicalSkills: ["Formula writing", "Homologous series patterns", "Combustion equations"]
          },
          {
            id: "4.3",
            name: "Alkenes",
            description: "Unsaturated hydrocarbons",
            objectives: [
              {
                id: "4.3.1",
                code: "4.5",
                statement: "Know the general formula for alkenes and understand that they are unsaturated hydrocarbons",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["know", "understand"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.2.1"],
                keywords: ["alkenes", "CnH2n", "unsaturated hydrocarbons", "double bonds", "C=C"]
              },
              {
                id: "4.3.2",
                code: "4.6",
                statement: "Know the molecular and structural formulae of ethene, propene and butene",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "write"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.3.1"],
                keywords: ["ethene", "propene", "butene", "molecular formula", "structural formula", "double bond"]
              },
              {
                id: "4.3.3",
                code: "4.7",
                statement: "Understand addition reactions of alkenes with hydrogen, steam, hydrogen halides and halogens",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "predict"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 5,
                prerequisiteObjectives: ["4.3.1"],
                keywords: ["addition reactions", "hydrogen", "steam", "hydrogen halides", "halogens", "alkene reactions"]
              }
            ],
            practicalWork: ["Alkene addition reactions", "Bromine water test", "Hydrogenation experiments"],
            mathematicalSkills: ["Addition reaction equations", "Product prediction", "Mechanism understanding"]
          },
          {
            id: "4.4",
            name: "Alcohols",
            description: "Organic compounds containing hydroxyl groups",
            objectives: [
              {
                id: "4.4.1",
                code: "4.8",
                statement: "Know the molecular and structural formulae of methanol, ethanol, propanol and butanol",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "write"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.1.2"],
                keywords: ["alcohols", "methanol", "ethanol", "propanol", "butanol", "hydroxyl group", "-OH"]
              },
              {
                id: "4.4.2",
                code: "4.9",
                statement: "Know the uses of alcohols in alcoholic drinks and as fuels",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.4.1"],
                keywords: ["alcohol uses", "alcoholic drinks", "fuels", "fermentation", "ethanol fuel"]
              }
            ],
            practicalWork: ["Alcohol preparation", "Fermentation experiments", "Alcohol combustion"],
            mathematicalSkills: ["Fermentation equations", "Combustion calculations", "Yield calculations"]
          },
          {
            id: "4.5",
            name: "Carboxylic Acids",
            description: "Organic acids containing carboxyl groups",
            objectives: [
              {
                id: "4.5.1",
                code: "4.10",
                statement: "Know the molecular and structural formulae of methanoic acid, ethanoic acid, propanoic acid and butanoic acid",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "write"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.1.2"],
                keywords: ["carboxylic acids", "methanoic acid", "ethanoic acid", "propanoic acid", "butanoic acid", "carboxyl group", "-COOH"]
              },
              {
                id: "4.5.2",
                code: "4.11",
                statement: "Know the reactions of carboxylic acids with metals, metal oxides, metal hydroxides and metal carbonates",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "predict"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.5.1"],
                keywords: ["carboxylic acid reactions", "metals", "metal oxides", "metal hydroxides", "metal carbonates", "salt formation"]
              }
            ],
            practicalWork: ["Carboxylic acid reactions", "Acid-metal experiments", "Salt preparation"],
            mathematicalSkills: ["Acid reaction equations", "Salt formation equations", "Neutralization calculations"]
          },
          {
            id: "4.6",
            name: "Synthetic Polymers",
            description: "Addition and condensation polymers",
            objectives: [
              {
                id: "4.6.1",
                code: "4.12",
                statement: "Know that addition polymers are formed by joining up many small molecules called monomers",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "understand"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.3.1"],
                keywords: ["addition polymers", "monomers", "polymerization", "polymer chains", "repeating units"]
              },
              {
                id: "4.6.2",
                code: "4.13",
                statement: "Know the formation of poly(ethene) from ethene and poly(propene) from propene",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "represent"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.6.1"],
                keywords: ["poly(ethene)", "poly(propene)", "polyethylene", "polypropylene", "polymer formation"]
              },
              {
                id: "4.6.3",
                code: "4.14",
                statement: "Understand the environmental challenges posed by synthetic polymers",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "evaluate"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.6.1"],
                keywords: ["environmental impact", "plastic pollution", "biodegradability", "recycling", "waste management"]
              }
            ],
            practicalWork: ["Polymer formation demonstrations", "Polymer property investigations", "Environmental impact studies"],
            mathematicalSkills: ["Polymer structure representation", "Molecular weight calculations", "Environmental data analysis"]
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
          name: "Paper 1: Core Inorganic and Physical Chemistry",
          duration: 105,
          marks: 90,
          questionTypes: ["multiple choice", "short answer", "calculations"],
          topicCoverage: ["topic-1", "topic-2", "topic-3", "topic-4", "topic-5", "topic-6", "topic-7", "topic-8", "topic-9", "topic-10"]
        },
        {
          paperNumber: 2,
          name: "Paper 2: Core Organic and Physical Chemistry",
          duration: 105,
          marks: 90,
          questionTypes: ["multiple choice", "short answer", "calculations"],
          topicCoverage: ["topic-1", "topic-11", "topic-12", "topic-13", "topic-14", "topic-15", "topic-16", "topic-17", "topic-18", "topic-19", "topic-20"]
        },
        {
          paperNumber: 3,
          name: "Paper 3: General and Practical Applications",
          duration: 120,
          marks: 120,
          questionTypes: ["structured", "extended writing", "practical analysis"],
          topicCoverage: ["topic-1", "topic-2", "topic-3", "topic-4", "topic-5", "topic-6", "topic-7", "topic-8", "topic-9", "topic-10", "topic-11", "topic-12", "topic-13", "topic-14", "topic-15", "topic-16", "topic-17", "topic-18", "topic-19", "topic-20"]
        }
      ]
    },
    topics: [
      {
        id: "a-level-topic-1",
        name: "Atomic Structure and the Periodic Table",
        description: "Advanced atomic theory, electron configuration, and periodic trends",
        specificationCode: "1",
        timeAllocation: 25,
        assessmentNotes: "Foundation topic with mathematical calculations and trend analysis",
        subtopics: [
          {
            id: "1.1",
            name: "Atomic Structure",
            description: "Advanced atomic theory including isotopes, mass spectrometry, and electron arrangement",
            objectives: [
              {
                id: "1.1.1",
                code: "1.1",
                statement: "Know the structure of an atom in terms of protons, neutrons and electrons",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["proton", "neutron", "electron", "nucleus", "atomic structure"]
              },
              {
                id: "1.1.2",
                code: "1.2",
                statement: "Know the relative mass and relative charge of a proton, neutron and electron",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 20,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["relative mass", "relative charge", "subatomic particles"]
              },
              {
                id: "1.1.3",
                code: "1.3",
                statement: "Understand the term isotope and be able to state the relative atomic mass of an element in terms of the weighted average mass of its isotopes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.1.1", "1.1.2"],
                keywords: ["isotope", "relative atomic mass", "weighted average", "mass spectrometry"]
              }
            ],
            practicalWork: ["Mass spectrometry simulation", "Isotope calculations", "Atomic structure models"],
            mathematicalSkills: ["Weighted averages", "Percentage abundance", "Mass calculations"]
          },
          {
            id: "1.2",
            name: "Electron Configuration",
            description: "Electronic structure and orbital theory",
            objectives: [
              {
                id: "1.2.1",
                code: "1.4",
                statement: "Know that electrons occupy orbitals and that these orbitals have different energy levels",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.1.1"],
                keywords: ["orbital", "energy levels", "electron configuration", "quantum mechanics"]
              },
              {
                id: "1.2.2",
                code: "1.5",
                statement: "Know the number of electrons that can occupy the first four energy levels",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 20,
                assessmentWeight: 2,
                prerequisiteObjectives: ["1.2.1"],
                keywords: ["energy levels", "electron capacity", "2, 8, 18, 32 rule"]
              },
              {
                id: "1.2.3",
                code: "1.6",
                statement: "Understand how to write electron configurations for atoms and ions up to Z=36",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["write", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["1.2.1", "1.2.2"],
                keywords: ["electron configuration", "ions", "orbital notation", "aufbau principle"]
              }
            ],
            practicalWork: ["Orbital models", "Electron configuration practice", "Spectroscopy demonstrations"],
            mathematicalSkills: ["Electron counting", "Orbital filling", "Ion formation"]
          }
        ]
      },
      {
        id: "a-level-topic-2",
        name: "Bonding and Structure",
        description: "Chemical bonding, molecular geometry, and structure-property relationships",
        specificationCode: "2",
        timeAllocation: 30,
        assessmentNotes: "Core topic with 3D visualization and property predictions",
        subtopics: [
          {
            id: "2.1",
            name: "Ionic Bonding",
            description: "Ionic bonding theory, lattice structures, and properties",
            objectives: [
              {
                id: "2.1.1",
                code: "2.1",
                statement: "Understand ionic bonding in terms of electrostatic attraction between oppositely charged ions",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.2.3"],
                keywords: ["ionic bonding", "electrostatic attraction", "cation", "anion", "electron transfer"]
              },
              {
                id: "2.1.2",
                code: "2.2",
                statement: "Know that ionic crystals are giant three-dimensional lattices of ions",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["2.1.1"],
                keywords: ["ionic crystals", "lattice", "three-dimensional", "structure"]
              },
              {
                id: "2.1.3",
                code: "2.3",
                statement: "Understand the link between the charge on the ions and the lattice energy",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "relate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["2.1.1", "2.1.2"],
                keywords: ["lattice energy", "charge density", "ionic radius", "Born-Haber cycle"]
              }
            ],
            practicalWork: ["Ionic compound formation", "Lattice structure models", "Conductivity tests"],
            mathematicalSkills: ["Lattice energy calculations", "Charge density", "Ionic radius trends"]
          },
          {
            id: "2.2",
            name: "Covalent Bonding",
            description: "Covalent bonding theory, molecular shapes, and intermolecular forces",
            objectives: [
              {
                id: "2.2.1",
                code: "2.4",
                statement: "Understand covalent bonding in terms of shared pairs of electrons",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.2.3"],
                keywords: ["covalent bonding", "shared electrons", "electron pair", "bond formation"]
              },
              {
                id: "2.2.2",
                code: "2.5",
                statement: "Know that covalent bonds can be single, double or triple bonds",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "identify"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["2.2.1"],
                keywords: ["single bond", "double bond", "triple bond", "bond order"]
              },
              {
                id: "2.2.3",
                code: "2.6",
                statement: "Understand the shapes of molecules with up to 6 electron pairs using VSEPR theory",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["predict", "determine"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["2.2.1", "2.2.2"],
                keywords: ["VSEPR theory", "molecular shape", "electron pairs", "geometry", "bond angles"]
              }
            ],
            practicalWork: ["Molecular model building", "Bond angle measurement", "Polarity investigations"],
            mathematicalSkills: ["Bond angle calculations", "Electron pair geometry", "Molecular modeling"]
          }
        ]
      },
      {
        id: "a-level-topic-3",
        name: "States of Matter",
        description: "Kinetic theory, phase changes, and intermolecular forces",
        specificationCode: "3",
        timeAllocation: 15,
        assessmentNotes: "Foundation topic linking to thermodynamics and kinetics",
        subtopics: [
          {
            id: "3.1",
            name: "Kinetic Theory",
            description: "Particle theory and behavior in different states",
            objectives: [
              {
                id: "3.1.1",
                code: "3.1",
                statement: "Understand the kinetic theory of matter and its application to solids, liquids and gases",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "apply"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["kinetic theory", "particle motion", "temperature", "energy distribution"]
              },
              {
                id: "3.1.2",
                code: "3.2",
                statement: "Know that the average kinetic energy of particles is proportional to absolute temperature",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "relate"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 3,
                prerequisiteObjectives: ["3.1.1"],
                keywords: ["average kinetic energy", "absolute temperature", "Kelvin scale", "proportionality"]
              }
            ],
            practicalWork: ["Temperature-motion demonstrations", "Phase change observations", "Kinetic theory models"],
            mathematicalSkills: ["Temperature conversions", "Energy calculations", "Kinetic energy relationships"]
          }
        ]
      },
      {
        id: "a-level-topic-4",
        name: "Energetics I",
        description: "Enthalpy changes, Hess's law, and thermochemistry",
        specificationCode: "4",
        timeAllocation: 25,
        assessmentNotes: "Mathematical topic with calculation-based questions",
        subtopics: [
          {
            id: "4.1",
            name: "Enthalpy Changes",
            description: "Types of enthalpy changes and their measurement",
            objectives: [
              {
                id: "4.1.1",
                code: "4.1",
                statement: "Know that enthalpy change is the heat change at constant pressure",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "define"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["enthalpy change", "heat", "constant pressure", "thermodynamics"]
              },
              {
                id: "4.1.2",
                code: "4.2",
                statement: "Know the standard conditions for measuring enthalpy changes",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 20,
                assessmentWeight: 2,
                prerequisiteObjectives: ["4.1.1"],
                keywords: ["standard conditions", "298K", "1 bar", "standard states"]
              },
              {
                id: "4.1.3",
                code: "4.3",
                statement: "Understand the terms: enthalpy of formation, combustion, fusion, and vaporization",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "define"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.1.1", "4.1.2"],
                keywords: ["enthalpy of formation", "combustion", "fusion", "vaporization", "standard enthalpy"]
              }
            ],
            practicalWork: ["Calorimetry experiments", "Enthalpy measurement", "Heat capacity determination"],
            mathematicalSkills: ["Enthalpy calculations", "Heat capacity", "Energy conversions"]
          },
          {
            id: "4.2",
            name: "Hess's Law",
            description: "Hess's law and enthalpy calculations",
            objectives: [
              {
                id: "4.2.1",
                code: "4.4",
                statement: "Understand Hess's law and use it to calculate enthalpy changes",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "apply"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["4.1.3"],
                keywords: ["Hess's law", "enthalpy cycles", "indirect calculation", "conservation of energy"]
              },
              {
                id: "4.2.2",
                code: "4.5",
                statement: "Use bond enthalpies to calculate enthalpy changes",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "use"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["4.2.1"],
                keywords: ["bond enthalpy", "bond breaking", "bond forming", "enthalpy calculation"]
              }
            ],
            practicalWork: ["Hess's law verification", "Bond enthalpy experiments", "Enthalpy cycle construction"],
            mathematicalSkills: ["Hess's law calculations", "Bond enthalpy arithmetic", "Energy cycle analysis"]
          }
        ]
      },
      {
        id: "a-level-topic-5",
        name: "Kinetics I",
        description: "Rates of reaction, collision theory, and factors affecting reaction rates",
        specificationCode: "5",
        timeAllocation: 25,
        assessmentNotes: "Practical-based topic with graph analysis and rate calculations",
        subtopics: [
          {
            id: "5.1",
            name: "Reaction Rates",
            description: "Measuring and calculating reaction rates",
            objectives: [
              {
                id: "5.1.1",
                code: "5.1",
                statement: "Understand how to measure the rate of a reaction",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "measure"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["reaction rate", "concentration", "time", "measurement", "monitoring"]
              },
              {
                id: "5.1.2",
                code: "5.2",
                statement: "Know the factors that affect the rate of a reaction",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "list"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["5.1.1"],
                keywords: ["concentration", "temperature", "surface area", "catalysts", "pressure"]
              },
              {
                id: "5.1.3",
                code: "5.3",
                statement: "Understand collision theory and how it explains the effect of concentration, temperature, and surface area on reaction rates",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["5.1.1", "5.1.2"],
                keywords: ["collision theory", "activation energy", "frequency", "energy distribution", "Maxwell-Boltzmann"]
              }
            ],
            practicalWork: ["Rate measurement experiments", "Concentration effects", "Temperature effects", "Surface area investigations"],
            mathematicalSkills: ["Rate calculations", "Graph analysis", "Concentration changes"]
          },
          {
            id: "5.2",
            name: "Catalysis",
            description: "Catalysts and their effect on reaction rates",
            objectives: [
              {
                id: "5.2.1",
                code: "5.4",
                statement: "Understand how catalysts work and their effect on activation energy",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["5.1.3"],
                keywords: ["catalyst", "activation energy", "alternative pathway", "energy profile"]
              },
              {
                id: "5.2.2",
                code: "5.5",
                statement: "Know the difference between homogeneous and heterogeneous catalysis",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "distinguish"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["5.2.1"],
                keywords: ["homogeneous", "heterogeneous", "catalyst", "phase", "surface area"]
              }
            ],
            practicalWork: ["Catalyst investigations", "Homogeneous catalysis", "Heterogeneous catalysis", "Enzyme catalysis"],
            mathematicalSkills: ["Activation energy calculations", "Rate comparisons", "Catalyst efficiency"]
          }
        ]
      },
      {
        id: "a-level-topic-6",
        name: "Equilibrium I",
        description: "Dynamic equilibrium, Le Chatelier's principle, and equilibrium constants",
        specificationCode: "6",
        timeAllocation: 25,
        assessmentNotes: "Mathematical topic with equilibrium calculations and principle applications",
        subtopics: [
          {
            id: "6.1",
            name: "Dynamic Equilibrium",
            description: "Concept of dynamic equilibrium and equilibrium constants",
            objectives: [
              {
                id: "6.1.1",
                code: "6.1",
                statement: "Understand what is meant by dynamic equilibrium",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "define"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: [],
                keywords: ["dynamic equilibrium", "forward reaction", "reverse reaction", "constant concentration"]
              },
              {
                id: "6.1.2",
                code: "6.2",
                statement: "Know the characteristics of a system in dynamic equilibrium",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "list"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["6.1.1"],
                keywords: ["closed system", "constant temperature", "equal rates", "constant concentrations"]
              },
              {
                id: "6.1.3",
                code: "6.3",
                statement: "Understand the equilibrium constant Kc and be able to calculate its value",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["6.1.1", "6.1.2"],
                keywords: ["equilibrium constant", "Kc", "concentration", "equilibrium expression"]
              }
            ],
            practicalWork: ["Equilibrium demonstrations", "Kc determinations", "Equilibrium position investigations"],
            mathematicalSkills: ["Kc calculations", "Equilibrium expressions", "Concentration calculations"]
          },
          {
            id: "6.2",
            name: "Le Chatelier's Principle",
            description: "Effect of changes in conditions on equilibrium position",
            objectives: [
              {
                id: "6.2.1",
                code: "6.4",
                statement: "Understand Le Chatelier's principle and predict the effect of changes in conditions on equilibrium position",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["predict", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["6.1.3"],
                keywords: ["Le Chatelier's principle", "concentration", "temperature", "pressure", "equilibrium shift"]
              },
              {
                id: "6.2.2",
                code: "6.5",
                statement: "Know the effect of temperature on the equilibrium constant",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["6.2.1"],
                keywords: ["temperature", "equilibrium constant", "endothermic", "exothermic", "enthalpy change"]
              }
            ],
            practicalWork: ["Le Chatelier demonstrations", "Temperature effects", "Pressure effects", "Concentration changes"],
            mathematicalSkills: ["Equilibrium calculations", "Yield predictions", "Condition optimization"]
          }
        ]
      },
      {
        id: "a-level-topic-7",
        name: "Redox I",
        description: "Oxidation and reduction, redox reactions, and electrochemical cells",
        specificationCode: "7",
        timeAllocation: 25,
        assessmentNotes: "Practical topic with electrode potentials and cell calculations",
        subtopics: [
          {
            id: "7.1",
            name: "Oxidation and Reduction",
            description: "Redox concepts and oxidation states",
            objectives: [
              {
                id: "7.1.1",
                code: "7.1",
                statement: "Understand oxidation and reduction in terms of electron transfer",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "define"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["oxidation", "reduction", "electron transfer", "redox", "OIL RIG"]
              },
              {
                id: "7.1.2",
                code: "7.2",
                statement: "Know how to assign oxidation states to atoms in compounds and ions",
                bloomsLevel: "apply",
                difficulty: "basic",
                commandWords: ["assign", "calculate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["7.1.1"],
                keywords: ["oxidation state", "oxidation number", "rules", "compounds", "ions"]
              },
              {
                id: "7.1.3",
                code: "7.3",
                statement: "Understand how to balance redox equations using oxidation states",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["balance", "construct"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["7.1.1", "7.1.2"],
                keywords: ["redox equations", "balancing", "half equations", "electron balance"]
              }
            ],
            practicalWork: ["Redox titrations", "Oxidation state determination", "Redox reactions", "Electrochemical cells"],
            mathematicalSkills: ["Oxidation state calculations", "Equation balancing", "Electron counting"]
          },
          {
            id: "7.2",
            name: "Electrochemical Cells",
            description: "Electrode potentials and electrochemical cells",
            objectives: [
              {
                id: "7.2.1",
                code: "7.4",
                statement: "Understand electrode potentials and how they are measured",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "measure"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["7.1.3"],
                keywords: ["electrode potential", "standard hydrogen electrode", "cell potential", "voltage"]
              },
              {
                id: "7.2.2",
                code: "7.5",
                statement: "Be able to calculate cell EMFs and predict the feasibility of redox reactions",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "predict"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["7.2.1"],
                keywords: ["EMF", "cell potential", "feasibility", "standard electrode potential", "electrochemical series"]
              }
            ],
            practicalWork: ["Electrochemical cell construction", "EMF measurements", "Electrode potential determination"],
            mathematicalSkills: ["EMF calculations", "Cell potential", "Feasibility predictions"]
          }
        ]
      },
      {
        id: "a-level-topic-8",
        name: "Inorganic Chemistry I",
        description: "Periodic trends, Group 1, Group 2, and Group 7 elements",
        specificationCode: "8",
        timeAllocation: 30,
        assessmentNotes: "Pattern recognition topic with trend analysis and reactions",
        subtopics: [
          {
            id: "8.1",
            name: "Periodic Trends",
            description: "Atomic radius, ionization energy, and electronegativity trends",
            objectives: [
              {
                id: "8.1.1",
                code: "8.1",
                statement: "Understand the trends in atomic radius, ionization energy, and electronegativity across periods and down groups",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["1.2.3"],
                keywords: ["atomic radius", "ionization energy", "electronegativity", "periodic trends", "shielding"]
              },
              {
                id: "8.1.2",
                code: "8.2",
                statement: "Know the relationship between electron configuration and position in the periodic table",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "relate"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.2.3"],
                keywords: ["electron configuration", "periodic table", "s-block", "p-block", "d-block"]
              }
            ],
            practicalWork: ["Periodic trend investigations", "Ionization energy measurements", "Electronegativity comparisons"],
            mathematicalSkills: ["Trend analysis", "Graph interpretation", "Data correlation"]
          },
          {
            id: "8.2",
            name: "Group 1 Elements",
            description: "Alkali metals and their compounds",
            objectives: [
              {
                id: "8.2.1",
                code: "8.3",
                statement: "Know the properties and reactions of Group 1 elements",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["8.1.1"],
                keywords: ["alkali metals", "Group 1", "reactivity", "reactions", "properties"]
              },
              {
                id: "8.2.2",
                code: "8.4",
                statement: "Understand the trend in reactivity down Group 1",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["8.2.1"],
                keywords: ["reactivity trend", "ionization energy", "atomic radius", "Group 1"]
              }
            ],
            practicalWork: ["Group 1 element reactions", "Flame tests", "Reactivity demonstrations"],
            mathematicalSkills: ["Reactivity trends", "Ionization energy calculations", "Reaction predictions"]
          },
          {
            id: "8.3",
            name: "Group 2 Elements",
            description: "Alkaline earth metals and their compounds",
            objectives: [
              {
                id: "8.3.1",
                code: "8.5",
                statement: "Know the properties and reactions of Group 2 elements",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["8.1.1"],
                keywords: ["alkaline earth metals", "Group 2", "reactivity", "reactions", "properties"]
              },
              {
                id: "8.3.2",
                code: "8.6",
                statement: "Understand the trend in reactivity down Group 2",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["8.3.1"],
                keywords: ["reactivity trend", "ionization energy", "atomic radius", "Group 2"]
              }
            ],
            practicalWork: ["Group 2 element reactions", "Thermal decomposition", "Reactivity demonstrations"],
            mathematicalSkills: ["Reactivity trends", "Thermal stability", "Reaction predictions"]
          },
          {
            id: "8.4",
            name: "Group 7 Elements",
            description: "Halogens and their compounds",
            objectives: [
              {
                id: "8.4.1",
                code: "8.7",
                statement: "Know the properties and reactions of Group 7 elements",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["8.1.1"],
                keywords: ["halogens", "Group 7", "reactivity", "reactions", "properties"]
              },
              {
                id: "8.4.2",
                code: "8.8",
                statement: "Understand the trend in reactivity down Group 7 and displacement reactions",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["8.4.1"],
                keywords: ["reactivity trend", "electronegativity", "displacement", "Group 7"]
              }
            ],
            practicalWork: ["Halogen reactions", "Displacement reactions", "Halide tests"],
            mathematicalSkills: ["Reactivity trends", "Electronegativity", "Reaction predictions"]
          }
        ]
      },
      {
        id: "a-level-topic-9",
        name: "Organic Chemistry I",
        description: "Introduction to organic chemistry, alkanes, and alkenes",
        specificationCode: "9",
        timeAllocation: 30,
        assessmentNotes: "Foundation organic topic with nomenclature and basic reactions",
        subtopics: [
          {
            id: "9.1",
            name: "Introduction to Organic Chemistry",
            description: "Basic concepts, nomenclature, and isomerism",
            objectives: [
              {
                id: "9.1.1",
                code: "9.1",
                statement: "Understand the terms: molecular formula, structural formula, displayed formula, and skeletal formula",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "define"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["molecular formula", "structural formula", "displayed formula", "skeletal formula"]
              },
              {
                id: "9.1.2",
                code: "9.2",
                statement: "Know the IUPAC rules for naming organic compounds",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "name"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["9.1.1"],
                keywords: ["IUPAC nomenclature", "naming rules", "functional groups", "prefixes", "suffixes"]
              },
              {
                id: "9.1.3",
                code: "9.3",
                statement: "Understand structural isomerism and stereoisomerism",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "identify"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["9.1.1", "9.1.2"],
                keywords: ["structural isomerism", "stereoisomerism", "optical isomerism", "geometric isomerism"]
              }
            ],
            practicalWork: ["Molecular model building", "Isomer identification", "Nomenclature practice"],
            mathematicalSkills: ["Formula calculations", "Isomer counting", "Structural analysis"]
          },
          {
            id: "9.2",
            name: "Alkanes",
            description: "Saturated hydrocarbons and their reactions",
            objectives: [
              {
                id: "9.2.1",
                code: "9.4",
                statement: "Know the general formula and properties of alkanes",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["9.1.1"],
                keywords: ["alkanes", "general formula", "saturated", "properties", "CnH2n+2"]
              },
              {
                id: "9.2.2",
                code: "9.5",
                statement: "Understand the combustion and substitution reactions of alkanes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["9.2.1"],
                keywords: ["combustion", "substitution", "free radical", "halogenation", "methane"]
              }
            ],
            practicalWork: ["Alkane combustion", "Halogenation reactions", "Free radical mechanisms"],
            mathematicalSkills: ["Combustion calculations", "Yield calculations", "Stoichiometry"]
          },
          {
            id: "9.3",
            name: "Alkenes",
            description: "Unsaturated hydrocarbons and their reactions",
            objectives: [
              {
                id: "9.3.1",
                code: "9.6",
                statement: "Know the general formula and properties of alkenes",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "state"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["9.1.1"],
                keywords: ["alkenes", "general formula", "unsaturated", "properties", "CnH2n"]
              },
              {
                id: "9.3.2",
                code: "9.7",
                statement: "Understand the addition reactions of alkenes",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["9.3.1"],
                keywords: ["addition reactions", "hydrogenation", "halogenation", "hydration", "Markovnikov's rule"]
              },
              {
                id: "9.3.3",
                code: "9.8",
                statement: "Know the mechanism of addition reactions",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "describe"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["9.3.2"],
                keywords: ["addition mechanism", "electrophilic addition", "carbocation", "intermediate"]
              }
            ],
            practicalWork: ["Alkene addition reactions", "Bromine water tests", "Hydrogenation demonstrations"],
            mathematicalSkills: ["Addition calculations", "Yield predictions", "Mechanism analysis"]
          }
        ]
      },
      {
        id: "a-level-topic-10",
        name: "Modern Analytical Techniques I",
        description: "Spectroscopy and analytical methods",
        specificationCode: "10",
        timeAllocation: 20,
        assessmentNotes: "Practical analysis topic with spectrum interpretation",
        subtopics: [
          {
            id: "10.1",
            name: "Mass Spectrometry",
            description: "Principles and applications of mass spectrometry",
            objectives: [
              {
                id: "10.1.1",
                code: "10.1",
                statement: "Understand the principles of mass spectrometry",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.1.3"],
                keywords: ["mass spectrometry", "ionization", "fragmentation", "mass-to-charge ratio", "molecular ion"]
              },
              {
                id: "10.1.2",
                code: "10.2",
                statement: "Be able to interpret mass spectra and identify molecular structures",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["interpret", "identify"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["10.1.1"],
                keywords: ["mass spectrum", "molecular ion peak", "fragmentation pattern", "base peak", "isotope peaks"]
              }
            ],
            practicalWork: ["Mass spectrum interpretation", "Molecular weight determination", "Fragmentation analysis"],
            mathematicalSkills: ["Mass-to-charge calculations", "Molecular weight", "Isotope ratios"]
          },
          {
            id: "10.2",
            name: "Infrared Spectroscopy",
            description: "IR spectroscopy principles and applications",
            objectives: [
              {
                id: "10.2.1",
                code: "10.3",
                statement: "Understand the principles of infrared spectroscopy",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: [],
                keywords: ["infrared spectroscopy", "vibrational energy", "wavenumber", "functional groups", "absorption"]
              },
              {
                id: "10.2.2",
                code: "10.4",
                statement: "Be able to interpret IR spectra and identify functional groups",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["interpret", "identify"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["10.2.1"],
                keywords: ["IR spectrum", "functional group identification", "characteristic peaks", "fingerprint region"]
              }
            ],
            practicalWork: ["IR spectrum interpretation", "Functional group identification", "Spectral analysis"],
            mathematicalSkills: ["Wavenumber analysis", "Peak identification", "Spectral correlation"]
          }
        ]
      },
      {
        id: "a-level-topic-11",
        name: "Energetics II",
        description: "Advanced thermodynamics, entropy, and Gibbs free energy",
        specificationCode: "11",
        timeAllocation: 25,
        assessmentNotes: "Advanced mathematical topic with thermodynamic calculations",
        subtopics: [
          {
            id: "11.1",
            name: "Lattice Energy",
            description: "Lattice energy calculations and Born-Haber cycles",
            objectives: [
              {
                id: "11.1.1",
                code: "11.1",
                statement: "Know the definition of lattice energy and factors affecting its magnitude",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.1.3", "2.1.3"],
                keywords: ["lattice energy", "ionic radius", "charge", "Coulomb's law", "lattice enthalpy"]
              },
              {
                id: "11.1.2",
                code: "11.2",
                statement: "Be able to construct Born-Haber cycles and calculate lattice energies",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["construct", "calculate"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["11.1.1", "4.2.1"],
                keywords: ["Born-Haber cycle", "enthalpy of formation", "ionization energy", "electron affinity", "enthalpy of atomization"]
              }
            ],
            practicalWork: ["Born-Haber cycle construction", "Lattice energy calculations", "Enthalpy measurements"],
            mathematicalSkills: ["Born-Haber calculations", "Enthalpy cycles", "Energy relationships"]
          },
          {
            id: "11.2",
            name: "Entropy and Gibbs Free Energy",
            description: "Thermodynamic spontaneity and equilibrium",
            objectives: [
              {
                id: "11.2.1",
                code: "11.3",
                statement: "Understand the concept of entropy and its relationship to disorder",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["4.1.1"],
                keywords: ["entropy", "disorder", "randomness", "statistical mechanics", "second law"]
              },
              {
                id: "11.2.2",
                code: "11.4",
                statement: "Know the Gibbs free energy equation and its use in predicting spontaneity",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "predict"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["11.2.1"],
                keywords: ["Gibbs free energy", "spontaneity", "entropy change", "enthalpy change", "temperature"]
              }
            ],
            practicalWork: ["Entropy determinations", "Spontaneity predictions", "Gibbs free energy calculations"],
            mathematicalSkills: ["Gibbs free energy calculations", "Entropy calculations", "Spontaneity predictions"]
          }
        ]
      },
      {
        id: "a-level-topic-12",
        name: "Kinetics II",
        description: "Advanced kinetics, rate equations, and reaction mechanisms",
        specificationCode: "12",
        timeAllocation: 30,
        assessmentNotes: "Mathematical topic with rate equation derivation and mechanism analysis",
        subtopics: [
          {
            id: "12.1",
            name: "Rate Equations",
            description: "Rate laws, order of reaction, and rate constants",
            objectives: [
              {
                id: "12.1.1",
                code: "12.1",
                statement: "Understand the concept of order of reaction and rate equations",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "define"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["5.1.3"],
                keywords: ["rate equation", "order of reaction", "rate constant", "concentration", "rate law"]
              },
              {
                id: "12.1.2",
                code: "12.2",
                statement: "Be able to determine rate equations from experimental data",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["determine", "calculate"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["12.1.1"],
                keywords: ["initial rates", "concentration-time graphs", "half-life", "integrated rate laws"]
              }
            ],
            practicalWork: ["Rate equation determination", "Initial rate experiments", "Half-life measurements"],
            mathematicalSkills: ["Rate law calculations", "Order determination", "Rate constant calculations"]
          },
          {
            id: "12.2",
            name: "Reaction Mechanisms",
            description: "Elementary steps and multi-step mechanisms",
            objectives: [
              {
                id: "12.2.1",
                code: "12.3",
                statement: "Understand the relationship between reaction mechanisms and rate equations",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "relate"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["12.1.2"],
                keywords: ["reaction mechanism", "elementary steps", "rate-determining step", "intermediate"]
              },
              {
                id: "12.2.2",
                code: "12.4",
                statement: "Be able to propose mechanisms consistent with rate equations",
                bloomsLevel: "create",
                difficulty: "advanced",
                commandWords: ["propose", "construct"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["12.2.1"],
                keywords: ["mechanism proposal", "pre-equilibrium", "steady-state approximation", "chain reactions"]
              }
            ],
            practicalWork: ["Mechanism investigations", "Rate-determining step identification", "Multi-step reactions"],
            mathematicalSkills: ["Mechanism analysis", "Rate equation derivation", "Kinetic modeling"]
          }
        ]
      },
      {
        id: "a-level-topic-13",
        name: "Equilibrium II",
        description: "Advanced equilibrium concepts and calculations",
        specificationCode: "13",
        timeAllocation: 25,
        assessmentNotes: "Mathematical topic with complex equilibrium calculations",
        subtopics: [
          {
            id: "13.1",
            name: "Equilibrium Calculations",
            description: "ICE tables and equilibrium problem solving",
            objectives: [
              {
                id: "13.1.1",
                code: "13.1",
                statement: "Be able to perform complex equilibrium calculations using ICE tables",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "solve"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["6.1.3"],
                keywords: ["ICE tables", "equilibrium calculations", "initial concentrations", "change", "equilibrium concentrations"]
              },
              {
                id: "13.1.2",
                code: "13.2",
                statement: "Understand the relationship between Kc and Kp",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "relate"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["13.1.1"],
                keywords: ["Kc", "Kp", "partial pressure", "gas constant", "temperature"]
              }
            ],
            practicalWork: ["Complex equilibrium calculations", "Kc and Kp determinations", "Equilibrium analysis"],
            mathematicalSkills: ["ICE table calculations", "Kc and Kp relationships", "Equilibrium problem solving"]
          },
          {
            id: "13.2",
            name: "Heterogeneous Equilibria",
            description: "Equilibria involving different phases",
            objectives: [
              {
                id: "13.2.1",
                code: "13.3",
                statement: "Understand heterogeneous equilibria and their equilibrium expressions",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "write"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["6.1.3"],
                keywords: ["heterogeneous equilibria", "solid-gas equilibria", "liquid-gas equilibria", "equilibrium expression"]
              }
            ],
            practicalWork: ["Heterogeneous equilibrium demonstrations", "Phase equilibria", "Equilibrium expression writing"],
            mathematicalSkills: ["Heterogeneous equilibrium calculations", "Phase equilibrium analysis"]
          }
        ]
      },
      {
        id: "a-level-topic-14",
        name: "Acid-Base Equilibria",
        description: "pH, buffer solutions, and acid-base titrations",
        specificationCode: "14",
        timeAllocation: 30,
        assessmentNotes: "Mathematical topic with pH calculations and titration analysis",
        subtopics: [
          {
            id: "14.1",
            name: "pH and Acid-Base Calculations",
            description: "pH, pOH, and acid-base equilibrium calculations",
            objectives: [
              {
                id: "14.1.1",
                code: "14.1",
                statement: "Understand the pH scale and be able to calculate pH and pOH",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["6.1.3"],
                keywords: ["pH", "pOH", "hydrogen ion concentration", "hydroxide ion concentration", "water constant"]
              },
              {
                id: "14.1.2",
                code: "14.2",
                statement: "Know the definitions of strong and weak acids and bases",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "define"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["14.1.1"],
                keywords: ["strong acid", "weak acid", "strong base", "weak base", "dissociation", "ionization"]
              },
              {
                id: "14.1.3",
                code: "14.3",
                statement: "Be able to calculate pH for strong and weak acids and bases",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["14.1.1", "14.1.2"],
                keywords: ["pH calculations", "Ka", "Kb", "acid dissociation constant", "base dissociation constant"]
              }
            ],
            practicalWork: ["pH measurements", "Acid-base titrations", "pH calculations"],
            mathematicalSkills: ["pH calculations", "Ka and Kb calculations", "Logarithmic calculations"]
          },
          {
            id: "14.2",
            name: "Buffer Solutions",
            description: "Buffer systems and their applications",
            objectives: [
              {
                id: "14.2.1",
                code: "14.4",
                statement: "Understand how buffer solutions work and their applications",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["14.1.3"],
                keywords: ["buffer solution", "Henderson-Hasselbalch equation", "buffer capacity", "acid-base pair"]
              },
              {
                id: "14.2.2",
                code: "14.5",
                statement: "Be able to calculate the pH of buffer solutions",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["14.2.1"],
                keywords: ["buffer pH", "Henderson-Hasselbalch", "buffer calculations", "pKa"]
              }
            ],
            practicalWork: ["Buffer preparation", "Buffer pH measurements", "Buffer capacity testing"],
            mathematicalSkills: ["Buffer calculations", "Henderson-Hasselbalch equation", "pKa calculations"]
          }
        ]
      },
      {
        id: "a-level-topic-15",
        name: "Redox II",
        description: "Advanced redox chemistry and electrochemistry",
        specificationCode: "15",
        timeAllocation: 25,
        assessmentNotes: "Advanced electrochemistry with practical applications",
        subtopics: [
          {
            id: "15.1",
            name: "Advanced Electrochemistry",
            description: "Nernst equation and concentration cells",
            objectives: [
              {
                id: "15.1.1",
                code: "15.1",
                statement: "Understand the Nernst equation and its applications",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "apply"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["7.2.2"],
                keywords: ["Nernst equation", "concentration effects", "non-standard conditions", "cell potential"]
              },
              {
                id: "15.1.2",
                code: "15.2",
                statement: "Be able to calculate cell potentials under non-standard conditions",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["15.1.1"],
                keywords: ["cell potential calculations", "concentration effects", "equilibrium constant", "electrochemical equilibrium"]
              }
            ],
            practicalWork: ["Nernst equation verification", "Concentration cell construction", "Non-standard cell potentials"],
            mathematicalSkills: ["Nernst equation calculations", "Logarithmic calculations", "Cell potential predictions"]
          },
          {
            id: "15.2",
            name: "Electrolysis",
            description: "Electrolytic cells and industrial processes",
            objectives: [
              {
                id: "15.2.1",
                code: "15.3",
                statement: "Understand the principles of electrolysis and industrial applications",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["7.2.2"],
                keywords: ["electrolysis", "electrolytic cell", "industrial processes", "metal extraction", "electroplating"]
              },
              {
                id: "15.2.2",
                code: "15.4",
                statement: "Be able to calculate quantities in electrolysis using Faraday's laws",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["calculate", "determine"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["15.2.1"],
                keywords: ["Faraday's laws", "electrochemical equivalent", "current", "time", "charge"]
              }
            ],
            practicalWork: ["Electrolysis experiments", "Faraday's law verification", "Industrial process modeling"],
            mathematicalSkills: ["Faraday's law calculations", "Electrochemical stoichiometry", "Current calculations"]
          }
        ]
      },
      {
        id: "a-level-topic-16",
        name: "Inorganic Chemistry II",
        description: "Transition metals and their properties",
        specificationCode: "16",
        timeAllocation: 30,
        assessmentNotes: "Transition metal chemistry with complex ion formation",
        subtopics: [
          {
            id: "16.1",
            name: "Transition Metal Properties",
            description: "Electronic structure and general properties",
            objectives: [
              {
                id: "16.1.1",
                code: "16.1",
                statement: "Know the electronic structure of transition metals and their ions",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "write"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["1.2.3"],
                keywords: ["d-block", "transition metals", "electronic structure", "d-orbitals", "oxidation states"]
              },
              {
                id: "16.1.2",
                code: "16.2",
                statement: "Understand the general properties of transition metals",
                bloomsLevel: "understand",
                difficulty: "basic",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["16.1.1"],
                keywords: ["variable oxidation states", "colored compounds", "catalytic activity", "magnetic properties"]
              }
            ],
            practicalWork: ["Transition metal compound preparation", "Color observations", "Oxidation state determination"],
            mathematicalSkills: ["Electronic configuration", "Oxidation state calculations", "Magnetic moment calculations"]
          },
          {
            id: "16.2",
            name: "Complex Ions",
            description: "Coordination compounds and their properties",
            objectives: [
              {
                id: "16.2.1",
                code: "16.3",
                statement: "Understand the formation and structure of complex ions",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["16.1.2"],
                keywords: ["complex ion", "ligand", "coordination number", "coordination compound", "chelate"]
              },
              {
                id: "16.2.2",
                code: "16.4",
                statement: "Know the nomenclature of coordination compounds",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "name"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["16.2.1"],
                keywords: ["coordination compound nomenclature", "ligand names", "oxidation state", "complex naming"]
              }
            ],
            practicalWork: ["Complex ion formation", "Ligand exchange reactions", "Coordination compound synthesis"],
            mathematicalSkills: ["Coordination number determination", "Ligand calculations", "Complex stability"]
          }
        ]
      },
      {
        id: "a-level-topic-17",
        name: "Organic Chemistry II",
        description: "Alcohols, carbonyl compounds, and their reactions",
        specificationCode: "17",
        timeAllocation: 30,
        assessmentNotes: "Organic reaction mechanisms and synthetic pathways",
        subtopics: [
          {
            id: "17.1",
            name: "Alcohols",
            description: "Alcohol structure, properties, and reactions",
            objectives: [
              {
                id: "17.1.1",
                code: "17.1",
                statement: "Know the structure and classification of alcohols",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "classify"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["9.1.2"],
                keywords: ["alcohol", "hydroxyl group", "primary", "secondary", "tertiary"]
              },
              {
                id: "17.1.2",
                code: "17.2",
                statement: "Understand the reactions of alcohols including oxidation and substitution",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 4,
                prerequisiteObjectives: ["17.1.1"],
                keywords: ["alcohol reactions", "oxidation", "substitution", "elimination", "esterification"]
              }
            ],
            practicalWork: ["Alcohol oxidation", "Alcohol substitution", "Esterification reactions"],
            mathematicalSkills: ["Oxidation calculations", "Yield calculations", "Reaction stoichiometry"]
          },
          {
            id: "17.2",
            name: "Carbonyl Compounds",
            description: "Aldehydes and ketones",
            objectives: [
              {
                id: "17.2.1",
                code: "17.3",
                statement: "Know the structure and properties of aldehydes and ketones",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "identify"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["9.1.2"],
                keywords: ["aldehyde", "ketone", "carbonyl group", "structure", "properties"]
              },
              {
                id: "17.2.2",
                code: "17.4",
                statement: "Understand the reactions of carbonyl compounds",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["17.2.1"],
                keywords: ["carbonyl reactions", "reduction", "oxidation", "nucleophilic addition", "condensation"]
              }
            ],
            practicalWork: ["Carbonyl compound identification", "Reduction reactions", "Nucleophilic addition"],
            mathematicalSkills: ["Reduction calculations", "Mechanism analysis", "Product predictions"]
          }
        ]
      },
      {
        id: "a-level-topic-18",
        name: "Organic Chemistry III",
        description: "Carboxylic acids, esters, and aromatic compounds",
        specificationCode: "18",
        timeAllocation: 30,
        assessmentNotes: "Advanced organic chemistry with aromatic systems",
        subtopics: [
          {
            id: "18.1",
            name: "Carboxylic Acids and Esters",
            description: "Carboxylic acid derivatives and their reactions",
            objectives: [
              {
                id: "18.1.1",
                code: "18.1",
                statement: "Know the structure and properties of carboxylic acids",
                bloomsLevel: "remember",
                difficulty: "basic",
                commandWords: ["know", "identify"],
                estimatedTeachingMinutes: 30,
                assessmentWeight: 2,
                prerequisiteObjectives: ["9.1.2"],
                keywords: ["carboxylic acid", "carboxyl group", "structure", "properties", "acidity"]
              },
              {
                id: "18.1.2",
                code: "18.2",
                statement: "Understand the reactions of carboxylic acids and ester formation",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["18.1.1"],
                keywords: ["carboxylic acid reactions", "ester formation", "esterification", "hydrolysis", "acidity"]
              }
            ],
            practicalWork: ["Ester synthesis", "Acid-base reactions", "Ester hydrolysis"],
            mathematicalSkills: ["Esterification calculations", "Acid-base calculations", "Yield determinations"]
          },
          {
            id: "18.2",
            name: "Aromatic Compounds",
            description: "Benzene and aromatic substitution reactions",
            objectives: [
              {
                id: "18.2.1",
                code: "18.3",
                statement: "Know the structure of benzene and aromaticity",
                bloomsLevel: "remember",
                difficulty: "intermediate",
                commandWords: ["know", "explain"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["2.2.1"],
                keywords: ["benzene", "aromaticity", "delocalization", "resonance", "stability"]
              },
              {
                id: "18.2.2",
                code: "18.4",
                statement: "Understand electrophilic substitution reactions of benzene",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "describe"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["18.2.1"],
                keywords: ["electrophilic substitution", "halogenation", "nitration", "sulfonation", "Friedel-Crafts"]
              }
            ],
            practicalWork: ["Aromatic substitution reactions", "Benzene derivatives", "Electrophilic substitution mechanisms"],
            mathematicalSkills: ["Aromatic calculations", "Mechanism analysis", "Product predictions"]
          }
        ]
      },
      {
        id: "a-level-topic-19",
        name: "Modern Analytical Techniques II",
        description: "NMR spectroscopy and advanced analytical methods",
        specificationCode: "19",
        timeAllocation: 20,
        assessmentNotes: "Advanced spectroscopy with structural determination",
        subtopics: [
          {
            id: "19.1",
            name: "NMR Spectroscopy",
            description: "Principles and applications of NMR spectroscopy",
            objectives: [
              {
                id: "19.1.1",
                code: "19.1",
                statement: "Understand the principles of NMR spectroscopy",
                bloomsLevel: "understand",
                difficulty: "advanced",
                commandWords: ["understand", "explain"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 4,
                prerequisiteObjectives: ["10.1.1"],
                keywords: ["NMR spectroscopy", "magnetic resonance", "chemical shift", "nuclear spin", "magnetic field"]
              },
              {
                id: "19.1.2",
                code: "19.2",
                statement: "Be able to interpret 1H NMR and 13C NMR spectra",
                bloomsLevel: "apply",
                difficulty: "advanced",
                commandWords: ["interpret", "analyze"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["19.1.1"],
                keywords: ["1H NMR", "13C NMR", "chemical shift", "integration", "splitting patterns", "coupling"]
              }
            ],
            practicalWork: ["NMR spectrum interpretation", "Structural determination", "Spectral analysis"],
            mathematicalSkills: ["Chemical shift analysis", "Integration calculations", "Spectral correlation"]
          },
          {
            id: "19.2",
            name: "Combined Spectroscopic Analysis",
            description: "Using multiple spectroscopic techniques",
            objectives: [
              {
                id: "19.2.1",
                code: "19.3",
                statement: "Be able to combine information from different spectroscopic techniques to determine molecular structure",
                bloomsLevel: "analyze",
                difficulty: "advanced",
                commandWords: ["analyze", "determine"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["10.1.2", "10.2.2", "19.1.2"],
                keywords: ["spectroscopic analysis", "structural determination", "mass spectrometry", "IR spectroscopy", "NMR spectroscopy"]
              }
            ],
            practicalWork: ["Combined spectroscopic analysis", "Unknown compound identification", "Structural determination"],
            mathematicalSkills: ["Multi-technique analysis", "Structural correlation", "Data integration"]
          }
        ]
      },
      {
        id: "a-level-topic-20",
        name: "Chemical Synthesis and Analysis",
        description: "Synthetic pathways and quantitative analysis",
        specificationCode: "20",
        timeAllocation: 25,
        assessmentNotes: "Synthetic chemistry with multi-step reactions and analysis",
        subtopics: [
          {
            id: "20.1",
            name: "Synthetic Pathways",
            description: "Designing and executing multi-step syntheses",
            objectives: [
              {
                id: "20.1.1",
                code: "20.1",
                statement: "Be able to design synthetic pathways for organic compounds",
                bloomsLevel: "create",
                difficulty: "advanced",
                commandWords: ["design", "plan"],
                estimatedTeachingMinutes: 90,
                assessmentWeight: 5,
                prerequisiteObjectives: ["17.1.2", "17.2.2", "18.1.2", "18.2.2"],
                keywords: ["synthetic pathway", "retrosynthesis", "multi-step synthesis", "functional group interconversion"]
              },
              {
                id: "20.1.2",
                code: "20.2",
                statement: "Understand the principles of green chemistry and atom economy",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "calculate"],
                estimatedTeachingMinutes: 60,
                assessmentWeight: 3,
                prerequisiteObjectives: ["20.1.1"],
                keywords: ["green chemistry", "atom economy", "sustainability", "environmental impact", "efficiency"]
              }
            ],
            practicalWork: ["Multi-step synthesis", "Atom economy calculations", "Green chemistry principles"],
            mathematicalSkills: ["Atom economy calculations", "Yield calculations", "Efficiency analysis"]
          },
          {
            id: "20.2",
            name: "Quantitative Analysis",
            description: "Analytical techniques and calculations",
            objectives: [
              {
                id: "20.2.1",
                code: "20.3",
                statement: "Be able to perform quantitative analysis using titrations and gravimetric methods",
                bloomsLevel: "apply",
                difficulty: "intermediate",
                commandWords: ["perform", "calculate"],
                estimatedTeachingMinutes: 75,
                assessmentWeight: 4,
                prerequisiteObjectives: ["14.1.3"],
                keywords: ["quantitative analysis", "titration", "gravimetric analysis", "concentration", "purity"]
              },
              {
                id: "20.2.2",
                code: "20.4",
                statement: "Understand the sources of error in analytical procedures and how to minimize them",
                bloomsLevel: "understand",
                difficulty: "intermediate",
                commandWords: ["understand", "evaluate"],
                estimatedTeachingMinutes: 45,
                assessmentWeight: 3,
                prerequisiteObjectives: ["20.2.1"],
                keywords: ["analytical error", "precision", "accuracy", "systematic error", "random error"]
              }
            ],
            practicalWork: ["Quantitative titrations", "Gravimetric analysis", "Error analysis"],
            mathematicalSkills: ["Analytical calculations", "Error calculations", "Statistical analysis"]
          }
        ]
      }
    ]
  }
];