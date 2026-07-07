# Vercel Form Setup

The website contact form submits to `/api/lead`, which appends rows to the `Web Leads` tab in `Gemelec Web Leads`.

## Required Vercel Environment Variables

Set these in Vercel for Production, Preview, and Development:

| Name | Value |
| --- | --- |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | The Google service account email with edit access to the sheet |
| `GOOGLE_PRIVATE_KEY` | The service account private key, including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` |
| `GOOGLE_SHEET_ID` | `1E5So0KBv8geIEahMrw3qaZGzjDll2pDrugjGikwei4c` |
| `GOOGLE_SHEET_TAB` | `Web Leads` |

## Lead Notification Webhook (Production only)

Set this in **Production only** (not Preview/Development), so preview deploys do not fire real lead emails:

| Name | Value |
| --- | --- |
| `N8N_LEAD_WEBHOOK_URL` | `https://jules02.app.n8n.cloud/webhook/gemelec-lead` |

On each new lead, `/api/lead` POSTs the lead to this n8n webhook, which emails it to `info@gemelec.sydney` (workflow "Gemelec Website Lead Notifications"). If the variable is unset, the form still works and still writes to the Google Sheet; only the email notification is skipped.

## Google Sheet Permission

Share the Google Sheet with the `GOOGLE_SERVICE_ACCOUNT_EMAIL` as an editor. Without that permission, the Vercel function will reject real enquiries with a Google Sheets permission error.

## Local Test

Use the Vercel dev server when testing the form endpoint locally:

```sh
npm run dev:vercel
```
