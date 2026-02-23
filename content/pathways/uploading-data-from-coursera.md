# Uploading Data from Coursera

We import data from Coursera. Coursera has an administrators log in where data can be viewed and downloaded.

## Uploading Data: Coursera Usage Report

Use `Apps > Importers > Coursera data`

## Uploading Data: Coursera Gradebook

Use `Apps > Importers > Coursera Gradebook`

## Issues with Commas

Course names containing commas cause an issue as Airtable recognises them as multiple courses. For example:

- **Foundations: Data, Data, Everywhere** is recognised as three courses: 
  - Foundations: Data 
  - Data 
  - Everywhere

- **Start the UX Design Process: Empathise, Define and Ideate** is recognised as two courses: 
  - Start the UX Design Process: Empathise 
  - Define and Ideate

There are automations to correct this running on Airtable:

> `Automations > Correct Course Name…`

There are Data Cleaning views set up on `[Coursera Data]` and `[Learners]` to check this.

A manual fix when importing data is to edit the `.CSV` file to replace all course names with a comma; the importer treats them as separators; this shouldn't be necessary.