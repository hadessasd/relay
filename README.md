# ExamHub Proxy

AI proxy server for ExamHub. Forwards requests to OpenRouter with server-side config.

## Deploy to Render

1. Push this folder to a GitHub repo
2. Connect repo on render.com → New Web Service
3. Render auto-detects `render.yaml` — just click Deploy

## API

```
POST /ai
Content-Type: application/json

{ "api_key": "sk-or-v1-...", "prompt": "question text" }
```

Returns:
```json
{ "answer": "B" }
```

## Admin

`/admin/login` — view all requests and errors
