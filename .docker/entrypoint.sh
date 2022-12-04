#!/bin/bash

yarn install
yarn prisma:push
npx prisma generate
yarn dev
