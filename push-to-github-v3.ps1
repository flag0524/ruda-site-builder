# RUDA site -> GitHub (최종판)
# 기존 원격 main 을 현재 Next.js 소스 + 회사소개서 PDF 다운로드로 교체(force)
# 사용법: 이 폴더에서  ->  powershell -ExecutionPolicy Bypass -File .\push-to-github-v3.ps1
$ErrorActionPreference = "Continue"
Set-Location -Path $PSScriptRoot

Write-Host "1) 임시/깨진 파일 정리..." -ForegroundColor Cyan
foreach ($p in @(".git","_t.txt","_a.txt","_b.txt","_edittest.txt")) {
  if (Test-Path $p) { Remove-Item -Recurse -Force $p }
}

Write-Host "2) 새 저장소 초기화..." -ForegroundColor Cyan
git init -b main
git add .
# 루트의 대용량 산출물(pptx/pdf)은 저장소에서 제외
git reset -- *.pptx *.pdf 2>$null
# 단, 사이트가 제공해야 하는 public 자산(회사소개서 PDF 등)은 무조건 포함
git add -f public
git commit -m "Rebuild RUDA site on Next.js + add company-profile PDF download"

Write-Host "3) GitHub 연결 후 강제 푸시..." -ForegroundColor Cyan
if ((git remote) -match "origin") { git remote remove origin }
git remote add origin https://github.com/flag0524/ruda-site-builder.git
git push -u origin main --force

Write-Host "`n완료! https://github.com/flag0524/ruda-site-builder" -ForegroundColor Green
Write-Host "회사소개서 다운로드 경로: /루다시스템즈_회사소개서_2025.pdf" -ForegroundColor Green
