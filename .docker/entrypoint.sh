#!/bin/bash

yarn
npx prisma db push
npx prisma generate
yarn dev
