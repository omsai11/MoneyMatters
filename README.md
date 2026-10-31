# MoneyMatters

A mobile-friendly money tracking web app that records spending and income entries and saves them to a Google Sheet.

## Features

- Enter amount in Indian Rupees
- Enter a reason for the transaction
- Select whether it was spent or received
- Save data into Google Sheets
- Mobile-friendly layout for phone browsers
- Works with GitHub Pages for free hosting

## Project structure

- `index.html` – the main mobile form UI
- `styles.css` – responsive styling for mobile screens
- `script.js` – frontend logic and API submission
- `google-script.gs` – Google Apps Script backend for writing to the sheet

## Setup steps

### 1) Create the Google Sheet

1. Open Google Sheets.
2. Create a new spreadsheet.
3. Name the first sheet `Transactions`.
4. Add the following headers in row 1:
   - Date
   - Type
   - Reason
   - Amount

### 2) Deploy the Apps Script backend

1. Open Google Apps Script from the spreadsheet.
2. Create a new script.
3. Paste the contents of `google-script.gs` into the editor.
4. Save the project.
5. Click "Deploy" > "New deployment".
6. Choose "Web app".
7. Set:
   - Execute as: Me
   - Who has access: Anyone
8. Deploy and copy the generated web app URL.

### 3) Update the frontend config

Open `script.js` and replace:

```js
const SHEET_WEB_APP_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
```

with your deployed Google Apps Script URL.

### 4) Publish to GitHub Pages

1. Push these files to a GitHub repository.
2. Open repository settings.
3. Go to Pages.
4. Select the main branch and root folder.
5. Save and wait for the site to publish.

## Mobile usage

Open the GitHub Pages URL in a browser on mobile. Enter the amount and reason, then tap either "Spent" or "Received" to save the record to Google Sheets.

## Notes

- This is a static frontend solution and is ideal for GitHub Pages.
- Data is stored in Google Sheets through the Apps Script backend.
- The app works well on both mobile and desktop browsers.
