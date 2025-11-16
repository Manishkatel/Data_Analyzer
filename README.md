# Project IDA – Intelligent Data Analyst Workflow Automation  

**Automate the *entire* data-analyst workflow – from raw upload to ML-ready dataset – with AI-powered insights and a conversational assistant.**  

> **70-80 % of an ML project is spent on cleaning, exploring, and preprocessing.**  
> **IDA does it all in seconds, with transparency and a chat interface.**

---

| Pain Point | IDA Solution |
|------------|--------------|
| **Repetitive EDA** (distributions, correlations, outliers…) | One-click **Automated EDA Workflow** |
| **Manual preprocessing** (text cleaning, encoding, scaling…) | **Automated Preprocessing Pipeline** |
| **No transparency** for non-technical users | **Conversational LLM Assistant** that explains every step |
| **Time-Series analysis** is scattered | Built-in **trend/seasonality/autocorrelation** plots |
| **NLP preprocessing** is boiler-plate | Full **10-stage NLP pipeline** (clean → embed) |

---

## Features  

| Category | Details |
|----------|---------|
| **Authentication** | JWT-based Sign-up / Sign-in |
| **Dataset Management** | Upload CSV/Excel, list, view, delete |
| **Automated EDA** | Distribution plots, heatmaps, outlier detection (IQR + Z-score), missing/duplicates/infinite checks, **time-series** (trend, cycle, seasonality, ACF) |
| **Automated Preprocessing** | <ul><li>**Tabular**: imputation, encoding (Label/One-Hot), scaling (Min-Max/Standard)</li><li>**Text**: cleaning → normalization → tokenization → lemmatization/stemming → stop-word removal → spelling/slang fix → optional augmentation → embedding → padding</li></ul> |
| **AI Insights** | Gemini-powered summaries, suggestions, chat history |
| **Visualization** | Recharts + Framer Motion interactive charts |
| **Export** | Download refined CSV, PDF/DOCX analysis report |
| **Conversational Assistant** | Ask “Why these outliers?” or “Predict trend” – get instant answers |
| **Responsive UI** | Tailwind + Lucide-React icons |

---

## Tech Stack  

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18 + TypeScript, Vite, Tailwind CSS, Framer Motion, Recharts, React Router, Axios, lucide-react, react-hot-toast, jsPDF, docx |
| **Backend** | Node.js 22, Express, TypeScript, MongoDB + Mongoose, JWT, Multer, PapaParse, XLSX, **Lodash** |
| **Database** | MongoDB |
| **Deployment** | Vercel (frontend) + Render/ Railway (backend)|

---

## Project Structure  

```plaintext
Data_Analyzer/
├─ backend/
│   ├─ src/
│   ├─ .env
│   └─ package.json
├─ frontend/
│   ├─ src/
│   ├─ .env
│   └─ package.json
└─ README.md
```


## Installation & Setup  

### 1. Clone the repo  

```bash
git clone https://github.com/Manishkatel/Data_Analyzer.git
cd Data_Analyzer
```

### 2. Backend  

```bash
cd backend
npm install
```

**Create `.env`**  

```dotenv
PORT=5000
MONGODB_URI=mongodb://localhost:27017/data-analysis
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
GEMINI_API_KEY=your-google-gemini-api-key
NODE_ENV=development
```

> **MongoDB** must be running (`mongod`).

### 3. Frontend  

```bash
cd ../frontend
npm install
```

**Create `.env`**  

```dotenv
VITE_API_URL=http://localhost:5000/api
```

### 4. Tailwind & Lucide (already in `package.json`, but for reference)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install lucide-react
```

`tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

`src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`src/main.tsx`

```tsx
import './index.css';
```

### 5. Lodash (utility library)

```bash
npm install lodash
```

```ts
import _ from 'lodash';   // ES-module style (recommended)
```

---

## Running the App  

```bash
# Terminal 1 – backend
cd backend
npm run dev   # nodemon + ts-node-dev

# Terminal 2 – frontend
cd frontend
npm run dev   # Vite dev server (http://localhost:5173)
```

---

## API Reference  

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | `{email, password, name}` → JWT |
| `POST` | `/api/auth/signin` | `{email, password}` → JWT |
| `POST` | `/api/datasets/upload` | `multipart/form-data` (file) |
| `GET`  | `/api/datasets` | List user datasets |
| `GET`  | `/api/datasets/:id` | Dataset details |
| `POST` | `/api/datasets/:id/analyze` | Run EDA |
| `POST` | `/api/datasets/:id/preprocess` | `{handleInfinite?, missingValueMethod?, encodingMethod?, normalizationMethod?}` |
| `GET`  | `/api/datasets/:id/download` | Refined CSV |
| `POST` | `/api/datasets/:id/automate` | Full ETL + AI summary |
| `POST` | `/api/datasets/:id/summarize` | `{prompt, isInitial?, mode?}` → Gemini response |
| `GET`  | `/api/datasets/:id/threads` | Chat history |
| `GET`  | `/api/datasets/:id/suggestions` | LLM suggestions |
| `DELETE` | `/api/datasets/:id` | Remove dataset |

---

## Lodash – Usage & Rationale  

### Where is it used?

| File / Module | Function(s) | Purpose |
|---------------|-------------|---------|
| `backend/src/utils/dataProcessor.ts` | `_.uniq`, `_.compact`, `_.groupBy` | Remove duplicate column names, clean empty rows, group categorical values |
| `backend/src/services/analysisService.ts` | `_.mean`, `_.std`, `_.min`, `_.max` | Fast statistical aggregates without writing loops |
| `backend/src/controllers/preprocessController.ts` | `_.cloneDeep` | Deep-copy DataFrames before mutation (prevents side-effects) |
| `frontend/src/utils/chartHelpers.ts` | `_.debounce`, `_.throttle` | Debounce rapid chart re-renders on large datasets |
| `frontend/src/components/DataTable.tsx` | `_.orderBy` | Client-side sorting of table rows |

### Why Lodash **specifically**?

1. **Performance-optimized** implementations (written in low-level JS).  
2. **Consistent API** across browsers/Node.  
3. **Tree-shakable** ES modules (`import { debounce } from 'lodash'`).  
4. **Battle-tested** – used by millions of projects, fewer bugs than hand-rolled utilities.  
5. **Readable code** – `_.mean(arr)` is clearer than a manual reduce loop.

> **Result:** Less boiler-plate, faster development, safer data transformations.

---

## Deployment (Vercel)  

1. **Push** the repo to GitHub.  
2. **Vercel** → *New Project* → Import repository.  
3. **Frontend settings** (auto-detected Vite).  
4. **Environment variables** → add `VITE_API_URL=https://<your-backend>.onrender.com/api`.  
5. **Backend** – deploy separately (Render, Railway, Fly.io, etc.) and expose the same env vars (`PORT`, `MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY`).  

> **Tip:** Use Vercel’s *Preview* deployments for PR testing.

---

## Contributing  

1. Fork → `git checkout -b feature/xyz`  
2. Commit with clear messages.  
3. Open a **Pull Request** to `main`.  
4. Ensure tests (if added) pass.

---

## License  

MIT © Team 10  

---

**Project IDA – Turn raw data into clean, model-ready insights in one click.**  

*Fast. Transparent. Conversational. No code.*
```
