import nlp from "compromise";

export const FALLBACK_RETORT = "I'll question you in a minute";

const MAX_SUBJECT_WORDS = 4;
const DROPPED_TAGS = ["Determiner", "Possessive", "Pronoun"];

type Term = { text: string; tags: string[] };

/** The last noun phrase in the Question, cleaned up for use in a Retort, or null if there is none. */
export function extractSubject(question: string): string | null {
  const phrases: { terms: Term[] }[] = nlp(question).nouns().json();

  for (let i = phrases.length - 1; i >= 0; i--) {
    const words = phrases[i].terms
      .filter((term) => !term.tags.some((tag) => DROPPED_TAGS.includes(tag)))
      .map((term) => term.text.replace(/[^\p{L}\p{N}'-]/gu, ""))
      .filter(Boolean)
      .slice(-MAX_SUBJECT_WORDS)
      .map((word) => (isAcronym(word) ? word : word.toLowerCase()));

    if (words.length > 0) return words.join(" ");
  }
  return null;
}

function isAcronym(word: string): boolean {
  return word.length > 1 && word === word.toUpperCase() && /\p{Lu}/u.test(word);
}

function article(subject: string): "a" | "an" {
  return /^[aeiou]/i.test(subject) ? "an" : "a";
}

export function threat(subject: string): string {
  return `I'll ${subject} you in a minute`;
}

export function insult(subject: string): string {
  return `You're ${article(subject)} ${subject}`;
}

export function retort(question: string, random: () => number = Math.random): string {
  const subject = extractSubject(question);
  if (!subject) return FALLBACK_RETORT;
  return random() < 0.5 ? threat(subject) : insult(subject);
}
