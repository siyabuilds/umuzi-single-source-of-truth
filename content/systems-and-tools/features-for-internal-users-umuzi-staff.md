# Features for Internal Users (Umuzi Staff)

Umuzi Staff & internal users can access the following features related to placements in their Retool Admin Portals:

## Candidates Page
[Candidates Page](https://umuzi.retool.com/p/admin-candidates-list)

This application is designed to manage candidate data. The app provides a user-friendly interface to search, filter, view, and manage candidate information.

> Note: For these small images, please right click and "Open in a new tab" in order to see more clearly.

### 1. Accessing the App
- Open the Retool application in your browser using the link provided above ⬆️.
- Admin credentials may be required for full functionality, accessed via a token in the URL. Please note that you need to be specifically added to this Portal to access it. If you have not been invited, you will not be able to log in.

### 2. Key Features - Detailed

#### 2.1. Search Functionality
- **Email Search:** Use the text input field above the main table. Enter the candidate's email address (or a portion of it) to filter the table. The table will dynamically update to show only candidates matching the entered email.

#### 2.2. Filtering, Data Download, and Refresh
- **Table Filtering:** Click on the filter icon and filter by the specific data you are looking for.
- **Downloading Data:** Look for a "Download" button within the table widget itself. Clicking this button will download the currently displayed data in a format (e.g., CSV).
- **Refresh:** To refresh the candidate data, trigger the main data retrieval query which reloads the table data.

#### 2.3. Editing/Updating Education History
- **Edit/Update Education button** allows updating the candidate's education history. Once this button is clicked, you will be presented with a modal where you can:
  - ➡️ Add new education details for the candidate.
  - ➡️ Update existing education details for the candidate.
  - ➡️ Delete any unwanted education details.

#### 2.4. Edit/Update Employment History
- **Edit/Update Employment button** allows updating the candidate's employment history. Once this button is clicked, you will be presented with a modal where you can:
  - ➡️ Add new employment details for the candidate.
  - ➡️ Update existing employment details for the candidate.
  - ➡️ Delete any unwanted employment details.

### 3.5. View Profile Button
- **View Profile Button:** The app allows for viewing the candidate's detailed profile page.
  
[Candidate details page](https://umuzi.retool.com/p/admin-candidate-detail?candidate_id=37)

Admins get here by clicking the "profile" button in the candidates table page mentioned above ⬆️. Admins can view a specific candidate in detail on this page - navigate to the candidate's CV and delete unwanted entries.

## Opportunities Page
[Opportunities Page](https://umuzi.retool.com/p/opportunities)

This application is designed to manage placement opportunities. It provides a user-friendly interface to view, filter, and update opportunity information.

### 1. Accessing the App
- Open the Retool application in your browser.
- Admin credentials may be required for full functionality, accessed via a token in the URL.

### 2. Key Features - Detailed

#### 2.1. Table View and Search
The main table displays opportunities. It includes details like ID, title, description, location, salary range, work type, requirements, and status.

#### 2.2. Filtering, Data Download, and Refresh
- **Filtering:** The Retool Table component has built-in filtering capabilities. To use these:
  - Click the filter icon on the toolbar of the table component.
  - Select the column you want to filter.
  - Set the condition to filter for.
  
- **Downloading Data:** Click the "Download" button in the table toolbar. Choose your desired format. The app supports the standard CSV.
  
- **Refresh:** Click the "Refresh" button in the table toolbar.

#### 2.3. Update Opportunities
- **Update Opportunities:** Click the "Update" button on the column titled Update in the all_opportunities_table component to open opportunity_modal. Make the required changes and click the submit_updated_opportunity to apply the changes or close_modal_btn to discard your changes.

#### 2.4. View Opportunities
- **View Opportunities:** Click the "View" button on the column titled View in the all_opportunities_table component to open opportunity_modal.

### 3. Component Details (Relevant to New Features)
- **all_opportunities_table Widget:** Displays the opportunities data in a table format. The relevant features are the filtering, downloading, and refreshing.
- **opportunity_modal Widget:** A modal window used for displaying detailed information about an opportunity, allowing the user to review or update the information.

### 4. How to view and update Opportunities

#### 4.1 View
- Click on the button in the View column.
- A pop-up (opportunity_modal) will appear with the opportunity details.

#### 4.2 Update
- Click on the button in the Update column.
- A pop-up (opportunity_modal) will appear with the opportunity details.
- Make the required changes to the form.
- Click submit_updated_opportunity to submit your changes.

## Organisations Page
[Organisations Page](https://umuzi.retool.com/p/organisations)

This application is designed to manage a list of organizations. The app allows you to view organizations in a table format, including their ID, name, and creation date. This app is intended for internal use, likely by administrators.

### 1. Accessing the App
- Open the Retool application in your browser.
- Admin authentication is required to view the organization data. The app checks for an admin token.

### 2. Key Features - Detailed

#### 2.1. Table View
The main area of the app displays a table of organizations, with the following columns:
- **Organisation name:** The name of the organization.
- **"View" button:** Button that, when clicked, opens a new app to view the details of the specific organization.

#### 2.2. Data Download
To download the data currently displayed in the table:
- Locate the table toolbar (likely at the bottom of the table).
- Click the "Download" button. The data will be downloaded in a CSV format.

#### 2.3. Refresh
To refresh the table and get the latest data from the database:
- Locate the table toolbar.
- Click the "Refresh" button.

### 3. Component Details
- **get_organisations Query:** This SQL query fetches the organization data (ID, name, and creation date) from the organisations table. It specifically excludes organizations where is_placements_portal_enabled is TRUE.
- **organisations_table Widget:** This is the Retool Table widget that displays the data fetched by the get_organisations query. It provides sorting, filtering, and download functionalities.

### 6. How to "View" an Organisation
- Locate the "View" column in the organisations_table.
- Click the "View" button in the row corresponding to the organization you want to view.

[Organisations details page](https://umuzi.retool.com/p/organisation-details?org_id=1#=)

#### 1. Organisation Details Display
- **Organisation Name:** The app prominently displays the name of the organization at the top.

##### 1.1. Tabbed Interface
The app uses a tabbed interface to organize the information:
- **Opportunities:** Displays a list of opportunities associated with the organization.
- **Liked Candidates:** Displays a list of candidates that have been "liked" by the organization.

##### 1.2. Opportunities Tab Functionality
- **Opportunities Table:** This table displays the opportunities associated with the organization.
- **Downloading Data:**
  - Locate the "Download" button in the opportunities_table toolbar.
  - Click the button. The data will be downloaded in a CSV format.
  
- **Refresh:** Click the "Refresh" button in the opportunities_table toolbar.
  
- **View Candidates:** The "See Candidates" button will redirect to another app (see details below).

##### 1.4. Liked Candidates Tab Functionality
- **Liked Candidates Grid:** This displays the list of candidates who have been "liked" by a user associated with the organization. The "Candidate Card" displays limited candidate details: profile picture, name, email, etc.

### 2. Admin Authentication
The organisation_details_tabbed_container's visibility depends on the check_admin_token.data.is_authenticated condition. This restricts access to only authenticated administrators.

### 3. How to "View Candidates"
- In the "Opportunities" tab, locate the "See candidates" button.
- Click on the "See candidates" button.

## Placements Page
[Placements Page](https://umuzi.retool.com/p/placements)

This application is designed to manage placement records, linking learners to opportunities within organizations. It presents a table view of placements, including details about the learner, opportunity, organization, and placement status.

### 2. Accessing the App
- Open the Retool application in your browser using the link above ⬆️.
- No specific admin authentication is mentioned in the JSON, but access might be restricted based on Retool user roles.

### 3. Key Features - Detailed

#### 3.1. Placement Table View
The primary interface is a table displaying placement information. Columns include:
- Learner Name
- Learner Last Name
- Opportunity Name
- Organisation Name
- Start Date
- End Date
- Final Salary (Monthly)
- Status
- Created At
- Updated At

#### 3.2. Filtering
Filtering not specified in the component, but the table itself offers basic filtering functionality.

#### 3.3. Data Download
The Retool Table component includes a "Download" button in its toolbar.
- Click the "Download" button. A CSV of the current data is downloaded.

#### 3.4. Refresh
The Retool Table also has a "Refresh" button.
- Click the "Refresh" button. The table is refreshed.

#### 3.5 Insert Dummy Data
The function **insert_dummy_to_placements** can be used to insert dummy data into the placements table.

### 4. Component Details
- **get_placements Query:** This SQL query retrieves the placement data. It joins the placements, learners, placements_opportunities, and organisations tables to gather the necessary information. It orders the results by pl.created_at in descending order.
- **placements_table Widget:** This is the Retool Table widget that displays the placement data. It provides sorting, filtering, and download functionalities.
- **insert_dummy_to_placements Query:** This SQL query inserts dummy data into the placements table.
- **get_opportunities Query:** This SQL query retrieves the opportunities data.
- **get_learner_names Query:** This SQL query retrieves the names of the learners.