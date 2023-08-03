# Getting Started with FridayFinder

## Install:

### Clone Repo:
```bash
git clone https://github.com/kainoabrabo/nextjs-ff.git

cd nextjs-ff
```

### Install [Docker Desktop](https://www.docker.com/) then open Docker Desktop

### To start the Next.js app in Docker:
```bash
docker compose up --build --force-recreate 
```
- This will build the image in Docker
***Warning: you shouldn't need to run*** `npm install`, ***Docker takes care of that.***

### Open [http://localhost:3000](http://localhost:3000) with your browser.

### ESlint
Run every time you make changes before and after testing, and before commit.
```
npm run lint
```

### Code formatter: [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Run formatter on VSCode:
```
option + shift + f
```

### To stop the Next.js app in Docker:
```bash
ctrl + c
```

# Before you start a new feature:

0. Initial Status and Pull
1. Create a new feature or bugfix branch
2. ~ DEV ~
3. When commiting changes, make sure to follow the steps in 'How to Commit' to make merging easy

## Status and Pull
- check for uncommitted or staged commits
```bash
git status 
```

- OPTIONAL: clear all uncommited or unstaged code to clean
```bash
git reset HEAD --hard
```

- pull from the repo. pull until you get "Already up to date."
```bash
git pull
```

## How to Branch
```bash
git checkout -b <branch name>

ex.
git checkout -b feature/user-authentication
git checkout -b bugfix/maps-component
```

## How to Commit
- The Commit message should reflect the issue on the project board
```bash
git status
git branch #this will be the branch you merge
git add .

git commit -m "<user story>"
# ex.
# git commit -m "set user location (#23)"
# git commit -m "fix - update for Next 13 (#23)"

git push
git checkout main
git pull
git merge <branch>
git status
```
