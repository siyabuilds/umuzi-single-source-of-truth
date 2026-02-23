# Google Analytics (GA4) Setup

## Overview / Purpose
Google Analytics (GA4) is used to track website traffic and basic user behaviour (page views, sessions, events) on our Webflow website.

## Implementation Details
- **Platform:** Webflow
- **Analytics Tool:** Google Analytics 4 (GA4)
- **Property Name:** Umuzi.org - Webflow
- **Measurement ID:** G-KRR0PGTT0K
- **Date Implemented:** 22 January 2026
- **Implemented By:** ngoako.ramokgopa@umuzi.org

## How It Was Implemented
Google Analytics 4 (GA4) was added manually using a script.

### Implementation method:
1. Webflow Dashboard
2. Site Settings
3. Custom Code
4. Inside the `<head>` (Header Code) section
5. The standard Google gtag.js script was pasted into the header
6. Changes were published to the live site

## What Is Being Tracked
- Page views (automatic)
- Sessions and users
- Basic engagement events (scrolls, outbound clicks, file downloads — GA4 defaults)
- No custom events or conversions have been configured at this stage

## Verification
GA4 Realtime report was used to confirm tracking.

### Steps:
1. Open GA4
2. Make sure you're logged in with the right account
3. Navigate to the Umuzi analytics account
4. Navigate to the right property (Umuzi.org - Webflow)
5. Navigate to reports
6. Navigate to Realtime overview
7. Visit the website in a new browser tab
8. Confirm active user appears on the Realtime overview dashboard

## Access & Ownership
- GA property is owned by info@umuzi.org
- Access is managed via Google Analytics Admin
- Requests for access should go to hloni.letuka@umuzi.org or the tech & data team