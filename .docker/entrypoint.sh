#!/bin/bash

yarn install
yarn prisma:push
yarn dev