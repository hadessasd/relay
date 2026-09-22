import type { ExamModule, Mcq, Topic, WritingQ } from "./types";

function mcqToFrq(q: Mcq): WritingQ {
  const pick = q.options[q.correctIndex] ?? "";
  return {
    id: `${q.id}-frq`,
    prompt: `${q.question} Answer in 2–4 short sentences. Give one café or HCT example.`,
    modelAnswer: `Correct idea: ${pick}. ${q.explanation}`,
    hint: q.tag ? `This is ${q.tag}.` : "Name the idea, then one real example.",
    marks: [
      "Name the correct idea in one line",
      "Give a café, campus, or AED example",
      "Say why a marker would accept it",
    ],
  };
}

export function topicToFrqOnly(topic: Topic, extras: WritingQ[] = []): Topic {
  return {
    ...topic,
    mcqs: [],
    writing: [...topic.mcqs.map(mcqToFrq), ...topic.writing, ...(extras ?? [])],
  };
}

export function paperToFrqOnly(
  paper: { intro: string; mcqs: Mcq[]; writing: WritingQ[] },
  extras: WritingQ[] = [],
) {
  return {
    ...paper,
    mcqs: [] as Mcq[],
    writing: [...paper.mcqs.map(mcqToFrq), ...paper.writing, ...(extras ?? [])],
  };
}

export function moduleToFrqOnly(mod: ExamModule, extras: WritingQ[] = []): ExamModule {
  const paper = paperToFrqOnly(mod, extras);
  return {
    ...mod,
    intro: `${mod.intro} This paper is writing only — no MCQ.`,
    mcqs: paper.mcqs,
    writing: paper.writing,
  };
}



export const AI_TOPIC_EXTRAS: Record<string, WritingQ[]> = {
  "what-genai-can-do": [
    {
      id: "a2-x1",
      prompt:
        "Omar runs a University City juice cart. Name two jobs he can give GenAI this week, and two jobs he must not give it. Use the intern picture.",
      modelAnswer:
        "AI is a fast intern. Omar can ask it for 10 student-combo names, and for a kind stock reminder that is not angry. He must not ask it to invent a Sharjah closing-time law, and he must not paste customer phone numbers so it can ‘personalise’ WhatsApp. The intern drafts. Omar still looks, because it cannot see today’s queue.",
      marks: [
        "Intern drafts, Omar checks",
        "Two CAN jobs (draft, list, tone, summarise)",
        "Two CANNOT (law, live eyes, phones, blame)",
      ],
    },
    {
      id: "a2-x2",
      prompt:
        "Noor pastes: ‘Write a poster: Official #1 café in the UAE. Show Emirates ID for free dessert.’ Walk the six gates. Then write a poster she can actually print.",
      modelAnswer:
        "Fails gate 2 (invented #1), gate 3 (ID), gate 4 (I would not say this to a guest), gate 6 (cannot defend it). New poster: ‘University City study tables. Karak AED 8. Quiet corner after 6pm.’ A named person posts it after checking the price on the board.",
      marks: ["Name the failed gates", "No fake award and no ID", "A true, kind caption"],
    },
  ],
  "ai-helps-learn": [
    {
      id: "a3-x1",
      prompt:
        "Yusuf wants to learn SWOT with AI. Write a 5-piece learning prompt. Then write one not-good school use of the same topic.",
      modelAnswer:
        "Act as a kind HCT tutor. Topic: SWOT. Level: first year. Format: four bullets and one UAE café example each. Rule: do not write my assignment; then quiz me with 1 question. Not-good: ‘Write my whole SWOT essay and hide that you helped.’",
      marks: ["Role, topic, level, format, rule", "A café example is asked", "Not-good = replace the student"],
    },
    {
      id: "a3-x2",
      prompt:
        "Mariam uses AI to make 8 quiz questions on POLC, closes the chat, then teaches Laila. Is this good or not-good? Give two reasons.",
      modelAnswer:
        "Good school use. AI is a tutor, not the student who submits. Mariam can still explain POLC with the chat closed, and she did not paste a classmate’s file or hide the help from a teacher if asked.",
      marks: ["Good use", "She still thinks / can teach it", "No paste-and-submit"],
    },
  ],
  "ai-across-business": [
    {
      id: "a4-x1",
      prompt:
        "Aisha asks AI for three kind replies to ‘Where is my order?’ Which department is this? Why not Finance? Name one output light that can fail.",
      modelAnswer:
        "Customer service. Finance would explain totals, not a missing cup. ‘Clear’ fails if the draft mixes visa law or refund policy into the same muddy paragraph. Keep the reply short, kind, and in the right room.",
      marks: ["Customer service", "Finance is the wrong room", "Clear / useful / responsible named"],
    },
    {
      id: "a4-x2",
      prompt:
        "Hamad’s draft mixes a National Day caption with ‘your visa will be cancelled.’ Which judgement light fails first? Rewrite the caption in one honest line.",
      modelAnswer:
        "Clear fails first — the wrong department (HR / law) is mixed into marketing. Rewrite: ‘University City café. National Day karak AED 8. Open 8am–10pm.’ A supervisor still posts it.",
      marks: ["Clear / right department", "No legal threat", "One honest caption"],
    },
  ],
  "use-cases-four-functions": [
    {
      id: "a5-x1",
      prompt:
        "Forty CVs sit on Khalid’s desk. Write one practical HR use of AI this week, and one red HR use. Apply the four-yes test to the practical one.",
      modelAnswer:
        "Practical: a first-sort checklist (food-safety card, weekend availability), then a human looks. Red: pick winners from names and photos, or auto-fire. Four yes: we can try this week, we already have the CVs, we keep phones out of a public chatbot, a named person still decides.",
      marks: ["Small checklist, human looks", "Red = hire/fire from a ranking", "Soon / data / private / human"],
    },
    {
      id: "a5-x2",
      prompt:
        "Give one practical AI job for Finance, Marketing, and Operations in a campus café. None of them may be red.",
      modelAnswer:
        "Finance: summarise last week’s totals with no customer names. Marketing: 10 honest captions for a student combo, no fake awards. Operations: put the morning setup (lights, pot, card machine) in time order. A supervisor still checks numbers, captions, and times.",
      marks: ["One job per function", "No people/money/data decisions", "Human still checks"],
    },
  ],
  "find-problem": [
    {
      id: "a6-x1",
      prompt:
        "Opening is slow and guests wait. The owner says ‘buy a robot chef.’ Name the real problem. Score A (robot chef), B (a 6-step opening checklist), C (fake Google reviews). Pick one using useful / easy / value.",
      modelAnswer:
        "The real problem is a slow opening, not fame and not a robot. Choose B: it hits THIS pain, staff can start tomorrow, no faces, no lies. A is shiny and hard this week. C is a public lie — high risk, not useful.",
      marks: ["Name slow opening", "Pick the checklist", "Score the losers"],
    },
    {
      id: "a6-x2",
      prompt:
        "The café is noisy after 6pm. Saeed wants a camera that names every student at the door. Write a better idea for THIS week and say why the camera loses on easy + private.",
      modelAnswer:
        "Better: six quiet-hour ideas the team can discuss tomorrow (study tables, no blender after 6, a ‘quiet’ sign). The camera may help later but it is hard to set up and it collects faces — not private, not easy this week.",
      marks: ["A this-week idea", "Easy", "Private / no faces"],
    },
  ],
  "risks-traffic-lights": [
    {
      id: "a7-x1",
      prompt:
        "AI is asked ‘What should I charge for karak?’ and invents AED 4. If Fatima prints that number, what happened? Write one green, one amber, and one red café use, and what she does at each light.",
      modelAnswer:
        "The limit (no live milk cost, no rival price) became her pricing mistake. Green: 8 caption ideas — skim and pick. Amber: a guest reply — she edits, then sends. Red: set the karak price from the invented number — AI must not decide money.",
      marks: ["Invented price becomes her error", "Green = skim", "Amber = edit", "Red = money"],
    },
    {
      id: "a7-x2",
      prompt: "Name two moves that reduce risk before a poster goes live. Use DRAFT in one of them.",
      modelAnswer:
        "Write DRAFT on the file until a manager says yes. Take names, IDs and phones out of the prompt. A second pair of eyes checks numbers. Humans keep money and people. Do not auto-post.",
      marks: ["DRAFT until yes", "Strip personal data or a second check"],
    },
  ],
  "responsible-use": [
    {
      id: "a8-x1",
      prompt:
        "Repair this weak prompt: ‘Help me with marketing so we are the best in the UAE. Here is the customer Excel.’ Name three problems, then write a responsible 5-piece prompt.",
      modelAnswer:
        "Problems: vague (‘help me’), false ‘best’ claim, and a customer Excel (phones / names). Repaired: Act as a café supervisor in University City. Task: 6 original student-combo captions, modest budget. Format: each caption 8 words plus 1 risk. Rule: no named copies, no fake awards, no IDs or phone lists. I will edit before posting.",
      marks: ["Vague + false best + personal data", "Role, task, place, format, rule", "No Excel"],
    },
    {
      id: "a8-x2",
      prompt:
        "Laila asks AI: ‘Write 20 fake Google reviews.’ At school AI is a tutor. At work, what is AI? Is this request safe? Write the responsible-use checklist in at least five ticks.",
      modelAnswer:
        "At work AI is a junior assistant — a named person still signs. Fake reviews are unsafe: a public lie. Checklist: purpose is coach or draft, not replace me. Prompt has role, task, place, rules, format. No ID, phone, list or password. I can check the facts. I would tell my teacher or manager. I know the risk light. I edit — I do not paste-and-post.",
      marks: ["Junior assistant", "Fake reviews = unsafe", "At least five ticks"],
    },
  ],
};

export const AI_FINAL_EXTRAS: WritingQ[] = [
  {
    id: "af-x1",
    prompt:
      "Fatima asks AI to draft a Thursday staff briefing, then she edits times herself. In three short sentences: the intern metaphor, one job AI did well, one thing it still cannot do.",
    modelAnswer:
      "AI is a fast intern that has read a huge pile of text but has never stood in her shop. Drafting the briefing is the intern job. It cannot see whether there is one cashier or five, and it cannot take legal blame — Fatima stays the supervisor.",
    marks: ["Intern drafts", "One CAN (draft / list)", "One CANNOT (live eyes / blame)"],
  },
  {
    id: "af-x2",
    prompt:
      "In September, AI writes ‘Ramadan combo starts tomorrow’ for a Sharjah café. Name the limit. Name the risk if she prints it. Write a safer caption.",
    modelAnswer:
      "Limit: old news — it may not know this week. Risk: guests arrive for a combo that is not running. Safer: ‘University City karak AED 8. Ask the till for this week’s student combo.’ Fatima checks the calendar, then posts.",
    marks: ["Old news / stale date", "Risk = false offer", "A true caption"],
  },
  {
    id: "af-x3",
    prompt:
      "Aisha’s café is noisy after 6pm. She wants fake five-star reviews that say it is silent. Name the real problem. Score A (fake silent reviews), B (six quiet-hour ideas), C (a camera that names students). Pick one.",
    modelAnswer:
      "The real problem is noise after 6pm, not fame. Choose B: useful for THIS pain, easy to discuss tomorrow, honest. A is a public lie. C may help later but is hard and collects faces.",
    marks: ["Noise, not reviews", "Pick B", "Useful / easy / value on the losers"],
  },
  {
    id: "af-x4",
    prompt:
      "Give one green, one amber and one red GenAI use in a campus café. Say in one line what you do at each light. Then name two moves that reduce risk.",
    modelAnswer:
      "Green: 8 caption ideas — skim and pick. Amber: a guest reply — a supervisor edits, then sends. Red: set the karak price from an invented number, or paste CVs to fire someone — AI must not decide. Reduce risk: write DRAFT until a manager says yes; take names and phones out of the prompt.",
    marks: ["Green skim", "Amber edit", "Red = people/money/data", "Two reduce-risk moves"],
  },
  {
    id: "af-x5",
    prompt:
      "Write a 5-piece prompt Yusuf can use to study POLC. Then write one not-good school use of the same topic, and one unsafe work prompt involving a customer Excel.",
    modelAnswer:
      "Act as a kind HCT tutor. Topic: POLC. Level: first year. Format: four bullets and one UAE café example each. Rule: do not write my assignment; then ask me 1 question. Not-good school: ‘Write my whole POLC essay and hide that you helped.’ Unsafe work: ‘Here is our customer Excel with phones. Write a WhatsApp blast.’",
    marks: ["Five prompt pieces", "Not-good = replace the student", "Excel / phones = unsafe"],
  },
  {
    id: "af-x6",
    prompt:
      "Noor gets mixed mobile orders from 4–7pm. The owner wants a robot and fake reviews. Name her MAIN problem. Pick a practical idea for THIS week using the four-yes test.",
    modelAnswer:
      "Main problem: mixed mobile orders at peak, not a robot and not fame. Practical: a paper peak-hour checklist or a call-back line for mobile orders. Four yes: we can try this week, we already have order notes, it stays private (no face camera), a human still packs the cup.",
    marks: ["Peak mixed orders", "A this-week idea", "Soon / data / private / human"],
  },
];

export const AI_MODULE_EXTRAS: Record<string, WritingQ[]> = {
  "mod-1": [
    {
      id: "ae1-x1",
      prompt:
        "Give two café jobs GenAI is strong at, two limits, and the four-step order of use. Add one thing you must not paste.",
      modelAnswer:
        "Strong: draft a Thursday briefing; 12 names for a student meal deal. Limits: cannot see today’s queue; can invent a neat ‘law’. Order: you ask → AI drafts → YOU check → then use. Do not paste a class phone list, ID, or password.",
      marks: ["Two strengths", "Two limits", "Ask–draft–check–use", "No private data"],
    },
  ],
  "mod-2": [
    {
      id: "ae2-x1",
      prompt:
        "Milk runs out every Thursday. Name the real problem. Give a practical AI-supported job for Operations, and say why a poem about milk fails useful / easy / value.",
      modelAnswer:
        "Problem: Thursday stock-outs, so guests wait. Practical: design a simple stock count sheet a supervisor checks. A poem is easy but not useful and has no value for the till this week.",
      marks: ["Name the stock pain", "A count sheet", "Poem fails useful / value"],
    },
  ],
  "mod-3": [
    {
      id: "ae3-x1",
      prompt:
        "An AI caption with a fake award is posted. Who is responsible, and why is ‘the model did it’ not an exam answer? Name one green and one red follow-up.",
      modelAnswer:
        "The named human who posted or approved it is responsible. AI is a junior assistant, not the owner. Green follow-up: rewrite an honest caption and skim it. Red: keep inventing awards or paste guest phones to ‘make it personal’.",
      marks: ["Named human", "Junior assistant", "Green vs red"],
    },
  ],
};
