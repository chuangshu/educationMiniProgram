git checkout master
git add --all
git status
git commit -m "master-commit: auto"

git fetch origin master
git rebase origin/master
git push origin master

read -p "Press Enter to continue..."
