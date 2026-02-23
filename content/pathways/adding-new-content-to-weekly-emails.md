# Adding New Content to Weekly Emails

We create HTML email templates for our weekly learner emails in Sendgrid. We send them out using an App in Airtable. We personalise the messages with learner data using HTML tags that refer to fields in the learners' records.

## Updating the Email Template

To make changes to the format of the email, or add new fields, you can update the Grow with Google Learner Report template on Sendgrid:

1. Log in to Sendgrid (you can ask Gilbert, Andrew, Dario, or Hloni for logins).
2. Go to **Design Library**.
3. Look for the **Grow with Google Learner Report** with the latest version number.
4. Duplicate this template and update the new file with a new version number.
5. Update the template.
6. Export the HTML:
   ```plaintext
   Build > Advanced > HTML
   ```
7. Open HTML in Chrome browser, select **View**, **Developer**, **View Source**.
8. Copy all the HTML and paste it into Airtable GwG base:
   - **Apps > Emails > Email: Learner Weekly Summary > HTML**.

## Adding New Fields

1. Add the new fields which populate the template to **[Interactions]**, checking the field names match the tags in the HTML template.
2. Add new fields from **[Interactions]** as a rollup in **[Learners]**.
3. On **[Learners]**, add a new rollup field:
   - Select **[Interactions]** as the table.
   - Filter records by **Most Recent = 1**.
   - Aggregation formula = **values**.
4. Check the field names in **[Learners]** match the tags in the HTML template.

## Previewing the Email

> Preview the email to see if all the changes you've made and new fields are working.