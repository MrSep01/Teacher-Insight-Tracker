// Global utility functions for IGCSE Chemistry Edexcel curriculum formatting

export interface FormattedObjective {
  code: string;
  description: string;
  topic?: string;
  subtopic?: string;
  isHighlighted?: boolean;
}

export interface CurriculumHierarchy {
  curriculum: string;
  topic: string;
  subtopic: string;
  objectives: FormattedObjective[];
}

// Helper function to format objectives with authentic IGCSE structure
export function formatObjective(objective: string, index: number): FormattedObjective {
  // IGCSE format: "5.1 understand how ions are formed by electron loss or gain"
  // Try to parse the objective as a curriculum specification code with description
  const codeMatch = objective.match(/^(\d+\.\d+[A-Z]?)\s+(.+)$/);
  if (codeMatch) {
    const code = codeMatch[1];
    const description = codeMatch[2].trim();
    
    // Map authentic IGCSE codes to topics/subtopics based on official specification
    const getTopicSubtopic = (code: string) => {
      const majorCode = code.split('.')[0];
      const minorCode = parseFloat(code);
      
      if (majorCode === '1') {
        return { topic: "Topic 1: Principles of chemistry: Part 1", subtopic: "States of Matter" };
      }
      if (majorCode === '2') {
        return { topic: "Topic 2: Inorganic chemistry", subtopic: "Group chemistry" };
      }
      if (majorCode === '3') {
        return { topic: "Topic 3: Physical chemistry", subtopic: "Energetics" };
      }
      if (majorCode === '4') {
        return { topic: "Topic 4: Organic chemistry", subtopic: "Hydrocarbons" };
      }
      if (majorCode === '5') {
        // Topic 5 subtopics with proper lettering and highlighting
        if (minorCode >= 5.1 && minorCode <= 5.7) return { topic: "Topic 5: Principles of chemistry: Part 2", subtopic: "(f) Ionic bonding", isHighlighted: true };
        if (minorCode >= 5.8 && minorCode <= 5.15) return { topic: "Topic 5: Principles of chemistry: Part 2", subtopic: "(g) Covalent bonding" };
        if (minorCode >= 5.16 && minorCode <= 5.20) return { topic: "Topic 5: Principles of chemistry: Part 2", subtopic: "(h) Metallic bonding" };
        if (minorCode >= 5.21 && minorCode <= 5.25) return { topic: "Topic 5: Principles of chemistry: Part 2", subtopic: "(i) Electrolysis" };
      }
      return { topic: "IGCSE Chemistry", subtopic: "General" };
    };
    
    const { topic, subtopic, isHighlighted } = getTopicSubtopic(code);
    return { code, description, topic, subtopic, isHighlighted };
  }
  
  // Check if it's just a spec code (e.g., "5.1", "2.3")
  const specCodePattern = /^(\d+\.\d+[A-Z]?)$/;
  if (specCodePattern.test(objective.trim())) {
    return {
      code: objective.trim(),
      description: `Learning objective ${objective.trim()}`,
      topic: "Chemistry",
      subtopic: "General"
    };
  }
  
  // For full descriptions without codes, this shouldn't happen with authentic IGCSE data
  return {
    code: `Obj-${index + 1}`,
    description: objective,
    topic: "Chemistry",
    subtopic: "General"
  };
}

// Get curriculum hierarchy for a module based on its objectives
export function getCurriculumHierarchy(objectives: string[]): CurriculumHierarchy {
  const formattedObjectives = objectives.map((obj, index) => formatObjective(obj, index));
  
  // Get the primary topic from the first objective
  const primaryTopic = formattedObjectives[0]?.topic || "IGCSE Chemistry";
  const primarySubtopic = formattedObjectives[0]?.subtopic || "General";
  
  return {
    curriculum: "IGCSE Chemistry Edexcel",
    topic: primaryTopic,
    subtopic: primarySubtopic,
    objectives: formattedObjectives
  };
}

// Get all Topic 5 subtopics with proper highlighting
export function getTopic5Subtopics(focusSubtopic?: string): Array<{
  code: string;
  name: string;
  isHighlighted: boolean;
  objectiveRange?: string;
}> {
  const subtopics = [
    { code: "(d)", name: "The Periodic Table", objectiveRange: "" },
    { code: "(e)", name: "Chemical formulae, equations and calculations", objectiveRange: "" },
    { code: "(f)", name: "Ionic bonding", objectiveRange: "5.1-5.7" },
    { code: "(g)", name: "Covalent bonding", objectiveRange: "5.8-5.15" },
    { code: "(h)", name: "Metallic bonding", objectiveRange: "5.16-5.20" },
    { code: "(i)", name: "Electrolysis", objectiveRange: "5.21-5.25" }
  ];
  
  return subtopics.map(subtopic => ({
    ...subtopic,
    isHighlighted: focusSubtopic ? subtopic.code === focusSubtopic : subtopic.code === "(f)"
  }));
}

// Get complete objective range for a subtopic
export function getObjectiveRange(subtopicCode: string): string {
  const ranges: Record<string, string> = {
    "(d)": "5.d.1-5.d.10",
    "(e)": "5.e.1-5.e.15", 
    "(f)": "5.1-5.7",
    "(g)": "5.8-5.15",
    "(h)": "5.16-5.20",
    "(i)": "5.21-5.25"
  };
  
  return ranges[subtopicCode] || "";
}

// Get all objectives for ionic bonding (5.1-5.7)
export function getIonicBondingObjectives(): Array<{
  code: string;
  statement: string;
}> {
  return [
    { code: "5.1", statement: "understand how ions are formed by electron loss or gain" },
    { code: "5.2", statement: "know the charges of these ions: metals in Groups 1, 2 and 3; non-metals in Groups 5, 6 and 7" },
    { code: "5.3", statement: "write formulae for compounds formed between the ions listed above" },
    { code: "5.4", statement: "draw dot-and-cross diagrams to show the formation of ionic compounds by electron transfer" },
    { code: "5.5", statement: "understand ionic bonding in terms of electrostatic attractions" },
    { code: "5.6", statement: "understand why compounds with giant ionic lattices have high melting and boiling points" },
    { code: "5.7", statement: "know that ionic compounds do not conduct electricity when solid, but do conduct electricity when molten and in aqueous solution" }
  ];
}