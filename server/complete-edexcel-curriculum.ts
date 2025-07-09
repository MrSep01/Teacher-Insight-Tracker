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
      }
    ]
  }
];