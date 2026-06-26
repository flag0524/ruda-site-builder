# RUDA site -> GitHub : 기존 원격 main을 현재 Next.js 소스로 교체(force)
# 사용법: 이 폴더에서 PowerShell로  ->  powershell -ExecutionPolicy Bypass -File .\push-to-github.ps1
$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

Write-Host "1) 이전 시도에서 깨진 git 파일 정리..." -ForegroundColor Cyan
foreach ($p in @(".git","_t.txt","_a.txt","_b.txt")) {
  if (Test-Path $p) { Remove-Item -Recurse -Force $p }
}

Write-Host "2) 생성 산출물은 저장소에서 제외(.gitignore)..." -ForegroundColor Cyan
Add-Content -Path ".gitignore" -Value "`n# generated deliverables`n*.pptx`n*.pdf"

Write-Host "3) 새 저장소 초기화 및 커밋..." -ForegroundColor Cyan
git init -b main
git add .
git commit -m "Rebuild RUDA site on Next.js"

Write-Host "4) GitHub 원격 연결 후 기존 기록을 덮어쓰기(force)..." -ForegroundColor Cyan
git remote remove origin 2>$null
git remote add origin https://github.com/flag0524/ruda-site-builder.git
git push -u origin main --force

Write-Host "`n완료! https://github.com/flag0524/ruda-site-builder 에 새 버전이 올라갔습니다." -ForegroundColor Green
