# Vercel Form Setup

The website contact form submits to `/api/lead`.

## Production architecture (2026-07-07)

Leads are captured via the **n8n webhook**. The workflow appends rows to the Google Sheet and sends email notifications.

| Step | Component |
|------|-----------|
| 1 | Form POST → `/api/lead` on Vercel |
| 2 | Vercel POSTs lead JSON to n8n webhook |
| 3 | n8n appends row to `Web Leads` tab |
| 4 | n8n emails lead notification |

Direct Vercel → Google Sheets API is coded in `api/lead.js` but **not configured in Production** (no service account env vars). The form still returns 200 if either sheet append or webhook succeeds.

## Required Vercel Environment Variables (Production)

| Name | Value |
| --- | --- |
| `N8N_LEAD_WEBHOOK_URL` | `https://jules02.app.n8n.cloud/webhook/gemelec-lead` |

Set in **Production only** so preview deploys do not fire real lead emails.

## Google Sheet

| Field | Value |
| --- | --- |
| Name | Gemelec Web Leads |
| ID | `1E5So0KBv8geIEahMrw3qaZGzjDll2pDrugjGikwei4c` |
| Tab | `Web Leads` |

n8n workflow `Gemelec Website Lead Notifications` writes to this sheet via OAuth (`Google Sheets account 2`).

## Optional: direct sheet write from Vercel

If you want Vercel to append rows directly (redundant with n8n, but useful as fallback):

| Name | Value |
| --- | --- |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Service account email with sheet Editor access |
| `GOOGLE_PRIVATE_KEY` | Private key including `-----BEGIN PRIVATE KEY-----` / `-----END PRIVATE KEY-----` |
| `GOOGLE_SHEET_ID` | `1E5So0KBv8geIEahMrw3qaZGzjDll2pDrugjGikwei4c` |
| `GOOGLE_SHEET_TAB` | `Web Leads` |

Share the sheet with the service account email as Editor.

## Local Test

```sh
npm run dev:vercel
```
