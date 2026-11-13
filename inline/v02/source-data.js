window.UKWA_SOURCE = {
  "ppe": [
    {
      "id": "helmet",
      "name": "Safety helmet",
      "x": 78,
      "y": 12,
      "title": "A crack before you start",
      "scenario": "Your task requires a safety helmet. During your check, you find that it is damaged. What do you do?",
      "choices": [
        "Wear it for this shift and report it later.",
        "Do not use it. Tell your supervisor and follow site instructions.",
        "Cover the damage and carry on."
      ],
      "correct": 1,
      "why": "Do not use damaged PPE. Tell your supervisor and follow your site’s instructions before starting.",
      "check": "Check required PPE is undamaged and fits you."
    },
    {
      "id": "eyes",
      "name": "Eye protection",
      "x": 43,
      "y": 32,
      "title": "The view is not clear",
      "scenario": "Your goggles are dirty and make it hard to see. What is the safe next step?",
      "choices": [
        "Follow site instructions for dirty PPE and tell your supervisor before starting.",
        "Wear them anyway because eye protection is required.",
        "Start without the required eye protection."
      ],
      "correct": 0,
      "why": "Required PPE must be clean, undamaged and fit you. Follow the site’s instructions for dirty PPE; tell your supervisor.",
      "check": "Check goggles are clean enough to see clearly."
    },
    {
      "id": "visibility",
      "name": "High visibility",
      "x": 78,
      "y": 36,
      "title": "Something is missing",
      "scenario": "Your site requires high-visibility clothing for this task, but you do not have it. What should you do?",
      "choices": [
        "Stay near someone wearing a high-visibility vest.",
        "Start now and get the clothing at your next break.",
        "Tell your supervisor and get the required protection before starting."
      ],
      "correct": 2,
      "why": "Wear the PPE your task and site require. Tell your supervisor and follow site instructions if required protection is missing.",
      "check": "Check which PPE your task and site require."
    },
    {
      "id": "gloves",
      "name": "Gloves",
      "x": 90,
      "y": 52,
      "title": "The wrong pair",
      "scenario": "You have gloves, but they are not right for the task you have been asked to do. What should you do?",
      "choices": [
        "Use any pair of work gloves.",
        "Check the task requirements and ask your supervisor for suitable protection.",
        "Use the gloves for only the first part of the task."
      ],
      "correct": 1,
      "why": "PPE must be right for the task. Do not assume that any pair of gloves is suitable; follow the instructions and ask your supervisor.",
      "check": "Check the gloves are suitable for the task."
    },
    {
      "id": "fit",
      "name": "Long trousers",
      "x": 80,
      "y": 68,
      "title": "The trousers do not fit",
      "scenario": "Your site requires long trousers for this task, but the pair you have does not fit properly. What should happen before you start?",
      "choices": [
        "Tell your supervisor and follow site instructions to resolve the fit.",
        "Make do because the task should be quick.",
        "Copy how someone else wears it without asking."
      ],
      "correct": 0,
      "why": "Your workwear must be right for the task and fit you properly. Tell your supervisor and follow your site’s instructions if it does not fit.",
      "check": "Check your required trousers and workwear fit properly."
    },
    {
      "id": "footwear",
      "name": "Footwear",
      "x": 72,
      "y": 85,
      "title": "One last check",
      "scenario": "You notice that your shoelaces are untied just before you start work. What should you do?",
      "choices": [
        "Leave them until your next break.",
        "Keep walking and watch your feet.",
        "Stop and secure the laces before starting."
      ],
      "correct": 2,
      "why": "Check for untied shoelaces as part of your PPE and workwear check. Secure them before starting work.",
      "check": "Check footwear and secure untied laces."
    }
  ],
  "icons": {
    "helmet": "<path d=\"M7 27c0-11 6-18 17-18s17 7 17 18\" fill=\"#ffe114\"/><path d=\"M19 11l-2 16m12-16 2 16\" stroke=\"#06223b\"/><path d=\"M4 28c7-3 33-3 40 0v5H4z\" fill=\"#ffe114\"/><path d=\"M10 34h28\" stroke=\"white\"/>",
    "eyes": "<path d=\"M6 15h36l3 5-3 15H28l-4-6-4 6H6L3 20z\" fill=\"#06223b\"/><path d=\"M8 19h11l2 10H8zm21 0h11v10H27z\" fill=\"none\"/><path d=\"M9 11h30\" stroke=\"#ffe114\"/><path d=\"M2 21H0m48 0h-2\"/>",
    "visibility": "<path d=\"M16 6l8 8 8-8 9 7-3 31H10L7 13z\" fill=\"#ffe114\"/><path d=\"M17 7l3 14v23m11-37-3 14v23\" stroke=\"#06223b\" stroke-width=\"4\"/><path d=\"M9 27h30M10 35h28\" stroke=\"white\" stroke-width=\"4\"/>",
    "gloves": "<path d=\"M12 43L5 28 2 18c0-3 4-3 5 0l3 7-6-15c-1-3 3-4 4-1l6 13-5-16c-1-3 3-4 4-1l5 16-3-15c0-3 4-3 4 0l3 17 2-7c1-3 5-2 4 1l-3 15-3 9z\" fill=\"#ffe114\" stroke-width=\"1.8\"/><path d=\"M30 37l-3-9 3-12c1-3 5-2 4 1l-1 7 5-15c1-3 5-2 4 1l-4 14 5-11c1-2 4 0 3 2l-4 13 3-6c2-2 5 0 3 3l-7 15-11 5z\" fill=\"#06223b\" stroke-width=\"1.8\"/>",
    "fit": "<path d=\"M11 5h26l3 38H27l-3-24-3 24H8z\" fill=\"#06223b\"/><path d=\"M13 7h22m-10 0v10M12 20h7v9h-8m26-9h-7v9h8\" stroke=\"#ffe114\"/><path d=\"M12 36h8m8 0h9\"/>",
    "footwear": "<path d=\"M15 7h13l3 17 12 7c3 2 3 8-1 10H7c-5-2-4-10 0-12l7-5z\" fill=\"#06223b\"/><path d=\"M16 12h11M17 18h11M18 24l12 1m-1 4 5 1\" stroke=\"#ffe114\"/><path d=\"M5 37h38v6H5z\" fill=\"#ffe114\"/><path d=\"M10 43v-4m8 4v-4m8 4v-4m8 4v-4\" stroke=\"#06223b\"/>"
  },
  "hazards": [
    {
      "title": "Racking is not a ladder.",
      "name": "Climbing the racking",
      "x": 25.1,
      "y": 31.7,
      "detail": "A worker is using the storage racking to reach stock. A slip could cause a serious fall.",
      "question": "What is the safest response?",
      "choices": [
        "Hold the racking steady while they finish.",
        "Ask them to stop; arrange suitable access equipment with the supervisor.",
        "Suggest climbing a little more slowly."
      ],
      "correct": 1,
      "why": "Racking is designed for storage, not access. Stop the unsafe task and arrange suitable access equipment through the supervisor. Only use equipment you are trained and authorised to use.",
      "retry": "Holding the rack or climbing more carefully does not remove the fall risk. Choose a response that stops the unsafe method.",
      "takeaway": "Never climb racking. Stop and arrange suitable access equipment."
    },
    {
      "title": "A spill changes the next step.",
      "name": "Spillage in the aisle",
      "x": 49,
      "y": 79.6,
      "detail": "Liquid has spread across a walking route. The container’s contents are not known.",
      "question": "What should happen first?",
      "choices": [
        "Keep people clear and report it; follow the site spill procedure.",
        "Wipe it up immediately with whatever is nearby.",
        "Step around it and carry on working."
      ],
      "correct": 0,
      "why": "Keep others away and report the spill. Follow the site procedure; identify the substance before clean-up. Only clean it if trained and equipped to do so.",
      "retry": "Walking past leaves the risk for someone else. An unknown liquid also needs assessment before clean-up.",
      "takeaway": "Keep people clear. Report the spill and follow the site procedure."
    },
    {
      "title": "One box can bring down the rest.",
      "name": "Unstable stacked boxes",
      "x": 65,
      "y": 68,
      "detail": "The boxes lean and overhang the stack below. They could fall into the aisle.",
      "question": "How would you make this safer?",
      "choices": [
        "Pull out the bottom box to straighten the stack.",
        "Catch the top box if it starts to fall.",
        "Keep clear and report the unstable load for safe restacking."
      ],
      "correct": 2,
      "why": "Keep people clear of the falling-load area and report it. Arrange safe restacking by trained people using suitable equipment. Do not pull at the load or try to catch falling boxes.",
      "retry": "Touching the unstable load could bring it down. Keep clear and arrange a controlled response.",
      "takeaway": "Keep clear of unstable loads. Report and arrange safe restacking."
    },
    {
      "title": "A clear exit needs a clear route.",
      "name": "Blocked emergency exit",
      "x": 77.2,
      "y": 53.5,
      "detail": "A small pallet of cartons obstructs the emergency exit at the back of the warehouse.",
      "question": "What is the safest response?",
      "choices": [
        "Leave it until the next shift.",
        "Report it immediately and arrange for the escape route to be cleared safely.",
        "Assume another exit will be enough."
      ],
      "correct": 1,
      "why": "Emergency escape routes must remain available. Report the obstruction immediately and follow site procedures to have it removed safely.",
      "retry": "An alternative exit does not make an obstructed escape route acceptable.",
      "takeaway": "Keep emergency exits and their approaches clear."
    },
    {
      "title": "Small damage can signal a bigger risk.",
      "name": "Damaged racking upright",
      "x": 38.2,
      "y": 64,
      "detail": "An upright near floor level is bent and cracked. Stock remains above it.",
      "question": "What should you do?",
      "choices": [
        "Report the damage immediately and keep clear under the site procedure.",
        "Straighten it with a tool.",
        "Carry on if the stock looks stable."
      ],
      "correct": 0,
      "why": "Report suspected racking damage immediately. Keep people clear as required by site procedures and have authorised people assess it. Do not repair or continue using damaged racking yourself.",
      "retry": "Appearance alone cannot establish that damaged racking is safe. Do not try to straighten it.",
      "takeaway": "Report racking damage. Keep clear and arrange an authorised assessment."
    },
    {
      "title": "A small loop can catch a foot.",
      "name": "Discarded packing strap",
      "x": 29.2,
      "y": 87.8,
      "detail": "A loose loop of packing strap lies across the edge of a walking route.",
      "question": "How should you respond?",
      "choices": [
        "Kick it under the shelving.",
        "Step over it and leave it.",
        "Remove it safely if safe to do so, using the designated waste procedure."
      ],
      "correct": 2,
      "why": "Discarded strapping is a trip hazard. If safe to do so, remove it using site housekeeping and waste procedures; otherwise keep people clear and report it.",
      "retry": "Moving the strap out of sight or stepping over it leaves the hazard for someone else.",
      "takeaway": "Keep routes clear of packaging and dispose of strapping safely."
    }
  ],
  "intro": [
    {
      "at": 2.23,
      "text": "Every warehouse contains potential hazards. Some are immediately obvious; others are easy to overlook during a busy shift."
    },
    {
      "at": 11.13,
      "text": "Before starting work, take a moment to consider your surroundings."
    },
    {
      "at": 15.29,
      "text": "Recognising hazards is the first step towards preventing accidents."
    }
  ],
  "question": {
    "prompt": "Why does health and safety matter in a warehouse?",
    "choices": [
      "It protects people, helps everyone meet their responsibilities and reduces disruption to the business.",
      "It is mainly about avoiding damage to goods and equipment.",
      "It is mainly the responsibility of managers."
    ],
    "correct": 0,
    "why": "Health and safety protects people, helps employers and employees meet their responsibilities, and reduces disruption and costs. Whatever your role, your choices can make a difference.",
    "retry": "Think about the people working in the warehouse, the responsibilities we all share, and the effect an accident can have on the business. Have another go."
  }
};
