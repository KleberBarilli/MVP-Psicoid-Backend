#!/bin/bash

yarn install
yarn build
yarn prisma:push
yarn dev