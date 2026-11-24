# AcreOutlook public website

A buildless public product website for GitHub Pages. The separate AcreOutlook application and its database remain on their existing hosting. This folder contains no application credentials, API keys, account records or backend code.

## Publish on GitHub Pages

1. Create a public GitHub repository named `acreoutlook-website` in your account. A private repository requires a GitHub plan that supports Pages for private repositories.
2. Unzip the supplied ZIP on your computer.
3. In GitHub, choose **Add file → Upload files**. Upload the files and the `assets` folder from INSIDE the unzipped folder to the repository root. `index.html` must appear at the top level beside `styles.css`, `site.js`, `config.js`, and `assets/`.
4. Commit the upload to `main`.
5. Open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, then `main` and `/(root)`. Save.
6. Wait for GitHub's Pages deployment to finish. Your initial address should be `https://calgermain.github.io/acreoutlook-website/` when using that account and repository name. Verify the address shown in Settings → Pages.
7. Check the site on your phone. Try the menu, each feature tab, screen enlargement, FAQ and beta-request dialog.

All asset and page URLs are relative, so the site works under a GitHub repository path and on a custom domain. `.nojekyll` is included but may be hidden by your file manager; the plain HTML site also works with the standard Pages processing.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Set up the contact address

The public contact is `support@acreoutlook.com`, as supplied by the founder. Make sure that mailbox or forwarding address actually receives mail before inviting growers. Purchasing a domain does not automatically create its mailbox. Configure email separately with your email provider.

The website never claims to have submitted a request. Its form prepares a `mailto:` email draft; the visitor must send it from their email application. They can also copy the request text or use the displayed email address. There is no signup database, server endpoint, analytics tracker, or marketing-list integration.

Change `contactEmail` and `betaSubject` in `config.js` if needed. These settings are PUBLIC. Never paste a password, API key or database URL there.

## Connect the beta application later

The default `appUrl` in `config.js` is empty. The site therefore offers its local feature tour and email requests without sending visitors to a protected development deployment.

When a stable public app URL is ready, set:

```js
appUrl: "https://app.acreoutlook.com"
```

This reveals the “Open AcreOutlook” link in the beta invitation. Only HTTPS addresses are accepted. The marketing website does not deploy or replace the app, configure its database, or make a protected preview public.

## Add acreoutlook.com after purchase

1. Verify the domain in your GitHub account following GitHub's instructions.
2. In this repository's **Settings → Pages → Custom domain**, enter `acreoutlook.com` and save.
3. Follow GitHub's current DNS instructions in GoDaddy. Use the exact records from the current GitHub documentation rather than guessing them. Preserve email-related MX and TXT records, including verification, SPF and DKIM records.
4. Configure `www` as instructed and enable **Enforce HTTPS** when GitHub indicates the certificate is ready.
5. Keep the future `app` subdomain directed to the app's hosting service. It is independent of the GitHub-hosted public website.

No `CNAME` file or custom-domain claim is included in this ZIP. Add the custom domain after you own and verify it. GitHub will normally write the CNAME file when saving a branch-published site's custom domain.

Official guidance:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages

## Branding and editing

- `index.html`: public copy, feature descriptions, FAQ, beta-request dialog.
- `styles.css`: responsive styles, self-hosted Manrope font, navy primary color `#15243b`.
- `site.js`: accessible navigation, feature tabs, screen preview and email draft preparation.
- `config.js`: public contact address and future app URL.
- `privacy.html`: public-site privacy information. Review it when changing the site's actual data handling.
- `credits.html`: weather, maps, font, icon and artwork credits.
- `assets/mark.svg`: temporary wheat icon based on the app's existing mark. Replace with the final logo when ready.
- `assets/screens/`: illustrative app screenshots, not real customer records or live weather.

The old WeatherSol promo videos are deliberately not included, because they use the former brand. No pricing, testimonials, customer counts or performance guarantees have been invented. The website does not claim to offer an App Store or Google Play download.

Keep the included Lucide and Manrope notices with the site. Retain map and weather credits when reusing screenshots. This notice preservation is not a complete legal clearance or provider-account review.

## Local preview

No install or build is needed. For a local HTTP preview, run `python -m http.server 8080` in this folder, then visit `http://localhost:8080`. A local server is preferable to opening index.html as a file, especially for testing browser clipboard behavior.

## Before sharing invitations

- Verify ownership and DNS of the custom domain when used.
- Verify the support mailbox receives mail and that your email application opens the beta-request draft correctly.
- Confirm the actual application is reachable without a Vercel account before adding its address.
- Test iPhone and Android app installation separately; this marketing site is not the installable farmer app.
- Review privacy, provider access and any employer ownership/outreach obligations for the actual app launch.
