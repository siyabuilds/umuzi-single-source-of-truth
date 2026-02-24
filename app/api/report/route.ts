import { NextResponse } from "next/server";
import { generateMonthlyReport } from "../../../lib/report";

// Function to post the report to Slack using the chat.postMessage API
async function postToSlack(text: string): Promise<void> {
  const token = process.env.SLACK_BOT_TOKEN;
  const channel = process.env.SLACK_CHANNEL_ID;

  if (!token || !channel) {
    throw new Error(
      "SLACK_BOT_TOKEN and SLACK_CHANNEL_ID must be set in environment variables.",
    );
  }

  const res = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ channel, text }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Slack API HTTP error ${res.status}: ${body}`);
  }

  const data = await res.json();
  if (!data.ok) {
    throw new Error(`Slack API error: ${data.error}`);
  }
}

/**
 * POST /api/report
 *
 * Generates a monthly usage report (via Gemini analysis of the
 * questions_asked table) and posts it to the configured Slack channel.
 *
 * Authenticated with a secret code sent in the request body:
 *   { "secretCode": "<REPORT_SECRET_CODE>" }
 *
 * Called on the 28th of every month by the report.yml GitHub Action.
 */
export async function POST(req: Request) {
  // 1. Validate secret code
  const body = await req.json();
  const { secretCode } = body;

  if (!secretCode || secretCode !== process.env.REPORT_SECRET_CODE) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid secret code" },
      { status: 401 },
    );
  }

  try {
    // 2. Generate the report
    console.log("Generating monthly report…");
    const report = await generateMonthlyReport();

    // 3. Post to Slack
    console.log("Posting report to Slack…");
    await postToSlack(report);

    return NextResponse.json({
      message: "Monthly report generated and posted to Slack",
      report,
    });
  } catch (err) {
    console.error("Report generation error:", err);
    return NextResponse.json(
      { error: "Report generation failed", details: String(err) },
      { status: 500 },
    );
  }
}
