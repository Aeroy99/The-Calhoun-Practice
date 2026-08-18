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
Write-Host "  1. Open https://cms.thecalhounpractice.com/admin (or the *.vercel.app URL until DNS propagates)"
Write-Host "  2. Create your admin account"
Write-Host "  3. Run: vercel env pull --cwd cms .env.production.local"
Write-Host "  4. Run: yarn cms:seed   (with production DATABASE_URL loaded)"
Write-Host "  5. Set VITE_PAYLOAD_URL + VITE_CMS_MODE=payload on the-calhoun-practice, then redeploy www"
