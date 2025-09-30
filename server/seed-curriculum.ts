import { db } from "./db";
import { curriculumTopics, curriculumSubtopics, curriculumObjectives } from "@shared/schema";
import { OFFICIAL_EDEXCEL_CHEMISTRY_CURRICULUM } from "./official-edexcel-chemistry-curriculum";
import { eq } from "drizzle-orm";

async function seedCurriculum() {
  console.log("Starting curriculum seed...");

  try {
    // Use transaction for atomicity
    await db.transaction(async (tx) => {
      // Step 1: Clear existing data in reverse order due to foreign key constraints
      console.log("Clearing existing curriculum data...");
      
      // Delete all objectives first
      await tx.delete(curriculumObjectives);
      console.log("Cleared curriculum objectives");

      // Then delete all subtopics
      await tx.delete(curriculumSubtopics);
      console.log("Cleared curriculum subtopics");

      // Finally delete all topics
      await tx.delete(curriculumTopics);
      console.log("Cleared curriculum topics");

      // Step 2: Insert data for each curriculum level
      for (const curriculumLevel of OFFICIAL_EDEXCEL_CHEMISTRY_CURRICULUM) {
        console.log(`\nSeeding curriculum: ${curriculumLevel.name}`);
        
        // Create a prefix based on curriculum level to ensure unique codes
        const curriculumPrefix = curriculumLevel.id === "igcse-chemistry-edexcel" ? "IGCSE" : "AL";
        
        let topicSequence = 0;

        // Insert topics
        for (const topic of curriculumLevel.topics) {
          topicSequence++;
          
          // Make topic code unique by prefixing with curriculum level
          const uniqueTopicCode = `${curriculumPrefix}-${topic.specificationCode}`;
          
          const [insertedTopic] = await tx.insert(curriculumTopics).values({
            code: uniqueTopicCode,
            name: topic.name,
            description: topic.description,
            curriculum: curriculumLevel.name, 
            sequenceOrder: topicSequence
          }).returning();

          console.log(`  Inserted topic: ${topic.name} (${uniqueTopicCode})`);

          let subtopicSequence = 0;

          // Insert subtopics for this topic
          if (topic.subtopics && topic.subtopics.length > 0) {
            for (const subtopic of topic.subtopics) {
              subtopicSequence++;

              // Make subtopic code unique by prefixing with curriculum level
              const uniqueSubtopicCode = `${curriculumPrefix}-${subtopic.id}`;

              // Prepare practical work and mathematical skills arrays
              const practicalWorkArray = subtopic.practicalWork || [];
              const mathematicalSkillsArray = subtopic.mathematicalSkills || [];

              const [insertedSubtopic] = await tx.insert(curriculumSubtopics).values({
                topicId: insertedTopic.id,
                code: uniqueSubtopicCode,
                name: subtopic.name,
                description: subtopic.description,
                sequenceOrder: subtopicSequence,
                practicalWork: practicalWorkArray.length > 0 ? practicalWorkArray : null,
                mathematicalSkills: mathematicalSkillsArray.length > 0 ? mathematicalSkillsArray : null
              }).returning();

              console.log(`    Inserted subtopic: ${subtopic.name} (${uniqueSubtopicCode})`);

              let objectiveSequence = 0;

              // Insert objectives for this subtopic
              if (subtopic.objectives && subtopic.objectives.length > 0) {
                for (const objective of subtopic.objectives) {
                  objectiveSequence++;

                  // Make objective code unique by prefixing with curriculum level
                  const uniqueObjectiveCode = `${curriculumPrefix}-${objective.code}`;

                  // Convert command words array
                  const commandWordsArray = objective.commandWords || [];

                  await tx.insert(curriculumObjectives).values({
                    subtopicId: insertedSubtopic.id,
                    code: uniqueObjectiveCode,
                    statement: objective.statement,
                    bloomsLevel: objective.bloomsLevel,
                    difficulty: objective.difficulty,
                    commandWords: commandWordsArray.length > 0 ? commandWordsArray : null,
                    assessmentWeight: objective.assessmentWeight,
                    sequenceOrder: objectiveSequence
                  });
                }

                console.log(`      Inserted ${subtopic.objectives.length} objectives`);
              }
            }
          }
        }
      }

      console.log("\n✅ Curriculum seed completed successfully!");
    });

  } catch (error) {
    console.error("❌ Error seeding curriculum:", error);
    throw error;
  }
}

// Main execution
seedCurriculum()
  .then(() => {
    console.log("Seed script finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed script failed:", error);
    process.exit(1);
  });

export { seedCurriculum };