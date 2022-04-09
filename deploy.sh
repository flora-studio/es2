#!/usr/bin/env sh

# 发生错误时终止
#set -e

# 构建
npm run build

# 进入构建文件夹
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

git init
git config user.name "maliut"
git config user.email "lqn619@163.com"
git add -A
git commit -m 'deploy'

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:flora-studio/es2.git master:gh-pages
git push -f https://gitee.com/flora-studio/es2.git master:gh-pages

cd -

# build for deploy as root folder
npm run build-root

# 进入构建文件夹
cd dist

# 如果你要部署到自定义域名
# echo 'www.example.com' > CNAME

git init
git config user.name "maliut"
git config user.email "lqn619@163.com"
git add -A
git commit -m 'deploy'

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:maliut/es2-deploy.git master:master

cd -
