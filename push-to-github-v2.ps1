# RUDA site -> GitHub (수정판) : 기존 원격을 현재 Next.js 소스로 교체(force)
# 사용법: powershell -ExecutionPolicy Bypass -File .\push-to-github-v2.ps1
$ErrorActionPreference = "Continue"
Set-Location -Path $PSScriptRoot

Write-Host "1) 깨진 git 파일 정리..." -ForegroundColor Cyan
foreach ($p in @(".git","_t.txt","_a.txt","_b.txt")) {
  if (Test-Path $p) { Remove-Item -Recurse -Force $p }
}

Write-Host "2) 생성 산출물 제외(.gitignore)..." -ForegroundColor Cyan
if (-not (Test-Path ".gitignore") -or -not (Select-String -Path ".gitignore" -Pattern '^\*\.pptx' -Quiet)) {
  Add-Content -Path ".gitignore" -Value "`n# generated deliverables`n*.pptx`n*.pdf"
}

Write-Host "3) 새 저장소 초기화 및 커밋..." -ForegroundColor Cyan
git init -b main
git add .
git commit -m "Rebuild RUDA site on Next.js"

Write-Host "4) 원격 연결 후 강제 푸시..." -ForegroundColor Cyan
if ((git remote) -match "origin") { git remote remove origin }
git remote add origin https://github.com/flag0524/ruda-site-builder.git
git push -u origin main --force

Write-Host "`n완료! https://github.com/flag0524/ruda-site-builder" -ForegroundColor Green
