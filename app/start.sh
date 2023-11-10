#!/bin/sh

sed -i "s:host\\: \"[0-9]*.[0-9]*.[0-9]*.[0-9]:host\\: \"$(ip route | grep default | grep -o '\([0-9]\{0,3\}\.\)\{3\}[0-9]\{0,3\}'):" /app/server/index.js
cd /app/client
yarn start &
cd /app
yarn start
