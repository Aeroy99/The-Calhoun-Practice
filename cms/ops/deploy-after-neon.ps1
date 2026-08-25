# Run AFTER Neon is installed on the CMS Vercel project.
# Prerequisites: accept Neon terms, then:
#   vercel integration add neon --plan free_v3 --no-claim -m region=iad1 -m auth=false --name calhoun-cms-db --cwd cms

$ErrorActionPreference = "Stop"
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
Set-Location $repoRoot

Write-Host "Deploying CMS to Vercel production..."
vercel --prod --cwd cms --yes

Write-Host ""
Write-Host "Next steps (manual):"
Write-Host "  1. Confirm PAYLOAD_ADMIN_EMAIL / PAYLOAD_ADMIN_PASSWORD / BLOB_READ_WRITE_TOKEN are set on the CMS project"
Write-Host "  2. Open https://cms.thecalhounpractice.com/admin (or the *.vercel.app URL until DNS propagates)"
Write-Host "  3. Sign in, complete Authenticator setup, then register a passkey"
Write-Host "  4. Run: vercel env pull --cwd cms .env.production.local"
Write-Host "  5. Run: npx tsx cms/ops/seed-production.ts   (insert-only; add --force to overwrite copy)"
Write-Host "  6. Set VITE_PAYLOAD_URL on the-calhoun-practice, then redeploy www"
