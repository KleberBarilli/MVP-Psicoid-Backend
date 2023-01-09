#!/bin/bash

yarn
yarn add global prisma
yarn prisma:push
npx prisma generate
yarn dev
