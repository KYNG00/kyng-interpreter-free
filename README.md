# KYNG Interpreter Free

A static iPhone Safari app with **no subscription, API key, database, or server bill**. Safari recognizes Taiwanese Mandarin speech; a free open-source Chinese-to-English translation model runs in the browser. Sessions are saved in IndexedDB on the device, with timestamps, searchable original and English text, editable topic title, phrase corrections and retries, a custom terminology hint list, copy, delete, and JSON backup/import. Chinese phrases are saved before translation and incomplete translations are retried after reload.

## The honest limits

- This is a machine translation model, not a large conversational AI. Technical glossary terms and context may still translate incorrectly. The app suggests topic titles using keywords rather than AI-generated summaries or action items.
- Safari's speech recognition uses Apple's speech engine. It can require network connectivity, Siri enabled and permission to use speech recognition and the microphone. It may use Apple services; the app itself does not upload transcripts or record audio to a server.
- The translation model downloads from Hugging Face on first use, then uses browser caching. It can be large, slow, or fail on an older iPhone or if browser storage is low. It has **not yet been tested on the user's iPhone**. If Safari clears cached model data, it must download again. No third-party free hosting or browser storage can be promised for life.
- Keep the app visible. It is not a background interpreter. Worksite noise and code-switching can hurt accuracy. Confirm critical technical values and work instructions with a colleague.
- Transcripts live only in that browser installation. Export backups regularly and store them securely. Removing the web app or clearing Safari data may erase local transcripts. A Home Screen web app and Safari may have separate storage.
- Safari recognition may fail in standalone Home Screen web apps. On iOS 26, switch **Open as Web App** off while adding a Home Screen shortcut; otherwise use the Safari tab or a Safari bookmark. The manifest uses `display: browser`, but the iOS 26 toggle controls how a Home Screen icon opens.

## Run locally

```bash
npm ci --ignore-scripts
npm run dev
```

The `--ignore-scripts` flag skips an optional Node ONNX runtime installer; the browser uses ONNX Runtime Web. Open the Vite HTTPS or localhost preview and allow speech recognition. For deployment, run `npm run build` and publish the contents of `dist/` to **GitHub Pages** or any static HTTPS host that has a no-cost tier. Set GitHub Pages' source to a workflow that builds the project; a sample is provided in `.github/workflows/pages.yml`.

On an iPhone 14 Pro Max, visit the HTTPS page in Safari. Test **Start listening**, allow speech and microphone permissions, say a short Mandarin phrase, and confirm that both Chinese and English appear. If you add a Home Screen icon on iOS 26, switch off **Open as Web App**; open the icon and check that it launches Safari. Leave Safari visible and the phone unlocked during conversations. Save a test session, then download a backup in Settings. The app has not yet been validated on the user's phone.

## Model attribution

Translation model: `Xenova/opus-mt-zh-en`, a Transformers.js-compatible conversion of Helsinki-NLP's OPUS Chinese-to-English model. Code loads the quantized `q8` variant with WASM. Inspect that model's license and files at its Hugging Face model page before redistributing its weights. The application does not bundle the weights.
