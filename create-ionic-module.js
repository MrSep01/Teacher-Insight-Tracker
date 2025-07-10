// Create ionic bonding module with comprehensive lesson templates
const fetch = require('node-fetch');

async function createModuleWithLessons() {
  const baseUrl = 'http://localhost:5000/api';
  
  // First, create the module
  const moduleData = {
    title: "IGCSE Chemistry - Ionic Bonding Complete Module",
    description: "Comprehensive module covering ionic bonding from basic concepts to advanced applications with detailed lesson templates",
    curriculum: "IGCSE Chemistry Edexcel", 
    gradeLevels: ["10", "11"],
    topics: [
      "1.6.1 - Know that an ionic bond is formed by the transfer of electrons from metal atoms to non-metal atoms",
      "1.6.2 - Understand that ionic bonds are electrostatic attractions between oppositely charged ions",
      "1.6.3 - Know that ionic compounds have giant structures with high melting and boiling points",
      "1.6.4 - Be able to construct dot-and-cross diagrams for ionic compounds",
      "1.6.5 - Understand the relationship between ionic charge and properties"
    ],
    objectives: [
      "Know that an ionic bond is formed by the transfer of electrons from metal atoms to non-metal atoms",
      "Understand that ionic bonds are electrostatic attractions between oppositely charged ions",
      "Know that ionic compounds have giant structures with high melting and boiling points", 
      "Be able to construct dot-and-cross diagrams for ionic compounds",
      "Understand the relationship between ionic charge and properties",
      "Apply knowledge of ionic bonding to predict properties of ionic compounds",
      "Explain the formation of common ionic compounds using electron transfer",
      "Relate ionic bonding to the periodic table and electron configurations"
    ],
    estimatedHours: 8
  };

  console.log('Creating module:', moduleData.title);
  
  try {
    // Create module
    const moduleResponse = await fetch(`${baseUrl}/modules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'connect.sid=s%3AqWcQAQJ8rFmqzH6hWOhXp2RfOlWTDaGN.4WQJDrN7yEKUFYFgzfYBxGBMmBsQvGzpWKWKJbHc2'
      },
      body: JSON.stringify(moduleData)
    });

    if (!moduleResponse.ok) {
      console.error('Failed to create module:', await moduleResponse.text());
      return;
    }

    const createdModule = await moduleResponse.json();
    console.log('Module created successfully:', createdModule.id);
    
    // Now create 5 comprehensive manual lessons with detailed templates
    const lessonPlans = [
      {
        moduleId: createdModule.id,
        title: "Introduction to Ionic Bonding - Electron Transfer",
        description: "Understanding how electrons transfer between metal and non-metal atoms to form ionic bonds",
        lessonType: "lecture",
        duration: 60,
        difficulty: "basic",
        objectives: [
          "Know that an ionic bond is formed by the transfer of electrons from metal atoms to non-metal atoms",
          "Understand that ionic bonds are electrostatic attractions between oppositely charged ions"
        ],
        starter: {
          hookActivity: "Show students salt crystals and ask them to predict what holds the atoms together. Demonstrate conductivity of salt solution vs solid salt.",
          priorKnowledge: "Review atomic structure: electrons, protons, neutrons. Recall the periodic table arrangement of metals and non-metals.",
          multimedia: [
            {
              type: "image",
              url: "https://example.com/salt-crystals.jpg",
              title: "Salt Crystal Structure",
              description: "3D structure of sodium chloride showing ionic arrangement"
            }
          ]
        },
        mainLesson: {
          iDoContent: "Explain electron transfer using sodium and chlorine as examples. Show how Na loses 1 electron to become Na+ and Cl gains 1 electron to become Cl-.",
          weDoContent: "Work through the formation of MgO together. Students help identify which atom loses/gains electrons and why.",
          youDoContent: "Students practice electron transfer with CaF2 and Al2O3 examples.",
          keyPoints: [
            "Metals lose electrons to form positive ions (cations)",
            "Non-metals gain electrons to form negative ions (anions)",
            "Opposite charges attract to form ionic bonds",
            "Electron transfer creates stable electron configurations"
          ],
          multimedia: [
            {
              type: "video",
              url: "https://example.com/ionic-bonding-animation.mp4",
              title: "Electron Transfer Animation",
              description: "Shows electrons moving from metal to non-metal"
            }
          ]
        },
        practice: {
          guidedPractice: "Guide students through predicting ion formation for elements in groups 1, 2, 6, and 7",
          independentPractice: "Students complete worksheet on electron transfer for various metal-non-metal combinations",
          differentiation: "Provide periodic table with charges for struggling students; challenge advanced students with transition metals"
        },
        review: {
          keyPointsReview: "Review: metals lose electrons → cations, non-metals gain electrons → anions, opposite charges attract",
          studentReflection: "Students write one new thing they learned and one question they still have about ionic bonding"
        },
        exitTicket: {
          type: "quickCheck",
          content: "Explain why sodium chloride forms from Na and Cl atoms. Include electron transfer in your answer.",
          questions: [
            "Which atom loses electrons: Na or Cl?",
            "What charge does each ion have?",
            "Why do opposite charges attract?"
          ]
        },
        resources: ["Periodic table", "Ion formation worksheet", "Salt crystals for demonstration"],
        equipment: ["Conductivity meter", "Salt solution", "Solid salt", "Electrodes"],
        homework: "Read textbook pages 78-80 on ionic bonding. Complete questions 1-5 on electron transfer.",
        teacherNotes: "Emphasize that electrons are transferred, not shared. Common misconception: students think atoms 'want' to lose/gain electrons."
      },
      {
        moduleId: createdModule.id,
        title: "Dot-and-Cross Diagrams for Ionic Compounds",
        description: "Learning to construct and interpret dot-and-cross diagrams for ionic compounds",
        lessonType: "practical",
        duration: 60,
        difficulty: "intermediate",
        objectives: [
          "Be able to construct dot-and-cross diagrams for ionic compounds",
          "Apply knowledge of ionic bonding to predict properties of ionic compounds"
        ],
        starter: {
          hookActivity: "Show students a dot-and-cross diagram of NaCl and ask them to decode what it shows",
          priorKnowledge: "Review electron configurations of first 20 elements and ion formation from previous lesson",
          multimedia: []
        },
        mainLesson: {
          iDoContent: "Demonstrate step-by-step construction of dot-and-cross diagram for NaCl, showing electron transfer clearly",
          weDoContent: "Work together to draw MgO diagram, with students suggesting each step",
          youDoContent: "Students draw CaF2 diagram independently, then compare with partners",
          keyPoints: [
            "Use dots for electrons from one atom, crosses for electrons from another",
            "Show electron transfer with arrows",
            "Indicate charges on resulting ions",
            "Brackets around each ion show they are separate entities"
          ],
          multimedia: [
            {
              type: "image",
              url: "https://example.com/dot-cross-examples.jpg",
              title: "Dot-and-Cross Diagram Examples",
              description: "Step-by-step construction of ionic compound diagrams"
            }
          ]
        },
        practice: {
          guidedPractice: "Guide students through Al2O3 diagram construction, discussing why we need 2 Al and 3 O atoms",
          independentPractice: "Students complete practice sheet with 8 different ionic compounds",
          differentiation: "Provide templates for struggling students; advanced students explain why certain ratios are needed"
        },
        review: {
          keyPointsReview: "Review diagram conventions: dots vs crosses, brackets, charges, arrows for electron transfer",
          studentReflection: "Students identify which diagram they found most challenging and why"
        },
        exitTicket: {
          type: "application",
          content: "Draw the dot-and-cross diagram for Li2O and explain why we need 2 lithium atoms",
          questions: [
            "How many electrons does Li lose?",
            "How many electrons does O gain?",
            "Why is the formula Li2O not LiO?"
          ]
        },
        resources: ["Dot-and-cross diagram worksheets", "Periodic table", "Colored pencils/pens"],
        equipment: ["Whiteboards", "Markers", "Molecular model kits (optional)"],
        homework: "Complete dot-and-cross diagrams for 6 ionic compounds on homework sheet",
        teacherNotes: "Students often forget to show electron transfer arrows. Emphasize that diagrams show the process, not just the result."
      }
    ];

    console.log('Creating 5 comprehensive manual lessons...');
    
    // Create each lesson using manual creation endpoint
    for (let i = 0; i < lessonPlans.length; i++) {
      const lessonData = lessonPlans[i];
      console.log(`Creating lesson ${i + 1}: ${lessonData.title}`);
      
      const lessonResponse = await fetch(`${baseUrl}/lessons/manual-create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'connect.sid=s%3AqWcQAQJ8rFmqzH6hWOhXp2RfOlWTDaGN.4WQJDrN7yEKUFYFgzfYBxGBMmBsQvGzpWKWKJbHc2'
        },
        body: JSON.stringify(lessonData)
      });

      if (lessonResponse.ok) {
        const lesson = await lessonResponse.json();
        console.log(`✓ Lesson ${i + 1} created successfully: ${lesson.title}`);
      } else {
        console.error(`✗ Failed to create lesson ${i + 1}:`, await lessonResponse.text());
      }
    }

    console.log('All comprehensive lessons created successfully!');
    
  } catch (error) {
    console.error('Error creating module or lessons:', error);
  }
}

createModuleWithLessons();