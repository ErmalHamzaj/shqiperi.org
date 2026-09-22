# Deploying Shqipëri

Shqipëri is a **Next.js app with server-side API routes** (`/api/search`, `/api/news`,
`/api/websearch`, `/api/weather`). It needs a **Node.js runtime** — it will **not**
run on Hostinger's basic shared/PHP hosting.

Two supported paths on Hostinger:

- **Path A — Hostinger VPS** (runs entirely on Hostinger). ← full "on Hostinger"
- **Path B — Hostinger domain + Vercel** (easiest, free app hosting).

Node.js **18.17+** is required (this repo pins Node 20 via `.nvmrc`).

Set one secret on the server: **`ANTHROPIC_API_KEY`** (only used by AI search;
news/weather/wiki work without it).

---

## Path A — Hostinger VPS (recommended for "on Hostinger")

You need a **Hostinger VPS plan** (KVM 1 is enough). Order it in hPanel → VPS,
choose **Ubuntu 22.04** (or the "Ubuntu 24.04 with Node.js" template if offered).

### 1. Point the domain at the VPS
In hPanel → **Domains → shqiperi.org → DNS / Nameservers → DNS records**:

| Type | Name | Value                     | TTL  |
| ---- | ---- | ------------------------- | ---- |
| A    | `@`  | *your VPS IPv4 address*   | 3600 |
| A    | `www`| *your VPS IPv4 address*   | 3600 |

(The VPS IP is shown in hPanel → VPS → Overview.)

### 2. Connect to the VPS
```bash
ssh root@YOUR_VPS_IP
```

### 3. Install Node.js 20, Git, Nginx, PM2
```bash
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git nginx
npm install -g pm2
node -v      # should print v20.x
```

### 4. Get the code onto the server
Option 1 — push this project to a GitHub repo, then:
```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/YOUR_USER/shqiperi.org.git
cd shqiperi.org
```
Option 2 — upload the folder with `scp` from your Mac (run locally):
```bash
scp -r /Users/nilfoods/Desktop/shqiperi.org root@YOUR_VPS_IP:/var/www/shqiperi.org
```
> Don't upload `node_modules` or `.next` — they're rebuilt on the server.

### 5. Add the API key + build
On the server, inside `/var/www/shqiperi.org`:
```bash
cp .env.example .env.local
nano .env.local     # set ANTHROPIC_API_KEY=sk-ant-...  then save (Ctrl+O, Enter, Ctrl+X)

npm ci              # install exactly per package-lock (or: npm install)
npm run build
```

### 6. Start it with PM2 (keeps it running + auto-restarts)
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup        # run the command it prints, so it survives reboots
```
The app now runs on `http://127.0.0.1:3000`.

### 7. Put Nginx in front (port 80 → 3000)
```bash
nano /etc/nginx/sites-available/shqiperi
```
Paste:
```nginx
server {
    listen 80;
    server_name shqiperi.org www.shqiperi.org;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_buffering off;          # needed for streaming AI answers
    }
}
```
Enable it:
```bash
ln -s /etc/nginx/sites-available/shqiperi /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```
Visit `http://shqiperi.org` — it should load.

### 8. Free HTTPS (Let's Encrypt)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d shqiperi.org -d www.shqiperi.org
```
Follow the prompts (enter email, agree, choose redirect to HTTPS). Auto-renews.

### 9. Updating later
```bash
cd /var/www/shqiperi.org
git pull            # (or re-upload)
npm ci && npm run build
pm2 restart shqiperi
```

---

## Path B — Hostinger domain + Vercel (easiest, free)

Keep `shqiperi.org` at Hostinger, host the app on Vercel (made for Next.js).

1. Push this project to a **GitHub** repo.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
   Framework auto-detects **Next.js**. Add an environment variable
   **`ANTHROPIC_API_KEY`** = your key. Click **Deploy**.
3. In Vercel → Project → **Settings → Domains**, add `shqiperi.org` and `www.shqiperi.org`.
   Vercel shows the DNS records to set.
4. In Hostinger hPanel → **Domains → shqiperi.org → DNS records**, add what Vercel asks
   (typically an **A record `@ → 76.76.21.21`** and a **CNAME `www → cname.vercel-dns.com`**).
5. Wait for DNS to propagate (minutes–hours). Vercel issues HTTPS automatically.

Updates: just `git push` — Vercel rebuilds and redeploys automatically.

---

## Notes

- **API key security:** keep `ANTHROPIC_API_KEY` only in the server env / Vercel env,
  never commit it. `.env.local` is gitignored. Rotate the key if it was ever shared.
- **Cost control:** already tuned — Haiku model, 1 web-search per query, short answers,
  in-memory cache, and AI only runs on demand. News/weather/Wikipedia cost nothing.
- **Firewall (VPS):** allow HTTP/HTTPS/SSH — `ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw enable`.
