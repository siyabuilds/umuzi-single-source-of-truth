// Reads Google Docs from a configured Drive folder and exports them as Markdown.
// Uses a service account for authentication — no human login required.
// The GOOGLE_DRIVE_FOLDER_ID env variable determines which folder to read from.

import { google } from "googleapis";

// Authenticate using service account credentials from environment variables
function getAuthClient() {
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n",
  );

  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !privateKey) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY must be set in environment variables.",
    );
  }

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
}

// Represents a single Google Doc with its content as Markdown
export interface GoogleDoc {
  id: string;
  title: string;
  content: string;
  url: string;
}

// List all Google Docs in the configured Drive folder
async function listDocsInFolder(
  folderId: string,
): Promise<{ id: string; title: string }[]> {
  const auth = getAuthClient();
  const drive = google.drive({ version: "v3", auth });

  const response = await drive.files.list({
    q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.document' and trashed=false`,
    fields: "files(id, name)",
  });

  return (response.data.files ?? []).map((file) => ({
    id: file.id!,
    title: file.name!,
  }));
}

// Export a single Google Doc as Markdown using the Drive export endpoint
async function exportDocAsMarkdown(docId: string): Promise<string> {
  const auth = getAuthClient();
  const drive = google.drive({ version: "v3", auth });

  const response = await drive.files.export(
    {
      fileId: docId,
      mimeType: "text/markdown",
    },
    { responseType: "text" },
  );

  return response.data as string;
}

// Load all Google Docs from the configured Drive folder and return them with their content
export async function loadAllGoogleDocs(): Promise<GoogleDoc[]> {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!folderId) {
    throw new Error(
      "GOOGLE_DRIVE_FOLDER_ID must be set in environment variables.",
    );
  }

  const files = await listDocsInFolder(folderId);

  if (files.length === 0) {
    return [];
  }

  console.log(`Found ${files.length} Google Docs in folder.`);

  const docs: GoogleDoc[] = [];

  for (const file of files) {
    console.log(`  Exporting: ${file.title}`);
    const content = await exportDocAsMarkdown(file.id);
    docs.push({
      id: file.id,
      title: file.title,
      content,
      url: `https://docs.google.com/document/d/${file.id}`,
    });
  }

  return docs;
}