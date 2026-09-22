import type { ExamModule } from "./types";
import { AI_MODULE_EXTRAS, moduleToFrqOnly } from "./ai-frq";

export const mgtExamModules: ExamModule[] = [
  {
    id: "mod-1",
    number: "E1",
    title: "Module 1 · CLO 1",
    minutes: 12,
    intro: "Business, profit, structures, management and POLC. The clock starts when you open the paper. After you submit — or when time ends — every MCQ explanation and writing example opens so you can compare.",
    mcqs: [
      {
        id: "e1-q1",
        question: "A business, in one exam sentence, is…",
        options: [
          "A building that sells things",
          "A group of people who organize work to produce goods or services",
          "Anyone with a trade licence",
          "A government ministry",
        ],
        correctIndex: 1,
        explanation: "Organized work that produces goods or services.",
      },
      {
        id: "e1-q2",
        question: "A karak stall takes in AED 1,200 and spends AED 740. Profit is…",
        options: ["AED 1,940", "AED 740", "AED 460", "AED 1,200"],
        correctIndex: 2,
        explanation: "Profit = Income − Cost = 1,200 − 740 = 460.",
      },
      {
        id: "e1-q3",
        question: "If income is AED 4,000 and cost is AED 5,100 the business has…",
        options: ["Profit of 1,100", "A loss of 1,100", "Break-even", "Tax of 1,100"],
        correctIndex: 1,
        explanation: "Cost bigger than income = loss. 5,100 − 4,000 = 1,100 loss.",
      },
      {
        id: "e1-q4",
        question: "Structure vs type: structure is…",
        options: ["Why it exists", "How it is legally built", "The SWOT of the week", "Only non-profits"],
        correctIndex: 1,
        explanation: "Structure = legal shape. Type = purpose.",
      },
      {
        id: "e1-q5",
        question: "POLC stands for…",
        options: [
          "Price, Offer, Ledger, Cash",
          "Planning, Organizing, Leading, Controlling",
          "People, Operations, Logistics, Customers",
          "Profit, Owners, Liability, Control",
        ],
        correctIndex: 1,
        explanation: "The four management functions.",
      },
      {
        id: "e1-q6",
        question: "Which is a non-profit example?",
        options: ["Apple", "Carrefour", "Emirates NBD", "Dubai Cares"],
        correctIndex: 3,
        explanation: "Mission, not owner profit.",
      },
      {
        id: "e1-q7",
        question: "A campus café is usually which type of business activity?",
        options: ["Only a charity", "For-profit service", "A ministry", "A stock exchange"],
        correctIndex: 1,
        explanation: "It sells drinks and food to make leftover money after costs.",
      },
      {
        id: "e1-q8",
        question: "Management is mainly…",
        options: [
          "Shouting at staff",
          "POLC of resources to reach goals efficiently and effectively",
          "Only accounting",
          "Only hiring",
        ],
        correctIndex: 1,
        explanation: "The course definition.",
      },
    ],
    writing: [
      {
        id: "e1-w1",
        prompt: "Write Profit = Income − Cost, then work one example with numbers in AED.",
        modelAnswer:
          "Profit = Income − Cost. Example: a karak stall earns AED 1,200 and spends AED 740 on cups, tea, sugar and rent. Profit = 1,200 − 740 = AED 460.",
        hint: "Pick one tiny business. Put income, cost, then subtract.",
      },
      {
        id: "e1-w2",
        prompt: "Define a business and name POLC in order.",
        modelAnswer:
          "A business is a group of people who organize work to produce goods or services. POLC = Planning, Organizing, Leading, Controlling.",
      },
    ],
  },
  {
    id: "mod-2",
    number: "E2",
    title: "Module 2 · CLO 2",
    minutes: 12,
    intro: "Planning tools, SWOT, SMART, decisions and controlling. Timed. Check only at the end.",
    mcqs: [
      {
        id: "e2-q1",
        question: "A summer marketing campaign is usually…",
        options: ["Strategic planning", "Tactical planning", "Contingency only", "A mission statement"],
        correctIndex: 1,
        explanation: "Department action, 1–3 years, middle managers.",
      },
      {
        id: "e2-q2",
        question: "S and W in SWOT are…",
        options: ["External", "Internal", "Only threats", "Only vision"],
        correctIndex: 1,
        explanation: "Strengths and weaknesses sit inside the company.",
      },
      {
        id: "e2-q3",
        question: "SMART’s T is…",
        options: ["Tax", "Time-bound", "Team", "Type"],
        correctIndex: 1,
        explanation: "Specific, Measurable, Achievable, Relevant, Time-bound.",
      },
      {
        id: "e2-q4",
        question: "The four control steps start with…",
        options: ["Punish staff", "Define a performance standard", "Ignore the gap", "Rewrite the vision"],
        correctIndex: 1,
        explanation: "Standard → Measure → Compare → Correct.",
      },
      {
        id: "e2-q5",
        question: "After you correct in controlling you should…",
        options: ["Stop forever", "Measure again (the loop)", "Delete the standard", "Ignore the gap"],
        correctIndex: 1,
        explanation: "Control is a loop.",
      },
      {
        id: "e2-q6",
        question: "A manager sees high costs and does nothing. Is this controlling?",
        options: ["Yes", "No — controlling needs a fix, not only looking", "Only in Fayol 1916", "Only in non-profits"],
        correctIndex: 1,
        explanation: "Looking without corrective action is not controlling.",
      },
      {
        id: "e2-q7",
        question: "O and T in SWOT are…",
        options: ["Internal", "External", "Only profit", "Only POLC"],
        correctIndex: 1,
        explanation: "Opportunities and threats come from outside.",
      },
      {
        id: "e2-q8",
        question: "Want both expertise and projects in one structure?",
        options: ["Functional only", "Matrix", "Sole prop", "SOE only"],
        correctIndex: 1,
        explanation: "Matrix = function AND project. Two bosses.",
      },
    ],
    writing: [
      {
        id: "e2-w1",
        prompt: "Turn ‘increase sales’ into a SMART goal for a campus café.",
        modelAnswer:
          "Increase espresso sales in the HCT campus café by 15% by 31 December, with two extra baristas and a combo offer, because café profit funds a second machine.",
      },
      {
        id: "e2-w2",
        prompt: "List the 4 control steps with a drink-time example.",
        modelAnswer:
          "Standard: each drink in 3 minutes. Measure: timer this week. Compare: average is 5 minutes. Correct: new layout + short training, then measure again.",
      },
    ],
  },
  {
    id: "mod-3",
    number: "E3",
    title: "Module 3 · Mixed Week 5",
    minutes: 18,
    intro: "CLO 1 and CLO 2 together. Treat this as the Week 5 paper. The timer will submit for you if it hits zero.",
    mcqs: [
      {
        id: "e3-q1",
        question: "Profit =",
        options: ["Cost − Income", "Income − Cost", "Price + Tax", "Assets − Staff"],
        correctIndex: 1,
        explanation: "Income minus Cost.",
      },
      {
        id: "e3-q2",
        question: "A stall: income AED 18,000, cost AED 14,200. Profit?",
        options: ["AED 32,200", "AED 3,800", "AED 14,200", "A loss"],
        correctIndex: 1,
        explanation: "18,000 − 14,200 = 3,800.",
      },
      {
        id: "e3-q3",
        question: "Legal ownership and liability is about…",
        options: ["Type", "Structure", "SWOT", "Leading"],
        correctIndex: 1,
        explanation: "Structure = how it is legally organized.",
      },
      {
        id: "e3-q4",
        question: "Which is a state-owned enterprise example?",
        options: ["Patagonia", "Local grocery", "DEWA", "Union Coop"],
        correctIndex: 2,
        explanation: "DEWA is government-owned.",
      },
      {
        id: "e3-q5",
        question: "New departmental policy is usually written by…",
        options: ["Top", "Middle", "Low only", "Customers"],
        correctIndex: 1,
        explanation: "Middle turns strategy into department plans.",
      },
      {
        id: "e3-q6",
        question: "C Corp can face…",
        options: ["No tax ever", "Double taxation (company + shareholder)", "Unlimited liability only", "No shareholders"],
        correctIndex: 1,
        explanation: "S Corp is pass-through. C Corp can be taxed twice.",
      },
      {
        id: "e3-q7",
        question: "Henri Fayol’s original functions were…",
        options: [
          "Only Leading",
          "Planning, Organizing, Commanding, Coordinating, Controlling",
          "SWOT and SMART",
          "Finance and HR only",
        ],
        correctIndex: 1,
        explanation: "Later Commanding + Coordinating became Leading → POLC.",
      },
      {
        id: "e3-q8",
        question: "A holding company…",
        options: [
          "Must sell products itself",
          "Owns shares in other companies",
          "Cannot exist in the UAE",
          "Always has unlimited personal liability",
        ],
        correctIndex: 1,
        explanation: "Mubadala, QIA, Berkshire Hathaway.",
      },
      {
        id: "e3-q9",
        question: "Vision vs mission:",
        options: ["Vision is purpose, mission is dream", "Vision is the dream, mission is the purpose", "They are SWOT", "They are costs"],
        correctIndex: 1,
        explanation: "Vision = where we want to go. Mission = why we exist.",
      },
      {
        id: "e3-q10",
        question: "Evidence-based management means…",
        options: ["Guess only", "Use evidence, not only gut", "Copy a rival’s logo", "Skip planning"],
        correctIndex: 1,
        explanation: "EBM uses facts plus judgement.",
      },
    ],
    writing: [
      {
        id: "e3-w1",
        prompt: "Work a full profit example (income, two costs, profit) for a UAE café, then say what a loss would look like.",
        modelAnswer:
          "Income AED 12,000. Costs: rent AED 4,000 + stock AED 5,500 = AED 9,500. Profit = 12,000 − 9,500 = AED 2,500. A loss would be if costs rose to AED 13,000 — then 12,000 − 13,000 = loss of AED 1,000.",
      },
      {
        id: "e3-w2",
        prompt: "Write POLC as a cycle in four short sentences using a campus event.",
        modelAnswer:
          "Plan the 11:00 speech and the games. Organize chairs, mic and volunteers. Lead by briefing the team and starting on time. Control by watching the clock and shortening the speech if it runs late, then check again.",
      },
    ],
  },
];

export const aiExamModulesRaw: ExamModule[] = [
  {
    id: "mod-1",
    number: "E1",
    title: "Module 1 · What GenAI can do",
    minutes: 12,
    intro: "Intern picture, jobs, limits, six gates, and school vs not-good use. Timed. After you submit — or when time ends — every explanation and writing model opens.",
    mcqs: [
      {
        id: "ae1-q1",
        question: "The safest picture of Generative AI is…",
        options: [
          "A manager who is always right",
          "A fast intern who drafts, while you check",
          "A camera that sees your shop today",
          "A lawyer who can sign for the company",
        ],
        correctIndex: 1,
        explanation: "It has read a lot of text. It has not stood in your café. Draft, then you look.",
      },
      {
        id: "ae1-q2",
        question: "Which job is a strength of GenAI?",
        options: [
          "Visiting University City this afternoon",
          "Taking legal blame for a poster",
          "Drafting a first list of 12 meal-deal names",
          "Tasting whether the karak is too sweet",
        ],
        correctIndex: 2,
        explanation: "Brainstorm and draft = intern work. Live eyes, taste and blame stay with you.",
      },
      {
        id: "ae1-q3",
        question: "AI writes a neat sentence: ‘Cafés in Sharjah must close at 10 by law.’ You cannot find the law. This is…",
        options: [
          "A live-eyes strength",
          "An invented fact (hallucination)",
          "A finance approval",
          "Proof you should auto-post",
        ],
        correctIndex: 1,
        explanation: "Fluent is not true. Delete invented rules, awards and prices.",
      },
      {
        id: "ae1-q4",
        question: "The six human-check gates start with ‘Is this the real job I asked for?’ Which is gate 3?",
        options: [
          "Would I say this to a guest’s face?",
          "Are names, IDs and phones out?",
          "Can I explain this if a teacher asks?",
          "Is a human still deciding?",
        ],
        correctIndex: 1,
        explanation: "1 real job · 2 real source · 3 no IDs · 4 would I say it · 5 human deciding · 6 can I explain.",
      },
      {
        id: "ae1-q5",
        question: "A good school use of AI is…",
        options: [
          "Submit the chatbot’s essay as yours",
          "Ask it to sit the quiz in your name",
          "Ask it to quiz you, then answer with the chat closed",
          "Paste a classmate’s file and relabel it",
        ],
        correctIndex: 2,
        explanation: "Tutor, not the student who submits. If you can teach it, you learned it.",
      },
      {
        id: "ae1-q6",
        question: "The five pieces of a clear learning prompt are…",
        options: [
          "Emoji, length, speed, font, colour",
          "Role, topic, level, format, rule",
          "Name, ID, phone, password, Excel",
          "SWOT only",
        ],
        correctIndex: 1,
        explanation: "Brief the tutor: who they are, what topic, what level, how the answer should look, what they must not do.",
      },
      {
        id: "ae1-q7",
        question: "The safe order of use is…",
        options: [
          "AI drafts → you post it",
          "You ask → AI drafts → YOU check → then use",
          "Publish first, check later",
          "Skip the human",
        ],
        correctIndex: 1,
        explanation: "The intern never posts. The supervisor does — after the six gates.",
      },
      {
        id: "ae1-q8",
        question: "Which is a LIMIT, not a job, of AI answers?",
        options: [
          "It can summarise a long chat into bullets",
          "It cannot see whether you have one cashier or five today",
          "It can change the tone of a stock reminder",
          "It can role-play a guest complaint",
        ],
        correctIndex: 1,
        explanation: "No live eyes. The risk is printing ‘service is always fast’ on a 20-minute queue.",
      },
    ],
    writing: [
      {
        id: "ae1-w1",
        prompt: "In four labelled steps, write how a student should use GenAI for a business homework. Add one thing they must not paste.",
        modelAnswer:
          "1 Ask a clear question (role, topic, level, format, rule). 2 Let AI draft. 3 Check facts, names and numbers yourself. 4 Use only what you verified. Do not paste a class list, ID, or password into a public tool.",
        marks: [
          "Ask → draft → check → use",
          "Human check is named",
          "No private data in the prompt",
        ],
      },
      {
        id: "ae1-w2",
        prompt: "Write a 5-piece prompt to study the four types of planning. Then say what ‘not-good’ school use would look like for the same topic.",
        modelAnswer:
          "Act as a kind HCT tutor. Topic: four types of planning. Level: first year. Format: a tiny table with one UAE example each. Rule: do not write my assignment; then ask me 1 question. Not-good: ‘Write my whole planning essay and hide that you helped.’",
        marks: [
          "Role topic level format rule",
          "A UAE example is asked",
          "Not-good = replace the student",
        ],
      },
    ],
  },
  {
    id: "mod-2",
    number: "E2",
    title: "Module 2 · Rooms, use cases, risk",
    minutes: 12,
    intro: "Match the department, four-yes practical, traffic lights. Different stems from the final paper.",
    mcqs: [
      {
        id: "ae2-q1",
        question: "Traffic-light RED means…",
        options: [
          "Safe to auto-send",
          "Stop — high harm if it is wrong (people, money, data, public ‘#1’ claims)",
          "Skip class",
          "The English is perfect so it must be true",
        ],
        correctIndex: 1,
        explanation: "Red = AI must not decide. Green = skim. Amber = a person edits first.",
      },
      {
        id: "ae2-q2",
        question: "Which is usually GREEN?",
        options: [
          "Auto-firing staff from a chatbot ranking",
          "Drafting a practice quiz you will edit",
          "Signing a supplier contract",
          "Diagnosing a guest’s illness",
        ],
        correctIndex: 1,
        explanation: "Low harm, easy to check. Firing, contracts and medical claims are red.",
      },
      {
        id: "ae2-q3",
        question: "‘Draft a polite interview invitation’ belongs in…",
        options: ["Finance", "HR", "Operations", "IT security"],
        correctIndex: 1,
        explanation: "People paperwork is HR. Finance would explain totals. Operations would order the morning setup.",
      },
      {
        id: "ae2-q4",
        question: "Milk runs out every Thursday. The sensible AI-supported job is…",
        options: [
          "Guess next year’s exact profit",
          "Write a poem about milk",
          "Design a simple stock count sheet",
          "Clone a rival café’s full menu",
        ],
        correctIndex: 2,
        explanation: "Start with the pain. A count sheet hits stock this week. A poem does not.",
      },
      {
        id: "ae2-q5",
        question: "A use case is ‘practical’ when…",
        options: [
          "It needs a secret customer phone list",
          "Only a huge company could try it in three years",
          "You can try it soon, with data you have, privately, with a human deciding",
          "AI posts it with no one looking",
        ],
        correctIndex: 2,
        explanation: "Four yes: soon, data we have, private, human decides.",
      },
      {
        id: "ae2-q6",
        question: "The three output lights are useful / clear / responsible. ‘Clear’ fails when…",
        options: [
          "The draft mixes HR with finance in one muddy paragraph",
          "The English has no spelling mistakes",
          "A supervisor still edits it",
          "The task is a revision quiz",
        ],
        correctIndex: 0,
        explanation: "Clear = right department, short sentences. Useful = I can act. Responsible = no fake prize, no phones.",
      },
      {
        id: "ae2-q7",
        question: "Amber risk is the middle light. A café example is…",
        options: [
          "Brainstorming 8 caption ideas",
          "Drafting a guest reply that a supervisor edits before sending",
          "Pasting CVs to decide who to fire",
          "Asking for 4 POLC bullets",
        ],
        correctIndex: 1,
        explanation: "Amber = a person edits first. Green = captions/quiz. Red = hire/fire + personal data.",
      },
      {
        id: "ae2-q8",
        question: "Before you buy a shiny AI tool you should…",
        options: [
          "Name the real problem in one sentence",
          "Buy the most famous brand",
          "Skip a written reason",
          "Let the chatbot choose in secret",
        ],
        correctIndex: 0,
        explanation: "Lesson 6 habit: problem first, tool second.",
      },
    ],
    writing: [
      {
        id: "ae2-w1",
        prompt: "Give one green, one amber and one red GenAI use in a campus café. Say in one line what you do at each light.",
        modelAnswer:
          "Green: draft 8 menu captions — skim and pick. Amber: draft a guest reply — a supervisor edits, then sends. Red: auto-refuse a refund or paste CVs to fire someone — AI must not decide.",
        marks: [
          "Green = skim",
          "Amber = human edits",
          "Red = people / money / data / public claim",
        ],
      },
      {
        id: "ae2-w2",
        prompt: "Name one practical AI job for each of Finance, HR, Marketing and Operations. Then write the four-yes test in four short questions.",
        modelAnswer:
          "Finance: summarise weekly totals with no names. HR: draft a day-1 cashier checklist. Marketing: 10 honest captions for a student combo. Operations: put the morning setup in time order. Four yes: Can we try it this week? Do we already have the data? Does it stay private? Does a human still decide?",
        marks: [
          "One job per function",
          "No red-line tasks",
          "Soon / data / private / human",
        ],
      },
    ],
  },
  {
    id: "mod-3",
    number: "E3",
    title: "Module 3 · Mixed Assessment 1",
    minutes: 16,
    intro: "CLO 1 and CLO 2 together — a shorter cousin of the final, not a copy. The timer will submit if it hits zero.",
    mcqs: [
      {
        id: "ae3-q1",
        question: "An AI caption with a fake award is posted. Who is responsible?",
        options: [
          "The model",
          "The named human who posted or approved it",
          "The keyboard",
          "Nobody, because a machine wrote it",
        ],
        correctIndex: 1,
        explanation: "Junior assistant. A named person still signs.",
      },
      {
        id: "ae3-q2",
        question: "A human-check gate is needed because AI…",
        options: [
          "Never makes errors",
          "Can sound sure while being wrong",
          "Cannot write a list",
          "Is illegal in the UAE",
        ],
        correctIndex: 1,
        explanation: "Fluent ≠ true. Gate 2 asks for a source you can see.",
      },
      {
        id: "ae3-q3",
        question: "Responsible use includes all of these EXCEPT…",
        options: [
          "Keeping IDs and phones out of the prompt",
          "Checking facts before you print",
          "Hiding that AI helped when a teacher asks",
          "A human still deciding on money and people",
        ],
        correctIndex: 2,
        explanation: "Honesty with teacher or manager is on the checklist. Hiding the help turns good use into not-good use.",
      },
      {
        id: "ae3-q4",
        question: "Operations in a café would most usefully ask AI to…",
        options: [
          "Only write poems about steam",
          "Draft a Friday prep list, then a supervisor checks the times",
          "Replace the stove",
          "Write UAE visa law",
        ],
        correctIndex: 1,
        explanation: "Operations = making / running the shift. A checklist is practical. Law and hardware are not intern jobs.",
      },
      {
        id: "ae3-q5",
        question: "Noor’s MAIN problem, in one line, is…",
        options: [
          "The logo colour",
          "Mixed mobile orders at peak time",
          "Not enough TikTok dances",
          "The date of National Day",
        ],
        correctIndex: 1,
        explanation: "Fame is not the headache. Wrong cups from 4–7pm are.",
      },
      {
        id: "ae3-q6",
        question: "Which idea scores worst for ‘easy + private’ right now?",
        options: [
          "A paper peak-hour checklist",
          "A call-back line for mobile orders",
          "A camera that names every student at the door",
          "Six quiet-hour ideas for the team",
        ],
        correctIndex: 2,
        explanation: "Hard, and it collects faces. B and A are useful and easy this week.",
      },
      {
        id: "ae3-q7",
        question: "‘Give me the idea of the best café in Sharjah’ is weak because it is…",
        options: [
          "Too specific and too honest",
          "Vague, invites copying, and ‘best’ can become a false advert",
          "A perfect 5-piece prompt",
          "A green, low-risk finance task",
        ],
        correctIndex: 1,
        explanation: "Repair it with place, original ideas, no named copies, no fake awards.",
      },
      {
        id: "ae3-q8",
        question: "High-risk examples include all EXCEPT…",
        options: [
          "Setting the karak price from an invented number",
          "Hire / fire from a chatbot ranking",
          "A public ‘best in the city’ advert with no proof",
          "Asking for 4 POLC bullets to revise tonight",
        ],
        correctIndex: 3,
        explanation: "Revision bullets are green. Price, people and false adverts are red.",
      },
    ],
    writing: [
      {
        id: "ae3-w1",
        prompt: "Write the four-step use of GenAI. Add one responsible rule about data. Add one responsible rule about honesty.",
        modelAnswer:
          "Ask → AI drafts → YOU check → then use. Data: do not paste private student or customer lists into a public tool. Honesty: if a teacher or manager asks, say that AI helped you draft.",
        marks: [
          "Four steps in order",
          "No personal lists",
          "Do not hide the help",
        ],
      },
      {
        id: "ae3-w2",
        prompt:
          "Repair ‘Give me the idea of the best café in Sharjah’ into a responsible prompt for HCT students near University City. Then state the risk light of posting ‘we are #1’ with no proof.",
        modelAnswer:
          "Act as a tutor. 6 original study-café ideas near University City, modest budget, no named copies. Each idea: 3 items, 1 risk, 1 honest caption. Do not write my assignment. Posting ‘we are #1’ with no proof is high / red — a public claim AI must not decide.",
        marks: [
          "Place + original + no copy",
          "Format given",
          "‘#1’ is red / high",
        ],
      },
    ],
  },
];

export const aiExamModules: ExamModule[] = aiExamModulesRaw.map((m) =>
  moduleToFrqOnly(m, AI_MODULE_EXTRAS[m.id]),
);

for (const mod of mgtExamModules) {
  for (const q of mod.mcqs) {
    q.frqAnswer ??= `Write: ${q.options[q.correctIndex]}. ${q.explanation}`;
  }
}


