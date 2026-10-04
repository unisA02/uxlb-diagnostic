// =====================================================================
// UX Elbi Diagnostic: everything you edit lives in this one file.
// No other file needs changes for a new batch.
// =====================================================================

window.TEST_CONFIG = {
  org: "UX Elbi",
  title: "General Assembly Diagnostic Assessment & Member Survey",
  edition: "2026-10", // change per batch so exports can be filtered

  // Supabase project settings (Project settings > API)
  supabase: {
    url: "https://kgdcwlvyuvyshmtuthyx.supabase.co/rest/v1/",
    anonKey: "sb_publishable_EDST_X3muhwlV8ka1aphDQ_6VvJAspy",
  },

  // Who may take it. Set to null to allow any email.
  emailDomain: "up.edu.ph",

  // Optional window. ISO strings in Manila time, or null for always open.
  opensAt: null,          // e.g. "2026-10-10T18:00:00+08:00"
  closesAt: null,         // e.g. "2026-10-17T23:59:00+08:00"

  // Show the taker their Part 1 score on the final screen?
  // If true, you must also fill answerKey below. Anything in this file is
  // visible to anyone who views the page source, so only do this if you
  // are fine with the key being public after the test closes.
  showScore: false,
  answerKey: null, // e.g. { q1: 1, q2: 0, q3: 2, q4: 0, q5: 1, q6: 0, q7: 0, q8: 0 } (0-based option index)

  intro: [
    "Answer all sections carefully. Real-world observation and design intuition are tested in the multiple-choice section; pick the best, most grounded response because the options are complex.",
    "Each part has its own timer. When it runs out, you move to the next part automatically. You cannot go back.",
    "Stay on this tab for the whole test. Leaving it is recorded.",
    "This is a diagnostic. Your score does not affect your membership or standing. It helps us decide what to teach.",
  ],

  sections: [
    {
      id: "part1",
      title: "Part 1: Observation and Design Principles",
      minutes: 8,
      onePerScreen: true,     // one question at a time, no going back
      shuffleOptions: true,
      questions: [
        {
          id: "q1", type: "choice", image: "img/q1-door.png",
          text: "A heavy glass door at the campus library has flat brass plates on both sides. A student walking out pushes the plate, the door does not move, and they end up pulling the side edge with their fingers. What is the primary failure?",
          options: [
            "Missing feedback: nothing tells the student the push failed until they have already committed to it.",
            "Mismatched signifier: the plate invites pushing on a side that mechanically requires pulling.",
            "Missing constraint: the hardware permits the wrong action instead of physically blocking it.",
            "Poor discoverability: the pull edge is not visible until after the first attempt fails.",
          ],
        },
        {
          id: "q2", type: "choice", image: "img/q2-poster.png",
          text: "A student council publicity poster displays the event title, guest speakers, date, room venue, and registration deadline in different ornate decorative typefaces, but all set at approximately 24pt bold. Viewers consistently report feeling overwhelmed and missing the event location. What cognitive design breakdown occurred?",
          options: [
            "No typographic hierarchy, so the eye has no entry point and no order in which to read.",
            "Decorative typefaces lose legibility at body sizes, so individual words are hard to parse.",
            "Too many separate items for working memory to hold at once, so details are dropped.",
            "Low contrast between the text and the yellow background reduces readability.",
          ],
        },
        {
          id: "q3", type: "choice",
          text: "The student affairs office wants to understand why freshies and transferees frequently arrive late to their assigned lecture halls during the first two weeks of classes. Which research approach produces the most valid behavioral evidence of where the system breaks down?",
          options: [
            "Deploying an online survey to all incoming students asking them to list the buildings that were confusing to locate.",
            "Conducting a post-orientation focus group discussion with student leaders who answered freshie inquiries.",
            "Contextual observation and intercept walk-alongs shadowing new students as they navigate campus routes between back-to-back classes.",
            "Auditing existing campus maps against building CAD blueprints to verify spatial accuracy.",
          ],
        },
        {
          id: "q4", type: "choice", image: "img/q4-stove.png",
          text: "A dorm pantry has a four-burner stove: the burners sit in a 2x2 square, but the four control knobs are in a straight line along the front. Residents regularly turn on the wrong burner, and two pot handles have melted this semester. What is the primary design failure?",
          options: [
            "Poor natural mapping: the layout of the knobs does not correspond to the layout of the burners.",
            "Missing feedback: electric burners take time to glow, so users cannot see which one turned on.",
            "Missing signifiers: the knobs lack labels or icons showing which burner each controls.",
            "Inadequate constraints: nothing stops a user from turning on a burner with nothing on it.",
          ],
        },
        {
          id: "q5", type: "choice",
          text: "The registrar posts a clear, well-designed 12-step flowchart of the enrollment process at the office entrance. After a month, students still ask the guard the same questions at the same rate. What is the most likely explanation?",
          options: [
            "The flowchart needs a stronger visual hierarchy so the key steps stand out.",
            "The information arrives at the wrong moment: students need one step when they are stuck at it, not all twelve at the door.",
            "The flowchart is in English only, so many students cannot follow it.",
            "Twelve steps is too many to display; the process itself should be shortened first.",
          ],
        },
        {
          id: "q6", type: "choice",
          text: "During enlistment, a student clicks \"Enlist\" on a course. The page does not change for about eight seconds. The student clicks again and gets an error saying the course is already in their list. Which heuristic was violated first?",
          options: [
            "Visibility of system status: nothing told the student the first click was being processed.",
            "Error prevention: the button should have been disabled after the first click.",
            "Help users recognize and recover from errors: the message should explain what to do next.",
            "Flexibility and efficiency of use: the system should let experienced users skip confirmation.",
          ],
        },
        {
          id: "q7", type: "choice", image: "img/q7-faucet.png",
          text: "A newly renovated dorm bathroom has two-handle faucets with hot water on the right and cold on the left, the reverse of every other faucet on campus. Residents keep getting scalded on the first turn, even after living there for weeks. What is the primary problem?",
          options: [
            "Consistency and standards: the faucet breaks a convention users carry from every other faucet they have used.",
            "Feedback: hot water takes a few seconds to arrive, so the user cannot tell which handle is hot.",
            "Missing signifier: the handles lack red and blue markers.",
            "Affordance: the handles do not clearly show which way to turn.",
          ],
        },
        {
          id: "q8", type: "choice",
          text: "A scholarship form rejects a submission with the message \"Error 0x2A: invalid input\" at the top of the page. No field is highlighted, and the student has to guess which of 30 fields is wrong. Which heuristic is violated?",
          options: [
            "Help users recognize, diagnose, and recover from errors: the message should say which field failed and why, in plain language.",
            "Error prevention: the form should not have allowed the invalid input in the first place.",
            "Visibility of system status: the form should show a progress indicator.",
            "Help and documentation: the form should link to a guide explaining error codes.",
          ],
        },
      ],
    },

    {
      id: "part2",
      title: "Part 2: Real-World Service Design Teardown",
      minutes: 9,
      onePerScreen: false,    // whole part on one screen, scroll freely
      questions: [
        {
          id: "scenario", type: "choice", shuffle: false,
          text: "Select ONE campus touchpoint to analyze. The next three questions are about it.",
          options: [
            "Scenario A (Physical Navigation and Space): The queueing system at the university health service",
            "Scenario B (Service Process and Information Flow): The dorm application, slot appeals, and payment confirmation process for incoming students",
          ],
        },
        {
          id: "friction", type: "text", rows: 6,
          label: "Root-Cause Friction Analysis",
          text: "Identify two specific friction points in this touchpoint. Distinguish between the visible symptom (what a user sees go wrong) and the underlying root cause (why the system or environment allows it to happen). 3 to 4 sentences.",
        },
        {
          id: "intervention", type: "text", rows: 6,
          label: "Low-Fidelity Intervention",
          text: "Propose a practical, non-software solution (for example environmental cues, spatial zoning, procedural sequencing, physical signifiers, or role re-delegation) that directly addresses one root cause identified above. Describe how it functions during peak hours. 3 to 4 sentences.",
        },
        {
          id: "evaluation", type: "text", rows: 5,
          label: "Evaluation and Unintended Consequences",
          text: "How will you evaluate whether this intervention improved the experience? Identify one potential unintended bottleneck or edge case this solution might introduce. 2 to 3 sentences.",
        },
      ],
    },

    {
      id: "part3",
      title: "Part 3: Member Experience and Learning Goals",
      minutes: null,          // null = no timer
      onePerScreen: false,
      questions: [
        { id: "fullName", type: "short", label: "Full name", required: true },
        { id: "nickname", type: "short", label: "Preferred nickname" },
        { id: "program", type: "short", label: "Degree program and year level", required: true },

        {
          id: "comfort", type: "grid",
          text: "Rate your comfort level in each area.",
          scale: [
            "1 = never done it",
            "2 = read about it or watched it done",
            "3 = did it once in a class or project",
            "4 = did it more than once and can do it without guidance",
            "5 = could teach it to a new member",
          ],
          rows: [
            { id: "research", label: "User Research and Observation (interviews, field observations, journey mapping)" },
            { id: "visual", label: "Visual Design and Communication (hierarchy, layout, typography, Figma/Canva)" },
            { id: "service", label: "Service and Systems Design (physical spaces, workflow mapping, public operations)" },
            { id: "prototyping", label: "Prototyping and Making (wireframes, physical mockups, low-fidelity test builds)" },
          ],
        },
        {
          id: "focus", type: "multi", max: 3,
          text: "What focus areas are you most excited to contribute to or learn about in UX Elbi? Pick your top 2 to 3.",
          options: [
            "Campus Ethnography and Qualitative Fieldwork",
            "Public Service Design and Institutional Workflow Reform",
            "Information Architecture and Usability Evaluation",
            "Visual Identity, Design Systems and UI",
            "Spatial and Environmental Wayfinding Design",
            "Accessibility and Universal Design Audits",
          ],
        },
        {
          id: "challenge", type: "text", rows: 4,
          label: "Real-World Challenge",
          text: "Name one physical space, bureaucratic process, or everyday touchpoint in UPLB that causes you the most frustration. What is the single biggest reason it fails?",
        },
      ],
    },
  ],
};
