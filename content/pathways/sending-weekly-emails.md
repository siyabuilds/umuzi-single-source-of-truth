# Sending Weekly Emails

We usually send personalised progress emails to all learners on Wednesdays. Below are the step-by-step instructions, along with a Loom video. New or updated instructions that don't appear in the video are highlighted below.

## Step-by-Step Instructions

1. **Check Data Has Been Recently Updated:**
   - On [Learners], the 'Last Course Activity' field should show some recent dates.

2. **Check Data Cleaning Views and Fix Any Issues:**
   - On [Learners]:
     - **No Group:** Ensure each learner is linked to Groups and Groups + based on start date, location, and certificate.
     - **Collections is Empty:** Ensure each learner is linked to a collection based on the courses they have started.
   - On [Coursera Data]:
     - **Blank:** Data extraction date - check that Coursera data has been correctly uploaded and each record has a Data extraction date.

3. **Create a New Interaction on [Interactions]:**
   - Add a new interaction selecting audience, type of communication, date, and person sending (we typically send out two emails weekly to Yoma learners and Umuzi staff + prototypes).
   - Check the box **'Content for next email'**. This tells Airtable to use this row to populate the next email you send. If the wrong row is ticked, or more than one row is ticked, Airtable will not populate the email with the right content.

4. **Use the Relevant Script to Add Learners to the To: Field:**
   - In Apps > Scripts > Select script for relevant audience > click Run.
   - Select the interaction you just created (should be the one at the bottom of the list).
   - Once the script has run, you can exit the app.

5. **Write an Introduction to the Email with Some Relevant News:**
   > Good news! Our community of 373 learners across Africa have completed 776 Grow with Google courses to date.

   > What's new? We've added a profile section below. Join us in celebrating one of your peers every week.

   > Finally, please join us on Facebook to grow your professional network by meeting our inspiring community members: [Facebook Link](https://www.facebook.com/AfricanCodingNetwork)

6. **Link to a Wellness Bite:**
   - You can view all the Wellness bites on [Wellness Content].
   - Select one that hasn't already been sent to this audience (check the Interactions column).
   - If you want to edit a Wellness bite, you will have to go to another base [Community: Wellness Assets].

7. **Select a Learner to Profile:**
   - Consider profiling a learner that our comms team has recently featured on the ACN Facebook page.
   - Select the learner in the field **Profile**.
   - Copy and paste the relevant Facebook post caption or write your own, e.g.:
     > We've spotted another young mind this week who is a course away from completing her certificate. Meet Divine Chisom Ukonu from Nigeria. She's currently doing her Grow with Google Data Analytics certificate.
     >
     > It was during lockdown last year that she took an interest in coding. She picked up on basic HTML, CSS, and JavaScript, and now she's a course away from adding data analytics to her set of skills. We're looking forward to seeing her finishing strong. Check out her video to see what she's all about.

   - Check the **Profile Name** field is correct. If you see an error, you can manually override it in the field: **Profile: Name - override**.
   - Add a URL link to the profile in the field **Profile: Link**, e.g. the link to the Facebook post featuring this learner.

8. **Check the Data:**
   - On [Learners], look at the relevant view (e.g. Yoma - Overview) to eyeball the data that will appear in the email to check everything is correct (e.g. Has the data been updated? Check the Last Course Activity entries are recent).

9. **Get Ready to Send the Email:**
   - Open Apps > Emails > Email: Learner weekly summary.
   - Open it to full-screen.
   - Select the view to send to: select a smaller group first, e.g. Staff + Prototypes.
   - If changes have been made to the email template, update the Message with the latest/preferred HTML template from Sendgrid (see Adding new content to weekly emails).
   - Check content in HTML preview. Scroll through a couple of emails to check the content is right.
   - Click **Send**; it will take a little while to send all the emails. Once complete, you can close the app.

10. **Record Emails Have Been Sent:**
    - On [Interactions], save the version of the Message HTML you used in **Comm HTML** (can be downloaded from Sendgrid, see Adding new content to weekly emails); leave blank if the HTML wasn't updated.
    - Check the box **Comm sent**.

You're done!