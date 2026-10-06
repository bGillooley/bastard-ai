# Bastard-AI

A parody chatbot that answers every Question with one of two Retorts built from the Question's Subject.

## Glossary

**Question**
The message a user sends. Any text, including empty or nonsensical input.

**Subject**
The phrase taken from a Question that gets dropped into a Retort. For "how do I start a rock band?" the Subject is "rock band". It is the last noun phrase in the Question, minus words like "my", "the" and "a", and no longer than its last 4 words: "how do I clean my old leather boots?" → "old leather boots". It is lowercased, except all-caps words like "NASA". A Question may have no Subject.

**Retort**
The bot's only kind of reply. Every Question gets exactly one Retort. A Retort is always a Threat, an Insult, or the Fallback Retort.

**Threat**
A Retort of the form "I'll <Subject> you in a minute".

**Insult**
A Retort of the form "You're a <Subject>" ("an" before a vowel sound). Plurals are not corrected: "You're a cats" is intended.

**Fallback Retort**
The fixed Retort given when a Question has no Subject: "I'll question you in a minute".

**Conversation**
The Questions and Retorts shown on screen. It lasts only while the page is open and is gone after a reload.

**Thinking**
The fake pause before a Retort starts appearing, imitating a real LLM working.

## Rules

- When a Question has a Subject, Threat or Insult is picked at random with equal odds, so asking the same Question again may get a different Retort.
- A Retort appears word by word after Thinking ends.
- The Subject is never filtered or censored: whatever the user typed can come back in the Retort.
- Only one Question is answered at a time: a new Question can't be asked until the current Retort has finished appearing.
