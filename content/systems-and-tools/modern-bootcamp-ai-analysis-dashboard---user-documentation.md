# Modern Bootcamp AI Analysis Dashboard - User Documentation

## Overview
The Modern Bootcamp AI Analysis Dashboard is a powerful Google Sheets tool that automates the collection, analysis, and reporting of learner assessment data from Google Classroom and Coderbyte. It provides AI-driven insights, consolidated reports, and tracking across multiple bootcamp cohorts.

## Key Features
- **Multi-Cohort Management**: Handle multiple bootcamp cohorts simultaneously
- **Google Classroom Integration**: Automatically fetch learners from your Classroom courses
- **Coderbyte AI Analysis**: Pull assessment results with AI-generated feedback
- **Automated Report Links**: Generate clickable links to individual assessment reports
- **Consolidated Analysis**: Combine data across all 5 assessment days
- **Dynamic Configuration**: Configure assessment IDs without editing code
- **Smart Data Refresh**: Update individual days or all days at once

## Quick Start Guide

### Step 1: Make a Copy
[Make a Copy](https://docs.google.com/spreadsheets/d/1MJvCIvXsDFi4iM0adlqQTr8az4txKef-_bVp_E6gU40/edit?usp=sharing)  
1. Click File → Make a copy  
2. Name your copy (e.g., "Bootcamp Data Cohort Jan 2026")

### Step 2: Initial Setup (One-Time)
1. In your new copy, go to: 🤖 Modern Dashboard → ⚙️ Setup Wizard  
   This opens a setup wizard  
   Follow the on-screen instructions  
   
   OR Manual Setup:  
   1. Click Extensions → Apps Script  
   2. Click Services (+) on the left  
   3. Add Google Classroom API  
   4. Click Save Project (💾 icon)  
   5. Close Apps Script editor  

### Step 3: Authorize (First Time Only)
1. Run any menu function (e.g., "Get Learners from Classroom")  
2. Click Review Permissions when prompted  
3. Choose your Google account  
4. Click Allow (grant all requested permissions)  

### Step 4: Configure Your Cohort
- 🎯 Setup All Sheets - Creates all necessary sheets  
- ⚙️ Configure Assessments - Enter Coderbyte assessment IDs  
- 🎓 Get Learners from Classroom - Select your bootcamp  

> **Note**: Steps 2-3 only need to be done once per spreadsheet copy.

## Sheet Structure

### Main Dashboard (📊 Main Dashboard)
- Status overview of all days
- Quick links to other sheets
- Instructions and navigation

### All Learners List (👥 All Learners List)
- Master list of all learners from Classroom
- Status tracking and progress monitoring

### Day Sheets (📅 Day 1-5 - AI Analysis)
Each day sheet contains:
- **Email & Name**: Learner identification
- **AI Analysis (ChatGPT)**: Coderbyte's AI feedback
- **Admin Review Notes**: Manual review space
- **Scores**: Final score, algorithm skills, code quality, language score
- **Report Link**: Direct link to Coderbyte report
- **Cheating Status**: Flag for suspicious activity
- **Data Status**: Indicates if data was fetched

### Consolidated Analysis (🧠 Consolidated AI Analysis)
- Combined AI analysis across all 5 days
- Final manual recommendation column
- Reviewer notes and tracking

### Report Links (🔗 Report Links)
- Quick access to all learner reports
- Summary of completed assessments
- One-click navigation to Coderbyte

### Settings (⚙️ Settings)
- Coderbyte API key storage
- Assessment ID configuration click (⚙️ Configure Assessment)
- System status and timestamps

## 🔧 Menu Functions Guide

### 🎯 Setup All Sheets
- **When to use**: First-time setup or complete reset  
- Creates all 7 sheets with proper structure  
- **Warning**: Deletes existing sheets with same names  

### ⚙️ Configure Assessments
- **When to use**: Setting up for a new bootcamp  
- Configure Coderbyte assessment IDs (Day 1-5)  
- IDs are saved automatically  
- Can be reused across multiple bootcamps  

### 🎓 Get Learners from Classroom
- **When to use**: Starting a new cohort  
- Shows dropdown of all active Google Classroom courses  
- Fetches all enrolled learners  
- Updates all sheets automatically  

### 🧠 Generate Consolidated AI Analysis
- **When to use**: After refreshing all days  
- Compiles AI analysis from Day 1-5  
- Creates summary sheet for final review  
- Includes manual recommendation column  

### 🔄 Refresh All Days
- **When to use**: Comprehensive data update  
- Fetches data for all 5 days sequentially  
- Shows progress bar  
- Updates all sheets and dashboards  

### 📅 Refresh Single Day
- **When to use**: Quick updates or troubleshooting  
- Individual day refresh (Day 1-5)  
- Shows assessment name in confirmation  
- Updates specific day sheet only  

### 🔗 Update Report Links
- **When to use**: After refreshing any day  
- Compiles all report links from day sheets  
- Updates Report Links sheet  
- Calculates completion statistics  

### 🔑 Test Coderbyte Connection
- **When to use**: Troubleshooting API issues  
- Tests connection to Coderbyte API  
- Verifies API key validity  
- Shows assessment information  

### 🗑️ Clear All Data
- **When to use**: Starting fresh without reconfiguring  
- Clears all fetched data  
- Does not delete sheet structure or configuration  
- Resets dashboard status  

### 🔧 Fix Day Sheet Headers
- **When to use**: When sheet headers appear corrupted  
- Repairs day sheet structure  
- Adds assessment names to titles  
- Restores proper formatting  

### 🎯 Test Assessment Info
- **When to use**: Verifying assessment configuration  
- Tests all configured assessment IDs  
- Shows assessment names from Coderbyte  
- Identifies misconfigured IDs  

### 🔍 Check Sheet Structure
- **When to use**: Diagnostic tool  
- Verifies all sheets are properly structured  
- Checks for missing headers or data  
- Provides status report  

### 🧪 Test Functions
- **When to use**: Development or troubleshooting  
- Verifies all required functions exist  
- Shows ✅/❌ status for each function  
- Helps identify missing code  

### 👥 Test Learners
- **When to use**: Data verification  
- Tests learner retrieval from All Learners sheet  
- Shows count and sample of learners  
- Verifies data integrity  

## Workflow Examples
1. Example 1: New Bootcamp Setup
2. Example 2: Weekly Update
3. Example 3: Single Assessment Review

## 🔐 Security & Permissions

### Required Permissions
- **Google Classroom**: Read-only access to courses and students
- **Google Sheets**: Full access to the spreadsheet
- **Coderbyte API**: Access to assessment data via API key

### Data Storage
- **Google Sheets**: All data stored in the spreadsheet
- **Script Properties**: Assessment IDs and API keys (encrypted)
- **No external storage**: All data remains within Google Workspace

## Troubleshooting Guide

### Common Issues & Solutions
- **Error Messages**
  - "ReferenceError: [function] is not defined"
    - Run Test Functions to identify missing functions
    - Ensure all code is properly saved
  - "Failed to fetch learners"
    - Check Classroom API permissions
    - Verify course has enrolled students
  - "Connection failed"
    - Verify Coderbyte API key
    - Check internet connection
    - Ensure assessment IDs are correct

## Best Practices

### For Administrators
- Keep assessment IDs updated for each bootcamp
- Use consistent naming for Classroom courses
- Regular backups before major operations
- Monitor API usage to avoid rate limits

### For Reviewers
- Use Consolidated Analysis for final decisions
- Check cheating flags on day sheets
- Utilize Admin Review Notes for manual input
- Verify report links before sharing

### For Developers
- Test changes in copy before production
- Document modifications in code comments
- Follow Apps Script best practices
- Monitor execution limits

## Quick Reference Card