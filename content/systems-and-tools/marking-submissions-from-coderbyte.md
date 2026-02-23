# Marking Submissions from Coderbyte

Note that only open-ended questions/answers are marked by the AI (not multiple choice and code submissions).

## Setting Up the Assignments

First, you'll need a classroom set up on the marking app. You will most likely want to set the classroom up on Google Classroom and then sync it to the marking app.

Once you have a classroom set up on the app, you must connect it to your Coderbyte assignments. In the Coderbyte Assignments section, click "Add", and then choose the Coderbyte assignment you want to add.

You should now see the Coderbyte Assignment added to your list.

Now it's time to set up the assessment rules for your Coderbyte assignment. There are two different ways you can assess a Coderbyte assignment: 

- Points based
- Rubric based

If you want a points-based assessment, make sure Rubric is set to "None". This is an example of a submission that's been marked on a points-based assessment (5 points per question):

If you want a rubric-based assessment, choose a Rubric in the dropdown (or create a new one). This is an example of a submission that's been marked on a rubric-based assessment:

## How Marking Submissions Works

You must always sync the assignment before marking, so you get the latest content.

> **ProTip:** You can check the source code if you're curious how Coderbyte submissions get marked.

Marking submissions works by compiling a big text prompt for the AI model, including the following information:

1. The AI identity and instructions (how to mark)
2. The rubric breakdown to be used for marking, if a rubric was chosen; otherwise, the points breakdown
3. Special instructions, if provided
4. All the questions and corresponding answers, collected from the Coderbyte API

The AI then outputs thinking for each provided answer, plus final scores and comments which are attached to the submission.

## When to Include Custom Marking Instructions

One common use case for custom marking instructions is adding model answers. This is especially useful in instances where the AI cannot fully understand the question being asked (e.g., in UI/UX there is an attached image which is not fed to the AI). Model answers should be added surrounded by the tags `<model_answers>…</model_answers>` so the AI knows what they are.

In instances where the question is straightforward and you want to rely on the AI's built-in knowledge to assess answers, it's fine to skip including model answers.

## Common Issues with Marking Coderbyte Submissions

- The question was too long and the Coderbyte API truncated it.

Avoid creating long-winded/multi-part questions where possible, as the Coderbyte API only returns a limited number of characters for each question. If the question is too long (multiple paragraphs), then the AI won't know the full question that was asked, which may affect its ability to mark the answer.