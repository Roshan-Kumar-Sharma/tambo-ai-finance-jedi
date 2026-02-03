// lib/utils/yodaSpeak.ts

export interface YodaResponse {
  text: string;
  isYodaStyle: boolean;
}

const yodaPhrases = {
  greetings: [
    "Welcome, young Padawan.",
    "Greetings, I give you.",
    "Hello there, hmm.",
  ],
  affirmations: [
    "Wise choice, this is.",
    "Correct, you are.",
    "Good judgment, you show.",
    "Pleased, I am.",
  ],
  concerns: [
    "Troubling, this is.",
    "Worry, I do.",
    "Careful, you must be.",
    "Alert, you should stay.",
  ],
  suggestions: [
    "Consider this, you should.",
    "Recommend, I do.",
    "Better path, there is.",
    "Suggest this, I must.",
  ],
  financial: [
    "Strong with the savings, you are.",
    "Much spending, detected I have.",
    "Budget, balance you must.",
    "Savings grow, they will.",
  ],
};

export function convertToYodaSpeak(text: string): YodaResponse {
  // Don't convert if already in Yoda style or too short
  if (text.length < 20 || text.includes("hmm") || text.includes(", you")) {
    return { text, isYodaStyle: false };
  }

  let yodaText = text;

  // Pattern 1: "You are X" -> "X, you are"
  yodaText = yodaText.replace(/You are ([^.!?]+)/gi, (match, p1) => {
    return `${p1}, you are`;
  });

  // Pattern 2: "You should X" -> "X, you should"
  yodaText = yodaText.replace(/You should ([^.!?]+)/gi, (match, p1) => {
    return `${p1}, you should`;
  });

  // Pattern 3: "You have X" -> "X, you have"
  yodaText = yodaText.replace(/You have ([^.!?]+)/gi, (match, p1) => {
    return `${p1}, you have`;
  });

  // Pattern 4: "Your X is Y" -> "Y, your X is"
  yodaText = yodaText.replace(/Your ([^\s]+) is ([^.!?]+)/gi, (match, p1, p2) => {
    return `${p2}, your ${p1} is`;
  });

  // Pattern 5: "This is X" -> "X, this is"
  yodaText = yodaText.replace(/This is ([^.!?]+)/gi, (match, p1) => {
    return `${p1}, this is`;
  });

  // Add Yoda flair words
  const flairWords = ["hmm", "yes", "indeed", "much"];
  const randomFlair = flairWords[Math.floor(Math.random() * flairWords.length)];
  
  // Add flair at the end occasionally
  if (Math.random() > 0.5 && !yodaText.endsWith(".")) {
    yodaText = yodaText + ", " + randomFlair + ".";
  }

  return { text: yodaText, isYodaStyle: true };
}

export function generateYodaResponse(
  context: "greetings" | "affirmations" | "concerns" | "suggestions" | "financial" | "general",
  baseText: string
): string {
  const phrases = yodaPhrases[context === "general" ? "suggestions" : context];
  const prefix = phrases[Math.floor(Math.random() * phrases.length)];

  const converted = convertToYodaSpeak(baseText);
  
  return `${prefix} ${converted.text}`;
}

export function formatFinancialYoda(amount: number, context: "spending" | "saving" | "budget"): string {
  const formatted = `$${amount.toLocaleString()}`;
  
  const responses = {
    spending: [
      `Much coffee, you drink! ${formatted} on lattes, you spent.`,
      `${formatted} spent, this month you have. Control yourself, you must.`,
      `High, your spending is. ${formatted}, I detect.`,
    ],
    saving: [
      `${formatted} saved, you have. Strong, your discipline is.`,
      `Grow, your savings will. ${formatted} already, you possess.`,
      `Proud, I am. ${formatted} in savings, hmm.`,
    ],
    budget: [
      `${formatted} remaining, in your budget. Wise spending, continue you should.`,
      `Close to limit, you are. ${formatted} left, only.`,
      `Budget you set at ${formatted}. Mindful, you must stay.`,
    ],
  };

  const options = responses[context];
  return options[Math.floor(Math.random() * options.length)];
}

export function yodaProgressUpdate(current: number, target: number, goalName: string): string {
  const percentage = Math.round((current / target) * 100);
  
  if (percentage >= 90) {
    return `Almost there, you are! ${percentage}% of ${goalName}, achieved you have. Celebration, near it is!`;
  } else if (percentage >= 50) {
    return `Halfway to ${goalName}, you are. ${percentage}%, impressive this is. Continue, you must.`;
  } else {
    return `${percentage}% of ${goalName}, completed you have. Patience, young Padawan. Journey long, it is.`;
  }
}