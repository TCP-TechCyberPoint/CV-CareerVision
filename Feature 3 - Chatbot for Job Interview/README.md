**Interview Coach – README (עברית)**

- פרויקט זה הוא MVP של “מאמן ראיונות” המסייע למועמדים להתאמן על שאלות ריאיון, לקבל משוב ממוקד, ולשפר תשובות באופן מחזורי. המערכת כוללת שרת Node/Express (Backend) ואפליקציית React מבוססת Vite + Tailwind (Frontend). האינטגרציה למודל השפה מבוססת על ספריית OpenAI מול נקודת תאימות של Google Gemini.

**תכולה כללית**
- Backend: שרת Express שמספק נקודות קצה לתורני אימון ולצפייה בהיסטוריית סשנים.
- Frontend: ממשק React אינטראקטיבי לצ’אט אימון והיסטוריה.
- מאגר שאלות לדוגמה (in‑memory) + חנות זיכרון (in‑memory) לסשנים ושלבים.
- אינטגרציה ל‑LLM: יצירת פרומפטים, קריאה למודל, חילוץ COACH_JSON מהתשובה.
- דיפלוי ל‑Render: שירות web ל‑API ושירות סטטי ל‑UI באמצעות `render.yaml`.

**ארכיטקטורה**
- Backend (Node 20+, TypeScript):
  - `src/server.ts:1` – אתחול Express, CORS, רישום ראוטרים `/coach` ו‑`/history`, ברירת המחדל ל‑PORT היא `8000`.
  - `src/routes/coach.ts:1` – נקודת POST ליצירת “סשן” אימון חד‑פעמי, בניית הודעות ל‑LLM, קריאה למודל, חילוץ COACH_JSON ושמירה כ”שלב”.
  - `src/routes/history.ts:1` – שאילתות היסטוריה: רשימת סשנים למשתמש וקבלת פירוט סשן.
  - `src/store/memory.ts:1` – חנות זיכרון פשוטה (in‑memory) עם מערכים `sessions` ו‑`steps`.
  - `src/services/getQuestionById.ts:1` – שליפה מהמאגרים (in‑memory). קיימת תבנית לקוד מאגר DB (מושבת בתגובות).
  - `src/data/questionBank.ts:1` – מאגר שאלות לדוגמה (Question Bank) עם הסברים וכוונות.
  - `src/llm/SYSTEMPROMPT.ts:1` – פרומפט מערכת מחמיר למודל (כולל דרישה לצירוף COACH_JSON לכל תשובה).
  - `src/llm/buildMessages.ts:1` – בניית הודעות (`system`/`user`) בהתאם למצב (Mode), פריט השאלה, טיוטת המשתמש ולוקאל.
  - `src/llm/openai.ts:1` – קריאה ל‑LLM דרך OpenAI SDK עם `baseURL` תואם OpenAI עבור Gemini; ניסיון ראשון דרך Responses API ונפילה אחורה ל‑Chat Completions במקרה הצורך.
  - `src/llm/parseCoachJson.ts:1` – חילוץ בלוק `COACH_JSON` מתוך תשובת המודל (Regex + `JSON.parse`).
- Frontend (Vite + React + Tailwind):
  - `interview-coach-ui/src/App.tsx:1` – מסך ראשי עם שתי לשוניות: Chat/History, בחירת מצב, בחירת שאלה, טיוטה, שליחה ל‑API והצגת תשובת המאמן.
  - `interview-coach-ui/src/HistoryPanel.tsx:1` – טעינת היסטוריית סשנים ועד הפרטים (שלבים, ניקוד, Action Items, Snippet).
  - `interview-coach-ui/src/main.tsx:1`, `interview-coach-ui/index.html:1` – אתחול האפליקציה.
  - `interview-coach-ui/tailwind.config.js:1`, `interview-coach-ui/src/index.css:1` – Tailwind CSS.
  - קונפיג: `interview-coach-ui/vite.config.ts:1`, `interview-coach-ui/package.json:1`.
- דיפלוי ל‑Render: `render.yaml:1` – שני שירותים: web ל‑API ו‑static ל‑UI, עם הזרקת `VITE_COACH_API` בזמן build.

**זרימת עבודה ולוגיקה**
- תרחיש אימון בסיסי (סבב אחד):
  - המשתמש ב‑UI בוחר Mode, בוחר שאלה מהמאגרים, כותב טיוטת תשובה, ולוחץ “Get Feedback”.
  - ה‑UI שולח POST אל `POST /coach/session` עם `mode`, `questionId`, `userDraft`, `localeHint`.
  - השרת טוען את פריט השאלה מתוך Question Bank, יוצר Session חדש (in‑memory), בונה הודעות (`system`=SYSTEMPROMPT + `user`=פרטי מצב/לוקאל/JSON של פריט השאלה + טיוטה), קורא ל‑LLM, מקבל טקסט, מחלץ ממנו בלוק `COACH_JSON` (אם קיים), ושומר שלב (Step) עם ניקוד, תתי‑ציונים, Action Items ו‑Snippet.
  - תגובת השרת כוללת `assistant_text` (טקסט מלא של המודל) ו‑`coach_json` (ה‑COACH_JSON המפורש) לצד נתוני session/step.
  - ה‑UI מציג את תשובת המאמן, מוסיף “נאג’” קצר ועובר להודעה הבאה.
- היסטוריה:
  - `GET /history/sessions?userId=demo` – רשימת סשנים מסודרת מהחדש לישן.
  - `GET /history/sessions/:id` – פרטי סשן כולל שלבים, לניטור ההתקדמות.

**מצבי עבודה (Modes)**
- נתמכים: `ExplainAndReflect`, `Drill`, `MockInterview`, `Flashcards`.
- ה‑SYSTEM PROMPT מכוון את המודל לקצב מחזורי של: הצגת השאלה וכוונתה, בדיקת הבנת הכוונה, טיוטת משתמש, משוב ממוקד, שכתוב ממוקד, ניקוד 1‑5, מעבר/חזרה.
- בכל תשובה המודל נדרש לצרף בלוק `COACH_JSON` מגודל קומפקטי ומובנה.

**COACH_JSON – פורמט**
- בסוף כל תשובת עוזר, המודל מתבקש לצרף בלוק בתחימת שלוש ג׳-ים עם תווית `COACH_JSON` לדוגמה:
  ```
  ```COACH_JSON
  {
    "score_overall": 4,
    "scores": {
      "clarity_structure": 4,
      "role_company_relevance": 4,
      "message_motivation": 4,
      "evidence_impact": 3,
      "conciseness": 4,
      "tone_professionalism": 5,
      "learning_from_challenges": 4
    },
    "action_items": ["הדגש תוצאה מדידה אחת", "קשר מפורש לתפקיד", "קצר את הפתיחה"],
    "example_snippet": "דוגמה תמציתית לקטע משופר...",
    "illegal_question_detected": false,
    "next_step": "Focused rewrite"
  }
  ```
  ```
- הצד השרת מחלץ ומאמת ערכים בסיסיים: `score_overall`, `scores`, `action_items`, `example_snippet`, `illegal_question_detected`, `next_step` (`src/llm/parseCoachJson.ts:1`). במקרה כשל בחילוץ – מוחזר `null`, אך בכל זאת נשמר שלב (עם `null`‑ים) לטובת רציפות היסטורית.

**נקודות קצה (API)**
- `GET /health` – בדיקת חיים בסיסית (`src/server.ts:1`).
- `POST /coach/session` (`src/routes/coach.ts:1`)
  - Body (JSON):
    - `mode`: אחד מה־Modes הנתמכים.
    - `questionId`: מזהה שאלה מתוך ה‑Question Bank (למשל `q_tell_me_about_yourself`).
    - `userDraft?`: טיוטת המשתמש (מומלץ, לשיפור המשוב).
    - `localeHint?`: לדוגמה `he-IL`.
    - `company?`, `role?`: הקשר תפקיד/חברה (לעתיד, אופציונלי ב‑MVP).
  - תגובה: `{ ok: true, data: { session, step, assistant_text, coach_json } }`.
- `GET /history/sessions?userId=demo` (`src/routes/history.ts:1`) – רשימת סשנים למשתמש (ברירת מחדל `demo`).
- `GET /history/sessions/:id` – פרטי סשן וצעדים שנשמרו.

**מאגרים וסכמות**
- טיפוס שאלה: `src/types/question.ts:1` – כולל שדות `id`, `question`, `intent`, `recommended_structure[]`, `notes_for_interviewer_meaning[]`, `illegal_question_flag`.
- מאגר שאלות לדוגמה: `src/data/questionBank.ts:1` – מערך קשיח של פריטים (MVP). ניתן להחליף/להרחיב.
- הרחבה עתידית: ב‑`src/services/getQuestionById.ts:1` מופיעה תבנית (מושבתת) לשליפה מ‑DB עם Zod.

**אינטגרציה למודל שפה (LLM)**
- ספרייה: OpenAI SDK, אבל עם `baseURL` תואם OpenAI לשירות Gemini (`src/llm/openai.ts:1`).
- קלט למודל: נבנה באמצעות `buildMessages` (`src/llm/buildMessages.ts:1`) –
  - `system`: תוכן ה‑SYSTEMPROMPT המחמיר.
  - `user`: תוכן הכולל Mode, לוקאל, ו‑JSON מלא של פריט השאלה + טיוטת המשתמש, כדי להצמיד למודל את כל המידע הרלוונטי ל‑turn.
- קריאה:
  - ניסיון ראשון: `openai.responses.create` (Responses API) עם מבנה `input_text`.
  - נפילה אחורה: `openai.chat.completions.create` אם ה‑baseURL לא תומך ב‑Responses API (404).
- מודל ברירת מחדל: `gemini-2.5-pro` (ניתן לשינוי ע״י `MODEL`/`GOOGLE_CHAT_MODEL`).

**CORS וקנפוג לקוח**
- CORS מאופשר לפני הראוטרים: `src/server.ts:1`. ברירת מחדל: `origin=true` (פתוח), ניתן להגדיר `WEB_ORIGIN` לכתובת ה‑UI בפרודקשן.
- ה‑UI משתמש במשתנה סביבה `VITE_COACH_API` בזמן build/dev, עם ברירת מחדל `http://localhost:8000` (`interview-coach-ui/src/App.tsx:1`, `HistoryPanel.tsx:1`).

**הרצה מקומית**
- דרישות מקדימות:
  - Node.js 20+.
  - מפתח API פעיל ל‑Gemini. הגדרת משתנה סביבה `GOOGLE_API_KEY` (אל תחשפו מפתחות לריפו ציבורי!).
- Backend (טרמינל 1, בספריית השורש):
  - התקנה: `npm ci`
  - dev (TS + watch): `npm run dev` – מאזין ב־`http://localhost:8000`.
  - build + start: `npm run build` ואז `npm start`.
- Frontend (טרמינל 2, ספרייה `interview-coach-ui`):
  - התקנה: `npm ci`
  - dev: `npm run dev` – מאזין ב־`http://localhost:5173`.
  - חיבור ל‑API: ברירת המחדל היא `http://localhost:8000`. ניתן להגדיר `VITE_COACH_API` בסביבת הפיתוח אם נדרש.

**משתני סביבה (עיקריים)**
- Backend:
  - `GOOGLE_API_KEY` – חובה. מפתח לשימוש ב‑Gemini ב‑baseURL התואם OpenAI.
  - `GOOGLE_CHAT_MODEL` או `MODEL` – אופציונלי. ברירת מחדל: `gemini-2.5-pro`.
  - `PORT` – ברירת מחדל `8000`.
  - `WEB_ORIGIN` – כתובת ה‑UI המותרת ב‑CORS (מומלץ להגדיר בפרודקשן).
- Frontend:
  - `VITE_COACH_API` – כתובת ה‑API בזמן build; ב‑Render מוזרק אוטומטית (ראו `render.yaml:1`).

**דיפלוי ל‑Render**
- הקובץ `render.yaml:1` כולל:
  - שירות web (Node) ל‑API: `npm ci && npm run build`, ואז `npm start`. ערכת סביבה `NODE_VERSION=20`, ואת `GOOGLE_API_KEY` מגדירים דרך הגדרות השירות ב‑Render (לא בקוד).
  - שירות סטטי ל‑UI: `interview-coach-ui`, בנייה עם `npm ci && npm run build`, פרסום תיקיית `dist`.
  - הזרקת `VITE_COACH_API` אל ה‑UI מתוך כתובת ה‑API בעזרת `fromService`.

**אבטחה, מגבלות והרחבות עתידיות**
- אבטחה:
  - אל תתחייבו (`git commit`) קובצי `.env` עם מפתחות אמיתיים. הוסיפו `.env` ל‑`.gitignore` והחזיקו סודות בסביבת הרצה (כגון Render Secrets).
  - קנפוג CORS: בפרודקשן הגדירו `WEB_ORIGIN` לכתובת ה‑UI בלבד.
- מגבלות ה‑MVP:
  - אחסון in‑memory בלבד: סשנים ושלבים יאבדו באתחול השרת. לרציפות – חברו למסד נתונים (ראו תבנית DB ב‑`src/services/getQuestionById.ts:1`).
  - תלות ב‑COACH_JSON של המודל: אם המודל יחזיר פורמט לא תקין – החילוץ יחזיר `null`.
- כיווני הרחבה:
  - התמדה ב‑DB (Sessions/Steps/Questions) + סכימות Zod מלאות.
  - אימות קלט מלא ב‑API ורמות לוגינג/טלאות (Observability).
  - תמיכה במצבי אימון מתקדמים ו‑multi‑turn עם Session קבוע.
  - ניהול משתמשים אמיתי במקום `userId=demo`.

**דוגמה לשימוש ב‑API (cURL)**
- יצירת Turn אימון:
  - `curl -X POST http://localhost:8000/coach/session -H "Content-Type: application/json" -d '{"mode":"ExplainAndReflect","questionId":"q_tell_me_about_yourself","userDraft":"אני בעל/ת ניסיון...","localeHint":"he-IL"}'`
- היסטוריית סשנים:
  - `curl "http://localhost:8000/history/sessions?userId=demo"`
- פרטי סשן:
  - `curl "http://localhost:8000/history/sessions/<SESSION_ID>"`

**פתרון תקלות (Troubleshooting)**
- 401/403 או תשובה ריקה מה‑LLM: ודאו ש‑`GOOGLE_API_KEY` מוגדר בסביבת השרת ושאין רווחים/גרשיים מיותרים.
- שגיאות CORS בדפדפן: הגדירו `WEB_ORIGIN` ל‑URL של ה‑UI, ובנו מחדש את השרת.
- UI לא “רואה” את ה‑API: הגדירו `VITE_COACH_API` בעת `npm run dev` של ה‑UI או בזמן build, למשל ב‑PowerShell: `$env:VITE_COACH_API="http://localhost:8000"; npm run dev`.
- COACH_JSON לא נמצא: ודאו שהמודל מחזיר בלוק תחום ``` עם תווית `COACH_JSON` ו‑JSON תקין.

**ריצת Smoke‑Test מקומית**
- Backend: `npm ci && npm run dev` (פורט 8000).
- Frontend: ב‑`interview-coach-ui` – `npm ci && npm run dev` (פורט 5173).
- פתיחת הדפדפן ל‑`http://localhost:5173`, בחירת שאלה ומצב, כתיבת טיוטה ולחיצה על “Get Feedback”. בדיקת לשונית History שהסשן/שלב נרשמו.

בהצלחה, ותמיד זכרו: קצר, ממוקד, מדיד ורלוונטי לתפקיד.

