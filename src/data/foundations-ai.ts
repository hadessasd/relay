import type { Course } from "./types";

export const foundationsAi: Omit<Course, "examModules"> = {
  id: "foundations-ai",
  code: "BUS · Foundations of AI",
  shortName: "Foundations of AI",
  title: "Ethical AI · Foundations of Generative AI",
  subtitle: "Week 1 Lesson 2 through Week 4 Lesson 8",
  examLabel: "Week 5 exam · CLO 1 & CLO 2 · Assessment 1",
  weeks: "Weeks 1–4 · Lessons 2–8",
  clos: [
    "CLO 1 — Say what GenAI can do, use it to learn, put it in the right department",
    "CLO 2 — Name practical use cases, choose with a reason, sort risk, stay responsible",
  ],
  color: "teal",
  topics: [
    {
      id: "what-genai-can-do",
      number: "L2",
      title: "What Generative AI can do",
      kicker: "Week 1 Lesson 2 · Jobs · limits · human check",
      clo: "CLO 1",
      week: "Week 1",
      summary: "AI is a fast intern. It drafts. You check with six gates before you use it.",
      blocks: [
        {
          type: "lead",
          text: "Generative AI is a computer that can make new words from your words. You type a question. It types an answer that looks new. That is all. It is not magic, and it is not a manager.",
        },
        {
          type: "figure",
          src: "/illustrations/intern.jpg",
          alt: "A student checking an AI poster draft with a red pen",
          caption: "Treat AI like a fast intern: it drafts, you still look.",
        },
        {
          type: "callout",
          kind: "remember",
          title: "The intern picture",
          text: "AI is a fast intern. The intern has read a huge pile of text. The intern has never stood in your café in University City. The intern has never tasted your karak. The intern cannot see whether there is one cashier or five. So the intern can draft. You still have to look.",
        },
        {
          type: "steps",
          items: ["You ask", "AI drafts", "YOU check", "Then use"],
        },
        { type: "h", text: "What it can do for business tasks" },
        {
          type: "p",
          text: "Use it when you need a first version, not a final stamp. It is strong at starting. It is weak at knowing your real shop.",
        },
        {
          type: "table",
          headers: ["Job", "Picture", "Example you can try"],
          rows: [
            ["Draft writing", "Rough letter, not the stamp", "Invite staff to a Thursday briefing"],
            ["Brainstorm", "Sticky notes on a wall", "12 names for a student meal deal"],
            ["Summarise", "Long chat → 5 bullets", "Complaints with names taken out"],
            ["Change tone", "Same news, kinder voice", "A stock reminder that is not angry"],
            ["Make a list", "Shopping list", "Open shop: lights, pot, card machine"],
            ["Role-play", "Rehearsal before a play", "You act as a guest. I practise the reply."],
            ["Explain numbers", "Teacher pointing at a table", "Which 2 days sold the least?"],
            ["Translate a draft", "Two columns EN / AR", "A person who knows Arabic must still check"],
          ],
        },
        {
          type: "cards",
          items: [
            {
              title: "AI can",
              body: "Write a first draft fast. Give many options. Turn notes into a list. Help you practise a talk.",
            },
            {
              title: "AI cannot",
              body: "Visit University City. Taste the karak. See today's queue. Take the blame for you.",
            },
          ],
        },
        { type: "h", text: "Main limits and risks" },
        {
          type: "p",
          text: "A limit is a thing AI is not good at, even on a good day. A risk is the trouble you get if you trust the answer anyway. Example: the limit is ‘it cannot see the queue.’ The risk is ‘you print fast service on a poster, and guests wait twenty minutes.’",
        },
        {
          type: "p",
          text: "Please remember: AI often sounds sure. Smooth English is not the same as truth. If a sentence would surprise your lecturer or your manager, stop and check.",
        },
        {
          type: "table",
          headers: ["Name", "Easy meaning", "Story"],
          rows: [
            ["Invented fact", "It makes up a neat sentence", "‘Sharjah law says cafés close at 10.’ Made up."],
            ["No live eyes", "It cannot see your shop today", "It writes ‘service is always fast’ with 1 cashier."],
            ["Old news", "It may not know this week", "A Ramadan offer written in September."],
            ["Private data", "What you paste may leave your control", "A class phone list ‘to make it personal.’"],
            ["Copycat", "It can echo a famous brand", "A slogan that sounds like a big chain."],
            ["Too sure", "Smooth English hides a wrong step", "A refund the owner never approved."],
          ],
        },
        { type: "h", text: "The simple human check — 6 yes/no gates" },
        {
          type: "p",
          text: "Before you use any AI answer, walk through six small doors. If one door says no, do not post, print, or submit yet.",
        },
        {
          type: "table",
          headers: ["#", "Ask", "If no"],
          rows: [
            ["1", "Is this the real job I asked for?", "Prompt again."],
            ["2", "Can I see this with my eyes or a real source?", "Delete invented awards, prices, laws."],
            ["3", "Are names, IDs and phones out?", "Start a clean chat."],
            ["4", "Would I say this to a guest's face?", "Use truer, kinder words."],
            ["5", "Is a human still deciding?", "Do not auto-post."],
            ["6", "Can I explain this if a teacher asks?", "Learn it, or do not submit it."],
          ],
        },
        {
          type: "callout",
          kind: "story",
          title: "Worked example",
          text: "AI caption: ‘Voted #1 in Sharjah! Show your Emirates ID for free dessert. Ends in 11 minutes.’ Fails gates 2, 3, 4, 6. New caption: ‘University City study corner. Karak AED 8. Quiet tables after 6pm.’ A person posts it.",
        },
      ],
      mcqs: [
        {
          id: "a2-q1",
          question: "What is Generative AI best compared to?",
          options: [
            "A manager who is always right",
            "A fast intern who drafts, but you must check",
            "A camera that sees your shop",
            "A lawyer for the company",
          ],
          correctIndex: 1,
          explanation: "Best picture: a fast intern. It can draft a letter, a list, or a caption. It has never stood in your café, so you still check.",
        },
        {
          id: "a2-q2",
          question: "Which is a limit of AI answers?",
          options: [
            "It always visits the real location",
            "It can invent a fact that sounds true",
            "It never makes grammar mistakes",
            "It takes legal blame for you",
          ],
          correctIndex: 1,
          explanation: "A main limit is invented facts — smooth English that is not true. AI also cannot see your shop today and cannot take legal blame.",
        },
        {
          id: "a2-q3",
          question: "AI writes ‘Official #1 café — send your Emirates ID.’ What should you do?",
          options: [
            "Post it because the English is nice",
            "Ask customers for IDs at the door",
            "Rewrite with true facts only and keep IDs out",
            "Add more fake urgency",
          ],
          correctIndex: 2,
          explanation: "The human check fails on truth (invented #1 award) and privacy (Emirates ID). Rewrite with real facts only, then a person posts it.",
        },
        {
          id: "a2-q4",
          question: "How many yes/no gates are in the simple human check?",
          options: ["3", "4", "6", "10"],
          correctIndex: 2,
          explanation: "Real job, real source, no IDs, would I say it, human deciding, can I explain it.",
        },
      ],
      writing: [
        {
          id: "a2-w1",
          prompt: "In two sentences, explain the intern metaphor for Generative AI.",
          modelAnswer:
            "AI is a fast intern that has read a huge pile of text but has never stood in your real shop. It can draft; you still check, because it cannot see today's queue and it cannot take the blame.",
          marks: [
            "Intern drafts, you stay in charge",
            "It has no live eyes on the café",
            "You still check before you post or submit",
          ],
        },
        {
          id: "a2-w2",
          prompt: "List the 6 human-check gates. Then say which gates the fake ‘#1 in Sharjah + Emirates ID’ caption fails.",
          modelAnswer:
            "1 Real job? 2 Can I see it / source? 3 Names and IDs out? 4 Would I say this to a guest? 5 Is a human still deciding? 6 Can I explain it? The fake caption fails 2 (invented award), 3 (ID), 4 (false urgency / face), and 6 (you cannot defend it).",
        },
      ],
    },
    {
      id: "ai-helps-learn",
      number: "L3",
      title: "AI that helps you learn",
      kicker: "Week 2 Lesson 3 · Support learning · good vs not-good",
      clo: "CLO 1",
      week: "Week 2",
      summary: "AI is a tutor, not the student who submits the paper. Clear prompts have five pieces.",
      blocks: [
        {
          type: "lead",
          text: "In this lesson, AI sits on the other side of the desk like a tutor. A tutor may explain, quiz you, and point at unclear sentences. A tutor does not sit the exam in your name. If you cannot say the answer with the chat closed, you did not learn it yet.",
        },
        {
          type: "figure",
          src: "/illustrations/compare.jpg",
          alt: "Two notebooks side by side on a study desk",
          caption: "Learn with AI, then close the chat and write it in your own words.",
        },
        {
          type: "p",
          text: "Good school use helps your brain. Not-good school use replaces your brain. Teachers can usually hear the difference, because not-good work sounds smooth but empty when they ask ‘can you explain this?’",
        },
        { type: "h", text: "Common ways AI can support learning" },
        {
          type: "p",
          text: "Notice the pattern in every good example: AI starts, you finish. You still speak, write, or choose.",
        },
        {
          type: "table",
          headers: ["Support", "What you type", "What you still do"],
          rows: [
            ["Explain simpler", "‘SWOT like week 1. Use a lemonade stand.’", "Say it aloud with the chat closed"],
            ["Quiz me", "‘5 POLC questions. Wait for my answer.’", "Answer without peeking"],
            ["Study plan", "‘4 days. Only planning + controlling.’", "Follow the plan"],
            ["Check MY draft", "‘Mark unclear sentences. Do not rewrite all.’", "Fix the sentences yourself"],
            ["More examples", "‘3 UAE examples of a flat structure.’", "Write one into your notes"],
            ["Step by step", "‘4 controlling steps using a college event.’", "Match it to the lecture slide"],
          ],
        },
        {
          type: "cards",
          items: [
            {
              title: "Good school use",
              body: "Explain a slide I already opened. Give practice, then I try. Find holes in MY paragraph. Make a revision timetable.",
            },
            {
              title: "Not-good school use",
              body: "Do the whole assignment for me. Sit the quiz in my name. I cannot explain the answer. I hide that AI helped.",
            },
          ],
        },
        { type: "h", text: "A clear learning prompt has five pieces" },
        {
          type: "p",
          text: "A weak prompt is like shouting ‘help’ in a mall. A clear prompt is like briefing a tutor: who they are, what topic, what level, how the answer should look, and what they must not do.",
        },
        {
          type: "steps",
          items: ["Role", "Topic", "Level", "Format", "Rule"],
        },
        {
          type: "callout",
          kind: "formula",
          title: "Copy-me prompt",
          text: "Act as a kind HCT tutor. Topic: four types of planning. Level: first year. Format: a tiny table with one UAE example each. Rule: do not write my assignment. Then ask me 1 question.",
        },
        {
          type: "p",
          text: "After every study answer, pause and ask five kind questions: Does this match the lecture? Can I say it aloud? Did AI invent a name, date, or rule? Did I paste anyone's private details? Would I tell my teacher that AI helped? If you cannot say yes, keep working.",
        },
      ],
      mcqs: [
        {
          id: "a3-q1",
          question: "Which is a good way to use AI for learning?",
          options: [
            "Submit the chatbot's essay as your own",
            "Ask it to sit the quiz for you",
            "Ask it to quiz you, then answer yourself",
            "Paste a classmate's file and call it yours",
          ],
          correctIndex: 2,
          explanation: "AI coaches. You still do the thinking.",
        },
        {
          id: "a3-q2",
          question: "Which prompt is the clearest?",
          options: [
            "Help.",
            "Write everything about business.",
            "Act as a tutor. Explain POLC for first year. 4 bullets. Then ask me 1 question.",
            "Do my homework.",
          ],
          correctIndex: 2,
          explanation: "Role + topic + level + format + next step.",
        },
        {
          id: "a3-q3",
          question: "You used AI to explain SWOT. What is the best next human check?",
          options: [
            "Post it on Instagram",
            "Close the chat and explain SWOT to a friend",
            "Delete the lecture slides",
            "Ask AI to sit the test",
          ],
          correctIndex: 1,
          explanation: "If you can teach it, you learned it.",
        },
        {
          id: "a3-q4",
          question: "The five pieces of a clear learning prompt are…",
          options: [
            "Emoji, length, speed, font, colour",
            "Role, Topic, Level, Format, Rule",
            "SWOT only",
            "Name, ID, phone, password, Excel",
          ],
          correctIndex: 1,
          explanation: "Brief the tutor: who, what, level, shape, and what they must not do.",
        },
      ],
      writing: [
        {
          id: "a3-w1",
          prompt: "Write one good school use and one not-good school use of AI, and explain the difference in one sentence.",
          modelAnswer:
            "Good: ask AI to quiz you on POLC, then answer yourself. Not-good: ask it to sit the quiz in your name. Difference: good use helps your brain; not-good use replaces your brain.",
        },
        {
          id: "a3-w2",
          prompt: "Write a clear 5-piece prompt to study the four types of planning.",
          modelAnswer:
            "Act as a kind HCT tutor. Topic: four types of planning. Level: first year. Format: a tiny table with one UAE example each. Rule: do not write my assignment. Then ask me 1 question.",
        },
      ],
    },
    {
      id: "ai-across-business",
      number: "L4",
      title: "AI across business areas",
      kicker: "Week 2 Lesson 4 · Match the room · useful / clear / responsible",
      clo: "CLO 1",
      week: "Week 2",
      summary: "Put the tool in the right department. Judge output with three lights.",
      blocks: [
        {
          type: "lead",
          text: "Imagine the company as a small building. Marketing has a room. Finance has a room. HR has a room. Operations has a room. AI is a tool you carry from room to room. The job must match the room. A caption belongs in Marketing. A payment does not.",
        },
        {
          type: "figure",
          src: "/illustrations/rooms.jpg",
          alt: "Student carrying a laptop between four office rooms",
          caption: "Carry the tool to the right room. A caption is Marketing. A payment is not.",
        },
        {
          type: "p",
          text: "If you let the tool wander, two mistakes happen. First, the draft talks about the wrong work. Second, someone treats a pretty paragraph as a real decision. That is how a café posts ‘we are #1’ or promises a refund nobody approved.",
        },
        {
          type: "table",
          headers: ["Department", "Helpful AI task", "Not AI's job alone"],
          rows: [
            ["Marketing", "Draft 5 National Day captions", "Post ‘officially #1 in Sharjah’"],
            ["Finance", "Explain YOUR monthly totals in simple words", "Approve a payment or hide a loss"],
            ["HR", "Draft a polite interview invitation", "Reject people with no human look"],
            ["Operations", "Turn delay notes into an opening checklist", "Change a safety rule alone"],
            ["Customer service", "Suggest 3 kind replies to ‘Where is my order?’", "Promise a refund nobody approved"],
            ["Sales", "List features from YOUR brochure", "Invent a discount"],
            ["IT", "List backup steps", "Paste customer passwords into ChatGPT"],
          ],
        },
        {
          type: "callout",
          kind: "formula",
          title: "Workplace prompt",
          text: "You help a café supervisor in Sharjah. Draft a 1-day Thursday checklist: open, peak, close. Short sentences. Do not invent visa or health laws. I will edit before I print.",
        },
        { type: "h", text: "Judge the output with three lights" },
        {
          type: "p",
          text: "After the draft arrives, do not ask ‘is the English nice?’ Ask three quieter questions.",
        },
        {
          type: "table",
          headers: ["Light", "Pass", "Fail"],
          rows: [
            ["Useful?", "I can use it today with small edits", "Pretty words, no real steps"],
            ["Clear?", "Right department, short sentences", "Mixes HR with finance"],
            ["Responsible?", "No fake prize, no phone numbers", "‘Post this now’ + a customer name"],
          ],
        },
      ],
      mcqs: [
        {
          id: "a4-q1",
          question: "‘Draft 5 National Day captions’ belongs to which area?",
          options: ["Finance", "HR", "Marketing", "IT"],
          correctIndex: 2,
          explanation: "Captions are a marketing draft.",
        },
        {
          id: "a4-q2",
          question: "‘Explain this month's expense table in simple words’ belongs to which area?",
          options: ["Marketing", "Finance", "Sales", "Operations"],
          correctIndex: 1,
          explanation: "Money tables sit in Finance.",
        },
        {
          id: "a4-q3",
          question: "A draft says ‘We are the official #1 café in Sharjah.’ Is it responsible?",
          options: [
            "Yes, because it sounds strong",
            "Yes, if the English is perfect",
            "No — it is an unproven claim",
            "Only if you add extra words",
          ],
          correctIndex: 2,
          explanation: "‘#1 / official’ needs real proof.",
        },
        {
          id: "a4-q4",
          question: "The three judgement lights are…",
          options: ["Fast / cheap / loud", "Useful / clear / responsible", "Top / middle / low", "S / W / O"],
          correctIndex: 1,
          explanation: "Can I act, is it in the right room, and does it avoid lies and private data.",
        },
      ],
      writing: [
        {
          id: "a4-w1",
          prompt: "Pick one department and write one helpful AI task and one thing AI must not do alone.",
          modelAnswer:
            "HR: helpful — draft a polite interview invitation. Not AI's job alone — reject people with no human look. A named person still decides.",
        },
        {
          id: "a4-w2",
          prompt: "Write a workplace prompt for a Sharjah café Thursday checklist that stays responsible.",
          modelAnswer:
            "You help a café supervisor in Sharjah. Draft a 1-day Thursday checklist: open, peak, close. Short sentences. Do not invent visa or health laws. I will edit before I print.",
        },
      ],
    },
    {
      id: "use-cases-four-functions",
      number: "L5",
      title: "AI use cases for the 4 functions",
      kicker: "Week 3 Lesson 5 · Name · match a problem · keep it practical",
      clo: "CLO 2",
      week: "Week 3",
      summary: "AI sits inside Finance, HR, Marketing, Operations. Four yes = practical.",
      blocks: [
        {
          type: "lead",
          text: "You already know the four business functions from management class: Finance, HR, Marketing, and Operations. This lesson only adds one idea: AI can sit inside each function as a helper. It does not become a fifth function. It does not replace the manager of that function.",
        },
        {
          type: "figure",
          src: "/illustrations/functions.jpg",
          alt: "Café rooms for kitchen, till, staff and service",
          caption: "AI sits inside a room. It does not become a fifth function.",
        },
        {
          type: "p",
          text: "A good use case is small and honest. ‘Summarise this week's totals’ is good. ‘Tell me next year's exact profit’ is not. The first uses numbers you already have. The second asks AI to see the future.",
        },
        {
          type: "table",
          headers: ["Function", "Practical AI use", "Problem it can support"],
          rows: [
            ["Finance", "Summarise weekly totals with no names", "Owner cannot see which week lost money"],
            ["HR", "Draft day-1 checklist for a new cashier", "New staff forget the steps"],
            ["Marketing", "10 honest captions for a student combo", "The page sounds the same every day"],
            ["Operations", "Put the morning setup in time order", "Opening is slow and guests wait"],
          ],
        },
        { type: "h", text: "Match a headache to a sensible AI job" },
        {
          type: "p",
          text: "Start with the pain, not with the app. If milk runs out every Thursday, the pain is stock. A count sheet helps. A poem about milk does not.",
        },
        {
          type: "table",
          headers: ["Headache", "Good AI job", "Silly AI job"],
          rows: [
            ["Noisy after 6pm", "6 quiet-hour ideas for the team", "Fake reviews that say ‘so silent’"],
            ["Milk gone every Thursday", "A count-and-reorder sheet", "Guess next year's exact profit"],
            ["Need EN + Arabic menu line", "Draft both, then a person checks Arabic", "Copy Café X and change two words"],
            ["40 CVs on the desk", "A first-sort checklist (food-safety card)", "Pick winners from names and photos only"],
          ],
        },
        {
          type: "callout",
          kind: "formula",
          title: "Practical = four yes",
          text: "Can we try it this week? Do we already have the data? Does it stay private? Does a human still decide? Four yes = practical.",
        },
      ],
      mcqs: [
        {
          id: "a5-q1",
          question: "Which is a practical Operations use case?",
          options: [
            "Let AI fire the slowest worker",
            "Put the morning setup in time order",
            "Invent next year's profit to the fils",
            "Post fake reviews",
          ],
          correctIndex: 1,
          explanation: "A checklist is useful, easy, and private.",
        },
        {
          id: "a5-q2",
          question: "Milk runs out every Thursday. Best AI-supported task?",
          options: [
            "Guess next year's profit",
            "Write a poem about milk",
            "Design a simple stock count sheet",
            "Clone a rival café's full menu",
          ],
          correctIndex: 2,
          explanation: "It hits the real problem this week.",
        },
        {
          id: "a5-q3",
          question: "A use case is ‘practical’ when…",
          options: [
            "It needs secret customer phone lists",
            "Only a huge company could try it in 3 years",
            "You can try it soon, with data you have, privately, with a human deciding",
            "AI posts it with no one looking",
          ],
          correctIndex: 2,
          explanation: "Four yes: soon, data we have, private, human decides.",
        },
        {
          id: "a5-q4",
          question: "AI in this lesson becomes…",
          options: [
            "A fifth business function",
            "A helper inside Finance, HR, Marketing, Operations",
            "The café owner",
            "The only decision maker",
          ],
          correctIndex: 1,
          explanation: "It does not replace the manager of that function.",
        },
      ],
      writing: [
        {
          id: "a5-w1",
          prompt: "Name one practical AI use for each of the four business functions.",
          modelAnswer:
            "Finance: summarise weekly totals with no names. HR: draft a day-1 checklist for a new cashier. Marketing: 10 honest captions for a student combo. Operations: put the morning setup in time order.",
        },
        {
          id: "a5-w2",
          prompt: "Explain the four-yes test for a practical use case.",
          modelAnswer:
            "Can we try it this week? Do we already have the data? Does it stay private? Does a human still decide? If all four are yes, it is practical.",
        },
      ],
    },
    {
      id: "find-problem",
      number: "L6",
      title: "Find the problem. Compare. Choose. Explain.",
      kicker: "Week 3 Lesson 6 · Do not start with the shiny tool",
      clo: "CLO 2",
      week: "Week 3",
      summary: "Name the real headache. Score useful / easy / value. Write why.",
      blocks: [
        {
          type: "steps",
          items: [
            "1. Real problem",
            "2. List 2–3 ideas",
            "3. Useful / easy / value",
            "4. Pick + why",
          ],
        },
        {
          type: "lead",
          text: "Here is a full story, told slowly. Noor owns a small café near University City. From four o'clock to seven o'clock the place is full of students. Mobile orders arrive. Drinks go to the wrong table. Guests complain. Noor is tired and says, ‘Just use AI and make us famous on TikTok.’",
        },
        {
          type: "figure",
          src: "/illustrations/peak.jpg",
          alt: "Peak-hour café counter with waiting cups and a supervisor watching the queue",
          caption: "Fame is not the headache. Mixed orders at peak time is the headache.",
        },
        {
          type: "p",
          text: "Stop. Fame is not the headache. The headache is mixed orders at peak time. If you skip this step, you will choose a shiny tool that does not fix the day. Lesson 6 is really a habit: name the real problem in one short sentence before you touch AI.",
        },
        {
          type: "p",
          text: "Then list two or three ideas. Score each idea with three words. Useful = does it touch THIS pain? Easy = can we do it soon with the people we have? Value = will guests or money improve in a way we can see? Pick one idea and say why the others lost.",
        },
        {
          type: "table",
          headers: ["Idea", "Useful for THIS pain?", "Easy?", "Business value?"],
          rows: [
            ["A. Funny reels all week", "Low", "Easy", "Likes, not fewer wrong cups"],
            ["B. Peak-hour checklist + call-back line", "High", "Easy", "Fewer mix-ups this week"],
            ["C. Camera that names every student", "Maybe later", "Hard + private", "Too heavy now"],
          ],
        },
        {
          type: "callout",
          kind: "exam",
          title: "How to write the reason",
          text: "Choose B. It touches the real problem, staff can start tomorrow, and no student faces are collected. That sentence is what the examiner wants. Use ordinary words.",
        },
      ],
      mcqs: [
        {
          id: "a6-q1",
          question: "In Noor's café, what is the MAIN problem?",
          options: [
            "The logo colour",
            "Mixed mobile orders at peak time",
            "Not enough TikTok dances",
            "The name of the dates",
          ],
          correctIndex: 1,
          explanation: "Start with the headache, not the owner's shiny idea.",
        },
        {
          id: "a6-q2",
          question: "Which use case scores best for useful + easy + value right now?",
          options: [
            "A camera that names every student",
            "Funny reels only",
            "A peak-hour checklist and call-back line",
            "Buying a robot chef",
          ],
          correctIndex: 2,
          explanation: "High usefulness, easy, clear value this week.",
        },
        {
          id: "a6-q3",
          question: "Why is ‘explain the reason’ part of the lesson?",
          options: [
            "Because long words get extra marks",
            "Because the teacher likes stories",
            "Because a choice without a reason is a guess",
            "Because AI must sign the paper",
          ],
          correctIndex: 2,
          explanation: "You must say why B beats A and C.",
        },
        {
          id: "a6-q4",
          question: "The four steps of this lesson are…",
          options: [
            "Post, boost, hide, delete",
            "Real problem → list ideas → score useful/easy/value → pick + why",
            "SWOT only",
            "Hire, fire, price, advert",
          ],
          correctIndex: 1,
          explanation: "Do not start with the shiny tool.",
        },
      ],
      writing: [
        {
          id: "a6-w1",
          prompt: "In Noor's café story, name the real problem and choose an idea. Write the reason the examiner wants.",
          modelAnswer:
            "The real problem is mixed mobile orders at peak time, not TikTok fame. I choose B — a peak-hour checklist and call-back line — because it touches the real problem, staff can start tomorrow, and no student faces are collected. Funny reels do not fix wrong cups. A naming camera is hard and private.",
          marks: [
            "Name the real problem in one short sentence",
            "Pick one idea and say why the others lost",
            "Useful + easy + value, in ordinary words",
          ],
        },
        {
          id: "a6-w2",
          prompt: "Score one of your own café ideas with useful / easy / value in three short lines.",
          modelAnswer:
            "Idea: a simple stock count sheet for Thursday milk. Useful: high — it hits the stock pain. Easy: high — staff can tick a paper tomorrow. Value: fewer sold-out drinks and less last-minute buying.",
        },
      ],
    },
    {
      id: "risks-traffic-lights",
      number: "L7",
      title: "Risks, limits, traffic lights",
      kicker: "Week 4 Lesson 7 · Low / medium / high · reduce risk",
      clo: "CLO 2",
      week: "Week 4",
      summary: "Green = skim. Amber = a person edits. Red = AI must not decide.",
      blocks: [
        {
          type: "cards",
          items: [
            { kicker: "1 LOW", title: "Easy to fix", body: "Little harm if it is wrong. Skim and use." },
            { kicker: "2 MEDIUM", title: "Human must edit", body: "A person edits first before it goes live." },
            { kicker: "3 HIGH", title: "AI must not decide", body: "Money, people, health, personal data, or a public ‘we are the best’ claim." },
          ],
        },
        {
          type: "lead",
          text: "A risk is not ‘AI is evil.’ A risk is ‘this answer can hurt a guest, a staff member, or the business if I trust it too fast.’",
        },
        {
          type: "figure",
          src: "/illustrations/intern.jpg",
          alt: "A student checking an AI poster draft with a red pen",
          caption: "Green = skim. Amber = a person edits. Red = AI must not decide.",
        },
        { type: "h", text: "Common risks when you use AI output in business" },
        {
          type: "table",
          headers: ["Risk", "What it looks like"],
          rows: [
            ["Wrong facts", "A made-up Sharjah rule or a fake award"],
            ["Out of date", "An offer from last year written as if it is today"],
            ["Bias", "It assumes every guest is the same kind of person"],
            ["Privacy leak", "A class list or customer Excel in the chat"],
            ["Over-trust", "The manager copies the answer onto a poster with no check"],
            ["Copying", "The line is too close to another café's slogan"],
            ["Tone miss", "A joke that feels rude in a family UAE setting"],
            ["No owner", "‘AI said so’ — nobody is accountable"],
          ],
        },
        { type: "h", text: "How limits change a real decision" },
        {
          type: "p",
          text: "Suppose you ask AI, ‘What should I charge for karak in Sharjah?’ It may invent a number. It cannot see today's milk cost, today's queue, or the café across the road. If you print that number on the board, the limit has become your pricing mistake. The fix is simple: use AI to list questions to think about, then you set the price from real costs.",
        },
        {
          type: "table",
          headers: ["Light", "Examples", "What you do"],
          rows: [
            ["Low", "Brainstorm captions. Make a revision quiz.", "Skim and use."],
            ["Medium", "Draft a rota. Draft a guest reply. Summarise YOUR totals.", "A person edits first."],
            ["High", "Price. Hire or fire. Medical claim. Personal data. ‘Best in the city’ advert.", "AI does not decide."],
          ],
        },
        { type: "h", text: "Reduce risk before you use the output" },
        {
          type: "list",
          items: [
            "Check every number.",
            "Take names and phones out.",
            "Ask one other person to read public text.",
            "Write DRAFT on the file until a manager says yes.",
            "Keep money and people decisions with a human.",
            "If you cannot explain the sentence, do not publish it.",
          ],
        },
      ],
      mcqs: [
        {
          id: "a7-q1",
          question: "Brainstorming 8 caption ideas is usually…",
          options: ["High risk", "Low risk", "Illegal", "A finance decision"],
          correctIndex: 1,
          explanation: "Easy to check. Little harm if one idea is weak.",
        },
        {
          id: "a7-q2",
          question: "Pasting CVs into ChatGPT to decide who to fire is…",
          options: ["Low risk", "Medium risk", "High risk — do not do this", "Fine if the English is good"],
          correctIndex: 2,
          explanation: "People + personal data + a life decision.",
        },
        {
          id: "a7-q3",
          question: "Which action reduces risk?",
          options: [
            "Auto-post every draft",
            "Leave customer names in the prompt",
            "Check facts and mark the file DRAFT until a person says yes",
            "Trust any number AI prints",
          ],
          correctIndex: 2,
          explanation: "Human gate before the output goes live.",
        },
        {
          id: "a7-q4",
          question: "High-risk examples include…",
          options: [
            "Revision quiz ideas",
            "Price, hire/fire, medical claim, personal data, ‘best in the city’ advert",
            "Brainstorming names for a meal deal",
            "Asking for 4 POLC bullets",
          ],
          correctIndex: 1,
          explanation: "AI must not decide those.",
        },
      ],
      writing: [
        {
          id: "a7-w1",
          prompt: "Explain low / medium / high risk with one example each.",
          modelAnswer:
            "Low: brainstorm 8 captions — skim and use. Medium: draft a guest reply — a person edits first. High: paste CVs to decide who to fire — AI must not decide; people, data and a life choice.",
        },
        {
          id: "a7-w2",
          prompt: "AI invents a karak price for Sharjah. How did the limit become a bad decision, and what is the fix?",
          modelAnswer:
            "The limit is that AI cannot see today's milk cost, queue, or the café next door. If you print the invented number, the limit becomes your pricing mistake. Fix: use AI to list questions to think about, then set the price from real costs.",
        },
      ],
    },
    {
      id: "responsible-use",
      number: "L8",
      title: "Responsible use + review",
      kicker: "Week 4 Lesson 8 · Safe vs unsafe · checklist · Weeks 1–4",
      clo: "CLO 2",
      week: "Week 4",
      summary: "At school AI is a tutor. At work AI is a junior assistant. A named person still signs.",
      blocks: [
        {
          type: "lead",
          text: "Responsible use is not a new tool. It is the same habit in two places. At school, AI is a tutor. You still open the slides. You still write. You can still explain the idea if a teacher asks. At work, AI is a junior assistant. A named person reads the draft and takes responsibility. In both places, hiding the help is how good use turns into not-good use.",
        },
        {
          type: "figure",
          src: "/illustrations/compare.jpg",
          alt: "Two notebooks side by side on a study desk",
          caption: "You still write. A named person still signs. AI stays the intern.",
        },
        {
          type: "p",
          text: "Safe versus unsafe is usually obvious if you say the prompt out loud. ‘Explain matrix structure’ is safe. ‘Here is the customer Excel, blast WhatsApp’ is unsafe. If the sentence contains an ID, a password, a phone list, a fake review, or ‘hide that you helped,’ put the phone down.",
        },
        {
          type: "cards",
          items: [
            {
              title: "Safe",
              body: "Explain matrix structure in simple words. Draft 5 captions — I pick and edit. Totals with no names: which day was slow? List the risks of this idea.",
            },
            {
              title: "Unsafe",
              body: "Write my whole assessment and hide it. 20 fake Google reviews. Customer Excel → WhatsApp blast. Here is my password / Emirates ID.",
            },
          ],
        },
        { type: "h", text: "The famous weak prompt, repaired" },
        {
          type: "p",
          text: "‘Give me the idea of the best café in Sharjah’ fails for three calm reasons. It is vague, so the answer is wallpaper. It invites copying a real café. And the word ‘best’ can slide into a false advert.",
        },
        {
          type: "cards",
          items: [
            {
              kicker: "Weak",
              title: "Give me the idea of the best café in Sharjah.",
              body: "Vague. Invites copying. ‘Best’ with no proof.",
            },
            {
              kicker: "Responsible",
              title: "Study café near University City",
              body: "For HCT students, modest budget. 6 original ideas, no named copies. Each idea: 3 items, 1 risk, 1 honest caption.",
            },
          ],
        },
        { type: "h", text: "Responsible-use checklist — tick every time" },
        {
          type: "list",
          items: [
            "Purpose: coach or draft — not replace me?",
            "Prompt: role + task + place + rules + format?",
            "Data: no ID, phone, list, or password?",
            "Truth: can I check the facts?",
            "Honesty: would I tell my teacher or manager?",
            "Risk light: low, medium, or high?",
            "Next step: I edit. I do not paste-and-post.",
          ],
        },
        {
          type: "callout",
          kind: "exam",
          title: "Assessment 1 in one line",
          text: "They are not only testing if you can open ChatGPT. They are testing if you can tell good use from not-good use, write a clear prompt, judge the output, and stay responsible.",
        },
        {
          type: "callout",
          kind: "remember",
          title: "One sentence for the whole course",
          text: "AI is a fast intern. You are the supervisor. If you would not say it to a teacher, a customer, or a manager, do not let AI say it.",
        },
      ],
      mcqs: [
        {
          id: "a8-q1",
          question: "‘Here is our customer Excel with phone numbers. Write a WhatsApp blast.’ This is…",
          options: [
            "Safe, because it is marketing",
            "Safe if you say please",
            "Unsafe — personal data + spam",
            "Required by every café",
          ],
          correctIndex: 2,
          explanation: "Never paste a personal list into a public chatbot.",
        },
        {
          id: "a8-q2",
          question: "Responsible AI at school means…",
          options: [
            "AI writes the paper and you submit it",
            "AI coaches, and you can still explain the work",
            "You hide all AI use always",
            "You stop reading the slides",
          ],
          correctIndex: 1,
          explanation: "You still own the learning.",
        },
        {
          id: "a8-q3",
          question: "Which prompt is more responsible?",
          options: [
            "Give me the idea of the best café in Sharjah.",
            "Copy Café X's menu 90%.",
            "6 original study-café ideas near University City. No named copies. No fake awards.",
            "Say we won a ministry prize.",
          ],
          correctIndex: 2,
          explanation: "Clear place, original ideas, no false claim.",
        },
        {
          id: "a8-q4",
          question: "Hiding that AI helped is how…",
          options: [
            "You get extra marks",
            "Good use turns into not-good use",
            "Risk becomes low",
            "A prompt becomes SMART",
          ],
          correctIndex: 1,
          explanation: "Honesty with teacher or manager is on the checklist.",
        },
      ],
      writing: [
        {
          id: "a8-w1",
          prompt: "Repair this weak prompt: ‘Give me the idea of the best café in Sharjah.’ Explain the three problems first.",
          modelAnswer:
            "Problems: it is vague (wallpaper answers), it invites copying a real café, and ‘best’ can become a false advert. Repaired: Study café near University City for HCT students, modest budget. Give 6 original ideas, no named copies. Each idea: 3 items, 1 risk, 1 honest caption.",
        },
        {
          id: "a8-w2",
          prompt: "Write the responsible-use checklist in your own short lines (at least 5 ticks).",
          modelAnswer:
            "Purpose is coach or draft, not replace me. Prompt has role, task, place, rules, format. No ID, phone, list or password. I can check the facts. I would tell my teacher or manager. I know the risk light. I edit — I do not paste-and-post.",
        },
      ],
    },
  ],
  finalExam: {
    intro:
      "Assessment 1 style paper. Eighteen mixed MCQs (one or two from each lesson) plus five short writings. New stories — Fatima, Yusuf, Aisha — not copies of the lesson quizzes. After you submit, every letter and every writing model opens.",
    mcqs: [
      {
        id: "af-q1",
        tag: "L2 · intern",
        question: "Fatima asks AI to draft a Thursday staff briefing. What is AI doing well here?",
        options: [
          "Writing a first version she can still edit",
          "Visiting University City to count cashiers",
          "Taking legal blame if the invite is wrong",
          "Replacing Fatima as the supervisor",
        ],
        correctIndex: 0,
        explanation: "Drafting is the intern job. Live eyes, blame and the final stamp stay with Fatima.",
      },
      {
        id: "af-q2",
        tag: "L2 · old news",
        question: "In September, AI writes ‘Ramadan combo starts tomorrow’ for a Sharjah café. This limit is mainly…",
        options: [
          "It cannot brainstorm names",
          "It always visits the mall",
          "Old news — it may not know this week",
          "It takes the blame for you",
        ],
        correctIndex: 2,
        explanation: "A limit is a thing AI is not good at. Dates go stale. Check the calendar yourself.",
      },
      {
        id: "af-q3",
        tag: "L2 · risk",
        question: "AI wrote ‘service is always fast.’ There is one cashier and a 20-minute queue. The RISK is…",
        options: [
          "The intern cannot summarise a list",
          "A grammar mark",
          "A SWOT threat",
          "You print the line and guests wait",
        ],
        correctIndex: 3,
        explanation: "A limit is ‘no live eyes.’ The risk is trusting it anyway and putting the lie on a poster.",
      },
      {
        id: "af-q4",
        tag: "L2 · gates",
        question: "Gate 3 of the simple human check asks…",
        options: [
          "Are names, IDs and phones out of the prompt?",
          "Is the English famous like a global brand?",
          "Did AI visit the mall today?",
          "Can AI sign the paper for you?",
        ],
        correctIndex: 0,
        explanation: "The six gates: real job · source · no IDs · would I say it · human deciding · can I explain it.",
      },
      {
        id: "af-q5",
        tag: "L3 · school",
        question: "Yusuf uses AI to quiz him on SWOT, then closes the chat and teaches Aisha. This is…",
        options: [
          "Not-good — he should paste her file",
          "Good school use — AI coaches, he still thinks",
          "A high-risk hiring decision",
          "A finance payment",
        ],
        correctIndex: 1,
        explanation: "If he can say it with the chat closed, he learned it. AI is a tutor, not the student.",
      },
      {
        id: "af-q6",
        tag: "L3 · prompt",
        question: "Which is NOT one of the five pieces of a clear learning prompt?",
        options: [
          "Role (who the tutor is)",
          "Topic and level",
          "Format and a rule",
          "A class phone list ‘to make it personal’",
        ],
        correctIndex: 3,
        explanation: "Role, topic, level, format, rule. Private lists are a privacy fail, not a prompt piece.",
      },
      {
        id: "af-q7",
        tag: "L4 · rooms",
        question: "Aisha asks AI for three kind replies to ‘Where is my order?’ That belongs in…",
        options: ["Finance", "IT security", "Customer service", "Holding-company tax"],
        correctIndex: 2,
        explanation: "Guest replies sit in customer service. Finance would explain totals. Do not mix the rooms.",
      },
      {
        id: "af-q8",
        tag: "L4 · lights",
        question: "A draft mixes visa law with a National Day caption. Which judgement light fails first?",
        options: [
          "Clear — the wrong department is mixed in",
          "Useful — because the English is nice",
          "Only the font size",
          "None — post it",
        ],
        correctIndex: 0,
        explanation: "Clear = right department, short sentences. Mixing HR/law into marketing is a muddy paragraph.",
      },
      {
        id: "af-q9",
        tag: "L5 · HR",
        question: "Forty CVs sit on the desk. A practical HR use of AI is…",
        options: [
          "Pick winners from names and photos only",
          "A first-sort checklist (food-safety card), then a human looks",
          "Auto-fire the slowest worker",
          "Invent next year’s profit to the fils",
        ],
        correctIndex: 1,
        explanation: "A small, honest job. Hire/fire from a chatbot ranking is red. Profit guessing is not HR.",
      },
      {
        id: "af-q10",
        tag: "L5 · four yes",
        question: "The four-yes test for a practical use case fails when…",
        options: [
          "You can try it this week",
          "You already have the data",
          "A human still decides",
          "Only a huge firm could try it in three years",
        ],
        correctIndex: 3,
        explanation: "Practical = soon + data we have + private + a human decides. A three-year mega-project is not that.",
      },
      {
        id: "af-q11",
        tag: "L6 · problem",
        question: "Opening is slow and guests wait. The owner says ‘buy a robot chef.’ The MAIN problem is…",
        options: [
          "Opening is slow, so guests wait",
          "The logo colour",
          "Not enough TikTok dances",
          "The name of the dates on the menu",
        ],
        correctIndex: 0,
        explanation: "Start with the headache, not the shiny tool. A robot does not fix tomorrow’s opening checklist.",
      },
      {
        id: "af-q12",
        tag: "L6 · choose",
        question: "The café is noisy after 6pm. Which idea scores best for useful + easy + value THIS week?",
        options: [
          "Fake Google reviews that say ‘so silent’",
          "A camera that names every student at the door",
          "Six quiet-hour ideas the team can discuss tomorrow",
          "Clone Café X’s full menu",
        ],
        correctIndex: 2,
        explanation: "It touches THIS pain, staff can start, no faces, no lies. Fake reviews are red. Cameras are hard + private.",
      },
      {
        id: "af-q13",
        tag: "L7 · price",
        question: "AI is asked ‘What should I charge for karak?’ and invents AED 4. If you print that number, the limit became…",
        options: [
          "A green caption",
          "Your pricing mistake",
          "A mission statement",
          "Bounded rationality",
        ],
        correctIndex: 1,
        explanation: "AI cannot see today’s milk cost or the café across the road. List questions, then YOU set the price.",
      },
      {
        id: "af-q14",
        tag: "L7 · amber",
        question: "Drafting a guest reply that a supervisor will edit before sending is usually…",
        options: [
          "Green — auto-send it",
          "Red — AI must fire someone",
          "Amber — a person edits first",
          "Illegal in the UAE",
        ],
        correctIndex: 2,
        explanation: "Amber = human must edit. Green = skim captions/quizzes. Red = price, hire/fire, data, public ‘#1’.",
      },
      {
        id: "af-q15",
        tag: "L7 · reduce",
        question: "Which move REDUCES risk before a poster goes live?",
        options: [
          "Write DRAFT on the file until a manager says yes",
          "Auto-post every draft",
          "Leave customer names in the prompt",
          "Trust any number AI prints",
        ],
        correctIndex: 0,
        explanation: "Check numbers, strip names, a second pair of eyes, DRAFT until yes, humans keep money and people.",
      },
      {
        id: "af-q16",
        tag: "L8 · unsafe",
        question: "‘Write 20 fake Google reviews for our café’ is…",
        options: [
          "Safe tutoring",
          "A green finance total",
          "Required by the PDPL",
          "Unsafe — a false public claim",
        ],
        correctIndex: 3,
        explanation: "Fake reviews are a public lie. Safe: explain a slide, draft captions you will edit, totals with no names.",
      },
      {
        id: "af-q17",
        tag: "L8 · two desks",
        question: "At school AI is a tutor. At work AI is…",
        options: [
          "The owner",
          "A junior assistant — a named person still signs",
          "The company’s lawyer",
          "Allowed to hide all help",
        ],
        correctIndex: 1,
        explanation: "Two desks, one habit. Hiding the help is how good use turns into not-good use.",
      },
      {
        id: "af-q18",
        tag: "L8 · checklist",
        question: "The responsible-use checklist includes all EXCEPT…",
        options: [
          "No ID, phone, list or password in the prompt",
          "I can check the facts",
          "Paste-and-post with no edit",
          "I would tell my teacher or manager",
        ],
        correctIndex: 2,
        explanation: "Purpose, prompt, data, truth, honesty, risk light — then YOU edit. Paste-and-post is the opposite.",
      },
    ],
    writing: [
      {
        id: "af-w1",
        prompt:
          "In three short sentences: (1) the intern metaphor, (2) one job AI can do in a café, (3) one thing it cannot do on its own.",
        modelAnswer:
          "AI is a fast intern that has read a huge pile of text but has never stood in your shop. It can draft a Thursday briefing or 12 names for a student meal deal. It cannot see today’s queue, taste the karak, or take the blame — you stay the supervisor.",
        marks: [
          "Intern drafts, you check",
          "One real CAN job (draft, list, brainstorm, summarise)",
          "One CANNOT (live eyes, taste, blame)",
        ],
      },
      {
        id: "af-w2",
        prompt:
          "Yusuf wants to study POLC with AI. Write a 5-piece learning prompt. Then write one not-good school use of the same topic.",
        modelAnswer:
          "Act as a kind HCT tutor. Topic: POLC. Level: first year. Format: four bullets and one UAE café example each. Rule: do not write my assignment; then ask me 1 question. Not-good: ‘Write my whole POLC essay and hide that you helped.’",
        marks: [
          "Role, topic, level, format, rule",
          "A café / UAE example is asked",
          "Not-good = replace the student or hide the help",
        ],
      },
      {
        id: "af-w3",
        prompt:
          "Aisha’s café is noisy after 6pm. She wants fake five-star reviews that say it is silent. Name the real problem. Score A (fake silent reviews), B (six quiet-hour ideas for the team), C (a camera that names students). Pick one and say why the others lost, using useful / easy / value.",
        modelAnswer:
          "The real problem is noise after 6pm, not fame. Choose B: it is useful for THIS pain, easy to discuss tomorrow, and honest. A is a public lie (high risk, not useful). C may help later but is hard and collects faces.",
        marks: [
          "Name noise after 6pm, not reviews",
          "Pick B",
          "Score the losers with useful / easy / value",
        ],
      },
      {
        id: "af-w4",
        prompt:
          "Give one green, one amber and one red GenAI use in a campus café. Say in one line what you do at each light. Then name two moves that reduce risk.",
        modelAnswer:
          "Green: 8 caption ideas — skim and pick. Amber: a guest reply — a supervisor edits, then sends. Red: set the karak price from an invented number, or paste CVs to fire someone — AI must not decide. Reduce risk: write DRAFT until a manager says yes; take names and phones out of the prompt.",
        marks: [
          "Green = skim",
          "Amber = human edits",
          "Red = people / money / data / public claim, plus two reduce-risk moves",
        ],
      },
      {
        id: "af-w5",
        prompt:
          "Repair this weak prompt: ‘Help me with marketing so we are the best in the UAE. Here is the customer Excel.’ First name three problems. Then write a responsible 5-piece prompt.",
        modelAnswer:
          "Problems: vague (‘help me’), false ‘best’ claim, and a customer Excel (phones / names). Repaired: Act as a café supervisor in University City. Task: 6 original student-combo captions, modest budget. Format: each caption 8 words, 1 risk. Rule: no named copies, no fake awards, no IDs or phone lists. I will edit before posting.",
        marks: [
          "Vague + false ‘best’ + personal data",
          "Role, task, place, format, rule",
          "No Excel / IDs and no fake prize",
        ],
      },
    ],
  },
  summarySheet: {
    title: "Pocket recap",
    intro: "Read this the night before Assessment 1. One lesson, one sentence.",
    rows: [
      { idea: "L2", remember: "AI drafts. You check with 6 gates before you use it." },
      { idea: "L3", remember: "AI is a tutor, not the student who submits the paper." },
      { idea: "L4", remember: "Put the tool in the right department. Useful + clear + responsible." },
      { idea: "L5", remember: "Each function has a practical AI job. Four yes = practical." },
      { idea: "L6", remember: "Name the real problem. Score useful / easy / value. Explain why." },
      { idea: "L7", remember: "Low / medium / high. High = people, money, data, public claims." },
      { idea: "L8", remember: "Safe prompt. No sensitive data. Human still signs." },
      { idea: "Whole course", remember: "AI is a fast intern. You are the supervisor." },
    ],
    closing:
      "Study kindly. Look at the pictures in your head. Do the questions. If you can teach the answer to a friend, you are ready.",
  },
};
