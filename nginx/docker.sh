#!/bin/sh
if [ -n "$1" ];
then
  echo "仓库变量：$1"
  cp ./Dockerfile ../Dockerfile
  docker build -t registry-vpc.cn-shanghai.aliyuncs.com/jxadmin/$1:1.0 ../
  docker login --username=zb@1482247954188902 -p juexiao123 registry-vpc.cn-shanghai.aliyuncs.com/jxadmin/$1
  docker push registry-vpc.cn-shanghai.aliyuncs.com/jxadmin/$1:1.0
else
  echo "请传递仓库变量 如: sh docker.sh bpadmin"
fi