#!/bin/bash
UPSTREAM_URL="https://github.com/arcde40/kweb-backend-study-2026-1"
DEFAULT_BRANCH="main"

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if ! git remote -v | grep -q "upstream"; then
    git remote add upstream "$UPSTREAM_URL"
    git config --local checkout.defaultRemote origin
fi

git fetch upstream

if git merge upstream/$DEFAULT_BRANCH --no-edit; then
    echo "Completed without any error"
else
    echo "⚠️ 충돌(Conflict)이 발생했습니다!"
    echo ""
    echo "👇 아래 안내에 따라 충돌을 해결해주세요:"
    echo "1. VS Code 등 사용하는 에디터를 열어주세요."
    echo "2. 파일 내에서 '<<<<<<< HEAD' 와 '=======' 사이의 코드를 확인하고 알맞게 수정합니다."
    echo "3. 수정이 모두 끝났다면, 터미널에 아래 명령어를 순서대로 입력하세요:"
    echo ""
    echo "   git add ."
    echo "   git commit -m \"chore: upstream 동기화 충돌 해결\""
    echo ""
    
    echo "----------------------------------------"
    echo "(참고: 동기화를 취소하고 이전 상태로 돌아가려면 'git merge --abort'를 입력하세요.)"
    exit 1
fi