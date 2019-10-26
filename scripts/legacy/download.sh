#!/bin/bash

# Author: Jin Liu
# Usage：
# 1. ./download.  # 全部下载
# 2. ./downlosh 3 # 下载 3 个

limit=${1:-9999999999};
downloaded=0;

cat database.json | jq -M -r '.[] | .id, .downloaded_from' | \
while read -r id; read -r downloaded_from; do
  if [[ -f "./videos/$id.flv" ]] || [[ -f "./videos/$id.mp4" ]]; then
    echo "$id 已下载";
  else
    echo "$id 正在下载...";
    # annie -o ./videos/ -O $id $downloaded_from;
    sleep 5;
    ((downloaded+=1));
    if [ "$downloaded" -ge "$limit" ]; then
      break;
    else
      continue;
    fi
  fi
done
