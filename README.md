# KYNG Interpreter Free

A static iPhone web app with **no subscription, API key, database, or server bill**. Safari recognizes Taiwanese Mandarin speech; a free open-source Chinese-to-English translation model runs in the browser. Sessions are saved in IndexedDB on the device, with timestamps, searchable original and English text, editable topic title, copy, delete, and JSON backup/import.

## The honest limits

- This is a machine translation model, not a large conversational AI. Technical glossary terms and context may still translate incorrectly. The app suggests topic titles using keywords rather than AI-generated summaries or action items.
- Safari's speech recognition uses Apple's speech engine. It can require network connectivity, Siri enabled and permission to use speech recognition and the microphone. It may use Apple services; the app itself does not upload transcripts or record audio to a server.
- The translation model downloads from Hugging Face on first use, then uses browser caching. It can be large, slow, or fail on an older iPhone or if browser storage is low. It has **not yet been tested on the user's iPhone**. If Safari clears cached model data, it must download again. No third-party free hosting or browser storage can be promised for life.
- Keep the app visible. It is not a background interpreter. Worksite noise and code-switching can hurt accuracy. Confirm critical technical values and work instructions with a colleague.
- Transcripts live only in that browser installation. Export backups regularly and store them securely. Removing the web app or clearing Safari data may erase local transcripts.

## Run locally

```bash
npm ci --ignore-scripts
npm run dev
```

The `--ignore-scripts` flag skips an optional Node ONNX runtime installer; the browser uses ONNX Runtime Web. Open the Vite HTTPS or localhost preview and allow speech recognition. For deployment, run `npm run build` and publish the contents of `dist/` to **GitHub Pages** or any static HTTPS host that has a no-cost tier. Set GitHub Pages' source to a workflow that builds the project; a sample is provided in `.github/workflows/pages.yml`.

On iPhone Safari, visit the HTTPS page, choose **Share → Add to Home Screen**, open it, wait for the model, then tap **Start listening**. Test a short Mandarin phrase and verify both transcripts before using it during a meeting.

## Model attribution

Translation model: `Xenova/opus-mt-zh-en`, a Transformers.js-compatible conversion of Helsinki-NLP's OPUS Chinese-to-English model. Code loads the quantized `q8` variant with WASM. Inspect that model's license and files at its Hugging Face model page before redistributing its weights. The application does not bundle the weights.
