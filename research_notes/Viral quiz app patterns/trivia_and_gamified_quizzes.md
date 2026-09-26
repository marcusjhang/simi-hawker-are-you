# Non-Personality Quiz Genres: Trivia, Live/Competitive, Streak-Based, and Educational Quizzes

Scope note: dense, factual notes on engagement/retention mechanics outside the "which X are you" genre, with concrete numbers, aimed at a no-backend, no-accounts, static single-page quiz app. Source quality is flagged where a claim comes from a secondary/aggregator blog rather than a primary company or news source.

---

## Kahoot: format, classroom/social mechanics, scale, why it spreads

### Takeaway
Kahoot is a free, web-based, user-generated multiple-choice quiz platform whose growth came from zero-friction classroom joining (PIN code, no student account), teacher-authored content (each session is fresh), and a social/game-show framing (points, leaderboard, speed). Scale is enormous (12B cumulative players as of 2025) and it has been acquired at a multi-billion-dollar valuation. The scoring/speed mechanics that make it sticky are well documented but the exact point formula was not in the sources retrieved.

### Cited Findings
- Kahoot! is a Norwegian game-based learning platform whose games ("kahoots") are user-generated multiple-choice quizzes accessed via browser or app; concept descends from "Lecture Quiz" prototypes built by Alf Inge Wang at NTNU in 2006, and the product was founded in 2012, beta-launched September 2013. — [Wikipedia, Kahoot!](https://en.wikipedia.org/wiki/Kahoot!)
- Registration is optional for quiz *participation* but required for quiz *creation* — the key low-friction detail for players joining with just a PIN. — [Wikipedia, Kahoot! infobox](https://en.wikipedia.org/wiki/Kahoot!)
- 12 billion non-unique players as of 2025. — [Kahoot! company page](https://kahoot.com/company/) (as cited by [Wikipedia](https://en.wikipedia.org/wiki/Kahoot!))
- Reached 1 billion cumulative participating players in March 2017. — [Tech.eu](http://tech.eu/brief/kahoot-1-billion-players/)
- By January 2018, used by 50% of all US K–12 students and 70M users overall, per the company. — [TechCrunch](https://techcrunch.com/2018/01/18/education-quiz-app-kahoot-says-its-now-used-in-50-of-all-us-classrooms-70m-users-overall/)
- A 2020 literature review of 93 studies in *Computers & Education* found using Kahoot had an overall positive effect on classroom dynamics, learning, and (reduced) anxiety. — [Wang & Tahir 2020](https://doi.org/10.1016/j.compedu.2020.103818)
- A 2023 meta-analysis of 41 studies (5,071 participants) in *Frontiers in Psychology* found gamified learning had a large effect (Hedges' g = 0.822) on learning outcomes vs. traditional instruction. — [Li, He & Yuan 2023](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10591086)
- 2016 evaluation by Education Alliance Finland suggested Kahoot's educational value was highest when students create the quizzes themselves (creativity, 21st-century skills). — [Education Alliance Finland](https://educationalliancefinland.com/products/kahoot) (via [Wikipedia](https://en.wikipedia.org/wiki/Kahoot!))
- Company economics: valued at $1.5B in 2020, ~$7B in 2021; acquired for $1.72B cash by a Goldman Sachs–led group in 2023; delisted from Oslo Børs January 2024. — [Wikipedia, Kahoot!](https://en.wikipedia.org/wiki/Kahoot!); [TechCrunch](https://techcrunch.com/2023/07/14/kahoot-acquired/); [Reuters](http://www.reuters.com/markets/deals/kahoot-agrees-172-billion-cash-offer-goldman-sachs-asset-management-2023-07-14/)

### Inferences
- Kahoot spreads through the *host* (teacher/meeting-leader), not the player: one motivated author brings 30–200 players per session, and each session is new content, which is a repeat-engagement loop a static personality quiz lacks. The zero-account join + PIN is the mechanic most worth borrowing for a no-backend app (a room code or shared link ≈ the same thing).
- The speed-based "answer fast for more points" rival mechanic (widely associated with Kahoot) is the main competitive hook and is implementable entirely client-side; treated as an inference because the retrieved sources did not spell out the point formula.

### Gaps
- Exact Kahoot scoring formula (correctness/speed points) and per-session player caps were not in the retrieved sources — flagged, not asserted.
- Clean current MAU/DAU (company reports "12 billion non-unique players," which is cumulative, not active users).

---

## HQ Trivia: live format, concurrent-player numbers, rise and fall, lessons

### Takeaway
HQ Trivia proved a live, synchronized, host-fronted trivia game can hit genuine mass scale — a record 2.38M concurrent players on 28 March 2018 — but the model was never a business: cash prizes were a user-acquisition cost, the app depended on real-time infrastructure and a single distributed host, and after the co-founder's death and a failed acquisition it collapsed. The lesson for a static app is to copy the *tension* mechanics (timer, elimination, survival, "you beat X%") while avoiding anything live or prize-funded.

### Cited Findings
- HQ was a mobile live trivia game by Intermedia Labs, created by Vine founders Rus Yusupov and Colin Kroll; iOS release 26 Aug 2017, Android 31 Dec 2017. — [Wikipedia, HQ (video game)](https://en.wikipedia.org/wiki/HQ_(video_game))
- Format: typically daily at 9pm ET; host asks a series of increasingly difficult multiple-choice questions, each with three possible answers; players have **10 seconds** to choose; correct answers continue, the rest are eliminated; prize is split among all who finish. A question that eliminates most players is a "savage question." — [Wikipedia, HQ (video game)](https://en.wikipedia.org/wiki/HQ_(video_game))
- Record high **2.38 million concurrent players on 28 March 2018**; average participants ranged 100,000–125,000. — [TechCrunch](https://techcrunch.com/2018/08/14/hq-trivia-apple-tv/) (as cited by [Wikipedia](https://en.wikipedia.org/wiki/HQ_(video_game)))
- More than **730,000 people played HQ Trivia on Christmas Day 2017**. — [Fortune](http://fortune.com/2017/12/28/hq-trivia-christmas-day/) (via [Wikipedia](https://en.wikipedia.org/wiki/HQ_(video_game)))
- Retention/return mechanics: "Extra Lives" (earn by gameplay or inviting additional players; use up to three to re-enter after elimination) and "Erasers" (earn by playing two other nearby HQ Trivia players to eliminate a wrong answer). — [Wikipedia, HQ (video game)](https://en.wikipedia.org/wiki/HQ_(video_game))
- Prize pots ranged from $5 to $400,000 plus a points jackpot split among winners; sponsors included Nike, Wendy's, and Warner Bros. (e.g., a $250,000 *Ready Player One* game; Dwayne Johnson hosted a $300,000 round). — [Wikipedia, HQ (video game)](https://en.wikipedia.org/wiki/HQ_(video_game)); [Variety](https://variety.com/2018/digital/news/hq-trivia-ready-player-one-warner-bros-sponsor-1202736554/)
- Growth had already reversed by August 2018 ("HQ Trivia downloads spiral downward as it hits Apple TV"). — [TechCrunch](https://techcrunch.com/2018/08/14/hq-trivia-apple-tv/)
- Raised $15M from Founders Fund in March 2018; co-founder Colin Kroll died 16 Dec 2018; host Scott Rogowsky was replaced in April 2019. — [Wikipedia, HQ (video game)](https://en.wikipedia.org/wiki/HQ_(video_game))
- Feb 14 2020: company told staff it would "cease operations and move to dissolution" after investors stopped funding and a sale fell through; the final prize was $0.00–$0.01 per winner (a $5 jackpot) split among just over 500 players. It briefly resumed 29 March 2020, had no game after 17 Nov 2022, and was removed from app stores 5 Aug 2023. — [Wikipedia, HQ (video game)](https://en.wikipedia.org/wiki/HQ_(video_game)); [CNN](https://www.cnn.com/2020/02/14/media/hq-trivia-shut-down/index.html); [TechCrunch](https://techcrunch.com/2020/02/15/hq-trivia-shut-down-final-show/)
- The Ringer produced an 8-part podcast, *Boom/Bust: The Rise and Fall of HQ Trivia*, charting fan/employee/VC accounts of the initial popularity, chaotic workplace, and shutdown. — [The Ringer](https://www.theringer.com/2020/5/20/21264390/hq-trivia-rise-fall-viral-sensation-episode-1)

### Inferences
- The core retention loop was *appointment + survival + partial reward*: a fixed daily time (habit anchor), 10-second pressure (adrenaline), elimination (stakes), and a shared prize (social proof). All of these except the live broadcast and payout can be reproduced client-side.
- The business failure and the product mechanics are separable: a one-off static quiz can borrow HQ's "10 seconds, answer or die, survive to the end, compare to others" texture without carrying its live-infrastructure or prize-liability costs.

### Gaps / source-quality caveats
- No primary revenue figures or advertiser CPMs were found; specific "why it failed" business analysis came from secondary postmortem blogs of varying rigor: [IdeaProof](https://ideaproof.io/failure/hq-trivia) ("lost $15M in raised capital; root cause founder death, no revenue model and user decline") and [UnicornBurn](https://unicornburn.com/autopsy/hq-trivia) ("cash prizes are a user acquisition cost, not a business model; live entertainment apps need a revenue model that scales with the audience, not against it"). Treat these as opinion/analysis, not verified financials.

---

## Jackbox / party quiz games: social, local-multiplayer mechanics

### Takeaway
Jackbox's signature is a **no-app, no-account controller model**: the host runs the game on a shared screen (console/stream) and every player joins from their own phone's browser via a room code. This is the cleanest real-world proof that a quiz can be multiplayer with zero installs and zero accounts. The games are mostly not "quizzes with a score to beat" but *social-generation* games (bluffing, voting, drawing) where the fun is other people's input and the audience can participate at scale.

### Cited Findings
- Jackbox Games (formerly Jellyvision Games; creator of *You Don't Know Jack*) has released *The Jackbox Party Pack* yearly since 2014 — each pack is a collection of five party games designed for online play by multiple people, including large audiences, via streaming sites like Twitch; 11 packs as of 2025. — [Wikipedia, Jackbox Games](https://en.wikipedia.org/wiki/Jackbox_Games)
- The company lets games be played using smartphones/tablets as controllers rather than dedicated controllers; game code/room joining via connected devices. — [Wikipedia, Jackbox Games](https://en.wikipedia.org/wiki/Jackbox_Games)
- *Fibbage* (2014): 2–8 players (plus audience via stream); players write fake answers to obscure facts, then everyone guesses; points for picking the truth **and** for each person fooled by your lie; "lie for me" fallback if you can't think of one; three rounds with a "Final Fibbage." — [Wikipedia, Jackbox Games](https://en.wikipedia.org/wiki/Jackbox_Games)
- *Quiplash* (2015): 3–8 players; two players get the same prompt, everyone votes on the funnier answer; a unanimous "quiplash" earns bonus points; identical answers cause a "jinx" (no points). It was the first Jackbox game to include an **audience**; funded on Kickstarter targeting $15,000 and finishing with over $30,000 from 1,600+ backers. — [Wikipedia, Jackbox Games](https://en.wikipedia.org/wiki/Jackbox_Games)
- The multiplayer version of *Lie Swatter* (true/false "swat the lies") supports **up to 100 players**. — [Jackbox Games, Lie Swatter](https://www.jackboxgames.com/lie-swatter/) (via [Wikipedia](https://en.wikipedia.org/wiki/Jackbox_Games))
- Audience/stream scale is a stated design goal: Engadget headlined Quiplash a "streaming party game for 10,000 people." — [Engadget](https://www.engadget.com/2015/06/30/quiplash-10000-players-twitch/)
- COVID spike: around mid-March 2020 Jackbox experienced a large traffic increase due to stay-at-home orders; the company reported all-time-high traffic and built a standalone multilingual *Quiplash 2* in response to a large influx of non-English players. — [Gamasutra](https://www.gamasutra.com/view/news/363530/As_traffic_hits_alltime_high_Jackbox_adjusting_to_deving_from_home.php); [Washington Post](https://www.washingtonpost.com/video-games/2020/08/14/playing-remotely-massive-success-jackbox-games-during-pandemic/)

### Inferences
- Jackbox's retention is session-based, not account-based: people return because the *social occasion* recurs (game night), not because a streak compels them. For a static SPA, the transferable version is **hotseat / pass-the-phone local multiplayer** and user-supplied answers ("write your own fake answer"), which need no server.
- The audience mechanic scales engagement by letting spectators *vote* — a pattern a static app can only fake (e.g., "voted funniest by 62% of players" from precomputed data), not reproduce genuinely without a backend.

### Gaps
- No public per-game player/DAU numbers beyond the 100-player cap and the "10,000 people" headline; no revenue figures.

---

## Duolingo lessons/quizzes and streak mechanics: retention data and habit design

### Takeaway
Duolingo's streak is the best-documented habit mechanic in consumer software, and Duolingo has published causal A/B numbers: making a streak easier (one lesson, decoupled from the daily goal) raised Day-14 retention 3.3% and overall DAU ~1%, and pushed the share of daily learners on a 7+ day streak from about a third to just over half within a year. Learners who hit a 7-day streak are 2.4× more likely to return the next day. Crucially, Duolingo's own PM says streaks *amplify*, they don't *create*, value.

### Cited Findings
- Definition: a streak counts consecutive days on which a learner completes at least one lesson; the streak resets on a missed day. — [Duolingo Blog, "Improving the streak"](https://blog.duolingo.com/improving-the-streak/); [Audiencers](https://theaudiencers.com/subscription-models-live-off-habits-lessons-from-duolingos-retention-success/)
- Duolingo's own data: learners who reach a **7-day streak are 2.4× more likely to continue using Duolingo the next day** than learners without a streak. — [Duolingo Blog](https://blog.duolingo.com/improving-the-streak/)
- Separating the daily goal from the streak (so **one lesson** extends the streak) produced: **+3.3% Day-14 retention**, **+1% overall DAU**, **+10.5%** of daily learners on a streak within 20 days, and **+19%** for new learners (all relative). — [Duolingo Blog](https://blog.duolingo.com/improving-the-streak/)
- Almost **40%** of learners active two days in a row *without* a streak had the "intense" (highest) daily goal — showing the goal itself was a barrier to habit. — [Duolingo Blog](https://blog.duolingo.com/improving-the-streak/)
- A year after the change, **just over half of daily learners had a streak of at least 7 days**, up from about a third a year earlier. — [Duolingo Blog](https://blog.duolingo.com/improving-the-streak/)
- Duolingo's Group PM (retention team): the streak has been "Duolingo's most important and innovative growth lever"; the company is a ~$14B business with almost 600M users; Duolingo ran **600+ streak-related experiments**; **retention is most fragile in the first 7 days**; a copy change from "continue" to "commit to my goal" increased retention; an opt-out where users choose streak duration gave a sense of ownership. — [Lenny's Newsletter / Jackson Shuttleworth interview](https://www.lennysnewsletter.com/p/behind-the-product-duolingo-streaks)

### Inferences
- The transferable, no-backend version of Duolingo's insight is: make the daily action as small as possible ("complete one question") and frame the streak as a possession the user is protecting (loss aversion). The A/B evidence says *lowering the bar* beats *raising the goal* for early habit formation.
- Duolingo's second-order mechanics (notifications, leagues, streak freeze) all assume persistent accounts and push infrastructure; only a client-side streak counter + "best streak" is reproducible in a static SPA, and it is fragile (cleared storage / new device resets it).

### Gaps / source-quality caveats
- Round-number claims widely repeated in secondary aggregators — "9 million people maintaining a streak of at least a year" ([Audiencers](https://theaudiencers.com/subscription-models-live-off-habits-lessons-from-duolingos-retention-success/)), ">3M users with a 365-day+ streak; Streak Freeze lifts long-term retention ~10%; 1.5B daily push notifications; 1% reach Diamond League" ([Gitnux](https://gitnux.org/duolingo-user-statistics/)) — could not be traced to a primary Duolingo/investor source in this pass. Use with caution.
- No primary Duolingo MAU/DAU split for streak vs. non-streak users beyond the 2020 blog and the PM interview.

---

## NYT games (Wordle, Connections, Spelling Bee): daily cadence, share grids, acquisition numbers

### Takeaway
The NYT puzzle portfolio is the strongest evidence for the **daily, identical-for-everyone puzzle + shareable result artifact** loop. Wordle's emoji share grid was the growth engine (90 players → 2M+ in ~2 months; 1.2M results shared to Twitter in under two weeks), and the acquisition price was tiny relative to impact: NYT bought Wordle for "low seven figures," it drove "tens of millions" of new puzzle users, and NYT Games now exceeds 10M daily players and 1M+ premium subscribers. In 2024 alone the games were played 11.1 billion times.

### Cited Findings
- Wordle gameplay: six attempts to guess a five-letter word; green = correct letter/position, yellow = in word wrong spot, gray = not in word; one puzzle per day, same word worldwide; curated answer list of **2,309 words**; inspired partly by *Mastermind* and by the one-puzzle-per-day design of NYT Spelling Bee. — [Wikipedia, Wordle](https://en.wikipedia.org/wiki/Wordle)
- The emoji share format was borrowed from a friend group's homemade version and added to the game; Wordle then went viral on Twitter in late December 2021. — [Wikipedia, Wordle](https://en.wikipedia.org/wiki/Wordle)
- Growth: from **90 players on 1 Nov 2021** to **over 300,000 by 2 Jan 2022** and **more than 2 million a week later**; **1.2 million Wordle results shared on Twitter between 1 and 13 January 2022**. — [NYT](https://www.nytimes.com/2022/01/31/crosswords/nyt-wordle-purchase.html) and [The Guardian](https://www.theguardian.com/games/2022/jan/11/wordle-how-a-5-letter-game-became-a-global-obsession) (both via [Wikipedia](https://en.wikipedia.org/wiki/Wordle))
- Wardle's stated design reason: one puzzle per day creates a sense of **scarcity**, leaving players wanting more; it deliberately keeps sessions to about **three minutes a day**. — [Wikipedia, Wordle](https://en.wikipedia.org/wiki/Wordle)
- NYT acquired Wordle on 31 Jan 2022 for an "undisclosed price in the low-seven figures," narrowly outbidding *The Washington Post*; NYT said it brought "tens of millions" of new players to its puzzle site/app, many of whom kept playing other puzzles. — [NYT](https://www.nytimes.com/2022/01/31/crosswords/nyt-wordle-purchase.html); [Vanity Fair](https://www.vanityfair.com/news/2022/11/inside-the-new-york-times-games-expansion) (via [Wikipedia](https://en.wikipedia.org/wiki/Wordle))
- Wordle was played **4.8 billion times in 2023**; player count peaked March 2022 and, a year later, was stable at about half the peak (GDC 2023). — [Wikipedia, Wordle](https://en.wikipedia.org/wiki/Wordle)
- NYT Games officially launched 21 Aug 2014 with the Mini Crossword; Spelling Bee (2014, online May 2018), Letter Boxed (Feb 2019), Tiles (Jun 2019), Connections (beta Jun 2023), Strands (beta Mar 2024, full Jun 2024). — [Wikipedia, The New York Times Games](https://en.wikipedia.org/wiki/The_New_York_Times_Games)
- 2024 official numbers: **11.1 billion puzzles played**, of which **Wordle 5.3B, Connections 3.3B, Strands 1.3B**. — [The Verge](https://www.theverge.com/2025/6/10/24174642/nyt-games-crossplay-connections-wordle) (via [Wikipedia, The New York Times Games](https://en.wikipedia.org/wiki/The_New_York_Times_Games))
- Playerbase: **over 10 million daily players** across platforms as of 2024 and **over one million premium subscribers**; average daily active users in the Games app **tripled from 886,000 (Oct 2022) to over 2.6 million (2023)**. — [Wikipedia, The New York Times Games](https://en.wikipedia.org/wiki/The_New_York_Times_Games)
- Monetization direction: by end-Aug 2025 the Mini Crossword, Tiles, and Letter Boxed moved behind the subscription, and Spelling Bee became free only up to the "Good/Solid" rank (~15% of points). — [Wikipedia, The New York Times Games](https://en.wikipedia.org/wiki/The_New_York_Times_Games)
- A staff quip reported by Vanity Fair: "the half joke that is repeated internally is that *The New York Times* is now a gaming company that also happens to offer news." — [Vanity Fair](https://www.vanityfair.com/news/2022/11/inside-the-new-york-times-games-expansion) (via [Wikipedia](https://en.wikipedia.org/wiki/The_New_York_Times_Games))
- Social spread beyond Twitter: as of May 2024, 140,000 TikTok videos with the hashtag #wordle. — [Dazed](https://www.dazeddigital.com/life-culture/article/62620/1/nyt-games-connections-wordle-strands-puzzle-fans) (via [Wikipedia](https://en.wikipedia.org/wiki/The_New_York_Times_Games))

### Inferences
- The single highest-leverage, backend-free growth mechanic in this entire research set is Wordle's **spoiler-free shareable result artifact** (a grid/text block with no answer). It converts a private 3-minute activity into free social distribution, and it works with zero server involvement.
- "One puzzle per day adds scarcity" is only meaningful if the user expects a *new* puzzle tomorrow, which for a static SPA can be simulated deterministically (e.g., a date-seeded index into a hardcoded bank) but is fundamentally limited by the fixed content bank.

### Gaps / source-quality caveats
- Exact Wordle purchase price is undisclosed ("low seven figures"); NYT does not break out Games-only revenue.
- Current daily Wordle player counts are not officially disclosed; third-party claims of "~9M daily Connections players" come from an aggregator ([WordsRated](https://wordsrated.com/guides/nyt-connections-statistics/)) and should be treated as an estimate, not an NYT figure.

---

## Trivia apps: Jeopardy!, Trivia Crack, QuizUp — engagement and head-to-head features

### Takeaway
The classic trivia apps show three distinct engagement models: Jeopardy! (broadcast appointment viewing with returning champions, wagering, and a "play along at home" posture), Trivia Crack (asynchronous head-to-head against friends/strangers plus collectible category characters, at enormous download scale), and QuizUp (real-time synchronized 1v1 with speed scoring, which reached 20M users fast but never monetized and died). Head-to-head and speed scoring drive engagement; the recurring failure across QuizUp and HQ is monetization, not format.

### Cited Findings — Jeopardy!
- American TV quiz show created by Merv Griffin, debuting 30 March 1964; it reverses the usual format by giving contestants the *answers/clues* and requiring responses phrased as questions. — [Wikipedia, Jeopardy!](https://en.wikipedia.org/wiki/Jeopardy!)
- Three contestants, three rounds (Jeopardy!, Double Jeopardy!, Final Jeopardy!); six categories × five clues per board, clue values increasing with difficulty; hidden "Daily Double" wagers; Final Jeopardy! requires wagering (light pen) then a 30-second written response. — [Wikipedia, Jeopardy!](https://en.wikipedia.org/wiki/Jeopardy!)
- The winner returns as returning champion against two new contestants each episode; the five-day champion limit was removed 8 Sept 2003, enabling long win streaks. — [Wikipedia, Jeopardy!](https://en.wikipedia.org/wiki/Jeopardy!)
- Since September 1985 contestants must wait until the clue is read before ringing in — explicitly changed so the **home audience could play along more easily** and to stop one fast contestant dominating. — [Wikipedia, Jeopardy!](https://en.wikipedia.org/wiki/Jeopardy!)
- Scale/longevity: 42nd season and 9,000+ episodes as of the source; a record 45 Emmy Awards; ranked No. 45 on *TV Guide*'s 60 greatest shows (2013). — [Wikipedia, Jeopardy!](https://en.wikipedia.org/wiki/Jeopardy!)

### Cited Findings — Trivia Crack
- *Trivia Crack* (Spanish *Preguntados*) by Etermax (Argentina), released Android 26 Oct 2013 / iOS 6 Nov 2013; a trivia game with six knowledge categories plus a purple "crown" category that lets you pick the category. — [Wikipedia, Trivia Crack](https://en.wikipedia.org/wiki/Trivia_Crack)
- Scale (company-reported): **more than 600 million downloads** worldwide and **more than 150 million active users annually**, available in 180+ countries and ranked #1 trivia game in 125 of them. — [Wikipedia, Trivia Crack](https://en.wikipedia.org/wiki/Trivia_Crack)
- Social/head-to-head: players connect via Facebook/Instagram, play against friends or random opponents; the app "broke the record for the longest streak at the top of the App Store" per Business Insider. — [Business Insider](https://www.businessinsider.com/how-did-trivia-crack-become-so-popular-2015-1) (via [Wikipedia](https://en.wikipedia.org/wiki/Trivia_Crack))
- Franchise/daily adaptation: sequels *Trivia Crack 2* (2018) and *Trivia Crack Adventure* (2021); an animated series *Triviatopia* (2019); and a **daily interactive game show, *Trivia Quest*, on Netflix (premiered 1 April 2022)**. — [Wikipedia, Trivia Crack](https://en.wikipedia.org/wiki/Trivia_Crack); [The Verge](https://www.theverge.com/2022/3/3/22960212/netflix-daily-series-trivia-quest)

### Cited Findings — QuizUp
- *QuizUp* was a multiplayer mobile trivia game by Iceland's Plain Vanilla Games (iOS 7 Nov 2013; Android 6 Mar 2014), later operated by Glu Mobile; discontinued 22 Mar 2021. — [Wikipedia, QuizUp](https://en.wikipedia.org/wiki/QuizUp)
- Format: choose a topic from 1,000+ categories, then challenge a friend or a random player; each match = **six normal rounds plus one bonus round**; the same question is shown to each player with 10 seconds and four answers; points reward accuracy **and speed** (max 20/round, doubled in bonus; max 160 per game); slower correct answers earn 1 fewer point per second (minimum 11). — [Wikipedia, QuizUp](https://en.wikipedia.org/wiki/QuizUp)
- Growth: 20M users and over $26M raised as of May 2014; **over 1 billion matches in 197 countries by March 2014**; the company claimed users averaged **40 minutes per day**. — [Forbes](https://www.forbes.com/sites/katieroof/2014/03/06/quizup-debuts-on-android-how-an-icelandic-game-became-an-overnight-success/); [CNBC](https://www.cnbc.com/2014/05/19/quizupthis-fairy-tale-app-has-both-users-and-revenue.html) (via [Wikipedia](https://en.wikipedia.org/wiki/QuizUp))
- Rise and fall: NBC ordered a 10-episode TV game show (2015) and ITV acquired rights; NBC cancelled it Aug 2016, after which Plain Vanilla laid off all employees and sold the app; Glu acquired QuizUp for **$7.5M USD** in Dec 2016 and shut it down in 2021. — [Wikipedia, QuizUp](https://en.wikipedia.org/wiki/QuizUp); [TechCrunch](https://techcrunch.com/2016/12/23/glu-mobile-acquires-quizup-in-deal-valued-at-7-5-million/)

### Inferences
- Head-to-head + speed scoring is the strongest competitive hook in these apps (QuizUp's 40 min/day self-report; Trivia Crack's 600M downloads) and is fully reproducible client-side as "beat the clock / beat your best / beat a par score." Genuine real-time 1v1 or asynchronous play against real strangers requires a backend and is out of scope.
- Across QuizUp and HQ the failure mode is economic (no monetization, TV-deal dependency, cash prizes), not mechanical — for a free static app the mechanical lessons survive even though the businesses didn't.
- Jeopardy!'s "returning champion" + "play along at home" design is the broadcast ancestor of streaks and daily-cadence: it manufactures repeat appointment and vicarious rivalry without any account infrastructure.

### Gaps / source-quality caveats
- Conflicting QuizUp user figures: Wikipedia cites 20M users (May 2014); [Iceland Monitor](https://icelandinsider.is/uncategorized/icelandic-game-developer-plain-vanilla-gone-out-of-business/) says "over 80 million current users" in 2013 and "fastest-growing mobile game of all time," while [JoinQuizzy](https://joinquizzy.com/blog/what-happened-to-quizup/) claims 100M users. These are not reconciled; treat all QuizUp totals as unreliable.
- Trivia Crack's 600M downloads / 150M annual actives are company-reported (via Wikipedia), not independently audited.
- No current MAU/revenue figures found for Trivia Crack or QuizUp; no primary Jeopardy! viewership numbers retrieved; Ken Jennings' exact win-streak total was not captured from the fetched source.

---

## Which mechanics translate to a one-off shareable personality quiz (and which do not)

### Takeaway
For a no-backend, no-accounts, static single-page app, the borrowable mechanics are all **client-computable and single-player-with-assumed-crowd**: speed/score chase, a spoiler-free shareable result, a deterministic daily drop, a localStorage streak, timers, and elimination/survival framing. Everything that needs synchronized players, a global leaderboard, persistent accounts, live hosting, cash prizes, or user-generated content moderation is out of scope.

### Translates (implementable client-side, no server, no account)
- **Speed-based scoring** (QuizUp: max 20/round, −1 pt/sec, min 11; HQ's 10-second window): a countdown per question converts a static quiz into a repeatable score chase. — [Wikipedia, QuizUp](https://en.wikipedia.org/wiki/QuizUp); [Wikipedia, HQ (video game)](https://en.wikipedia.org/wiki/HQ_(video_game))
- **Spoiler-free shareable result artifact** (Wordle's emoji grid): the highest-leverage growth mechanic in the set; ships with a "share" button that copies a compact, answer-free summary. — [Wikipedia, Wordle](https://en.wikipedia.org/wiki/Wordle)
- **Deterministic daily drop / scarcity** (Wordle, Spelling Bee): seed the question index from the calendar date so everyone "gets today's" without a backend; Wardle's own rationale was that one-per-day creates scarcity and caps sessions at ~3 minutes. — [Wikipedia, Wordle](https://en.wikipedia.org/wiki/Wordle)
- **Client-side streak + personal best** (Duolingo): store "days in a row," best score, and games played in localStorage; frame loss-aversion ("don't break your streak"). Duolingo's evidence that a 7-day streak → 2.4× next-day return and lower-bar streaks lift Day-14 retention 3.3% supports this as a habit nudge. — [Duolingo Blog](https://blog.duolingo.com/improving-the-streak/)
- **Elimination / survival / second chance** (HQ): survive all questions; offer one "extra life" or an "erase a wrong answer" token earned by, e.g., completing the quiz or an optional extra action. — [Wikipedia, HQ (video game)](https://en.wikipedia.org/wiki/HQ_(video_game))
- **"You beat X% of players" framing** (HQ percentile culture): can be approximated client-side by scoring against a hardcoded difficulty curve / par score rather than a fake live population; be honest that it is a static benchmark if using it.
- **Hotseat / pass-and-play local multiplayer** (Jackbox's no-install controller model): a single shared device can host sequential or alternating players with no accounts; user-supplied funny answers ("Fibbage-style") are possible if you accept that the "audience vote" is local. — [Wikipedia, Jackbox Games](https://en.wikipedia.org/wiki/Jackbox_Games)
- **Streak-through-a-run + par score / score-to-beat**: QuizUp's fixed 160-point ceiling and Kahoot/QuizUp speed bonuses give a legible target that invites replay without any server.

### Does not translate (needs backend / accounts / live infra / legal or content ops)
- **Live synchronized games with a host** (HQ): real-time broadcast, elimination across a live player pool, and advertiser-funded cash prizes. — [Wikipedia, HQ (video game)](https://en.wikipedia.org/wiki/HQ_(video_game))
- **Global leaderboards, cross-device streak sync, league tables** (Duolingo, NYT): require accounts and persistent state. — [Lenny's Newsletter](https://www.lennysnewsletter.com/p/behind-the-product-duolingo-streaks); [Wikipedia, The New York Times Games](https://en.wikipedia.org/wiki/The_New_York_Times_Games)
- **Genuine 1v1 against strangers and match history** (QuizUp, Trivia Crack): needs matchmaking and a server. — [Wikipedia, QuizUp](https://en.wikipedia.org/wiki/QuizUp)
- **Cash/prize incentives** (HQ): cost, fraud risk, and legal/tax exposure; also demonstrably not a business model. — [Wikipedia, HQ (video game)](https://en.wikipedia.org/wiki/HQ_(video_game))
- **User-generated quiz banks with moderation** (Kahoot, QuizUp): content creation is server-side and needs moderation. — [Wikipedia, Kahoot!](https://en.wikipedia.org/wiki/Kahoot!)
- **Audience-scale live voting** (Jackbox via Twitch, up to 10,000): needs streaming + a real-time vote backend. — [Engadget](https://www.engadget.com/2015/06/30/quiplash-10000-players-twitch/)
- **Push notifications** (Duolingo's habit engine): a static SPA has no scheduled push channel; only in-page reminders are possible.

### Inferences
- The practical recipe for a static SPA is: **Wordle's share artifact + a deterministic daily seed + a localStorage streak + one timer-based score chase + a "beat the par / beat your best" target**. That combination captures the growth, habit, and replay mechanics of the whole set without a server.
- Caution on streaks: in Duolingo the streak works because there is *always a new lesson tomorrow*. In a fixed-content quiz, a streak can become a hollow "you opened the page" counter, so it should be tied to variable outcomes (new daily question, improving score) rather than mere visits.
- Caution on percentiles: real "beat X%" claims need a population; faking one is a trust risk in a personality-adjacent quiz where credibility matters.

### Gaps
- No public data on how streak/share mechanics perform specifically for *personality* quizzes (the research set is trivia/education); the extrapolation is an inference, not a measured result.
- No measured conversion/retention benchmarks for one-off, no-account web quizzes were found.

---

### Cross-cutting source-quality summary
- Primary/strong: Wikipedia (each claim traceable to its cited news/company source), Duolingo's own blog, Lenny's Newsletter interview (Duolingo PM), The Verge, TechCrunch, CNN, Fortune, Forbes, Engel, Business Insider, Reuters, Washington Post.
- Secondary/weaker (flagged inline): IdeaProof, UnicornBurn, Gitnux, Audiencers, WordsRated, JoinQuizzy, Iceland Monitor, startupautopsy. Numbers from these should be re-verified before publication.
