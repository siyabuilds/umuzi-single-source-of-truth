# Marking Submissions from GitHub Classroom

## Setting up the Assignments

First, you'll need a classroom set up on the marking app. You will most likely want to set the classroom up on Google Classroom and then sync it to the marking app.

Once you have a classroom set up on the app, you must connect it to your GitHub Classroom. Choose "Connect to GitHub", and click "Connect" next to the GitHub classroom you want to connect.

You should now see a list of GitHub Assignments reflecting what was set up on GitHub Classroom.

Now it's time to set up the assessment rules for each assignment. Click through to each assignment, and choose a Rubric from the dropdown. For GitHub assignments, you most likely will want to choose the standard "Coding" rubric.

You can also add optional marking instructions in the text box to guide the AI if you wish. For marking GitHub assignments with a Coding rubric, you probably won't need custom instructions.

## How Marking Submissions Works

You must always sync the assignment before marking, so you get the latest content.

> **ProTip:** You can check the source code if you're curious how submissions get marked.

Marking submissions works by compiling a big text prompt for the AI model, including the following information:

- The AI identity and instructions (how to mark)
- The rubric breakdown to be used for marking
- The assignment instructions, taken from the repository README file
- Special instructions, if provided
- All the files in the repository, collected via the GitHub API, minus any in the ignore list

The AI then outputs scores based on the rubric, which are attached to the submission.

## Common Issues with Marking GitHub Submissions

- The learner's code is on a branch: The AI only marks the main branch, so they will need to merge their code.
- The learner deleted or changed the README: The assignment content is taken from the README file, so this will need to be restored.
- The learner included weird files that are unreadable: There is an ignore list in the app that the maintainer can update if you receive this error.