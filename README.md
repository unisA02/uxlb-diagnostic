# UX Elbi Diagnostic Assessment

A timed, sectioned online test with per-part countdowns, one-question-at-a-time
delivery, option shuffling, tab-leave logging, and a private results export.
No server to run: a static page on GitHub Pages plus a free Supabase database.

```
index.html     the test (public)
admin.html     results + CSV export (public page, but useless without your service key)
config.js      ALL content and settings: questions, timers, org name, Supabase URL
supabase.sql   database setup, run once
img/           question images
```

## First-time setup (about 30 minutes)

### 1. Supabase (the database)

1. Go to https://supabase.com and sign up (GitHub login is fine). Free plan.
2. New project. Name it `uxelbi-diagnostic`, pick the Singapore region, set any
   database password (you will not need it again). Wait a minute for it to build.
3. Left sidebar > SQL Editor > New query. Paste the entire contents of
   `supabase.sql` and press Run. You should see "Success".
4. Left sidebar > Project Settings > API. Copy two things:
   - Project URL (looks like `https://abcdefgh.supabase.co`)
   - `anon` `public` key (long string starting with `eyJ`)
   Leave this tab open; you will also want the `service_role` key later for
   the admin page. Never paste the service_role key into any file in this repo.

### 2. Fill in config.js

Open `config.js` and set:

```js
supabase: {
  url: "https://abcdefgh.supabase.co",
  anonKey: "eyJ...",
},
```

The anon key is meant to be public. The SQL you ran means it can only insert
rows, never read them.

Also check `edition` (used to separate batches), `emailDomain`, `opensAt` /
`closesAt` if you want a window, and `showScore`.

### 3. GitHub Pages (the hosting)

1. Create a new GitHub repository, e.g. `uxelbi/diagnostic`. Public or private
   both work; Pages on a private repo needs a paid plan, so public is simpler.
   Nothing secret is in the repo.
2. Upload every file in this folder (drag and drop in the browser works, or
   `git push`). Keep `img/` as a folder.
3. Repo > Settings > Pages > Source: "Deploy from a branch", Branch: `main`,
   folder `/ (root)`. Save.
4. After a minute the page is live at
   `https://<account>.github.io/<repo>/`. That is the link you share.

### 4. Dry run (do not skip)

1. Open the live link, take the whole test yourself with a real up.edu.ph
   email. Let one timer run out on purpose to see the auto-advance.
2. Open `https://<account>.github.io/<repo>/admin.html`, paste the project URL
   and the `service_role` key, click Load responses. Your run should appear
   with a Part 1 score. Download the CSV once to confirm it opens.
3. In Supabase > Table Editor > responses, delete your test row so it does not
   pollute the real data (or just filter it out later by email).

## Running a batch

- Share the index link. Takers enter name and email, press Start, and the
  Part 1 timer begins immediately.
- A refresh does not reset the attempt or the timers; they resume.
- One submission per email per edition. A second attempt is refused at the end
  with a message, so tell people to do it in one sitting.
- Afterwards open `admin.html`, load, export CSV. Columns include Part 1 score
  per question, minutes spent per part, whether each part ended by "finished"
  or "timeout", and how many times the person left the tab during Part 1.

## Next batch

1. In `config.js`, change `edition` to e.g. `2027-02`. Edit questions or timers
   if you like. Push.
2. In Supabase > SQL Editor, add the key for the new edition:
   ```sql
   insert into public.answer_keys (edition, key)
   values ('2027-02', '{"q1":1,"q2":0,"q3":2,"q4":0,"q5":1,"q6":0,"q7":0,"q8":0}');
   ```
   Keys are 0-based option indexes in the order written in `config.js`, not the
   shuffled order the taker saw.

## How the config works

Each entry in `sections` has:

| field          | meaning                                                        |
|----------------|----------------------------------------------------------------|
| `minutes`      | timer for the part, or `null` for no timer                      |
| `onePerScreen` | `true` = one question at a time, no going back                  |
| `shuffleOptions` | shuffle option order for `choice` questions in this section   |
| `questions`    | list of questions                                               |

Question `type` can be `choice` (single answer), `multi` (checkboxes, optional
`max`), `text` (long answer), `short` (one line, optional `required`), or
`grid` (1 to 5 rating rows). Any `choice` question can set `shuffle: false`
to keep its order (used for the scenario picker).

## What this does and does not prevent

Timers run in the taker's browser and resume across refreshes. A determined
person can read the page source, so treat the timers as pacing, not proof. It logs tab switches, copy
attempts, and window blur, and blocks right-click and text selection during
Part 1. It cannot stop a second device or a phone camera. For a diagnostic,
the 8-minute Part 1 clock and the "this does not affect your standing" framing
do most of the work.
