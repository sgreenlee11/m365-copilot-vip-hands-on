# Executive Copilot Lab (generic template)

Unbranded, industry-neutral version of the hands-on lab, hosted on GitHub Pages and also usable as static HTML in SharePoint or OneDrive.

## GitHub Pages

- [Hands-on lab](https://sgreenlee11.github.io/m365-copilot-vip-hands-on/generic/)
- [Day-in-the-life guide](https://sgreenlee11.github.io/m365-copilot-vip-hands-on/generic/day-in-the-life.html)

This folder is published from the repository's `main` branch by the existing GitHub Pages configuration. Keep both HTML files and `assets/` together. The original executive/VIP lab remains at the site root.

The SharePoint-compatible outside-link behavior is preserved on GitHub Pages: clicking an outside link copies its URL for pasting into a new browser tab.

## Deploy to SharePoint or OneDrive
Upload the whole folder to a document library, keeping `index.html`, `day-in-the-life.html`, and `assets\` together. Open `index.html` in the browser.

## Make it yours
- **Brand name:** search for `Executive Copilot Lab` in both HTML files.
- **Colors:** edit the `:root` variables at the top of each HTML file (`--accent`, `--ink`, `--cream`, `--blue`/`--steel`).
- **Company name:** replace `Contoso Ltd.` in `index.html`.
- **Practice data:** replace the files in `assets\` with your own, keeping the same file names or updating the links in `index.html`. Update the prompts in Activity 5 if your column names differ.
- **Logo:** swap the `.brand-mark` diamond for an `<img>` if desired.

All data is fictitious.

## How the SharePoint viewer behaves
- **Copy buttons:** copy to the clipboard. If the viewer blocks it, select the text and press Ctrl+C.
- **Outside links:** the viewer blocks opening other sites, so clicking copies the address. Paste it into a new browser tab.
- **Printing:** blocked in the viewer. Select the file in the library, choose **Download**, open it in your browser, then print or save as PDF.
- **Mobile:** the SharePoint and OneDrive mobile apps may download the file instead of displaying it. Use a mobile or desktop browser.
