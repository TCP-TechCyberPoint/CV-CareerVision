// file: src/data/questionBank.ts
import type { QuestionItem } from "../types/question";

export const QUESTION_BANK: ReadonlyArray<QuestionItem> = [
  {
    id: "q_tell_me_about_yourself",
    question: "Tell me about yourself",
    intent:
      "Assess the candidate’s ability to present themselves in an orderly, focused way within a short time and to see what they choose to emphasize (education, experience, achievements, or personal aspects).",
    recommended_structure: ["Present", "Past", "Future"],
    notes_for_interviewer_meaning: [
      "Check clarity, focus, and brevity in self-presentation.",
      "Identify emphasis choices: education, experience, achievements, or personal aspects.",
      "Use the correct formula: Present (who I am today), Past (what I did and role-relevant experience), Future (what I seek and why Company X)."
    ],
    illegal_question_flag: false
  },
  {
    id: "q_why_leave_last_job",
    question: "Why did you leave your last job?",
    intent:
      "Reveal behavior patterns: does the candidate leave when facing difficulties, were there relationship issues with management, or are they simply seeking growth? Also signals long-term loyalty vs. frequent turnover and shows what motivates the candidate.",
    recommended_structure: ["Reason", "What I Learned", "Fit to This Role/Company"],
    notes_for_interviewer_meaning: [
      "Behavior patterns: resilience vs. avoidance; relationship dynamics with management.",
      "Motivational drivers and career logic for the transition.",
      "Signal of stability/loyalty vs. high churn.",
      "Mature, non-negative phrasing; show growth and alignment to this role."
    ],
    illegal_question_flag: false
  },
  {
    id: "q_proud_achievement",
    question: "Describe an achievement you are especially proud of",
    intent:
      "Present a significant contribution from the candidate’s career. Shows what matters to them, how they measure success, and hints at initiative, perseverance, and professional capabilities. The answer should be detailed and professionally relevant to the role and organization. This question can predict how the candidate will act in future work.",
    recommended_structure: [
      "STAR_Situation",
      "STAR_Task",
      "STAR_Action",
      "STAR_Result_and_Relevance"
    ],
    notes_for_interviewer_meaning: [
      "What the candidate values and how they define success.",
      "Indicators of initiative, perseverance, and professional skill.",
      "Require professional relevance to the role and organization.",
      "Ask for detail and measurable results; use STAR to ensure clarity.",
      "Predictive value for future behavior/performance."
    ],
    illegal_question_flag: false
  },
  {
    id: "q_what_matters_new_workplace",
    question: "What is important to you in a new workplace?",
    intent:
      "Match between the candidate’s expectations and the organization’s offering. If the candidate seeks flexibility, an innovative environment, or advancement opportunities, ensure it aligns with what the organization provides.",
    recommended_structure: ["Top_2_3_Priorities", "Brief_Examples", "Link_to_This_Company"],
    notes_for_interviewer_meaning: [
      "Expectation alignment: flexibility, innovation, growth paths, etc.",
      "Check concrete examples to avoid generic statements.",
      "Assess realism vs. what the organization actually offers."
    ],
    illegal_question_flag: false
  },
  {
    id: "q_failure_or_challenge_learning",
    question: "Tell me about a failure or challenge — and what you learned from it",
    intent:
      "Examine the candidate’s ability to honestly reflect on failure, demonstrate understanding and learning, and show readiness to improve. Also assesses mental resilience, coping with pressure, and capacity for self-change.",
    recommended_structure: [
      "STAR_Situation",
      "STAR_Task_or_Challenge",
      "STAR_Action",
      "STAR_Result",
      "Learning_and_Application"
    ],
    notes_for_interviewer_meaning: [
      "Honest reflection; accountability rather than excuses.",
      "Learning mindset and concrete improvements applied afterward.",
      "Signals of mental resilience and coping with stress.",
      "Capacity for change and growth."
    ],
    illegal_question_flag: false
  },
  {
    id: "q_prev_manager_would_say",
    question: "What would your previous manager say about you?",
    intent:
      "Deepen understanding of the candidate’s conduct at work, interpersonal relationships, and how they receive feedback.",
    recommended_structure: ["Key_Trait", "Short_Evidence_Example", "Impact_on_Team_or_Outcomes"],
    notes_for_interviewer_meaning: [
      "Interpersonal dynamics and collaboration.",
      "Openness to feedback and professional maturity.",
      "Concrete example preferred over vague claims."
    ],
    illegal_question_flag: false
  },
  {
    id: "q_career_path_next_years",
    question: "How do you see your career path in the coming years?",
    intent:
      "Understand the candidate’s plans and whether they fit the organization; gauge ambition or stability sought. Also reflects motivation.",
    recommended_structure: ["Short_Term_Goals", "Medium_Term_Goals", "Alignment_with_Organization"],
    notes_for_interviewer_meaning: [
      "Realistic, coherent plans aligned with organizational paths.",
      "Level of ambition vs. desire for stability.",
      "Motivational drivers and growth interests."
    ],
    illegal_question_flag: false
  },
  {
    id: "q_salary_expectations",
    question: "Salary expectations",
    intent:
      "Ensure fit between the role’s budget and the candidate’s expectations. Also indicates how the candidate values their market worth. Important to provide a range to show flexibility and to stay consistent with that range throughout all interviews in the same process.",
    recommended_structure: ["Range", "Flexibility", "Consistency_across_Process"],
    notes_for_interviewer_meaning: [
      "Check realism of the range relative to the market and role.",
      "Expect a range (not a single number) to signal flexibility.",
      "Look for message consistency across interviewers."
    ],
    illegal_question_flag: false
  },
  {
    id: "q_illegal_questions",
    question: "Illegal questions (meta-coaching item)",
    intent:
      "If an illegal question appears in an interview (e.g., pregnancy plans, age, religious affiliation, etc.), steer back to the professional topic and minimize engagement with the personal matter.",
    recommended_structure: ["Identify_and_Flag", "Neutral_Redirect", "Return_to_Professional_Topic"],
    notes_for_interviewer_meaning: [
      "Examples of potentially illegal topics: pregnancy plans, age, religious affiliation, and similar protected attributes.",
      "Coach the candidate to respond with a respectful neutral redirect such as: “I’m available for full-time work and highly committed; happy to focus on role requirements.”",
      "Emphasize minimizing the personal topic and moving back to professional fit."
    ],
    illegal_question_flag: true
  }
] as const;
