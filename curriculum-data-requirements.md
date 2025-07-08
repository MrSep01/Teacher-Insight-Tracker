# Curriculum Data Requirements for AI Assessment Generation

## Overview
To create accurate, curriculum-aligned assessments and lessons, I need the official Edexcel Chemistry specification data structured as shown below. This will enable the AI to generate assessments that precisely match examination requirements and learning objectives.

## Required Data Structure

### 1. IGCSE Chemistry Edexcel (Grades 10-11)

**Please provide for each main topic:**

#### Topic Structure:
```
Topic Name: [e.g., "Principles of Chemistry"]
Specification Code: [e.g., "Topic 1"]
Time Allocation: [Recommended teaching hours]
Assessment Weight: [Percentage of total marks]

Subtopics:
├── Subtopic 1: [e.g., "States of Matter"]
│   ├── Learning Objective 1.1.1: [Exact wording from specification]
│   │   ├── Command Words: [describe, explain, calculate, etc.]
│   │   ├── Bloom's Level: [remember/understand/apply/analyze/evaluate/create]
│   │   └── Difficulty: [basic/intermediate/advanced]
│   ├── Learning Objective 1.1.2: [Next objective]
│   └── Practical Work: [Required experiments/investigations]
│
├── Subtopic 2: [e.g., "Atomic Structure"]
│   └── [Same structure as above]
```

#### Example Format Needed:
```json
{
  "topic": "Principles of Chemistry",
  "specCode": "Topic 1",
  "timeAllocation": 40,
  "subtopics": [
    {
      "name": "States of Matter",
      "objectives": [
        {
          "code": "1.1.1",
          "statement": "describe the arrangement and movement of particles in solids, liquids and gases",
          "commandWords": ["describe", "explain", "compare"],
          "bloomsLevel": "understand",
          "difficulty": "basic",
          "assessmentTypes": ["multiple choice", "short answer"]
        }
      ],
      "practicals": ["Investigating changes of state"],
      "keywords": ["particles", "kinetic theory", "states"]
    }
  ]
}
```

### 2. A Level Chemistry Edexcel (Grade 12)

**Same structure as IGCSE but with:**
- More advanced learning objectives
- Extended practical requirements
- Higher-order thinking skills emphasis
- Synoptic assessment elements

### 3. Assessment Structure Information

**For each curriculum level, please provide:**

#### Paper Structure:
- Paper numbers and names
- Duration and total marks
- Question types per paper
- Topic coverage per paper
- Mark allocation patterns

#### Question Types Used:
- Multiple choice format and typical stems
- Short answer expectations (word limits, mark schemes)
- Extended writing criteria
- Calculation question formats
- Practical-based question types

#### Command Words:
- Complete list of command words used
- Expected response types for each
- Mark allocation for different command words

### 4. Grade Progression Mapping

**Please specify:**
- Which topics are introduced in Grade 10 vs Grade 11
- Prerequisites between topics
- Depth of treatment at each level
- Spiral curriculum progression

### 5. Cross-Curricular Links

**Where applicable:**
- Mathematical skills required
- Physics connections
- Real-world applications emphasis

## Data Sources Needed

1. **Official Edexcel Specification Documents**
   - Complete specification with learning objectives
   - Assessment criteria and mark schemes
   - Practical work requirements

2. **Sample Assessment Papers**
   - Past papers with mark schemes
   - Specimen papers
   - Question type analysis

3. **Teacher Resources**
   - Scheme of work recommendations
   - Time allocation guidance
   - Practical work details

## How to Provide This Data

**Option 1: Structured Document**
- Provide specification PDFs and I'll extract the data
- Include teacher guides with timing recommendations

**Option 2: Spreadsheet Format**
- Topic | Subtopic | Objective Code | Learning Objective | Command Words | Difficulty | Assessment Types

**Option 3: Progressive Implementation**
- Start with one complete topic (e.g., Atomic Structure)
- Test the assessment generation
- Gradually add remaining topics

## Benefits of Complete Data

With this structured curriculum data, the AI assessment generator will:

1. **Generate Specification-Aligned Questions**
   - Use exact command words from exams
   - Match mark allocation patterns
   - Include appropriate difficulty progression

2. **Create Authentic Assessment Scenarios**
   - Mirror real examination formats
   - Use curriculum-specific contexts
   - Include required practical applications

3. **Support Differentiated Learning**
   - Generate questions for different ability levels
   - Provide appropriate progression pathways
   - Include prerequisite checking

4. **Enable Comprehensive Coverage**
   - Ensure all objectives are assessable
   - Balance topic coverage appropriately
   - Include synoptic elements for A Level

## Next Steps

1. **Immediate**: Provide one complete topic as a test case
2. **Short-term**: Complete IGCSE specification data
3. **Medium-term**: Add A Level specification data
4. **Long-term**: Include assessment analytics and performance tracking

Would you like to start with a specific topic, or do you have access to the complete Edexcel specification documents that I can process?