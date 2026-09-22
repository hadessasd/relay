import { bus1023ExamModules } from "./bus-1023-exams";
import type { Course, Mcq, Topic, WorkLine, WorkPart } from "./types";

function n(
  id: string,
  tag: string,
  question: string,
  numericAnswer: number,
  explanation: string,
  hint: string,
  hintAr: string,
  extra: Partial<Mcq> = {},
): Mcq {
  return {
    id,
    tag,
    question,
    options: [],
    correctIndex: 0,
    numericAnswer,
    explanation,
    hint,
    hintAr,
    ...extra,
    tolerance: extra.tolerance ?? 0.01,
    frqAnswer: extra.frqAnswer ?? explanation,
  };
}

function choice(
  id: string,
  tag: string,
  question: string,
  options: string[],
  correctIndex: number,
  explanation: string,
  hint: string,
  hintAr: string,
  extra: Partial<Mcq> = {},
): Mcq {
  return { id, tag, question, options, correctIndex, explanation, hint, hintAr, ...extra };
}

function L(lhs: string | undefined, rhs: string, note?: string, ar?: string): WorkLine {
  return { lhs, rhs, note, ar };
}

function part(label: string, ask: string, askAr: string, lines: WorkLine[], answer: string, answerAr: string): WorkPart {
  return { label, ask, askAr, lines, answer, answerAr };
}

const topics: Topic[] = [
{
id: "clo-1-1",
      number: "1.1",
      title: "Statistical terms and types of data",
      kicker: "Population · sample · qualitative · discrete",
      clo: "CLO 1",
      week: "Week 1",
      summary: "Statistics collects, organizes and concludes. Know population vs sample, qualitative vs quantitative, discrete vs continuous.",
      blocks: [
        {
          type: "lead",
          text: "Statistics is three jobs: collect data, organize and analyze it, then draw a conclusion. A mill that makes a million cereal boxes a day cannot open every box — so it samples 50 or 100."
        },
        {
          type: "figure",
          src: "/illustrations/math.jpg",
          alt: "Calculator, graph paper and AED coins on a sunlit HCT desk",
          caption: "BUS 1023 lives on paper, a Casio, and the class examples."
        },
        {
          type: "callout",
          kind: "formula",
          title: "Population vs sample",
          text: "Population = every member of the group you care about. Sample = the members you actually measured.",
          ar: "المجتمع = كل المجموعة التي تريد معرفتها. العينة = الأفراد الذين أخذت بياناتهم فعلاً."
        },
        {
          type: "ar",
          text: "مثال اتصالات: المجتمع = موظفو كل شركات الشارقة. العينة = موظفو 30 شركة اختارتها اتصالات. لماذا العينة؟ لأن سؤال كل موظف في الشارقة يأخذ وقتاً طويلاً."
        },
        {
          type: "h",
          text: "Qualitative or quantitative?"
        },
        {
          type: "p",
          text: "Quantitative = a number that measures amount (kg, %, km). Qualitative = a quality or label (cloudy, nationality, a student ID)."
        },
        {
          type: "ar",
          text: "كمي = رقم يقيس كمية. نوعي = صفة أو اسم، حتى لو كُتب بأرقام مثل الرقم الجامعي."
        },
        {
          type: "table",
          caption: "From the CLO 1.1 slides — say the type out loud",
          headers: [
            "Data",
            "Type",
            "Why"
          ],
          rows: [
            [
              "The weather today is cloudy",
              "Qualitative",
              "A quality, not a count"
            ],
            [
              "Average weight of Diploma students is 60 kg",
              "Quantitative",
              "A measurement"
            ],
            [
              "Student number H000482190",
              "Qualitative",
              "An ID label — digits are not a measurement"
            ],
            [
              "Average score on a maths test is 77%",
              "Quantitative",
              "A score"
            ],
            [
              "Most students in the class like mathematics",
              "Qualitative",
              "An opinion / category"
            ]
          ]
        },
        {
          type: "h",
          text: "Discrete or continuous?"
        },
        {
          type: "cards",
          items: [{
            kicker: "Count",
            title: "Discrete",
            body: "The result of counting something. Always a whole number: students in a class, pens in the supply room, pizzas sold last week.",
            ar: "منفصل = نعدّه. دائماً عدد صحيح: طلاب، أقلام، بيتزا."
          }, {
            kicker: "Measure",
            title: "Continuous",
            body: "Measured, and it can change over time — including decimals: height, minutes for a test, km from Abu Dhabi to Dubai, capacity of a glass.",
            ar: "متصل = نقيسه، ويمكن أن يتغير: الطول، الوقت، المسافة، سعة الكأس."
          }]
        },
        {
          type: "table",
          caption: "CLO 1.1 examples — count or measure?",
          headers: [
            "Variable",
            "Kind",
            "Because"
          ],
          rows: [
            [
              "Weight of a chicken",
              "Continuous",
              "Measured, can be 2.3 kg"
            ],
            [
              "Pizzas sold last week",
              "Discrete",
              "Counted whole pizzas"
            ],
            [
              "Number of teachers at RKW",
              "Discrete",
              "Counted people"
            ],
            [
              "Capacity of a water glass",
              "Continuous",
              "Measured millilitres"
            ]
          ]
        },
        {
          type: "callout",
          kind: "trap",
          title: "Exam trap",
          text: "A student number looks numeric. It is still qualitative. You cannot average two HCT IDs.",
          ar: "الرقم الجامعي يبدو رقماً لكنه نوعي. لا تُحسب له متوسط."
        }
      ],
      mcqs: [
        choice("c11-q1", "CLO 1.1", "DEWA wants the view of every Dubai villa owner. Staff visit 40 villas only. Every Dubai villa owner is the…", [
          "Sample",
          "Population",
          "Tally",
          "Mode"
        ], 1, "Population = the whole group you care about: every Dubai villa owner. The 40 villas they actually visit are the sample. The 40 are not the population.", "Whole group you care about, or the villas they actually visited?", "كل المجموعة التي نريد معرفتها، أم الفلل التي زاروها فعلاً؟", { explanationAr: "المجتمع = كل أصحاب فلل دبي. العينة = 40 فيلا زاروها. الـ 40 ليست المجتمع." }),
        choice("c11-q2", "CLO 1.1", "Number of laptops in an HCT computer lab is…", [
          "Continuous",
          "Discrete",
          "Qualitative",
          "A pie slice"
        ], 1, "You count whole laptops: 24, 25, 26… never 24.7 laptops. Discrete is a count. Continuous would be the weight of a laptop in kg (that can be 1.8).", "Did you count whole laptops, or weigh them?", "هل عددت أجهزة كاملة، أم وزنتها؟", { explanationAr: "عدد الأجهزة نتيجة عدّ، فهو منفصل. وزن الجهاز بالكجم متصل لأن القيمة يمكن أن تكون 1.8." }),
        n("c11-q3", "CLO 1.1", "RAK campus has 3,200 students. A researcher interviews 80 of them. How many students are in the sample?", 80, "The 3,200 students are the population. The researcher only interviews 80. Sample size = 80. Do not write 3,200.", "Sample = the students they actually interviewed.", "العينة = الطلبة الذين قوبلوا فعلاً.", {
          unit: "students",
          tolerance: 0,
          explanationAr: "المجتمع = 3200 طالب. العينة = 80. الجواب 80 وليس 3200."
        })
      ],
      writing: [{
        id: "c11-w1",
        prompt: "Read the café bar chart. (a) Is “number of karak cups” discrete or continuous? One sentence. (b) Is “temperature of the karak in °C” discrete or continuous? One sentence. (c) Is “the name of the drink” qualitative or quantitative? One sentence.",
        modelAnswer: "(a) Discrete — you count whole cups: 14 karak, never 14.3 cups. (b) Continuous — temperature is measured and can be 72.4 °C. (c) Qualitative — “karak / juice / water” is a label, not a number.",
        hint: "Count = discrete. Measure (with decimals) = continuous. A name = qualitative.",
        hintAr: "العدّ = منفصل. القياس (ويمكن أن يكون عشرياً) = متصل. الاسم = نوعي.",
        marks: [
          "Karak cups: discrete, with a count example",
          "Temperature: continuous, with a decimal example",
          "Drink name: qualitative"
        ],
        chart: {
          kind: "bar",
          title: "HCT RAK café · items sold Tuesday",
          unit: "items",
          bars: [
            {
              label: "Karak",
              value: 14
            },
            {
              label: "Water",
              value: 9
            },
            {
              label: "Juice",
              value: 6
            },
            {
              label: "Cake",
              value: 4
            }
          ]
        }
      }]
    },
    {
      id: "clo-1-2",
      number: "1.2",
      title: "Frequency distributions",
      kicker: "Categorical · grouped · ungrouped",
      clo: "CLO 1",
      week: "Week 1",
      summary: "Tally categories, or group numbers into classes. Class width always rounds up. Boundaries are limit ± 0.5.",
      blocks: [
        {
          type: "lead",
          text: "Frequency is how often something happens. Easy picture: Sam played football Saturday morning, Saturday afternoon and Sunday afternoon — that is 3 sessions, so the frequency is 3."
        },
        {
          type: "ar",
          text: "التكرار = كم مرة يحدث الشيء. سام لعب 3 مرات، فالتكرار = 3."
        },
        {
          type: "callout",
          kind: "remember",
          title: "Three tables",
          text: "Categorical (colours, blood type, major). Grouped (large range — classes more than one unit wide). Ungrouped (small range — each value is its own class).",
          ar: "النوعي للألوان والأسماء. المجمّع إذا كان المدى كبيراً. غير المجمّع إذا كان المدى صغيراً وكل قيمة فئة وحدها."
        },
        {
          type: "h",
          text: "Categorical: 15 favourite colours"
        },
        {
          type: "steps",
          items: [
            "Make three columns: Class, Tally, Frequency.",
            "Tally each colour. On the fifth mark, draw a line through the first four.",
            "Count the tallies. Check the total is 15."
          ],
          ar: [
            "ثلاثة أعمدة: الفئة، العلامات، التكرار.",
            "ضع علامة لكل لون. عند الخامسة ارسم خطاً على الأربع.",
            "عدّ العلامات. المجموع يجب أن يكون 15."
          ]
        },
        {
          type: "table",
          caption: "Favourite colours of 15 Year-2 students",
          headers: [
            "Class",
            "Tally",
            "Frequency"
          ],
          rows: [
            [
              "Red",
              "|||| |",
              "6"
            ],
            [
              "Blue",
              "|||",
              "3"
            ],
            [
              "Green",
              "||||",
              "4"
            ],
            [
              "Yellow",
              "||",
              "2"
            ]
          ],
          footer: [
            "Total",
            "",
            "15"
          ]
        },
        {
          type: "h",
          text: "Grouped data"
        },
        {
          type: "work",
          question: "A lecturer listed the temperatures of 30 states. The smallest temperature is 67°F and the largest is 125°F. Group the data into 5 classes.",
          parts: [
            {
              label: "(a) Range",
              ask: "Find the range.",
              askAr: "أوجد المدى.",
              lines: [
                {
                  lhs: "max",
                  rhs: "125",
                  note: "largest temperature in the list",
                  ar: "الأكبر = 125 (أسخن ولاية)"
                },
                {
                  lhs: "min",
                  rhs: "67",
                  note: "smallest temperature in the list",
                  ar: "الأصغر = 67 (أبرد ولاية)"
                },
                {
                  lhs: "range",
                  rhs: "max − min",
                  ar: "المدى = الأكبر − الأصغر"
                },
                {
                  lhs: "",
                  rhs: "125 − 67",
                  ar: "125 − 67"
                },
                {
                  lhs: "",
                  rhs: "58",
                  ar: "58"
                }
              ],
              answer: "Range = 58°F.",
              answerAr: "المدى = 58°F."
            },
            {
              label: "(b) Class width",
              ask: "Find the class width.",
              askAr: "أوجد عرض الفئة.",
              lines: [
                {
                  lhs: "width",
                  rhs: "range ÷ classes",
                  ar: "العرض = المدى ÷ عدد الفئات"
                },
                {
                  lhs: "",
                  rhs: "58 ÷ 5",
                  ar: "58 ÷ 5"
                },
                {
                  lhs: "",
                  rhs: "11.6",
                  ar: "11.6"
                },
                {
                  lhs: "",
                  op: "→",
                  rhs: "12",
                  note: "always round UP, never down",
                  ar: "دائماً قرّب للأعلى، ليس للأسفل"
                }
              ],
              answer: "Class width = 12. (11 would stop short of 125.)",
              answerAr: "عرض الفئة = 12. (لو أخذنا 11 لا نصل إلى 125.)"
            },
            {
              label: "(c) Class limits",
              ask: "Write the five class limits.",
              askAr: "اكتب حدود الفئات الخمس.",
              lines: [
                {
                  lhs: "start",
                  rhs: "67",
                  note: "begin at the smallest",
                  ar: "ابدأ من الأصغر 67"
                },
                {
                  lhs: "add",
                  rhs: "12 each time",
                  ar: "أضف 12 في كل مرة"
                },
                {
                  lhs: "lower",
                  rhs: "67, 79, 91, 103, 115",
                  ar: "الحدود الدنيا = 67، 79، 91، 103، 115"
                },
                {
                  lhs: "upper",
                  rhs: "next lower − 1",
                  ar: "الحد الأعلى = الحد الأدنى التالي − 1"
                },
                {
                  lhs: "classes",
                  rhs: "67–78, 79–90, 91–102, 103–114, 115–126",
                  ar: "الفئات: 67–78، 79–90، 91–102، 103–114، 115–126"
                }
              ],
              answer: "Last class 115–126 covers 125.",
              answerAr: "الفئة الأخيرة 115–126 تغطي 125."
            }
          ]
        },
        {
          type: "table",
          caption: "Finished table · 30 temperatures · width 12",
          headers: [
            "Class limits",
            "Boundaries",
            "Frequency"
          ],
          rows: [
            [
              "67–78",
              "66.5–78.5",
              "3"
            ],
            [
              "79–90",
              "78.5–90.5",
              "5"
            ],
            [
              "91–102",
              "90.5–102.5",
              "8"
            ],
            [
              "103–114",
              "102.5–114.5",
              "9"
            ],
            [
              "115–126",
              "114.5–126.5",
              "5"
            ]
          ],
          footer: [
            "Total",
            "",
            "30"
          ],
          emphasis: [3]
        },
        {
          type: "work",
          question: "Using the finished table of 30 temperatures (width 12):",
          parts: [
            {
              label: "(a) At most 90°",
              ask: "How many states are at most 90°?",
              askAr: "كم ولاية حرارتها على الأكثر 90°؟",
              lines: [
                {
                  lhs: "means",
                  rhs: "90 or colder",
                  ar: "يعني 90 أو أبرد"
                },
                {
                  lhs: "classes",
                  rhs: "67–78 and 79–90",
                  ar: "الفئتان 67–78 و 79–90"
                },
                {
                  lhs: "f",
                  rhs: "3 + 5",
                  ar: "3 + 5"
                },
                {
                  lhs: "",
                  rhs: "8",
                  ar: "8"
                }
              ],
              answer: "8 states.",
              answerAr: "8 ولايات."
            },
            {
              label: "(b) At least 103°",
              ask: "How many are at least 103°?",
              askAr: "كم ولاية على الأقل 103°؟",
              lines: [
                {
                  lhs: "means",
                  rhs: "103 or hotter",
                  ar: "يعني 103 أو أسخن"
                },
                {
                  lhs: "classes",
                  rhs: "103–114 and 115–126",
                  ar: "الفئتان 103–114 و 115–126"
                },
                {
                  lhs: "f",
                  rhs: "9 + 5",
                  ar: "9 + 5"
                },
                {
                  lhs: "",
                  rhs: "14",
                  ar: "14"
                }
              ],
              answer: "14 states.",
              answerAr: "14 ولاية."
            },
            {
              label: "(c) Lower boundary of 67–78",
              ask: "What is the lower class boundary of 67–78?",
              askAr: "ما الحد الحقيقي الأدنى للفئة 67–78؟",
              lines: [
                {
                  lhs: "limit",
                  rhs: "67",
                  ar: "الحد المكتوب = 67"
                },
                {
                  lhs: "boundary",
                  rhs: "limit − 0.5",
                  ar: "الحد الحقيقي = الحد − 0.5"
                },
                {
                  lhs: "",
                  rhs: "67 − 0.5",
                  ar: "67 − 0.5"
                },
                {
                  lhs: "",
                  rhs: "66.5",
                  ar: "66.5"
                }
              ],
              answer: "66.5. (Upper = 78 + 0.5 = 78.5.)",
              answerAr: "66.5. (الأعلى = 78 + 0.5 = 78.5.)"
            }
          ]
        },
        {
          type: "h",
          text: "Ungrouped dog ages (20 dogs, ages 3 to 9)"
        },
        {
          type: "p",
          text: "The range here is tiny (9 − 3 = 6), so each age is its own class — that is ungrouped. From the lecture: the age with the least frequency is 6 (the answer is the age, not the tally). Ten dogs are 5 or younger. Fourteen dogs are at least 5."
        },
        {
          type: "ar",
          text: "غير المجمّع: كل عمر فئة وحدها لأن المدى صغير. أقل تكرار عند العمر 6 (الجواب هو العمر لا العدد). 10 كلاب عمرها 5 أو أقل. 14 كلباً عمرهم 5 على الأقل."
        }
      ],
      mcqs: [
        n("c12-q1", "CLO 1.2", "HCT printing lab: shortest job 22 minutes, longest 91 minutes, 5 classes. Class width?", 14, "Min = 22 (shortest job). Max = 91 (longest job). Range = 91 − 22 = 69. Width = 69 ÷ 5 = 13.8, always round UP → 14.", "Longest minus shortest, divide by 5, round UP.", "الأطول ناقص الأقصر، اقسم على 5، ثم قرّب للأعلى.", {
          tolerance: 0,
          explanationAr: "min = 22، max = 91. المدى = 91 − 22 = 69. العرض = 69 ÷ 5 = 13.8 → 14."
        }),
        n("c12-q2", "CLO 1.2", "HCT quiz minutes: 10–19 (f=4), 20–29 (7), 30–39 (11), 40–49 (6), 50–59 (2). How many students took at most 29 minutes?", 11, "At most 29 = 29 or less. That is 10–19 and 20–29. 4 + 7 = 11. Do not add 30–39.", "Add the classes that stop at 29 or below.", "اجمع الفئات التي تقف عند 29 أو أقل.", {
          tolerance: 0,
          explanationAr: "على الأكثر 29 = 10–19 (4) + 20–29 (7) = 11. لا تضف 30–39."
        }),
        n("c12-q3", "CLO 1.2", "Lower class boundary of the class 20–29?", 19.5, "Written limits are 20 and 29. Lower boundary = 20 − 0.5 = 19.5. Upper would be 29 + 0.5 = 29.5.", "Lower boundary = lower limit minus 0.5.", "الحد الحقيقي الأدنى = الحد الأدنى − 0.5.", {
          tolerance: .01,
          explanationAr: "20 − 0.5 = 19.5. الأعلى = 29 + 0.5 = 29.5."
        })
      ],
      writing: [{
        id: "c12-w1",
        prompt: "The table lists 10 HCT bus wait times in minutes. (a) Write the min and the max. (b) Find the range. (c) You want 4 classes. Find the class width. Show the round-up.",
        modelAnswer: "(a) 41 is the longest wait in the list — that is the maximum. 6 is the shortest wait — that is the minimum. (b) Range = 41 − 6 = 35 minutes. (c) Class width = 35 ÷ 4 = 8.75, always round UP → 9. (If you used 8, 6 + 4×8 = 38, so a 41-minute wait would fall off the table.)",
        hint: "Max = longest wait in the list. Min = shortest. Range = max − min. Then ÷ 4 and round UP.",
        hintAr: "الأكبر = أطول انتظار في القائمة. الأصغر = أقصر انتظار. المدى = الأكبر − الأصغر. ثم ÷ 4 وقرّب للأعلى.",
        marks: [
          "Name min 6 and max 41 as shortest/longest",
          "Range 35",
          "8.75 rounds up to 9",
          "Say why not 8"
        ],
        chart: {
          kind: "table",
          title: "HCT campus bus · 10 wait times (minutes)",
          headers: ["Trip", "Wait (min)"],
          rows: [
            ["1", "6"],
            ["2", "9"],
            ["3", "11"],
            ["4", "14"],
            ["5", "18"],
            ["6", "21"],
            ["7", "25"],
            ["8", "27"],
            ["9", "33"],
            ["10", "41"]
          ],
          emphasis: [0, 9]
        }
      }, {
        id: "c12-w2",
        prompt: "Read the bar chart of 20 HCT club memberships. Write the frequency table (class + frequency), the total, and the modal class. Then one sentence: why do we NOT compute class width here?",
        modelAnswer: "Sports 9, Media 5, Robotics 4, Poetry 2. Total = 9+5+4+2 = 20. Modal class = Sports (highest frequency 9). We do not compute class width because this is categorical data — names of clubs, not a number line that needs grouping.",
        hint: "Read each bar. Modal class = tallest bar. Class width is for grouped numbers.",
        hintAr: "اقرأ كل عمود. الفئة المنوالية = الأطول. عرض الفئة للأرقام المجمّعة لا للأسماء.",
        marks: [
          "Four frequencies",
          "Total 20",
          "Modal class Sports",
          "Categorical so no class width"
        ],
        chart: {
          kind: "bar",
          title: "HCT RAK · Sunday club sign-ups (20 students)",
          unit: "students",
          bars: [
            {
              label: "Sports",
              value: 9
            },
            {
              label: "Media",
              value: 5
            },
            {
              label: "Robotics",
              value: 4
            },
            {
              label: "Poetry",
              value: 2
            }
          ]
        }
      }]
    },
    {
      id: "clo-1-3",
      number: "1.3",
      title: "Histograms, polygons, bar and pie graphs",
      kicker: "Bars · slices · midpoints · 3.6°",
      clo: "CLO 1",
      week: "Week 2",
      summary: "Bar and pie for categories. Histogram and frequency polygon for numbers. Pie angle = % × 3.6°.",
      blocks: [
        {
          type: "lead",
          text: "Categories get bar graphs (gaps between bars) or pie charts. Measured classes get histograms (bars touch, boundaries on the x-axis) or frequency polygons (points at midpoints, joined with lines)."
        },
        {
          type: "ar",
          text: "الأعمدة والقطاع للداتا النوعية. المدرج والمضلع للداتا الكمية المجمّعة. في المدرج الأعمدة متلاصقة والحدود الحقيقية على المحور السيني."
        },
        {
          type: "callout",
          kind: "formula",
          title: "Pie-chart angle",
          text: "A full pie is 360°. Percentages add to 100. So 1% = 360 ÷ 100 = 3.6°. Angle = % × 3.6°. People in a slice = % × n.",
          ar: "الدائرة = 360°. كل 1% = 3.6°. الزاوية = النسبة × 3.6. عدد الأشخاص = النسبة × حجم العينة."
        },
        {
          type: "work",
          question: "200 people named a favourite movie type. Read the pie.",
          chart: {
            kind: "pie",
            title: "200 people · favourite movie type",
            slices: [
              {
                label: "Romance 30%",
                value: 30
              },
              {
                label: "Comedy 20%",
                value: 20
              },
              {
                label: "Drama 5%",
                value: 5
              },
              {
                label: "Sci-Fi 25%",
                value: 25
              },
              {
                label: "Action 20%",
                value: 20
              }
            ]
          },
          parts: [
            {
              label: "(a) Angle for Sci-Fi",
              ask: "Find the angle for Sci-Fi.",
              askAr: "أوجد زاوية الخيال العلمي.",
              lines: [
                {
                  lhs: "Sci-Fi",
                  rhs: "25%",
                  ar: "الخيال العلمي = 25%"
                },
                {
                  lhs: "angle",
                  rhs: "% × 3.6",
                  ar: "الزاوية = النسبة × 3.6"
                },
                {
                  lhs: "",
                  rhs: "25 × 3.6",
                  ar: "25 × 3.6"
                },
                {
                  lhs: "",
                  rhs: "90°",
                  ar: "90°"
                }
              ],
              answer: "90°. (A quarter of the pie — 25% of 360 is also 90.)",
              answerAr: "90°. (ربع الدائرة — 25% من 360 هو أيضاً 90.)"
            },
            {
              label: "(b) Sci-Fi or Action",
              ask: "How many people prefer Sci-Fi or Action?",
              askAr: "كم شخص يفضل الخيال العلمي أو الأكشن؟",
              lines: [
                {
                  lhs: "add %",
                  rhs: "25 + 20",
                  ar: "اجمع النسب 25 + 20"
                },
                {
                  lhs: "",
                  rhs: "45%",
                  ar: "45%"
                },
                {
                  lhs: "people",
                  rhs: "0.45 × 200",
                  ar: "عدد الأشخاص = 0.45 × 200"
                },
                {
                  lhs: "",
                  rhs: "90",
                  ar: "90"
                }
              ],
              answer: "90 people.",
              answerAr: "90 شخصاً."
            },
            {
              label: "(c) Comedy minus Drama",
              ask: "How many more prefer Comedy than Drama?",
              askAr: "كم يزيد تفضيل الكوميديا عن الدراما؟",
              lines: [
                {
                  lhs: "diff %",
                  rhs: "20 − 5",
                  ar: "الفرق = 20 − 5"
                },
                {
                  lhs: "",
                  rhs: "15%",
                  ar: "15%"
                },
                {
                  lhs: "people",
                  rhs: "0.15 × 200",
                  ar: "0.15 × 200"
                },
                {
                  lhs: "",
                  rhs: "30",
                  ar: "30"
                }
              ],
              answer: "Comedy has 30 more people.",
              answerAr: "الكوميديا أكثر بـ 30 شخصاً."
            },
            {
              label: "(d) Second survey",
              ask: "A second survey has 150 Romance fans at 30%. How many people were in that survey?",
              askAr: "استطلاع ثانٍ: 150 من محبي الرومانسية = 30%. كم عدد المستطلَعين؟",
              lines: [
                {
                  lhs: "150",
                  rhs: "30% of N",
                  ar: "150 = 30% من N"
                },
                {
                  lhs: "N",
                  rhs: "150 ÷ 0.30",
                  ar: "N = 150 ÷ 0.30"
                },
                {
                  lhs: "",
                  rhs: "500",
                  ar: "500"
                }
              ],
              answer: "500 people in that survey.",
              answerAr: "500 شخص في ذلك الاستطلاع."
            }
          ]
        },
        {
          type: "work",
          question: "The histogram shows commute times for 40 HCT students.",
          chart: {
            kind: "histogram",
            title: "40 HCT students · commute time (minutes)",
            unit: "students",
            bars: [
              {
                label: "10–19",
                value: 4
              },
              {
                label: "20–29",
                value: 9
              },
              {
                label: "30–39",
                value: 14
              },
              {
                label: "40–49",
                value: 8
              },
              {
                label: "50–59",
                value: 5
              }
            ]
          },
          parts: [
            {
              label: "(a) Highest bar",
              ask: "Which class is the highest bar?",
              askAr: "أي فئة لها أطول عمود؟",
              lines: [
                {
                  lhs: "look",
                  rhs: "tallest frequency",
                  ar: "انظر إلى أطول تكرار"
                },
                {
                  lhs: "f",
                  rhs: "14",
                  ar: "14"
                },
                {
                  lhs: "class",
                  rhs: "30–39",
                  ar: "الفئة = 30–39"
                }
              ],
              answer: "30–39 minutes.",
              answerAr: "30–39 دقيقة."
            },
            {
              label: "(b) At least 40 minutes",
              ask: "How many students commute at least 40 minutes?",
              askAr: "كم طالباً يتنقل 40 دقيقة على الأقل؟",
              lines: [
                {
                  lhs: "means",
                  rhs: "40 or more",
                  ar: "يعني 40 أو أكثر"
                },
                {
                  lhs: "classes",
                  rhs: "40–49 and 50–59",
                  ar: "الفئتان 40–49 و 50–59"
                },
                {
                  lhs: "f",
                  rhs: "8 + 5",
                  ar: "8 + 5"
                },
                {
                  lhs: "",
                  rhs: "13",
                  ar: "13"
                }
              ],
              answer: "13 students.",
              answerAr: "13 طالباً."
            },
            {
              label: "(c) Polygon point for 20–29",
              ask: "At what value would a frequency polygon plot the 20–29 class?",
              askAr: "أين نرسم نقطة المضلع للفئة 20–29؟",
              lines: [
                {
                  lhs: "midpoint",
                  rhs: "(lower + upper) ÷ 2",
                  ar: "المركز = (الأدنى + الأعلى) ÷ 2"
                },
                {
                  lhs: "",
                  rhs: "(20 + 29) ÷ 2",
                  ar: "(20 + 29) ÷ 2"
                },
                {
                  lhs: "",
                  rhs: "24.5",
                  ar: "24.5"
                }
              ],
              answer: "Plot the frequency 9 at 24.5, then join the dots.",
              answerAr: "ارسم التكرار 9 عند 24.5 ثم صل النقاط."
            }
          ]
        }
      ],
      mcqs: [
        n("c13-q1", "CLO 1.3", "On a pie of HCT gym use, Weights is 40%. Pie angle in degrees?", 144, "Angle = % × 3.6. 40 × 3.6 = 144°. Check: 40% is not a quarter (that would be 90°) and not a half (180°), so 144 sits between them.", "Percent times 3.6.", "النسبة × 3.6.", {
          unit: "degrees",
          tolerance: 0,
          explanationAr: "الزاوية = 40 × 3.6 = 144°. ليست 90 لأن 40% ليست ربعاً."
        }),
        n("c13-q2", "CLO 1.3", "150 HCT students: Arabic 28% and English 12% as favourite language. How many chose Arabic or English?", 60, "Add the percents first: 28 + 12 = 40%. Then 40% of 150 = 0.40 × 150 = 60 students. Do not add 28 + 12 + 150.", "Add percents, then × 150.", "اجمع النسب ثم اضرب في 150.", {
          tolerance: 0,
          explanationAr: "28% + 12% = 40%. عدد الطلبة = 0.40 × 150 = 60."
        }),
        n("c13-q3", "CLO 1.3", "A frequency polygon for the class 42–51 plots the frequency at which x-value?", 46.5, "Polygons sit at the midpoint, not at 42 or 51. Midpoint = (42 + 51) ÷ 2 = 93 ÷ 2 = 46.5.", "Average the two class limits.", "متوسط الحدّين.", {
          tolerance: .01,
          explanationAr: "المضلع عند مركز الفئة. (42 + 51) ÷ 2 = 46.5."
        })
      ],
      writing: [{
        id: "c13-w1",
        prompt: "The pie shows 120 HCT gym visits. (a) Find the pie angle for Cardio. (b) How many visits were Pool? (c) How many were Weights or Classes? Show each line.",
        modelAnswer: "(a) Cardio is 30%. Angle = 30 × 3.6 = 108°. (b) Pool is 20% of 120 = 0.20 × 120 = 24 visits. (c) Weights or Classes = 40% + 10% = 50%. 0.50 × 120 = 60 visits.",
        hint: "Angle = % × 3.6. People = % × 120. Add percents first when the question says “or”.",
        hintAr: "الزاوية = النسبة × 3.6. العدد = النسبة × 120. عند «أو» اجمع النسب أولاً.",
        marks: [
          "Cardio angle 108°",
          "Pool 24",
          "Weights or Classes 60",
          "Show × 3.6 and × 120"
        ],
        chart: {
          kind: "pie",
          title: "120 HCT gym visits this week",
          slices: [
            {
              label: "Weights 40%",
              value: 40
            },
            {
              label: "Cardio 30%",
              value: 30
            },
            {
              label: "Pool 20%",
              value: 20
            },
            {
              label: "Classes 10%",
              value: 10
            }
          ]
        }
      }]
    },
    {
      id: "clo-1-4",
      number: "1.4",
      title: "Mean, median, mode",
      kicker: "Raw data · grouped · weighted",
      clo: "CLO 1",
      week: "Week 2",
      summary: "Mean = Σx / n. Median is the middle after sorting. Mode appears most. Grouped mean uses midpoints.",
      blocks: [
        {
          type: "cards",
          items: [
            {
              kicker: "Most work",
              title: "Mean",
              body: "The numerical average. Add every value, divide by how many there are. Mean = Σx / n.",
              ar: "المتوسط = مجموع القيم ÷ عددها. هذا يحتاج أكبر شغل."
            },
            {
              kicker: "Middle",
              title: "Median",
              body: "Sort small → large. If n is odd, pick the middle. If n is even, add the two middles and divide by 2.",
              ar: "الوسيط: رتّب ثم خذ الوسط. إذا كان العدد زوجياً خذ متوسط القيمتين الوسطيين."
            },
            {
              kicker: "Just look",
              title: "Mode",
              body: "The value that appears most often. A set can have one mode, more than one mode, or no mode.",
              ar: "المنوال = الأكثر تكراراً. قد يكون واحداً، أو أكثر، أو لا يوجد."
            }
          ]
        },
        {
          type: "h",
          text: "Raw data — mean, median, mode"
        },
        {
          type: "work",
          question: "Maha’s nine maths tests are 97, 84, 73, 88, 100, 63, 97, 95, 86.",
          parts: [
            {
              label: "(a) Mean",
              ask: "Find the mean.",
              askAr: "أوجد المتوسط.",
              lines: [
                {
                  lhs: "Σx",
                  rhs: "97+84+73+88+100+63+97+95+86",
                  ar: "اجمع كل الدرجات"
                },
                {
                  lhs: "",
                  rhs: "783",
                  ar: "المجموع = 783"
                },
                {
                  lhs: "n",
                  rhs: "9",
                  ar: "عدد القيم = 9"
                },
                {
                  lhs: "mean",
                  rhs: "783 ÷ 9",
                  ar: "المتوسط = 783 ÷ 9"
                },
                {
                  lhs: "",
                  rhs: "87",
                  ar: "87"
                }
              ],
              answer: "Mean = 87.",
              answerAr: "المتوسط = 87."
            },
            {
              label: "(b) Median",
              ask: "Find the median.",
              askAr: "أوجد الوسيط.",
              lines: [
                {
                  lhs: "sort",
                  rhs: "63, 73, 84, 86, 88, 95, 97, 97, 100",
                  ar: "رتّب من الأصغر للأكبر"
                },
                {
                  lhs: "n",
                  rhs: "9",
                  note: "odd, so one middle",
                  ar: "9 فردي فهناك قيمة وسطى واحدة"
                },
                {
                  lhs: "middle",
                  rhs: "5th value",
                  ar: "القيمة الخامسة"
                },
                {
                  lhs: "",
                  rhs: "88",
                  ar: "88"
                }
              ],
              answer: "Median = 88.",
              answerAr: "الوسيط = 88."
            },
            {
              label: "(c) Mode",
              ask: "Find the mode.",
              askAr: "أوجد المنوال.",
              lines: [
                {
                  lhs: "look",
                  rhs: "which number repeats?",
                  ar: "أي رقم تكرر؟"
                },
                {
                  lhs: "97",
                  rhs: "twice",
                  ar: "97 مرتين"
                },
                {
                  lhs: "others",
                  rhs: "once",
                  ar: "الباقي مرة واحدة"
                }
              ],
              answer: "Mode = 97.",
              answerAr: "المنوال = 97."
            }
          ]
        },
        {
          type: "table",
          caption: "Write these three answers",
          headers: [
            "Measure",
            "Value",
            "How"
          ],
          rows: [
            [
              "Mean",
              "87",
              "783 ÷ 9"
            ],
            [
              "Median",
              "88",
              "Middle of the sorted list"
            ],
            [
              "Mode",
              "97",
              "Appears twice — just look"
            ]
          ]
        },
        {
          type: "callout",
          kind: "formula",
          title: "Even n — two middles",
          text: "Drop 86 so n = 8. Sorted middles are 88 and 95. Median = (88 + 95) / 2 = 91.5.",
          ar: "إذا كان العدد زوجياً: اجمع القيمتين الوسطيين واقسم على 2. مثال: (88 + 95) ÷ 2 = 91.5."
        },
        {
          type: "h",
          text: "Casio — mean of a list (1-VAR)"
        },
        {
          type: "casio",
          title: "Maha’s mean",
          keys: ["MODE", "2 STAT", "1  1-VAR", "type x", "AC", "SHIFT 1", "5: Var", "2: x̄"],
          screen: "STAT  1-VAR",
          result: "87",
          youtube: "TTQ95Birrxg",
          videoTitle: "Casio Education — STAT on the fx-82ES PLUS 2",
          steps: [
            { key: "MODE", display: "MODE", say: "ON, then MODE. The class Casio is the fx-82ES PLUS.", sayAr: "شغّل ثم MODE. آلة الصف هي fx-82ES PLUS." },
            { key: "2 (STAT)", display: "STAT", say: "Press 2. That is STAT — not COMP.", sayAr: "اضغط 2. هذه STAT وليست COMP." },
            { key: "1 (1-VAR)", display: "1-VAR", say: "Press 1 for one-variable stats. An x column opens.", sayAr: "اضغط 1 لإحصاء متغير واحد. يفتح عمود x." },
            { key: "Type Maha’s list, = after each", display: "x column", say: "97 = 84 = 73 = 88 = 100 = 63 = 97 = 95 = 86 =", sayAr: "97 = 84 = 73 = 88 = 100 = 63 = 97 = 95 = 86 =" },
            { key: "AC", display: "STAT", say: "AC locks the list. Do this before you open the STAT menu.", sayAr: "AC تثبّت القائمة. اضغطها قبل قائمة STAT." },
            { key: "SHIFT 1 (STAT) → 5 (Var) → 2 (x̄) =", display: "87", say: "Lecture Calculator Guide: 5 is Var, 2 is the mean. Same 783 ÷ 9.", sayAr: "دليل المحاضرة: 5 هي Var و 2 هي المتوسط. نفس 783 ÷ 9." },
          ],
          note: "Class Casio (Calculator Guide, CLO 1.4 p.26–27): SHIFT 1 then 4:Sum, 5:Var, 6:MinMax. If your Casio shows Var as 4, use 4 instead of 5 — older ES PLUS numbering.",
          noteAr: "آلة الصف: SHIFT 1 ثم 4:Sum و 5:Var و 6:MinMax. إذا ظهرت Var عندك كـ 4 فاستخدم 4.",
        },
        {
          type: "h",
          text: "Grouped mean — midpoints first"
        },
        {
          type: "p",
          text: "The lecture wind-speed table has Σf = 30 (even though the title says 40 states — always trust the frequency total). Midpoint = (lower + upper) / 2."
        },
        {
          type: "table",
          caption: "Wind speeds · grouped mean from the lecture",
          headers: [
            "Class",
            "Midpoint x",
            "Frequency f",
            "f × x"
          ],
          rows: [
            [
              "67–78",
              "72.5",
              "3",
              "217.5"
            ],
            [
              "79–90",
              "84.5",
              "5",
              "422.5"
            ],
            [
              "91–102",
              "96.5",
              "8",
              "772"
            ],
            [
              "103–114",
              "108.5",
              "9",
              "976.5"
            ],
            [
              "115–126",
              "120.5",
              "5",
              "602.5"
            ]
          ],
          footer: [
            "Total",
            "",
            "30",
            "2,991"
          ],
          emphasis: [3]
        },
        {
          type: "steps",
          items: [
            "Midpoint of 67–78 = (67 + 78) / 2 = 72.5. Same idea for every class.",
            "Multiply: frequency × midpoint. Write f × x in a new column.",
            "Add the f × x column: 2,991. Add the frequency column: 30.",
            "Mean = 2,991 / 30 = 99.7."
          ],
          ar: [
            "مركز الفئة = (الأدنى + الأعلى) ÷ 2. مثال: (67 + 78) ÷ 2 = 72.5.",
            "اضرب التكرار في المركز لكل صف.",
            "اجمع عمود f × x = 2991 واجمع التكرار = 30.",
            "المتوسط = 2991 ÷ 30 = 99.7."
          ]
        },
        {
          type: "casio",
          title: "Grouped mean — x is the midpoint",
          keys: [
            "SHIFT MODE",
            "STAT ON",
            "MODE 2 1",
            "x = midpoint",
            "FREQ = f",
            "AC",
            "SHIFT 1",
            "5: Var",
            "2: x̄"
          ],
          screen: "STAT  1-VAR",
          result: "99.7",
          steps: [
            { key: "SHIFT MODE (SETUP)", display: "SETUP", say: "Open SETUP. Frequency starts OFF on a new Casio.", sayAr: "افتح SETUP. التكرار يبدأ مغلقاً." },
            { key: "▼ then 3 (STAT) then 1 (ON)", display: "FreqOn", say: "Down arrow, 3 for STAT, 1 for ON. A FREQ column will appear.", sayAr: "السهم للأسفل ثم 3 ثم 1. يظهر عمود FREQ." },
            { key: "MODE → 2 → 1", display: "1-VAR", say: "Back into 1-VAR so you see x and FREQ.", sayAr: "ارجع إلى 1-VAR. يظهر x و FREQ." },
            { key: "x = midpoints", display: "72.5", say: "72.5 = 84.5 = 96.5 = 108.5 = 120.5 =   Not 67. Not 78.", sayAr: "المراكز لا الحدود. 72.5 ثم 84.5 ثم 96.5 ثم 108.5 ثم 120.5." },
            { key: "Arrow into FREQ", display: "3", say: "3 = 5 = 8 = 9 = 5 =   Those are the class frequencies.", sayAr: "3 = 5 = 8 = 9 = 5 =  هذه التكرارات." },
            { key: "AC, then SHIFT 1 → 5 (Var) → 2 (x̄) =", display: "99.7", say: "Same 2,991 ÷ 30. Lecture Calculator Guide: 5 Var, 2 x̄.", sayAr: "نفس 2991 ÷ 30. دليل المحاضرة: 5 Var ثم 2 x̄." },
          ],
          note: "Do not type class limits into x. Midpoints in x, frequencies in FREQ. Check n with SHIFT 1 → 5:Var → 1:n — it must be 30, not 5.",
          noteAr: "لا تدخل حدود الفئة في x. المراكز في x والتكرارات في FREQ. تحقق: SHIFT 1 ثم 5 ثم 1 يعطي n = 30 وليس 5.",
        },
        {
          type: "callout",
          kind: "formula",
          title: "Rose Bowl grouped mean (2 d.p.)",
          text: "Classes 17–20 … 33–36, midpoints 18.5 … 34.5, frequencies 7, 4, 6, 11, 9, Σf = 37. Mean = 27.69.",
          ar: "نفس الطريقة. قرّب إلى منزلتين: 27.69."
        },
        {
          type: "h",
          text: "Mode of grouped data = modal class"
        },
        {
          type: "p",
          text: "You are not asked for a single mode number here. You are asked for the class with the highest frequency."
        },
        {
          type: "table",
          caption: "Modal class = tallest frequency",
          headers: ["Class", "Frequency"],
          rows: [
            ["67–78", "3"],
            ["79–90", "5"],
            ["91–102", "8"],
            ["103–114", "9"],
            ["115–126", "5"]
          ],
          emphasis: [3]
        },
        {
          type: "ar",
          text: "الفئة المنوالية = الفئة ذات أكبر تكرار (أطول عمود). هنا 103–114 لأن تكرارها 9."
        },
        {
          type: "h",
          text: "Median class — cumulative frequency"
        },
        {
          type: "steps",
          items: [
            "Add a cumulative frequency column: 3, then 3+5=8, then 8+8=16, then 16+9=25, then 25+5=30.",
            "n = 30 is even, so the position is n / 2 = 15th value.",
            "The 15th value sits after 8 and inside 16 — so in class 91–102."
          ],
          ar: [
            "كوّن عمود التكرار التراكمي: 3 ثم 8 ثم 16 ثم 25 ثم 30.",
            "n = 30 زوجي، فالموقع = n ÷ 2 = 15.",
            "أول تكرار تراكمي يصل إلى 15 أو أكبر هو 16، أي فئة 91–102."
          ]
        },
        {
          type: "table",
          caption: "Median class for n = 30",
          headers: [
            "Class",
            "f",
            "Cumulative f"
          ],
          rows: [
            [
              "67–78",
              "3",
              "3"
            ],
            [
              "79–90",
              "5",
              "8"
            ],
            [
              "91–102",
              "8",
              "16"
            ],
            [
              "103–114",
              "9",
              "25"
            ],
            [
              "115–126",
              "5",
              "30"
            ]
          ],
          emphasis: [2]
        },
        {
          type: "callout",
          kind: "exam",
          title: "Odd n",
          text: "Rose Bowl Σf = 37 (odd). Position = (n + 1) / 2 = 19th. Cumulative 7, 11, 17, 28, 37. The 19th sits in 29–32 (the class that first reaches 28).",
          ar: "إذا كان n فردياً: الموقع = (n + 1) ÷ 2. مثال: n = 37 → الموقع 19."
        },
        {
          type: "h",
          text: "Weighted mean"
        },
        {
          type: "p",
          text: "Exam 20% (83), term paper 30% (72), final 50% (90). Weighted mean = 0.20×83 + 0.30×72 + 0.50×90 = 16.6 + 21.6 + 45 = 83.2."
        },
        {
          type: "ar",
          text: "المتوسط المرجح: اضرب كل درجة في وزنها ثم اجمع. لا تقسم على 3."
        },
        {
          type: "table",
          caption: "Word problems from the lecture — same formula each time",
          headers: [
            "Problem",
            "Working",
            "Answer"
          ],
          rows: [
            [
              "Hussein 82, 79, 74, 85",
              "(82+79+74+85) ÷ 4",
              "80"
            ],
            [
              "Four teas average AED 70; three prices 66, 74, 76",
              "280 − 216",
              "64"
            ],
            [
              "Team mean 31, n = 11, swap 44 for 22",
              "(341 − 44 + 22) ÷ 11",
              "29"
            ],
            [
              "ADWC 900 at 17, ADMC 1100 at 19",
              "36,200 ÷ 2,000",
              "18.1"
            ]
          ]
        }
      ],
      mcqs: [
        n("c14-q1", "CLO 1.4", "Layla’s six quizzes: 12, 15, 18, 15, 20, 16. Mean?", 16, "Add first: 12+15+18+15+20+16 = 96. There are 6 quizzes, so mean = 96 ÷ 6 = 16. Do not use Maha’s 783 ÷ 9 here — this is a new list.", "Total ÷ 6.", "المجموع ÷ 6.", {
          tolerance: 0,
          explanationAr: "12+15+18+15+20+16 = 96. المتوسط = 96 ÷ 6 = 16.",
          working: [
            part(
              "(a) Mean",
              "Total ÷ n",
              "المجموع ÷ العدد",
              [
                L("Σx", "12+15+18+15+20+16"),
                L("", "96"),
                L("n", "6"),
                L("mean", "96 ÷ 6"),
                L("", "16"),
              ],
              "Mean = 16.",
              "المتوسط = 16.",
            ),
          ],
          casio: {
            title: "Layla’s mean",
            keys: ["MODE", "2 STAT", "1  1-VAR", "type x", "AC", "SHIFT 1", "5: Var", "2: x̄"],
            screen: "STAT  1-VAR",
            result: "16",
            steps: [
              { key: "MODE → 2 → 1", display: "1-VAR", say: "Open one-variable STAT.", sayAr: "افتح STAT لمتغير واحد." },
              { key: "Type 12 = 15 = 18 = 15 = 20 = 16 =", display: "x list", say: "One quiz per row. Press = to go down.", sayAr: "درجة في كل صف. اضغط = للنزول." },
              { key: "AC, then SHIFT 1 → 5 (Var) → 2 (x̄) =", display: "16", say: "AC first, then the lecture path. Mean is on the screen.", sayAr: "AC أولاً ثم مسار المحاضرة. المتوسط على الشاشة." },
            ],
          },
        }),
        n("c14-q2", "CLO 1.4", "Four teas average AED 70. Prices 66, 74, 76 and a. Find a.", 64, "Four prices average 70, so they must add to 4 × 70 = 280. The three we know: 66 + 74 + 76 = 216. The missing price is 280 − 216 = 64. Easy check: (66+74+76+64) ÷ 4 = 280 ÷ 4 = 70.", "Four numbers that average 70 add to 280. Subtract the three you know.", "أربعة أسعار متوسطها 70 مجموعها 280. اطرح الثلاثة المعروفة.", {
          unit: "AED",
          tolerance: 0,
          explanationAr: "المجموع = 4 × 70 = 280. المعروف 66 + 74 + 76 = 216. السعر الناقص = 280 − 216 = 64."
        }),
        n("c14-q3", "CLO 1.4", "Weights 10%, 30%, 60% on 60, 80, 90. Weighted mean?", 84, "Do not add 60+80+90 and divide by 3. Multiply each score by its weight: 0.10×60 = 6, 0.30×80 = 24, 0.60×90 = 54. Total 6 + 24 + 54 = 84.", "Score × weight, then add. Do not divide by 3.", "الدرجة × الوزن ثم الجمع. لا تقسم على 3.", {
          tolerance: .05,
          explanationAr: "0.10×60 = 6، 0.30×80 = 24، 0.60×90 = 54. المجموع 84. لا تقسم على 3."
        }),
        choice("c14-q4", "CLO 1.4", "On the class Casio, after MODE → 2 (STAT) → 1 (1-VAR) and entering x (and frequency), which keys give the mean x̄?", [
          "SHIFT 1 → 4: SUM → 1",
          "SHIFT 1 → 5: VAR → 2: x̄",
          "SHIFT 1 → 6: MinMax",
          "MODE → 1 COMP"
        ], 1, "The lecture Calculator Guide is one path: SHIFT 1 opens STAT, 5: VAR is the list of averages, 2: x̄ is the mean. For grouped data, type midpoints in x and frequencies in FREQ first. SUM is the total, not the mean. MinMax is the smallest and largest.", "STAT menu, then VAR, then 2.", "SHIFT 1 ثم 5:VAR ثم 2 تعطي المتوسط.", { explanationAr: "بعد إدخال البيانات: SHIFT 1 ثم 5:VAR ثم 2:x̄ ثم =. للداتا المجمّعة: المراكز في x والتكرارات في FREQ." }),
        n("c14-q5", "CLO 1.4", "HCT parking times, 25 cars. Midpoints 4.5, 14.5, 24.5, 34.5, 44.5 with f = 2, 5, 8, 6, 4. Mean to 1 d.p.?", 26.5, "f × x: 2×4.5=9, 5×14.5=72.5, 8×24.5=196, 6×34.5=207, 4×44.5=178. Sum = 662.5. Mean = 662.5 ÷ 25 = 26.5. Casio: type midpoints in x, frequencies in FREQ, then x̄.", "Σ(f × midpoint) ÷ 25.", "مجموع (التكرار × المركز) ÷ 25.", {
          tolerance: .05,
          explanationAr: "Σ(f × x) = 662.5. المتوسط = 662.5 ÷ 25 = 26.5.",
          working: [
            part(
              "(a) Grouped mean",
              "Σ(f × midpoint) ÷ n",
              "مجموع (التكرار × المركز) ÷ n",
              [
                L("Σ(f × x)", "9 + 72.5 + 196 + 207 + 178"),
                L("", "662.5"),
                L("n", "25"),
                L("mean", "662.5 ÷ 25"),
                L("", "26.5"),
              ],
              "Mean = 26.5.",
              "المتوسط = 26.5.",
            ),
          ],
          casio: {
            title: "Parking times — grouped mean",
            keys: ["SHIFT MODE", "STAT ON", "MODE 2 1", "x = midpoint", "FREQ = f", "AC", "SHIFT 1", "5: Var", "2: x̄"],
            screen: "STAT  1-VAR",
            result: "26.5",
            steps: [
              { key: "SHIFT MODE → ▼ → 3 STAT → 1 ON", display: "FreqOn", say: "Turn the FREQ column on.", sayAr: "شغّل عمود التكرار." },
              { key: "MODE → 2 → 1, then x and FREQ", display: "x and f", say: "4.5 with 2, 14.5 with 5, 24.5 with 8, 34.5 with 6, 44.5 with 4.", sayAr: "المراكز في x والتكرارات في FREQ." },
              { key: "AC, then SHIFT 1 → 5 (Var) → 2 (x̄) =", display: "26.5", say: "Check n first (Var → 1) — it must be 25, not 5.", sayAr: "تحقق من n أولاً. يجب أن يكون 25 وليس 5." },
            ],
          },
        })
      ],
      writing: [{
        id: "c14-w1",
        prompt: "The histogram shows 24 HCT quiz scores. (a) Write the modal class. (b) Midpoint of 60–69? (c) f × x for that class. (d) n = 24 (even). Which class holds the median? Show the cumulative frequencies.",
        modelAnswer: "(a) Modal class = 60–69 (tallest bar, f = 8). (b) Midpoint = (60 + 69) / 2 = 64.5. (c) f × x = 8 × 64.5 = 516. (d) Cumulative: 2, 7, 15, 21, 24. Position = n/2 = 12th value. First cumulative ≥ 12 is 15, so median class = 60–69.",
        hint: "Tallest bar = modal class. Midpoint = (lower + upper) ÷ 2. Median: cumulative until you pass n/2.",
        hintAr: "أطول عمود = الفئة المنوالية. المركز = (الأدنى + الأعلى) ÷ 2. الوسيط: التراكمي حتى تتجاوز n ÷ 2.",
        marks: [
          "Modal class 60–69",
          "Midpoint 64.5",
          "8 × 64.5 = 516",
          "Median class 60–69 with cumulative"
        ],
        chart: {
          kind: "histogram",
          title: "24 HCT quiz scores · frequency histogram",
          unit: "students",
          bars: [
            {
              label: "40–49",
              value: 2
            },
            {
              label: "50–59",
              value: 5
            },
            {
              label: "60–69",
              value: 8
            },
            {
              label: "70–79",
              value: 6
            },
            {
              label: "80–89",
              value: 3
            }
          ]
        }
      }]
    },
    {
      id: "clo-1-5",
      number: "1.5",
      title: "Range, variance, standard deviation",
      kicker: "Spread · √ and x² · consistency",
      clo: "CLO 1",
      week: "Week 2",
      summary:
        "Range = max − min. Variance is SD squared. SD is √variance. Casio: read σx or sx, then press x². Smaller SD = more consistent.",
      blocks: [
        {
          type: "lead",
          text: "Team A (72, 73, 76, 76, 78) and Team B (67, 72, 76, 76, 84) share mean 75, median 76 and mode 76. They are not the same team. Spread differs.",
        },
        {
          type: "ar",
          text: "المتوسط والوسيط والمنوال يصفون المركز. المدى والتباين والانحراف المعياري يصفون الانتشار.",
        },
        {
          type: "callout",
          kind: "formula",
          title: "Three spread measures + the square-root trick",
          text: "Range = max − min. SD = √variance. Variance = (SD)². Sample uses S and n − 1. Population uses σ and N. Casio has no variance key: read σx or sx, then press x². The other way: type the variance, SHIFT x² (that is √).",
          ar: "المدى = الأكبر − الأصغر. الانحراف = √ التباين. التباين = مربع الانحراف. على الآلة: اقرأ σx أو sx ثم x². والعكس: اكتب التباين ثم SHIFT x² (الجذر).",
        },
        {
          type: "h",
          text: "Example 1 — range (lecture teams)",
        },
        {
          type: "work",
          question: "Team A: 72, 73, 76, 76, 78. Team B: 67, 72, 76, 76, 84. Same centre. Who is more consistent?",
          parts: [
            part("(a) Team A range", "Biggest minus smallest.", "الأكبر ناقص الأصغر.", [L("range", "78 − 72"), L("", "6")], "Team A range = 6.", "مدى فريق A = 6."),
            part("(b) Team B range", "Same formula.", "نفس القانون.", [L("range", "84 − 67"), L("", "17")], "Team B range = 17.", "مدى فريق B = 17."),
            part("(c) Consistent", "Closer scores = smaller range.", "الدرجات الأقرب = مدى أصغر.", [L("", "6 < 17", "Team A sits in a 6-point window")], "Team A is more consistent on range.", "فريق A أكثر انتظاماً حسب المدى."),
          ],
        },
        {
          type: "h",
          text: "The square / square-root trick",
        },
        {
          type: "p",
          text: "The lecture writes: standard deviation = √variance, and variance = (standard deviation)². Casio never prints variance. It prints σx (population SD) or sx (sample SD). Square the screen number.",
        },
        {
          type: "work",
          question: "Lecture Example 1: variance is 25. Lecture Example 2: standard deviation is 6. Find the missing measure each time.",
          parts: [
            part("(a) Variance 25", "SD is the square root.", "الانحراف هو الجذر.", [L("SD", "√25"), L("", "5")], "SD = 5. Same units as the data.", "الانحراف = 5."),
            part("(b) SD 6", "Variance is the square.", "التباين هو المربع.", [L("variance", "6²"), L("", "36")], "Variance = 36.", "التباين = 36."),
            part("(c) Casio keys", "How the fx-82ES PLUS does both.", "كيف تفعل الآلة الاثنين.", [L("SD → var", "type 6, then x² → 36"), L("var → SD", "type 25, SHIFT x² (√) → 5")], "x² squares. SHIFT x² takes the square root.", "x² للتربيع. SHIFT x² للجذر."),
          ],
        },
        {
          type: "casio",
          title: "SD 6 → variance 36",
          keys: ["MODE 1", "6", "x²"],
          screen: "COMP",
          result: "36",
          steps: [
            { key: "MODE → 1 (COMP)", display: "COMP", say: "Ordinary calculate mode. Not STAT.", sayAr: "وضع الحساب العادي وليس STAT." },
            { key: "Type 6", display: "6", say: "This 6 is the standard deviation from the lecture.", sayAr: "هذا 6 هو الانحراف من المحاضرة." },
            { key: "x²", display: "36", say: "Variance = 6² = 36. The square key is x², top row.", sayAr: "التباين = 6² = 36. زر التربيع x²." },
          ],
          note: "Casio has no variance button. Square the SD. Sample variance is (sx)². Population variance is (σx)².",
          noteAr: "لا يوجد زر للتباين. ربّع الانحراف. تباين العينة = (sx)² وتباين المجتمع = (σx)².",
        },
        {
          type: "casio",
          title: "Variance 25 → SD 5",
          keys: ["25", "SHIFT x²", "√"],
          screen: "COMP",
          result: "5",
          steps: [
            { key: "MODE → 1 (COMP)", display: "COMP", say: "Still in ordinary calculate mode.", sayAr: "ما زلت في وضع الحساب." },
            { key: "Type 25", display: "25", say: "This 25 is the variance from the lecture.", sayAr: "هذا 25 هو التباين من المحاضرة." },
            { key: "SHIFT x² (√)", display: "5", say: "√25 = 5. SHIFT then the x² key is square root.", sayAr: "√25 = 5. SHIFT ثم x² هو الجذر." },
          ],
          note: "SD is always the positive square root. Same units as the original data (marks, AED, years).",
          noteAr: "الانحراف هو الجذر الموجب. نفس وحدة البيانات الأصلية.",
        },
        {
          type: "h",
          text: "Example — 10-month sample SD (lecture)",
        },
        {
          type: "p",
          text: "The lecture’s sample-SD example is not the 5-score teams. It is ten months: Team A 5, 9, 4, 15, 17, 30, 42, 9, 36, 5 and Team B 19, 35, 0, 4, 22, 2, 19, 29, 30, 3.",
        },
        {
          type: "work",
          question: "Find the sample SD for each 10-month team. Then square it for the sample variance. Which team is more consistent?",
          parts: [
            part("(a) Casio STAT", "Same opening as the mean.", "نفس فتحة المتوسط.", [L("mode", "MODE → 2 STAT → 1 (1-VAR)"), L("list", "type the 10 scores, AC"), L("sx", "SHIFT 1 → 5 (Var) → 4 (sx)")], "Team A sx = 13.918. Team B sx = 13.098.", "فريق A: sx = 13.918. فريق B: sx = 13.098."),
            part("(b) Sample variance", "Press x² on the screen number.", "اضغط x² على الرقم الظاهر.", [L("A  S²", "13.918²"), L("", "193.71"), L("B  S²", "13.098²"), L("", "171.56")], "S² is just (sx)². Do not retype — x² on the STAT answer.", "S² = (sx)². لا تعيد الكتابة — x² على جواب STAT."),
            part("(c) Consistent", "Smaller SD = scores sit closer to the mean.", "الأقل انحرافاً = الدرجات أقرب للمتوسط.", [L("", "13.098 < 13.918")], "Team B is more consistent. Team A has more variation.", "فريق B أكثر انتظاماً. فريق A أكثر تشتتاً."),
          ],
        },
        {
          type: "casio",
          title: "Team A · 10 months · sx then x²",
          keys: ["MODE 2", "1-VAR", "AC", "SHIFT 1", "5 Var", "4 sx", "x²"],
          screen: "STAT  VAR",
          result: "13.918",
          youtube: "TTQ95Birrxg",
          videoTitle: "Casio Education — STAT, σx and sx",
          steps: [
            { key: "MODE → 2 → 1", display: "1-VAR", say: "STAT 1-VAR. Same door as the mean.", sayAr: "STAT 1-VAR. نفس باب المتوسط." },
            { key: "Type 5, 9, 4, 15, 17, 30, 42, 9, 36, 5 then AC", display: "x list", say: "Ten months for Team A. AC locks the list.", sayAr: "عشرة أشهر لفريق A ثم AC." },
            { key: "SHIFT 1 → 5 (Var) → 4 (sx) =", display: "13.918", say: "Sample SD. Menu 3 is σx (population). Menu 4 is sx (sample S).", sayAr: "3 = σx للمجتمع. 4 = sx للعينة." },
            { key: "x² on that screen", display: "193.71", say: "Sample variance S² = (sx)². Do not leave STAT and retype.", sayAr: "تباين العينة = مربع sx. لا تخرج وتعيد الكتابة." },
          ],
          note: "Lecture Calculator Guide: 3 = σx, 4 = sx. Square whichever the question names. Team B’s S = 13.098 is smaller, so Team B is more consistent.",
          noteAr: "3 = σx و 4 = sx. ربّع الرقم الذي يطلبه السؤال. فريق B أقل انحرافاً فهو أكثر انتظاماً.",
        },
        {
          type: "callout",
          kind: "exam",
          title: "Sample vs population",
          text: "S and S² use n − 1 (a sample — part of a group). σ and σ² use N (the whole group). The exam will name ‘sample’ or ‘population’. On Casio that is sx vs σx, then x².",
          ar: "العينة S و S² تستخدم n − 1. المجتمع σ و σ² تستخدم N. على الآلة: sx أو σx ثم x².",
        },
        {
          type: "h",
          text: "Grouped data — leaders’ ages (lecture)",
        },
        {
          type: "table",
          caption: "Leaders’ ages when they began — CLO 1.5",
          headers: ["Age class", "Frequency", "Midpoint"],
          rows: [
            ["42–45", "2", "43.5"],
            ["46–49", "6", "47.5"],
            ["50–53", "7", "51.5"],
            ["54–57", "16", "55.5"],
            ["58–61", "5", "59.5"],
            ["62–65", "4", "63.5"],
            ["66–69", "2", "67.5"],
          ],
          footer: ["Range 69 − 42", "", "27"],
          emphasis: [3],
        },
        {
          type: "work",
          question: "From the leaders’ ages table: range, population SD, then variance with the square trick.",
          parts: [
            part("(a) Range", "Highest class upper minus lowest class lower.", "أعلى حد ناقص أدنى حد.", [L("range", "69 − 42"), L("", "27")], "Range = 27 years.", "المدى = 27 سنة."),
            part("(b) Casio σx", "x = midpoint, FREQ = frequency.", "x = نقطة المنتصف، FREQ = التكرار.", [L("FREQ ON", "SHIFT MODE → down → 3:STAT → 1:ON"), L("list", "midpoints in x, frequencies in FREQ"), L("σx", "SHIFT 1 → 5 (Var) → 3 (σx)"), L("", "5.76")], "Population SD ≈ 5.76.", "الانحراف للمجتمع ≈ 5.76."),
            part("(c) Variance", "x² on 5.76.", "x² على 5.76.", [L("σ²", "5.76²"), L("", "33.18")], "Variance ≈ 33.18 (lecture prints 33.197 from the unrounded σ). Same idea: square the SD.", "التباين ≈ 33.18 (المحاضرة 33.197 من σ غير المقرّب). الفكرة: ربّع الانحراف."),
          ],
        },
        {
          type: "h",
          text: "Example 2 — outliers break the range",
        },
        {
          type: "work",
          question: "Ahmed family weekly earnings (AED): 1000, 140, 113, 164, 90.",
          parts: [
            part("(a) Range", "Max minus min.", "الأكبر ناقص الأصغر.", [L("range", "1000 − 90"), L("", "910")], "Range = AED 910.", "المدى = 910 درهماً."),
            part("(b) Why weak", "1000 and 90 sit far from 113, 140, 164.", "1000 و 90 بعيدان عن 113 و 140 و 164.", [L("", "range uses only two numbers")], "1000 and 90 are outliers. Range ignores the middle. SD uses every value, so it is the better measure.", "1000 و 90 قيم متطرفة. المدى يتجاهل الوسط. الانحراف يستخدم كل قيمة."),
          ],
        },
        {
          type: "callout",
          kind: "trap",
          title: "Range is quick, not enough",
          text: "Range uses only two numbers. Extreme values inflate it. The exam will ask why SD is better: it uses every data point.",
          ar: "المدى يعتمد على قيمتين فقط. الانحراف يستخدم كل نقطة.",
        },
      ],
      mcqs: [
        n("c15-q1", "CLO 1.5", "Noor’s five quizzes: 11, 13, 14, 14, 16. Range?", 5, "Range uses only the two ends. Highest 16, lowest 11. Range = 16 − 11 = 5.", "Biggest minus smallest.", "الأكبر ناقص الأصغر.", { tolerance: 0, explanationAr: "المدى = 16 − 11 = 5.", working: [part("(a) Range", "Max − min", "الأكبر − الأصغر", [L("range", "16 − 11"), L("", "5")], "Range = 5.", "المدى = 5.")] }),
        n("c15-q2", "CLO 1.5", "Variance 49. Standard deviation?", 7, "SD is the square root of variance. √49 = 7. Casio: type 49, SHIFT x² (√).", "Standard deviation = √variance.", "الانحراف = الجذر التربيعي للتباين.", { tolerance: 0, explanationAr: "الانحراف = √49 = 7. على الآلة: 49 ثم SHIFT x².", working: [part("(a) SD", "Square root of 49", "جذر 49", [L("SD", "√49"), L("", "7")], "SD = 7.", "الانحراف = 7.")], casio: { title: "√49", keys: ["49", "SHIFT x²"], screen: "COMP", result: "7", steps: [{ key: "Type 49", display: "49", say: "That is the variance.", sayAr: "هذا هو التباين." }, { key: "SHIFT x² (√)", display: "7", say: "√49 = 7.", sayAr: "√49 = 7." }] } }),
        n("c15-q3", "CLO 1.5", "Standard deviation 8. Variance?", 64, "Variance is SD squared. 8² = 64. Casio: type 8, x².", "Square the SD.", "ربّع الانحراف.", { tolerance: 0, explanationAr: "التباين = 8² = 64. على الآلة: 8 ثم x².", working: [part("(a) Variance", "8 squared", "مربع 8", [L("variance", "8²"), L("", "64")], "Variance = 64.", "التباين = 64.")], casio: { title: "8²", keys: ["8", "x²"], screen: "COMP", result: "64", steps: [{ key: "Type 8", display: "8", say: "That is the SD.", sayAr: "هذا هو الانحراف." }, { key: "x²", display: "64", say: "Variance = 64.", sayAr: "التباين = 64." }] } }),
        n("c15-q4", "CLO 1.5", "Casio STAT shows sx = 5. Sample variance S²?", 25, "Sample variance is (sx)². Leave 5 on the screen and press x². 5² = 25.", "x² on the sx screen.", "x² على شاشة sx.", { tolerance: 0, explanationAr: "تباين العينة = (sx)² = 5² = 25.", working: [part("(a) S²", "Square sx", "ربّع sx", [L("S²", "5²"), L("", "25")], "S² = 25.", "S² = 25.")] }),
        n("c15-q5", "CLO 1.5", "Casio STAT shows σx = 4. Population variance σ²?", 16, "Population variance is (σx)². 4² = 16. Menu 3 is σx, then x².", "Square σx, not sx.", "ربّع σx وليس sx.", { tolerance: 0, explanationAr: "تباين المجتمع = (σx)² = 4² = 16.", working: [part("(a) σ²", "Square σx", "ربّع σx", [L("σ²", "4²"), L("", "16")], "σ² = 16.", "σ² = 16.")] }),
        n("c15-q6", "CLO 1.5", "Five delivery times (minutes): 12, 15, 15, 18, 22. Range?", 10, "Range = 22 − 12 = 10 minutes. Only two numbers.", "Biggest minus smallest.", "الأكبر ناقص الأصغر.", { tolerance: 0, unit: "min", explanationAr: "المدى = 22 − 12 = 10 دقائق.", working: [part("(a) Range", "Max − min", "الأكبر − الأصغر", [L("range", "22 − 12"), L("", "10")], "Range = 10 minutes.", "المدى = 10 دقائق.")] }),
        n("c15-q7", "CLO 1.5", "Variance 121. Standard deviation?", 11, "√121 = 11. Casio: 121, SHIFT x².", "Square root of 121.", "جذر 121.", { tolerance: 0, explanationAr: "√121 = 11.", working: [part("(a) SD", "√121", "√121", [L("SD", "√121"), L("", "11")], "SD = 11.", "الانحراف = 11.")] }),
        choice("c15-q8", "CLO 1.5", "sx is on the Casio screen. Which key gives sample variance?", ["SHIFT 1 again", "x²", "MODE 2", "÷ n"], 1, "There is no variance key. Sample variance is (sx)², so press x² on the number already on the screen.", "Square the sample SD.", "ربّع انحراف العينة.", { explanationAr: "لا يوجد زر للتباين. اضغط x² على sx." }),
        choice("c15-q9", "CLO 1.5", "10-month Team A sx = 13.918, Team B sx = 13.098. Who is more consistent?", ["Team A — higher SD means more consistent", "Team B — lower SD means scores sit closer to the mean", "They are equal because both have 10 months", "Range is enough, ignore SD"], 1, "Smaller SD = more consistent. Team B. These are the lecture’s 10-month teams, not the 5-score range example.", "Consistent = smaller spread = smaller SD.", "الانتظام = انتشار أصغر = انحراف أصغر.", { explanationAr: "الأقل انحرافاً هو الأكثر انتظاماً. فريق B. هذه فرق العشرة أشهر." }),
        choice("c15-q10", "CLO 1.5", "Same mean, smaller SD. That team is…", ["Less consistent", "More consistent", "The modal class", "A sample of colours"], 1, "Mean, median and mode only describe the centre. Smaller SD means scores sit closer to that mean — more consistent.", "Consistent = small spread = small SD.", "الانتظام = انتشار صغير = انحراف صغير.", { explanationAr: "المتوسط يصف المركز فقط. الأقل انحرافاً هو الأكثر انتظاماً." }),
      ],
      writing: [
        {
          id: "c15-w1",
          prompt: "The bar chart is Omar’s five quizzes. Fatima’s five quizzes (not on the chart) are 14, 15, 15, 16, 17. Both means equal 15.4. (a) Range for each student. (b) Who is more consistent, and why? (c) Why is range a weak summary if Omar had scored 50 on quiz 5 instead of 22?",
          modelAnswer: "(a) Fatima range = 17 − 14 = 3. Omar range = 22 − 8 = 14. (b) Fatima is more consistent — her scores sit in a 3-point window, Omar’s stretch 14 points. (c) Range would become 50 − 8 = 42 and would ignore the ordinary 14, 15, 16 in the middle. Standard deviation uses every quiz, so it is the better measure.",
          hint: "Range = max − min for each person. Smaller spread = more consistent. Range only looks at two ends.",
          hintAr: "المدى = الأكبر − الأصغر لكل طالب. الأصغر مدى = الأكثر انتظاماً.",
          marks: ["Fatima range 3", "Omar range 14", "Fatima more consistent", "Outlier 50 would inflate range"],
          chart: { kind: "bar", title: "Omar’s five HCT quizzes (mean 15.4)", unit: "marks", bars: [{ label: "Q1", value: 8 }, { label: "Q2", value: 14 }, { label: "Q3", value: 15 }, { label: "Q4", value: 16 }, { label: "Q5", value: 22 }] },
        },
        {
          id: "c15-w2",
          prompt: "The bars are Reem’s five lab times (minutes): 8, 10, 11, 11, 20. (a) Range. (b) Casio shows sx = 4.6. Sample variance S²? (c) Another lab has variance 9. What is its SD? (d) Which lab is more consistent if the other sx = 3?",
          modelAnswer: "(a) Range = 20 − 8 = 12 minutes. (b) S² = (sx)² = 4.6² = 21.16. Press x² on 4.6. (c) SD = √9 = 3. (d) The other lab (sx = 3) is more consistent because 3 < 4.6 — times sit closer to the mean.",
          hint: "Range from the two ends of the chart. Variance = (sx)². SD = √variance. Smaller sx wins consistency.",
          hintAr: "المدى من طرفي العمود. التباين = (sx)². الانحراف = √ التباين. الأصغر sx أكثر انتظاماً.",
          marks: ["Range 12", "S² = 21.16", "SD = 3", "Other lab more consistent"],
          chart: { kind: "bar", title: "Reem’s five HCT lab times", unit: "min", bars: [{ label: "T1", value: 8 }, { label: "T2", value: 10 }, { label: "T3", value: 11 }, { label: "T4", value: 11 }, { label: "T5", value: 20 }] },
        },
      ],
    },
    {
id: "clo-2-1",
    number: "2.1",
    title: "Single trade discount, list and net",
    kicker: "List · complement · six cases",
    clo: "CLO 2",
    week: "Week 3",
    summary: "Trade discount = list × rate. Net = list × (1 − R). List = net / (1 − R). Complement method is the exam shortcut.",
    blocks: [
      {
        type: "lead",
        text: "A supplier prints a list price, then knocks off a trade discount for the retailer. The money the retailer actually pays is the net price.",
      },
      {
        type: "video",
        title: "Trade discounts — lecture clip",
        youtube: "MMtbIUDArBc",
        poster: "/illustrations/clo21-trade-video.png",
        caption: "The same video from the CLO 2.1 slides. List, rate, discount, then net.",
      },
      {
        type: "callout",
        kind: "formula",
        title: "Six cases — write these",
        text: "Discount = List × Rate. Net = List − Discount. Net = List × (1 − R). List = Net / (1 − R). Rate = Discount / List × 100. Complement = 1 − R, then Net = List × complement.",
        ar: "الصافي = القائمة × المتمم. القائمة = الصافي ÷ المتمم. لا تقسم على نسبة الخصم.",
      },
      {
        type: "table",
        caption: "Six cases from the CLO 2.1 slides — write one line each",
        headers: ["Find", "Write"],
        rows: [
          ["Discount", "List × Rate"],
          ["Net (two ways)", "List − Discount, or List × (1 − R)"],
          ["List from net", "Net ÷ (1 − R)"],
          ["Rate", "Discount ÷ List × 100"],
          ["Complement", "1 − R, then Net = List × complement"],
        ],
      },
      {
        type: "work",
        question:
          "The HCT shop lists a desk at AED 1,099. Trade discount is 25%. Find the discount, the net, and check.",
        parts: [
          part(
            "(a) Discount",
            "How much money is knocked off?",
            "كم يُطرح من السعر؟",
            [
              L("list", "1,099", "printed price", "سعر القائمة"),
              L("rate", "25% = 0.25"),
              L("discount", "list × rate", undefined, "الخصم = القائمة × النسبة"),
              L("", "1,099 × 0.25"),
              L("", "274.75"),
            ],
            "Discount = AED 274.75.",
            "الخصم = 274.75 درهم.",
          ),
          part(
            "(b) Net",
            "What does the retailer actually pay?",
            "ماذا يدفع المشتري فعلاً؟",
            [
              L("complement", "1 − 0.25", "the leftover", "المتمم = الباقي"),
              L("", "0.75"),
              L("net", "list × complement", undefined, "الصافي = القائمة × المتمم"),
              L("", "1,099 × 0.75"),
              L("", "824.25"),
            ],
            "Net = AED 824.25.",
            "الصافي = 824.25 درهم.",
          ),
          part(
            "(c) Check",
            "List minus discount must match the net.",
            "القائمة ناقص الخصم يجب أن تساوي الصافي.",
            [
              L("check", "1,099 − 274.75"),
              L("", "824.25"),
            ],
            "Same 824.25. The two methods agree.",
            "نفس 824.25. الطريقتان متفقتان.",
          ),
        ],
      },
      {
        type: "work",
        question: "List price $1,200 with a 20% trade discount.",
        parts: [
          part(
            "(a) Discount",
            "Find the discount amount.",
            "أوجد مبلغ الخصم.",
            [
              L("discount", "1,200 × 0.20", undefined, "القائمة × النسبة"),
              L("", "240"),
            ],
            "Discount = $240.",
            "الخصم = 240 دولاراً.",
          ),
          part(
            "(b) Net",
            "Find the net using the complement.",
            "أوجد الصافي بالمتمم.",
            [
              L("complement", "1 − 0.20 = 0.80"),
              L("net", "1,200 × 0.80", undefined, "1200 × 0.80"),
              L("", "960"),
            ],
            "Net = $960. Check: 1,200 − 240 = 960.",
            "الصافي = 960. تحقق: 1200 − 240 = 960.",
          ),
        ],
      },
      {
        type: "work",
        question: "The retailer paid a net of $640 after a 20% trade discount. Find the list price.",
        parts: [
          part(
            "(a) Complement",
            "What percent of list is the net?",
            "كم بالمئة من القائمة هو الصافي؟",
            [
              L("rate", "20% = 0.20"),
              L("complement", "1 − 0.20", "net is the leftover", "الصافي هو الباقي"),
              L("", "0.80"),
            ],
            "Net is 80% of list.",
            "الصافي = 80% من القائمة.",
          ),
          part(
            "(b) List",
            "Undo the complement.",
            "اعكس المتمم.",
            [
              L("list", "net ÷ complement", undefined, "القائمة = الصافي ÷ المتمم"),
              L("", "640 ÷ 0.80"),
              L("", "800"),
            ],
            "List = $800. Trap: 640 ÷ 0.20 = 3,200 is wrong — never divide by the discount rate.",
            "القائمة = 800. الفخ: 640 ÷ 0.20 = 3200. لا تقسم على نسبة الخصم.",
          ),
        ],
      },

      {
        type: "work",
        question: "List $1,500 with a 25% trade discount — lecture complementary method.",
        parts: [
          part("(a) Complement", "What is left after 25%?", "ما الباقي بعد 25%؟", [L("complement", "1 − 0.25 = 0.75")], "Pay 75% of list.", "ادفع 75% من القائمة."),
          part("(b) Net", "List × complement.", "القائمة × المتمم.", [L("net", "1,500 × 0.75"), L("", "1,125")], "Net = $1,125. Discount = 1,500 − 1,125 = 375.", "الصافي = 1125. الخصم = 375."),
        ],
      },
      {
        type: "work",
        question: "Practice: list $2,500 at 15% trade. Then list $1,800 at 30%. Then a net of $960 after 20% — find that list.",
        parts: [
          part("(a) $2,500 at 15%", "Complement method.", "طريقة المتمم.", [L("net", "2,500 × 0.85"), L("", "2,125")], "Net = $2,125.", "الصافي = 2125."),
          part("(b) $1,800 at 30%", "Complement 0.70.", "المتمم 0.70.", [L("net", "1,800 × 0.70"), L("", "1,260")], "Net = $1,260.", "الصافي = 1260."),
          part("(c) Net $960 after 20%", "List = net ÷ complement.", "القائمة = الصافي ÷ المتمم.", [L("complement", "0.80"), L("list", "960 ÷ 0.80"), L("", "1,200")], "List = $1,200. Trap: 960 ÷ 0.20 = 4,800.", "القائمة = 1200. الفخ: 960 ÷ 0.20."),
        ],
      },
      {
        type: "callout",
        kind: "trap",
        title: "Finding list from net",
        text: "Never divide by the discount rate. Divide by the complement. 640 / 0.20 = 3,200 is the classic wrong answer. 640 / 0.80 = 800 is the mark.",
        ar: "لا تقسم على نسبة الخصم. اقسم على المتمم.",
      },
    ],
    mcqs: [
      n(
        "c21-q1",
        "CLO 2.1",
        "HCT lab lists a printer at AED 840 with 30% trade discount. Net price?",
        588,
        "Complement = 1 − 0.30 = 0.70. Net = 840 × 0.70 = 588. Check: discount = 840 × 0.30 = 252, and 840 − 252 = 588.",
        "Pay the leftover: complement 0.70, then × list.",
        "ادفع الباقي: المتمم 0.70 ثم × القائمة.",
        {
          unit: "AED",
          tolerance: 0.05,
          explanationAr: "المتمم = 1 − 0.30 = 0.70. الصافي = 840 × 0.70 = 588.",
          working: [
            part(
              "(a) Net",
              "Complement method",
              "طريقة المتمم",
              [
                L("complement", "1 − 0.30 = 0.70", undefined, "المتمم"),
                L("net", "840 × 0.70"),
                L("", "588"),
              ],
              "Net = AED 588.",
              "الصافي = 588 درهماً.",
            ),
          ],
        },
      ),
      n(
        "c21-q2",
        "CLO 2.1",
        "Net AED 510 after 15% trade. List price?",
        600,
        "Net is 85% of list. List = 510 ÷ 0.85 = 600. Trap: 510 ÷ 0.15 = 3,400 — never divide by the discount rate.",
        "Divide by 0.85, not 0.15.",
        "اقسم على 0.85 وليس على 0.15.",
        {
          unit: "AED",
          explanationAr: "الصافي = 85% من القائمة. القائمة = 510 ÷ 0.85 = 600.",
          working: [
            part(
              "(a) List",
              "Undo the complement",
              "اعكس المتمم",
              [
                L("complement", "1 − 0.15 = 0.85"),
                L("list", "510 ÷ 0.85"),
                L("", "600"),
              ],
              "List = AED 600.",
              "القائمة = 600 درهم.",
            ),
          ],
        },
      ),
      n(
        "c21-q3",
        "CLO 2.1",
        "List AED 1,600, 12% trade. Discount amount?",
        192,
        "Discount amount is the money knocked off, not the net. Discount = 1,600 × 0.12 = 192. The net would be 1,408, but that is not what this question asked.",
        "List × rate. Not the leftover.",
        "القائمة × النسبة. ليس الباقي.",
        {
          unit: "AED",
          tolerance: 0.05,
          explanationAr: "مبلغ الخصم = 1600 × 0.12 = 192. السؤال عن الخصم لا عن الصافي.",
          working: [
            part(
              "(a) Discount",
              "List times rate",
              "القائمة × النسبة",
              [
                L("discount", "1,600 × 0.12"),
                L("", "192"),
              ],
              "Discount = AED 192.",
              "الخصم = 192 درهماً.",
            ),
          ],
        },
      ),
    ],
    writing: [
      {
        id: "c21-w1",
        prompt:
          "The bar chart is an HCT shop chair: list AED 760 at 20% off. (a) Write the complement. (b) Find the net. (c) Check with List − Discount.",
        modelAnswer:
          "(a) Complement = 1 − 0.20 = 0.80. (b) Net = 760 × 0.80 = AED 608 (the net bar). (c) Discount = 760 × 0.20 = 152, and 760 − 152 = 608, which matches the net bar.",
        hint: "Complement first (0.80), then multiply by list. The three bars should add as list = discount + net.",
        hintAr: "المتمم أولاً (0.80) ثم اضرب في القائمة. القائمة = الخصم + الصافي.",
        marks: ["Complement 0.80", "Net 608", "Check 760 − 152"],
        chart: {
          kind: "bar",
          title: "HCT shop chair · AED 760 at 20% trade discount",
          unit: "AED",
          bars: [
            { label: "List", value: 760 },
            { label: "Discount", value: 152 },
            { label: "Net", value: 608 },
          ],
        },
      },
    ],
  },
  {
    id: "clo-2-2",
    number: "2.2",
    title: "Chain discount and cash discount",
    kicker: "NPER · SEDR · 2/10 n/30",
    clo: "CLO 2",
    week: "Week 3",
    summary: "Chain discounts multiply complements. NPER = product of complements. SEDR = 1 − NPER. Cash terms 2/10 n/30 are a second, later discount.",
    blocks: [
      {
        type: "lead",
        text: "A chain 20/15/10 is not 45% off. Each rate is taken from what is left. Multiply the complements, then multiply by list.",
      },
      {
        type: "callout",
        kind: "formula",
        title: "Chain",
        text: "NPER = (1−r₁)(1−r₂)(1−r₃)…  Net = List × NPER.  SEDR = (1 − NPER) × 100%.  Total discount = List − Net.",
        ar: "لا تجمع نسب السلسلة. اضرب المتممات. NPER هو حاصل الضرب، و SEDR = 1 − NPER.",
      },
      {
        type: "work",
        question: "Office equipment is listed at $15,000 with a chain 20/15/10.",
        parts: [
          part(
            "(a) NPER",
            "Multiply the three complements.",
            "اضرب المتممات الثلاثة.",
            [
              L("complements", "0.80, 0.85, 0.90", "not 20+15+10", "ليست 20+15+10"),
              L("NPER", "0.80 × 0.85 × 0.90"),
              L("", "0.612"),
            ],
            "NPER = 0.612.",
            "NPER = 0.612.",
          ),
          part(
            "(b) Net",
            "List times NPER.",
            "القائمة × NPER.",
            [
              L("net", "15,000 × 0.612"),
              L("", "9,180"),
            ],
            "Net = $9,180.",
            "الصافي = 9180 دولاراً.",
          ),
          part(
            "(c) SEDR",
            "Single equivalent discount rate.",
            "معدل الخصم المكافئ الواحد.",
            [
              L("SEDR", "1 − 0.612"),
              L("", "0.388"),
              L("", "38.8%"),
              L("discount", "15,000 − 9,180 = 5,820"),
            ],
            "SEDR = 38.8%, not 45%. Discount = $5,820.",
            "SEDR = 38.8% وليست 45%. الخصم = 5820.",
          ),
        ],
      },
      {
        type: "work",
        question: "A company buys equipment listed at AED 12,500. Series discounts 10%, 5% and 4%.",
        parts: [
          part(
            "(a) NPER",
            "Three complements.",
            "ثلاثة متممات.",
            [
              L("NPER", "0.90 × 0.95 × 0.96"),
              L("", "0.8208"),
            ],
            "NPER = 0.8208.",
            "NPER = 0.8208.",
          ),
          part(
            "(b) Net",
            "Final price after all three.",
            "السعر النهائي بعد الخصوم الثلاثة.",
            [
              L("net", "12,500 × 0.8208"),
              L("", "10,260"),
            ],
            "Net = AED 10,260.",
            "الصافي = 10260 درهماً.",
          ),
          part(
            "(c) Discount and SEDR",
            "How much came off, and the one-rate equivalent.",
            "كم نُقص، وما المعدل المكافئ.",
            [
              L("discount", "12,500 − 10,260"),
              L("", "2,240"),
              L("SEDR", "1 − 0.8208 = 0.1792 = 17.92%"),
            ],
            "Discount AED 2,240. SEDR 17.92%, not 19%.",
            "الخصم 2240. SEDR = 17.92% وليست 19%.",
          ),
        ],
      },
      {
        type: "work",
        question: "Lecture Example 2: list $5,000, chain 10/5/2.",
        parts: [
          part("(a) NPER", "Three complements — not 10+5+2.", "ثلاثة متممات — ليست 10+5+2.", [L("NPER", "0.90 × 0.95 × 0.98"), L("", "0.8379")], "NPER = 0.8379.", "NPER = 0.8379."),
          part("(b) Net and SEDR", "List × NPER, then 1 − NPER.", "القائمة × NPER ثم 1 − NPER.", [L("net", "5,000 × 0.8379"), L("", "4,189.50"), L("SEDR", "1 − 0.8379 = 0.1621 = 16.21%"), L("discount", "5,000 − 4,189.50 = 810.50")], "Net = $4,189.50. SEDR 16.21%, not 17%.", "الصافي = 4189.50. SEDR = 16.21% وليست 17%."),
        ],
      },
      {
        type: "work",
        question: "Practice: computers listed at AED 15,000. Series 12%, 6% and 3%.",
        parts: [
          part("(a) NPER", "0.88 × 0.94 × 0.97.", "0.88 × 0.94 × 0.97.", [L("NPER", "0.88 × 0.94 × 0.97"), L("", "0.802384")], "NPER = 0.802384.", "NPER = 0.802384."),
          part("(b) Net, discount, SEDR", "Same three asks as the lecture practice.", "نفس الطلبات الثلاثة.", [L("net", "15,000 × 0.802384"), L("", "12,035.76"), L("discount", "15,000 − 12,035.76 = 2,964.24"), L("SEDR", "1 − 0.802384 = 19.76%")], "Net AED 12,035.76. Discount 2,964.24. SEDR 19.76%, not 21%.", "الصافي 12035.76. الخصم 2964.24. SEDR 19.76% وليست 21%."),
        ],
      },
      {
        type: "callout",
        kind: "formula",
        title: "Cash terms + ordinary dating",
        text: "2/10 n/30 = 2% off if paid within 10 days, otherwise the net (after trade) is due in 30 days. Ordinary dating: days passed = payment date − invoice date. Start counting the day AFTER the invoice. Miss the window → cash discount is 0. Take cash after trade, never on list.",
        ar: "2/10 n/30 = خصم 2% إذا دفعت خلال 10 أيام. العد العادي: الأيام = تاريخ الدفع − تاريخ الفاتورة. ابدأ من اليوم التالي للفاتورة. فاتتك المهلة = صفر خصم نقدي.",
      },
      {
        type: "h",
        text: "The lecture calendar — count the days",
      },
      {
        type: "calendar",
        title: "2019 calendar from the CLO 2.2 slides",
        year: 2019,
        showYear: true,
        caption: "Same year calendar as the lecture. Count from the invoice date to the payment date. Days passed = paid − invoice.",
        ar: "نفس تقويم المحاضرة لسنة 2019. عدّ من تاريخ الفاتورة إلى تاريخ الدفع. الأيام = الدفع − الفاتورة.",
      },
      {
        type: "steps",
        items: [
          "Read the terms: first number is the cash %, second is the discount window, n/ is when the full net is due.",
          "Find the invoice date on the calendar. Day 1 is the next day.",
          "Count to the payment date. Days passed = payment date − invoice date.",
          "If days ≤ the window, take the cash %. If days > the window, pay the full net — cash = 0.",
        ],
        ar: [
          "اقرأ الشروط: الرقم الأول نسبة النقدي، والثاني مهلة الخصم، و n/ تاريخ الاستحقاق.",
          "حدّد تاريخ الفاتورة. اليوم 1 هو اليوم التالي.",
          "عدّ إلى تاريخ الدفع. الأيام = الدفع − الفاتورة.",
          "إذا الأيام ≤ المهلة خذ الخصم النقدي. إذا زادت ادفع الصافي كاملاً.",
        ],
      },
      {
        type: "calendar",
        title: "Invoice 15 April 2019 · paid 24 April · 5/10 n/30",
        year: 2019,
        month: 4,
        invoiceDay: 15,
        paidDay: 24,
        discountDays: 10,
        terms: "5/10 n/30",
        caption: "Navy = invoice. Green = paid. Teal = days you count. 24 − 15 = 9 days. 9 ≤ 10, so the 5% cash discount applies.",
        ar: "الكحلي = الفاتورة. الأخضر = الدفع. التركواز = الأيام المعدودة. 24 − 15 = 9. 9 ≤ 10 فيُحسب خصم 5%.",
      },
      {
        type: "work",
        question: "Invoice dated 15 April, paid 24 April. Terms 5/10 n/30. Invoice $800. Amount paid?",
        parts: [
          part("(a) Days", "Ordinary dating on the April calendar.", "العد العادي على تقويم أبريل.", [L("days", "24 − 15"), L("", "9"), L("window", "10 days")], "9 ≤ 10 — inside the cash window.", "9 ≤ 10 — داخل مهلة الخصم."),
          part("(b) Paid", "5% of 800.", "5% من 800.", [L("cash", "0.05 × 800 = 40"), L("paid", "800 − 40"), L("", "760")], "Amount paid = $760.", "المدفوع = 760 دولاراً."),
        ],
      },
      {
        type: "calendar",
        title: "Invoice 20 May 2019 · paid 31 May · 2/10 n/30",
        year: 2019,
        month: 5,
        invoiceDay: 20,
        paidDay: 31,
        discountDays: 10,
        terms: "2/10 n/30",
        caption: "31 − 20 = 11 days. 11 > 10, so she missed the 2% window. Pay the full net.",
        ar: "31 − 20 = 11 يوماً. 11 > 10 ففاتت مهلة 2%. ادفع الصافي كاملاً.",
      },
      {
        type: "work",
        question: "Invoice dated 20 May, paid 31 May. Terms 2/10 n/30. Invoice $1,200. Amount paid?",
        parts: [
          part("(a) Days", "Count on the May calendar.", "عدّ على تقويم مايو.", [L("days", "31 − 20"), L("", "11"), L("window", "10 days")], "11 > 10 — missed the cash window.", "11 > 10 — فاتت مهلة الخصم."),
          part("(b) Paid", "Cash discount is zero.", "الخصم النقدي صفر.", [L("cash", "0"), L("paid", "1,200")], "Amount paid = $1,200. The 2% is gone.", "المدفوع = 1200. خصم 2% سقط."),
        ],
      },
      {
        type: "work",
        question: "Invoice $800, terms 2/10 n/30, paid on day 8.",
        parts: [
          part("(a) Window", "Is day 8 inside 10 days?", "هل اليوم 8 داخل 10 أيام؟", [L("window", "day 8 is inside 10 days", undefined, "اليوم 8 داخل 10 أيام"), L("cash", "0.02 × 800 = 16"), L("paid", "800 − 16"), L("", "784")], "Amount paid = $784.", "المدفوع = 784 دولاراً."),
        ],
      },
      {
        type: "work",
        question: "Invoice $1,200, terms 2/10 n/30, paid on day 15.",
        parts: [
          part("(a) Window", "Day 15 versus 10.", "اليوم 15 مقابل 10.", [L("days", "15 > 10"), L("cash", "0"), L("paid", "1,200")], "Paid on the 15th — no cash discount. Amount paid = $1,200.", "الدفع في اليوم 15 — لا خصم نقدي. المدفوع = 1200."),
        ],
      },
      {
        type: "work",
        question: "List $4,000, trade 25%, then 2/10 n/30 paid within 10 days.",
        parts: [
          part("(a) Trade first", "Cash is never taken on list.", "الخصم النقدي لا يُحسب على القائمة.", [L("trade-net", "4,000 × 0.75", "25% off list", "بعد خصم التجارة"), L("", "3,000")], "After trade = $3,000.", "بعد التجارة = 3000."),
          part("(b) Then 2/10", "2% of the trade-net.", "2% من صافي التجارة.", [L("cash", "0.02 × 3,000 = 60"), L("paid", "3,000 − 60"), L("", "2,940")], "Amount paid = $2,940.", "المدفوع = 2940 دولاراً."),
        ],
      },
      {
        type: "work",
        question: "Practice: invoice $2,500, terms 3/15 n/45, paid in 10 days.",
        parts: [
          part("(a) Paid", "10 is inside 15, so 3% applies.", "10 داخل 15 فيُحسب 3%.", [L("cash", "0.03 × 2,500 = 75"), L("paid", "2,500 − 75"), L("", "2,425")], "Amount paid = $2,425.", "المدفوع = 2425 دولاراً."),
        ],
      },
      {
        type: "work",
        question: "Practice: list $8,000, 20% trade discount, terms 2/10 n/30 paid on time.",
        parts: [
          part("(a) Trade, then cash", "Always trade first.", "خصم التجارة أولاً دائماً.", [L("trade-net", "8,000 × 0.80 = 6,400"), L("cash", "0.02 × 6,400 = 128"), L("paid", "6,400 − 128"), L("", "6,272")], "Amount paid = $6,272.", "المدفوع = 6272 دولاراً."),
        ],
      },
    ],
    mcqs: [
      n(
        "c22-q1",
        "CLO 2.2",
        "Chain 15/10 on AED 8,000. NPER (3 d.p.)?",
        0.765,
        "A chain 15/10 is not 25% off. NPER = 0.85 × 0.90 = 0.765. Net would be 8,000 × 0.765 = 6,120.",
        "Complements, then multiply. Do not add 15 + 10.",
        "المتممات ثم الضرب. لا تجمع 15 + 10.",
        {
          tolerance: 0.001,
          explanationAr: "NPER = 0.85 × 0.90 = 0.765. الصافي = 8000 × 0.765 = 6120.",
          working: [
            part(
              "(a) NPER",
              "Complements of 15% and 10%",
              "متمما 15% و 10%",
              [
                L("NPER", "0.85 × 0.90"),
                L("", "0.765"),
              ],
              "NPER = 0.765.",
              "NPER = 0.765.",
            ),
          ],
        },
      ),
      n(
        "c22-q2",
        "CLO 2.2",
        "3/15 n/45, invoice AED 1,200, paid day 12. Amount paid?",
        1164,
        "3/15 means 3% if paid within 15 days. Day 12 is inside 15, so 3% of 1,200 = 36. Pay 1,200 − 36 = 1,164.",
        "Day 12 is inside 15 days, so the 3% cash discount applies.",
        "اليوم 12 داخل مهلة 15 يوماً، فيُحسب خصم 3%.",
        {
          unit: "AED",
          explanationAr: "اليوم 12 داخل 15 يوماً. خصم 3% × 1200 = 36. المدفوع = 1164.",
          working: [
            part(
              "(a) Cash",
              "Inside the 15-day window",
              "داخل مهلة 15 يوماً",
              [
                L("cash", "0.03 × 1,200 = 36"),
                L("paid", "1,200 − 36"),
                L("", "1,164"),
              ],
              "Paid = AED 1,164.",
              "المدفوع = 1164 درهماً.",
            ),
          ],
        },
      ),
      n(
        "c22-q3",
        "CLO 2.2",
        "List AED 3,200, trade 20%, then 1/10 paid on time. Amount paid?",
        2534.4,
        "Trade first: 3,200 × 0.80 = 2,560. Then 1% of that net: 0.01 × 2,560 = 25.60. Amount paid = 2,560 − 25.60 = 2,534.40.",
        "Trade first, cash second, always on the leftover.",
        "خصم التجارة أولاً، ثم الخصم النقدي على الصافي.",
        {
          unit: "AED",
          tolerance: 0.05,
          explanationAr: "بعد التجارة: 3200 × 0.80 = 2560. النقدي 1% × 2560 = 25.60. المدفوع = 2534.40.",
          working: [
            part(
              "(a) Paid",
              "Trade, then 1% cash",
              "التجارة ثم 1% نقداً",
              [
                L("trade-net", "3,200 × 0.80 = 2,560"),
                L("cash", "0.01 × 2,560 = 25.60"),
                L("paid", "2,560 − 25.60"),
                L("", "2,534.40"),
              ],
              "Paid = AED 2,534.40.",
              "المدفوع = 2534.40 درهماً.",
            ),
          ],
        },
      ),
      n(
        "c22-q4",
        "CLO 2.2",
        "Invoice 15 April, paid 24 April. How many days passed?",
        9,
        "Ordinary dating: days = payment − invoice = 24 − 15 = 9. Count starts the day after the invoice. Use the lecture calendar.",
        "Days = paid date − invoice date.",
        "الأيام = تاريخ الدفع − تاريخ الفاتورة.",
        { tolerance: 0, explanationAr: "24 − 15 = 9 أيام. العد يبدأ بعد يوم الفاتورة.", working: [part("(a) Days", "Paid minus invoice", "الدفع ناقص الفاتورة", [L("days", "24 − 15"), L("", "9")], "9 days.", "9 أيام.")] },
      ),
      n(
        "c22-q5",
        "CLO 2.2",
        "5/10 n/30, invoice $800 dated 15 April, paid 24 April. Amount paid?",
        760,
        "9 days ≤ 10, so 5% applies. Cash = 0.05 × 800 = 40. Paid = 800 − 40 = 760.",
        "9 days is inside 10. Take 5%.",
        "9 أيام داخل 10. خذ 5%.",
        { unit: "USD", tolerance: 0.05, explanationAr: "9 ≤ 10. خصم 5% × 800 = 40. المدفوع = 760.", working: [part("(a) Paid", "Inside the 10-day window", "داخل مهلة 10 أيام", [L("days", "24 − 15 = 9"), L("cash", "0.05 × 800 = 40"), L("paid", "800 − 40"), L("", "760")], "Paid = $760.", "المدفوع = 760.")] },
      ),
      n(
        "c22-q6",
        "CLO 2.2",
        "2/10 n/30, invoice $1,200 dated 20 May, paid 31 May. Amount paid?",
        1200,
        "31 − 20 = 11 days. 11 > 10, so the 2% is gone. Pay the full 1,200.",
        "11 days misses the 10-day window.",
        "11 يوماً تفوّت مهلة 10.",
        { unit: "USD", tolerance: 0, explanationAr: "31 − 20 = 11 > 10. لا خصم نقدي. المدفوع = 1200.", working: [part("(a) Paid", "Missed the window", "فاتت المهلة", [L("days", "31 − 20 = 11"), L("cash", "0"), L("paid", "1,200")], "Paid = $1,200.", "المدفوع = 1200.")] },
      ),
    ],
    writing: [
      {
        id: "c22-w1",
        prompt:
          "The bar chart tracks AED 9,000 after a 20/10/5 chain. (a) Why is this not 35% off? (b) Write NPER. (c) Write SEDR and the final net.",
        modelAnswer:
          "(a) Each discount is taken from what is left, not from 9,000 each time. 20+10+5 = 35 is the trap. (b) NPER = 0.80 × 0.90 × 0.95 = 0.684. (c) SEDR = 1 − 0.684 = 31.6%. Net = 9,000 × 0.684 = AED 6,156.",
        hint: "Multiply the three complements. The last bar is the net.",
        hintAr: "اضرب المتممات الثلاثة. العمود الأخير هو الصافي.",
        marks: ["NPER 0.684", "SEDR 31.6%", "Net 6156", "Say why not 35%"],
        chart: {
          kind: "bar",
          title: "AED 9,000 left after each rate in a 20/10/5 chain",
          unit: "AED",
          bars: [
            { label: "List", value: 9000 },
            { label: "After 20%", value: 7200 },
            { label: "After 10%", value: 6480 },
            { label: "After 5%", value: 6156 },
          ],
        },
      },
      {
        id: "c22-w2",
        prompt: "An HCT shop invoice is dated 15 April 2019 for AED 2,000, terms 2/10 n/30. Fatima pays on 24 April. Using the lecture calendar: (a) How many days passed? (b) Does the cash discount apply? (c) Amount paid?",
        modelAnswer: "(a) Days = 24 − 15 = 9. Start the day after the invoice. (b) Yes — 9 ≤ 10. (c) Cash = 0.02 × 2,000 = 40. Paid = 2,000 − 40 = AED 1,960.",
        hint: "Days = paid − invoice. Compare with 10. Then 2% of the invoice if inside.",
        hintAr: "الأيام = الدفع − الفاتورة. قارن مع 10. ثم 2% إن كانت داخل المهلة.",
        marks: ["9 days", "Inside the window", "Paid 1960"],
      },
    ],
  },
  {
    id: "clo-2-3",
    number: "2.3",
    title: "Gross pay on the basis of time",
    kicker: "52 · 26 · 24 · 12 · overtime 1.5",
    clo: "CLO 2",
    week: "Week 4",
    summary: "Annual ÷ 52 / 26 / 24 / 12. Overtime is 1.5 × rate after 40 hours. Gross = regular + OT.",
    blocks: [
      {
        type: "table",
        caption: "Pay periods in one year — write these four numbers",
        headers: ["How they are paid", "Periods", "Example AED 52,000"],
        rows: [
          ["Weekly", "52", "1,000"],
          ["Biweekly", "26", "2,000"],
          ["Semimonthly", "24", "2,166.67"],
          ["Monthly", "12", "4,333.33"],
        ],
      },
      {
        type: "callout",
        kind: "formula",
        title: "Overtime",
        text: "Regular hours = min(hours, 40). Regular pay = regular hours × rate. OT hours = max(hours − 40, 0). OT rate = 1.5 × rate. OT pay = OT hours × OT rate. Gross = regular + OT.",
        ar: "الأربعون الأولى بالسعر العادي. ما زاد يُحسب × 1.5. الإجمالي = العادي + الإضافي.",
      },
      {
        type: "work",
        question: "Sara earns AED 32 per hour and worked 48 hours. Overtime is 1.5 after 40.",
        parts: [
          part(
            "(a) Regular",
            "Pay for the first 40 hours.",
            "أجر أول 40 ساعة.",
            [
              L("regular h", "40"),
              L("regular", "40 × 32", undefined, "40 × السعر"),
              L("", "1,280"),
            ],
            "Regular = AED 1,280.",
            "العادي = 1280 درهماً.",
          ),
          part(
            "(b) Overtime",
            "Extra hours at 1.5 × rate.",
            "الساعات الزائدة × 1.5 × السعر.",
            [
              L("OT h", "48 − 40 = 8"),
              L("OT rate", "1.5 × 32 = 48"),
              L("OT pay", "8 × 48"),
              L("", "384"),
            ],
            "OT pay = AED 384.",
            "الإضافي = 384 درهماً.",
          ),
          part(
            "(c) Gross",
            "Add the two pieces.",
            "اجمع الجزأين.",
            [
              L("gross", "1,280 + 384"),
              L("", "1,664"),
            ],
            "Gross = AED 1,664. Trap: 48 × 32 = 1,536 forgets the extra half.",
            "الإجمالي = 1664. الفخ: 48 × 32 = 1536 ينسى النصف الإضافي.",
          ),
        ],
      },
      {
        type: "work",
        question: "Omar earns AED 38 per hour and worked 50 hours. OT is 1.5 after 40.",
        parts: [
          part(
            "(a) OT rate",
            "Time-and-a-half of 38.",
            "ساعة ونصف من 38.",
            [
              L("OT rate", "1.5 × 38"),
              L("", "57"),
            ],
            "OT rate = AED 57 / hour.",
            "سعر الإضافي = 57 درهماً للساعة.",
          ),
          part(
            "(b) OT pay",
            "Ten extra hours.",
            "عشر ساعات زائدة.",
            [
              L("OT h", "50 − 40 = 10"),
              L("OT pay", "10 × 57"),
              L("", "570"),
            ],
            "OT pay = AED 570.",
            "الإضافي = 570 درهماً.",
          ),
          part(
            "(c) Gross",
            "Regular plus OT.",
            "العادي + الإضافي.",
            [
              L("regular", "40 × 38 = 1,520"),
              L("gross", "1,520 + 570"),
              L("", "2,090"),
            ],
            "Gross = AED 2,090.",
            "الإجمالي = 2090 درهماً.",
          ),
        ],
      },
      {
        type: "work",
        question: "Annual salary AED 52,000. And a short week: 38 hours at AED 22 (no overtime).",
        parts: [
          part(
            "(a) Weekly",
            "52 pay periods.",
            "52 فترة دفع.",
            [
              L("weekly", "52,000 ÷ 52"),
              L("", "1,000"),
            ],
            "Weekly gross = AED 1,000.",
            "الأسبوعي = 1000 درهم.",
          ),
          part(
            "(b) Monthly",
            "12 pay periods — not 26.",
            "12 فترة — ليست 26.",
            [
              L("monthly", "52,000 ÷ 12"),
              L("", "4,333.33"),
            ],
            "Monthly = AED 4,333.33. Biweekly would be ÷ 26. Semimonthly ÷ 24.",
            "الشهري = 4333.33. كل أسبوعين ÷ 26. النصف شهري ÷ 24.",
          ),
          part(
            "(c) 38 h at 22",
            "Under 40 — no overtime.",
            "أقل من 40 — لا إضافي.",
            [
              L("gross", "38 × 22"),
              L("", "836"),
            ],
            "Gross = AED 836. Do not invent 1.5 here.",
            "الإجمالي = 836. لا تخترع 1.5 هنا.",
          ),
        ],
      },

      {
        type: "work",
        question: "Lecture: annual salary $31,200. Find weekly, biweekly and monthly gross.",
        parts: [
          part("(a) Weekly", "52 pay periods.", "52 فترة.", [L("weekly", "31,200 ÷ 52"), L("", "600")], "Weekly = $600.", "الأسبوعي = 600."),
          part("(b) Biweekly", "26 periods — not 24.", "26 فترة — ليست 24.", [L("biweekly", "31,200 ÷ 26"), L("", "1,200")], "Biweekly = $1,200.", "كل أسبوعين = 1200."),
          part("(c) Monthly", "12 periods.", "12 فترة.", [L("monthly", "31,200 ÷ 12"), L("", "2,600")], "Monthly = $2,600. Semimonthly would be ÷ 24 = 1,300.", "الشهري = 2600. النصف شهري ÷ 24 = 1300."),
        ],
      },
      {
        type: "work",
        question: "Lecture: $18 per hour, 45 hours. OT 1.5 after 40.",
        parts: [
          part("(a) Regular", "First 40 hours.", "أول 40 ساعة.", [L("regular", "40 × 18"), L("", "720")], "Regular = $720.", "العادي = 720."),
          part("(b) OT and gross", "5 extra hours at 1.5 × 18.", "5 ساعات × 1.5 × 18.", [L("OT rate", "1.5 × 18 = 27"), L("OT", "5 × 27 = 135"), L("gross", "720 + 135"), L("", "855")], "Gross = $855. Trap: 45 × 18 = 810 forgets the extra half.", "الإجمالي = 855. الفخ: 45 × 18 = 810."),
        ],
      },
      {
        type: "work",
        question: "Lecture: $15 per hour, 50 hours. OT 1.5 after 40.",
        parts: [
          part("(a) OT rate", "Time-and-a-half of 15.", "ساعة ونصف من 15.", [L("OT rate", "1.5 × 15"), L("", "22.50")], "OT rate = $22.50 / hour.", "سعر الإضافي = 22.50."),
          part("(b) Gross", "10 extra hours.", "10 ساعات زائدة.", [L("regular", "40 × 15 = 600"), L("OT", "10 × 22.50 = 225"), L("gross", "600 + 225"), L("", "825")], "Gross = $825.", "الإجمالي = 825."),
        ],
      },
      {
        type: "callout",
        kind: "trap",
        title: "Biweekly is not semimonthly",
        text: "Biweekly = every two weeks = 26. Semimonthly = twice a month = 24. Mixing them is a free mark lost.",
        ar: "كل أسبوعين = 26. النصف شهري = 24. الخلط بينهما يضيّع درجة.",
      },
    ],
    mcqs: [
      n(
        "c23-q1",
        "CLO 2.3",
        "Annual AED 39,000, monthly. Gross this month?",
        3250,
        "A year has 12 months. Monthly gross = 39,000 ÷ 12 = 3,250. Do not use 52 (weekly) or 26 (biweekly) or 24 (semimonthly).",
        "12 months in a year, not 52.",
        "السنة = 12 شهراً، ليست 52.",
        {
          unit: "AED",
          tolerance: 0,
          explanationAr: "الشهري = السنوي ÷ 12 = 39000 ÷ 12 = 3250.",
          working: [
            part(
              "(a) Monthly",
              "Annual ÷ 12",
              "السنوي ÷ 12",
              [L("monthly", "39,000 ÷ 12"), L("", "3,250")],
              "AED 3,250.",
              "3250 درهماً.",
            ),
          ],
        },
      ),
      n(
        "c23-q2",
        "CLO 2.3",
        "46 h at AED 28, OT 1.5 after 40. Gross?",
        1372,
        "First 40 hours: 40 × 28 = 1,120. Extra hours = 6. OT rate = 1.5 × 28 = 42. OT pay = 6 × 42 = 252. Gross = 1,120 + 252 = 1,372. Trap: 46 × 28 = 1,288 forgets the extra half.",
        "40 at the ordinary rate, then extra hours at 1.5 × rate.",
        "40 بالسعر العادي، ثم الساعات الزائدة × 1.5.",
        {
          unit: "AED",
          explanationAr: "العادي 40 × 28 = 1120. الإضافي 6 × 42 = 252. الإجمالي = 1372.",
          working: [
            part(
              "(a) Gross",
              "Regular + OT",
              "العادي + الإضافي",
              [
                L("regular", "40 × 28 = 1,120"),
                L("OT rate", "1.5 × 28 = 42"),
                L("OT", "6 × 42 = 252"),
                L("gross", "1,120 + 252"),
                L("", "1,372"),
              ],
              "Gross = AED 1,372.",
              "الإجمالي = 1372 درهماً.",
            ),
          ],
        },
      ),
      n(
        "c23-q3",
        "CLO 2.3",
        "36 h at AED 40. Gross? (No OT.)",
        1440,
        "36 is under 40, so there is no overtime. Gross = 36 × 40 = 1,440. Do not invent 1.5 here.",
        "Under 40 hours → just hours × rate.",
        "أقل من 40 ساعة → الساعات × السعر فقط.",
        {
          unit: "AED",
          explanationAr: "36 أقل من 40 فلا يوجد إضافي. الإجمالي = 36 × 40 = 1440.",
          working: [
            part(
              "(a) Gross",
              "Straight time",
              "وقت عادي فقط",
              [L("gross", "36 × 40"), L("", "1,440")],
              "Gross = AED 1,440.",
              "الإجمالي = 1440 درهماً.",
            ),
          ],
        },
      ),
    ],
    writing: [
      {
        id: "c23-w1",
        prompt:
          "The chart is Hamad’s week: 40 ordinary hours and 4 overtime hours at AED 45/h (OT 1.5 after 40). (a) Regular pay. (b) OT pay. (c) Gross.",
        modelAnswer:
          "(a) Regular = 40 × 45 = AED 1,800. (b) OT rate = 1.5 × 45 = 67.50. OT = 4 × 67.50 = AED 270. (c) Gross = 1,800 + 270 = AED 2,070.",
        hint: "Three lines: 40 × rate, extra hours × 1.5 × rate, then add.",
        hintAr: "ثلاثة أسطر: 40 × السعر، ثم الساعات الزائدة × 1.5 × السعر، ثم الجمع.",
        marks: ["Regular 1800", "OT rate 67.50", "OT 270", "Gross 2070"],
        chart: {
          kind: "bar",
          title: "Hamad’s week · hours at AED 45 (OT 1.5 after 40)",
          unit: "hours",
          bars: [
            { label: "Regular", value: 40 },
            { label: "Overtime", value: 4 },
            { label: "Total", value: 44 },
          ],
        },
      },
    ],
  },
  {
    id: "clo-2-4",
    number: "2.4",
    title: "Piecework and commission",
    kicker: "Piece · draw · variable · salary plus",
    clo: "CLO 2",
    week: "Week 4",
    summary: "Piece rate × units. Differential bands. Commission minus draw. Variable bands. Salary plus commission over a quota.",
    blocks: [
      {
        type: "cards",
        items: [
          {
            kicker: "Straight piece",
            title: "Units × rate",
            body: "400 dolls at AED 1.50 → 600. One rate, multiply.",
            ar: "الوحدات × السعر. 400 × 1.50 = 600.",
          },
          {
            kicker: "Differential piece",
            title: "Different rates in bands",
            body: "1–100 at 1.00, 101–200 at 1.25, 201+ at 1.50. Split the units, then add.",
            ar: "شرائح بأسعار مختلفة. قسّم الوحدات ثم اجمع.",
          },
          {
            kicker: "Commission with draw",
            title: "Rate × sales − draw",
            body: "Draw is an advance already paid. Commission first, then subtract the draw.",
            ar: "السلفة مبلغ مدفوع مقدماً. احسب العمولة ثم اطرح السلفة.",
          },
          {
            kicker: "Variable + salary plus",
            title: "Bands, or salary + extra",
            body: "Read the stem: “5% of all sales” is not “5% of sales over the quota”.",
            ar: "اقرأ السؤال: 5% من كل المبيعات ليست 5% مما فوق الحد.",
          },
        ],
      },

      {
        type: "work",
        question: "Straight piecework: 400 units at $2.50 each.",
        parts: [
          part("(a) Gross", "One rate, multiply.", "سعر واحد، اضرب.", [L("gross", "400 × 2.50"), L("", "1,000")], "Gross = $1,000.", "الإجمالي = 1000."),
        ],
      },
      {
        type: "work",
        question:
          "Differential piecework: first 100 units AED 1.00, next 100 AED 1.25, remaining AED 1.50. A worker makes 250 units.",
        parts: [
          part(
            "(a) Split 250",
            "Which units sit in which band?",
            "أي وحدات في أي شريحة؟",
            [
              L("band 1", "100 units at 1.00"),
              L("band 2", "100 units at 1.25"),
              L("band 3", "50 units at 1.50", "250 − 100 − 100", "250 − 100 − 100"),
            ],
            "100 + 100 + 50.",
            "100 + 100 + 50.",
          ),
          part(
            "(b) Pay",
            "Multiply each band, then add.",
            "اضرب كل شريحة ثم اجمع.",
            [
              L("band 1", "100 × 1.00 = 100"),
              L("band 2", "100 × 1.25 = 125"),
              L("band 3", "50 × 1.50 = 75"),
              L("gross", "100 + 125 + 75"),
              L("", "300"),
            ],
            "Gross = AED 300. Trap: 250 × 1.50 = 375 pretends every unit earned the top rate.",
            "الإجمالي = 300. الفخ: 250 × 1.50 = 375.",
          ),
        ],
      },
      {
        type: "work",
        question: "Jackie earns 15% commission on AED 56,000 sales, minus a draw of AED 600.",
        parts: [
          part(
            "(a) Commission",
            "Rate times sales, before the draw.",
            "النسبة × المبيعات قبل السلفة.",
            [
              L("commission", "0.15 × 56,000", undefined, "0.15 × 56000"),
              L("", "8,400"),
            ],
            "Commission = AED 8,400.",
            "العمولة = 8400 درهم.",
          ),
          part(
            "(b) Pay",
            "Subtract the draw — it was an advance.",
            "اطرح السلفة — كانت مقدماً.",
            [
              L("pay", "8,400 − 600"),
              L("", "7,800"),
            ],
            "Pay = AED 7,800. Do not subtract 600 from 56,000.",
            "الأجر = 7800. لا تطرح 600 من 56000.",
          ),
        ],
      },
      {
        type: "work",
        question:
          "Jane’s variable scale is 5% on the first 10,000, 7% on the next 10,000, 10% on the rest. Sales AED 25,000. Joe has salary AED 3,000 plus 4% of sales over AED 20,000; his sales are AED 50,000.",
        parts: [
          part(
            "(a) Jane",
            "Three bands — the last is only 5,000.",
            "ثلاث شرائح — الأخيرة 5000 فقط.",
            [
              L("5%", "10,000 × 0.05 = 500"),
              L("7%", "10,000 × 0.07 = 700"),
              L("10%", "5,000 × 0.10 = 500", "25,000 − 20,000", "25000 − 20000"),
              L("total", "500 + 700 + 500"),
              L("", "1,700"),
            ],
            "Jane = AED 1,700.",
            "جين = 1700 درهم.",
          ),
          part(
            "(b) Joe",
            "Commission only on the extra above the quota.",
            "العمولة فقط على ما فوق الحد.",
            [
              L("extra", "50,000 − 20,000 = 30,000"),
              L("commission", "0.04 × 30,000 = 1,200"),
              L("gross", "3,000 + 1,200"),
              L("", "4,200"),
            ],
            "Joe = AED 4,200. Trap: 4% of all 50,000 would be 2,000 + salary = 5,000.",
            "جو = 4200. الفخ: 4% من كل 50000.",
          ),
        ],
      },
      {
        type: "callout",
        kind: "exam",
        title: "Read the stem",
        text: "“5% of all sales” is not the same as “5% of sales over AED 15,000”. One sentence changes the whole working.",
        ar: "5% من كل المبيعات ليست 5% مما فوق 15000. جملة واحدة تغيّر الحل.",
      },
    ],
    mcqs: [
      n(
        "c24-q1",
        "CLO 2.4",
        "180 units: 100 at AED 2.00, remaining at AED 2.50. Gross?",
        400,
        "First 100 × 2.00 = 200. Remaining 80 × 2.50 = 200. Gross = 200 + 200 = 400. Trap: 180 × 2.50 = 450 pretends every unit earned the top rate.",
        "Split 180 into the two bands, then add.",
        "قسّم 180 إلى شريحتين ثم اجمع.",
        {
          unit: "AED",
          explanationAr: "100×2 = 200، 80×2.50 = 200. الإجمالي 400.",
          working: [
            part(
              "(a) Gross",
              "Two bands",
              "شريحتان",
              [
                L("band 1", "100 × 2.00 = 200"),
                L("band 2", "80 × 2.50 = 200"),
                L("gross", "200 + 200"),
                L("", "400"),
              ],
              "Gross = AED 400.",
              "الإجمالي = 400 درهم.",
            ),
          ],
        },
      ),
      n(
        "c24-q2",
        "CLO 2.4",
        "6% of AED 20,000 minus draw 350. Pay?",
        850,
        "Commission first: 0.06 × 20,000 = 1,200. A draw is an advance already paid, so subtract it: 1,200 − 350 = 850. Do not subtract the draw from sales.",
        "Commission then subtract the draw.",
        "احسب العمولة ثم اطرح السلفة.",
        {
          unit: "AED",
          explanationAr: "العمولة = 0.06 × 20000 = 1200. السلفة تُطرح بعدها: 1200 − 350 = 850.",
          working: [
            part(
              "(a) Pay",
              "Commission minus draw",
              "العمولة ناقص السلفة",
              [
                L("commission", "0.06 × 20,000 = 1,200"),
                L("pay", "1,200 − 350"),
                L("", "850"),
              ],
              "Pay = AED 850.",
              "الأجر = 850 درهماً.",
            ),
          ],
        },
      ),
      n(
        "c24-q3",
        "CLO 2.4",
        "Salary 2,500 + 5% of sales over 8,000. Sales 14,000. Gross?",
        2800,
        "The 5% is only on the extra above the quota. Extra = 14,000 − 8,000 = 6,000. Commission = 0.05 × 6,000 = 300. Gross = 2,500 + 300 = 2,800. Trap: 5% of all 14,000 would be 700 plus salary = 3,200.",
        "Only the extra 6,000 earns 5%. Then add salary.",
        "فقط الـ 6000 فوق الحد تكسب 5%. ثم أضف الراتب.",
        {
          unit: "AED",
          explanationAr: "الزيادة = 14000 − 8000 = 6000. العمولة = 0.05 × 6000 = 300. الإجمالي = 2500 + 300 = 2800.",
          working: [
            part(
              "(a) Gross",
              "Salary plus commission over quota",
              "راتب + عمولة فوق الحد",
              [
                L("extra", "14,000 − 8,000 = 6,000"),
                L("commission", "0.05 × 6,000 = 300"),
                L("gross", "2,500 + 300"),
                L("", "2,800"),
              ],
              "Gross = AED 2,800.",
              "الإجمالي = 2800 درهم.",
            ),
          ],
        },
      ),
    ],
    writing: [
      {
        id: "c24-w1",
        prompt:
          "The bar chart is Fatima’s AED 18,000 sales split into 5% on the first 8,000 and 8% on the rest. (a) Commission on each bar. (b) Total pay. (c) Why is the second bar not 8,000?",
        modelAnswer:
          "(a) First 8,000 × 5% = 400. Rest 10,000 × 8% = 800. (b) Total = 400 + 800 = AED 1,200. (c) The second bar is 10,000 because 18,000 − 8,000 = 10,000 — she did not fill another 8,000 band.",
        hint: "The leftover after the first 8,000 is 10,000. Do not take 8% of 18,000.",
        hintAr: "ما تبقى بعد أول 8000 هو 10000. لا تأخذ 8% من 18000 كلها.",
        marks: ["400 + 800", "Total 1200", "Second band 10000"],
        chart: {
          kind: "bar",
          title: "Fatima’s AED 18,000 sales · two commission bands",
          unit: "AED sales",
          bars: [
            { label: "5% band", value: 8000 },
            { label: "8% band", value: 10000 },
          ],
        },
      },
    ],
  },
];

const topicSlides: Record<string, NonNullable<Topic["slides"]>> = {
  "clo-1-1": {
    href: "/lectures/CLO-1.1-Statistical-Terms.pptx",
    filename: "CLO-1.1-Statistical-Terms.pptx",
    label: "CLO 1.1 lecture · PowerPoint",
  },
  "clo-1-2": {
    href: "/lectures/CLO-1.2-Frequency-Distributions.pptx",
    filename: "CLO-1.2-Frequency-Distributions.pptx",
    label: "CLO 1.2 lecture · PowerPoint",
  },
  "clo-1-3": {
    href: "/lectures/CLO-1.3-Histograms-and-Graphs.pdf",
    filename: "CLO-1.3-Histograms-and-Graphs.pdf",
    label: "CLO 1.3 lecture · PDF",
  },
  "clo-1-4": {
    href: "/lectures/CLO-1.4-Mean-Median-Mode.pdf",
    filename: "CLO-1.4-Mean-Median-Mode.pdf",
    label: "CLO 1.4 lecture · PDF",
  },
  "clo-1-5": {
    href: "/lectures/CLO-1.5-Range-Variance-SD.pdf",
    filename: "CLO-1.5-Range-Variance-SD.pdf",
    label: "CLO 1.5 lecture · PDF",
  },
  "clo-2-1": {
    href: "/lectures/CLO-2.1-Trade-Discount.pdf",
    filename: "CLO-2.1-Trade-Discount.pdf",
    label: "CLO 2.1 lecture · PDF",
  },
  "clo-2-2": {
    href: "/lectures/CLO-2.2-Chain-and-Cash-Discount.pdf",
    filename: "CLO-2.2-Chain-and-Cash-Discount.pdf",
    label: "CLO 2.2 lecture · PDF",
  },
  "clo-2-3": {
    href: "/lectures/CLO-2.3-Gross-Pay-Time.pdf",
    filename: "CLO-2.3-Gross-Pay-Time.pdf",
    label: "CLO 2.3 lecture · PDF",
  },
  "clo-2-4": {
    href: "/lectures/CLO-2.4-Piecework-and-Commission.pdf",
    filename: "CLO-2.4-Piecework-and-Commission.pdf",
    label: "CLO 2.4 lecture · PDF",
  },
};

export const bus1023: Course = {
  id: "bus-1023",
  code: "BUS 1023",
  shortName: "Applied Mathematics",
  title: "Applied Mathematics for Business",
  subtitle: "Statistics · trade discount · payroll",
  examLabel: "Week 5 exam · four example tests · CLO 1 & CLO 2",
  weeks: "Weeks 1–4",
  clos: [
    "CLO 1 — Statistical terms, frequency tables, graphs, centre and spread",
    "CLO 2 — Trade / chain / cash discount and gross pay (time, piece, commission)",
  ],
  color: "navy",
  topics: topics.map((t) => ({ ...t, slides: topicSlides[t.id] })),
  pack: {
    title: "Lecture slides zip",
    note: "All nine CLO files · PowerPoint and PDF from the HCT lectures, including the Casio Calculator Guide.",
    href: "/bus-1023-lectures.zip",
    filename: "BUS-1023-lecture-slides.zip",
  },
  examModules: bus1023ExamModules,
  finalExam: {
    intro: "Untimed mixed paper across CLO 1 and CLO 2. Typed numbers auto-grade. Use it after the four example tests, not instead of them.",
    mcqs: [
      choice("bf-q1", "CLO 1.1", "A student ID is…", [
        "Quantitative",
        "Qualitative — a label",
        "A sample mean",
        "Continuous"
      ], 1, "H000482190 looks like a number, but it is just a name for a student. You cannot add two IDs and get a useful total, so it is qualitative (a label).", "Label or measurement?", "رمز أم قياس؟", { explanationAr: "الرقم الجامعي اسم/رمز وليس قياساً. لا يُحسب له متوسط، فهو نوعي." }),
      n("bf-q2", "CLO 1.2", "Class width from range 58 and 5 classes (round up)?", 12, "The 58 is already the range: hottest 125 minus coldest 67. Width = 58 ÷ 5 = 11.6, then always round UP to 12 so that 125 still fits in a class.", "Always round width up.", "قرّب عرض الفئة للأعلى.", {
        tolerance: 0,
        explanationAr: "58 هو المدى (125 − 67). عرض الفئة = 58 ÷ 5 = 11.6 → 12 حتى يبقى 125 داخل فئة."
      }),
      n("bf-q3", "CLO 1.3", "25% pie slice. Angle?", 90, "25 × 3.6 = 90°.", "× 3.6.", "× 3.6.", {
        unit: "°",
        tolerance: 0
      }),
      n("bf-q4", "CLO 1.4", "Scores 82, 79, 74, 85. Mean?", 80, "320 / 4 = 80.", "Add, divide by 4.", "اجمع واقسم على 4.", { tolerance: 0 }),
      n("bf-q5", "CLO 1.5", "Max 78, min 72. Range?", 6, "78 − 72 = 6.", "Max − min.", "الأكبر − الأصغر.", { tolerance: 0 }),
      n("bf-q6", "CLO 2.1", "List 1,200, 20% trade. Net?", 960, "1,200 × 0.80 = 960.", "Complement 0.80.", "المتمم 0.80.", { unit: "AED" }),
      n("bf-q7", "CLO 2.2", "NPER for 10/5 as a decimal (3 d.p.).", .855, "0.9 × 0.95 = 0.855.", "Multiply complements.", "اضرب المتممات.", { tolerance: .001 }),
      n("bf-q8", "CLO 2.3", "45 h at 20, OT 1.5 after 40. Gross?", 950, "800 + 150 = 950.", "40 × 20, then 5 × 30.", "40 × 20 ثم 5 × 30.", { unit: "AED" }),
      n("bf-q9", "CLO 2.4", "400 units at 1.50. Gross?", 600, "400 × 1.50 = 600.", "Units × rate.", "وحدات × سعر.", { unit: "AED" }),
      n("bf-q10", "CLO 2.3", "Semimonthly periods in a year?", 24, "Twice a month × 12 = 24.", "Not 26.", "ليس 26.", { tolerance: 0 })
    ],
    writing: [{
      id: "bf-w1",
      prompt: "The pie is 50 HCT students’ favourite campus café. (a) Angle for Karak. (b) How many students chose Smoothie? (c) How many chose Karak or Water?",
      modelAnswer: "(a) Karak 40%. Angle = 40 × 3.6 = 144°. (b) Smoothie 10% of 50 = 5 students. (c) Karak or Water = 40% + 30% = 70%. 0.70 × 50 = 35 students.",
      hint: "Angle = % × 3.6. People = % × 50.",
      hintAr: "الزاوية = النسبة × 3.6. عدد الأشخاص = النسبة × 50.",
      marks: [
        "Karak 144°",
        "Smoothie 5",
        "Karak or Water 35"
      ],
      chart: {
        kind: "pie",
        title: "50 HCT students · favourite campus café",
        slices: [
          {
            label: "Karak 40%",
            value: 40
          },
          {
            label: "Water 30%",
            value: 30
          },
          {
            label: "Juice 20%",
            value: 20
          },
          {
            label: "Smoothie 10%",
            value: 10
          }
        ]
      }
    }, {
      id: "bf-w2",
      prompt: "The bars are leftover AED after a 20/10/5 chain on 5,000. Why is this not 35% off? Write NPER, SEDR and the net from the last bar.",
      modelAnswer: "Each rate is taken from what is left. NPER = 0.80 × 0.90 × 0.95 = 0.684. SEDR = 1 − 0.684 = 31.6%, not 35%. Net = 5,000 × 0.684 = AED 3,420, which matches the last bar.",
      hint: "Multiply complements. 20+10+5 = 35 is the trap.",
      hintAr: "اضرب المتممات. جمع 20+10+5 = 35 هو الفخ.",
      marks: [
        "NPER 0.684",
        "SEDR 31.6%",
        "Net 3420",
        "Not 35%"
      ],
      chart: {
        kind: "bar",
        title: "AED 5,000 left after each rate in a 20/10/5 chain",
        unit: "AED",
        bars: [
          {
            label: "List",
            value: 5e3
          },
          {
            label: "After 20%",
            value: 4e3
          },
          {
            label: "After 10%",
            value: 3600
          },
          {
            label: "After 5%",
            value: 3420
          }
        ]
      }
    }]
  },
  summarySheet: {
    title: "BUS 1023 memory sheet",
    intro: "One page before the four example tests. Write the formula, then one AED or class number.",
    rows: [
      {
        idea: "Population / sample",
        remember: "Whole group vs the people you actually asked (Etisalat, 30 companies)."
      },
      {
        idea: "Qualitative vs quantitative",
        remember: "ID numbers and cloudy weather are qualitative. Kg and % scores are quantitative."
      },
      {
        idea: "Discrete vs continuous",
        remember: "Count (pizzas) vs measure (weight, time, km). Arabic: منفصل = نعدّه. متصل = نقيسه."
      },
      {
        idea: "Class width",
        remember: "Range ÷ classes, ALWAYS round up. Width = difference of consecutive lower limits."
      },
      {
        idea: "Boundaries",
        remember: "Lower − 0.5, upper + 0.5."
      },
      {
        idea: "Pie angle",
        remember: "% × 3.6°."
      },
      {
        idea: "Mean / median / mode",
        remember: "Σx/n · sort then middle · most often (just look). Casio mean: MODE → 2 STAT → 1-VAR → SHIFT 1 → 5:VAR → 2: x̄."
      },
      {
        idea: "Grouped mean",
        remember: "Σ(f × midpoint) / Σf. Midpoint = (L + U) / 2. Casio: x = midpoint, FREQ = f, then x̄."
      },
      {
        idea: "Range / SD / variance",
        remember: "Max−min. Casio: σx or sx, then x² for variance. SD = √variance (SHIFT x²). Sample S uses n−1. Smaller SD = more consistent."
      },
      {
        idea: "Trade discount",
        remember: "Net = List × (1−R). List = Net / (1−R). Desk 1,099 at 25% → 824.25."
      },
      {
        idea: "Chain",
        remember: "NPER = product of complements. SEDR = 1 − NPER. Never add the percents."
      },
      {
        idea: "Cash terms",
        remember: "2/10 n/30. Ordinary dating: days = paid − invoice, start the day after. Miss the window → 0 cash. Cash after trade. Use the 2019 lecture calendar."
      },
      {
        idea: "Pay periods",
        remember: "Weekly 52, biweekly 26, semimonthly 24, monthly 12."
      },
      {
        idea: "Overtime",
        remember: "40 × rate + (hours−40) × 1.5 × rate. Abdullah 52 h at 100 → 5,800."
      },
      {
        idea: "Piece / commission",
        remember: "Units × rate. Commission − draw. Variable bands. Salary + % over quota."
      }
    ],
    closing: "Sit Example Tests 1–4 in order. Tests 1–2 no calculator. Tests 3–4 calculator on. Numbers mark themselves."
  }
};