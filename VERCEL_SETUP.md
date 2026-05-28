# Vercel Form Setup

The website contact form submits to `/api/lead`, which appends rows to the `Gemelec - Web Leads` tab in `Gemelec Leads Sheet`.

## Required Vercel Environment Variables

Set these in Vercel for Production, Preview, and Development:

| Name | Value |
| --- | --- |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | The Google service account email with edit access to the sheet |
| `GOOGLE_PRIVATE_KEY` | The service account private key, including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` |
| `GOOGLE_SHEET_ID` | `1B8D8_mrkJ7mhw5UPpohdBW3Jj96zcLs7wLNC2mAauQ8` |
| `GOOGLE_SHEET_TAB` | `Gemelec - Web Leads` |

## Google Sheet Permission

Share the Google Sheet with the `GOOGLE_SERVICE_ACCOUNT_EMAIL` as an editor. Without that permission, the Vercel function will reject real enquiries with a Google Sheets permission error.

## Local Test

Use the Vercel dev server when testing the form endpoint locally:

```sh
npm run dev:vercel
```
