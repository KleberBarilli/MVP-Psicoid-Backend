"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pagination = void 0;

const pagination = (req, res, next) => {
  const {
    page = 1,
    limit: take = 5,
    sort = "createdAt",
    order = "desc",
    filter = "null",
    search = {},
    location = {}
  } = req.query;
  req.pagination = {
    skip: (page - 1) * take,
    take: parseInt(take),
    sort,
    order: order.toLowerCase(),
    filter: JSON.parse(filter),
    search,
    location
  };
  return next();
};

exports.pagination = pagination;