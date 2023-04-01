let jsonQ = `
[
    {
        "question":"What's more important for you?",
        "answers": [
            {"answer":"Humanity","glob":50},
            {"answer":"Country","nat":50},
			{"answer":"My ideology","ignore":"ignore"},
            {"answer":"Me"}
        ]
    },
    {
        "question":"Whould you rather die for you country or for a humanitarian cause?",
        "answers": [
            {"answer":"For the humanitarian cause","glob":50},
            {"answer":"For my country","nat":50},
            {"answer":"I can't decide. They are both very good things.","glob": 25, "nat":25},
            {"answer":"I would prefer to live"}
        ]
    },
    {
        "question":"What's your opinion in religions?",
        "answers": [
            {"answer":"Our common father makes all humans brothers","glob":50,"trad":50},
            {"answer":"Humanity must madure and stop worshiping inexisting entities",
                "glob":50,"prog":50},
            {"answer":"I believe in the God/Gods of my parents","trad":50,"nat":25,"glob":25},
            {"answer":"Some believes and practices are a obstacle for progress. I'm against those.","prog":50,"nat":25,"glob":25},
            {"answer":"Religion is a very important aspect of our culture. We must preserve it.","nat":50,"trad":50},
			{"answer":"Religion helped our people to improve","prog":50,"nat":50},
			{"answer":"God/The Gods protect our people from our enemies, evilness, natural disasters, etc.","nat":50,"prog":25,"trad":25},
			{"answer":"Every human in history felt an indiscriptible feeling when looking at the stary sky. That is what bends humanity together.",
				"glob":50, "trad":25, "prog":25},
			{"answer":"I belive in right and wrong, in helping the helpless, in being kind to each other and in the Golden Rule.",
				"glob":25, "nat":25, "prog":25, "trad":25},
			{"answer":"I don't follow organized religions. I rather strive to be as spiritual as possible."},
            {"answer":"I try to connect myself with God without external interferince."},
            {"answer":"I don't belive in any God. But I don't mind if the rest does."},
            {"answer":"My relationship with religion is complex.","ignore":"ignore"}
        ]
    },
	{
		"question":"If State welfare was under your control, how whould it be?",
		"answers": [
			{"answer":"I would make it cover all citizents", "nat":50, "left":50},
			{"answer":"I would export it to all humans!", "glob":50, "left":50},
			{"answer":"It would cover working citizents, criminals and/or bone-idle people don't deserve it.", "nat":25, "left":25, "right":25},
			{"answer":"I would make it paid so that people would be careful with their health","right":50},
			{"answer":"I would incentivize enterprises to compete with each other so that global health is improved.","glob":25,"right":50},
			{"answer":"I would install a fair system where all people is attended but people who doesn't care about their own health don't take all the money.",
				"glob":25, "nat":25, "right":25, "left":25},
			{"answer":"I would creat a system where private enterprises are the main health providers, with little State intervation.", "right":50}
		]
	},
    {
        "question":"Should The government should access private phones for security?",
        "answers": [
            {"answer":"If it is for a just reason, yes", "auth":50, "prog":25, "trad":25},
            {"answer":"Sometimes, we need the police to invade personal space in order to fight injustice, terror, etc.",
                "auth":50, "trad":50},
            {"answer":"If our society normilizes to get their phones inspected by the State, it would be better",
                "auth":50, "prog":50},
            {"answer":"The State is a social construction, it has no right to invade privacy",
                "lib":50, "prog":50},
            {"answer":"Never! The phone of a person is part of their privacy", "lib":50}
        ]
    },
	{
        "question":"Assuming oppression is immoral, Who is the main responsible for oppression?",
        "answers": [
            {"answer":"Corporation, bourgeoisie and/or merchants", "left":50, "trad":50},
			{"answer":"Religion and/or the clery", "left":50, "prog":50},
			{"answer":"Foreign countries and/or minorities within our country", "auth":25, "nat":50, "trad":50},
			{"answer":"Our own military", "lib":25, "glob":50},
			{"answer":"The State itself is oppresive", "lib":25},
			{"answer":"FALTA TERMINAR ESTA PREGUNTA", "lib":25},
            {"answer":"Oppression is a good thing", "ignore":"ignore"}
        ]
    }
]
`;