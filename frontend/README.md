# CashEx Frontend (Simple Pages)

This folder contains plain HTML/CSS/JS pages to test your backend quickly.

## Pages

- index.html: API base URL setup and navigation
- auth.html: register and login
- rates.html: list rates, create/update rates (admin token required)
- convert.html: conversion request
- transactions.html: create and list transactions

## Usage

1. Start backend first.
2. Open index.html in a browser.
3. Set API base URL if needed (default: http://localhost:5000).
4. Register/login to save JWT token in localStorage.
5. Use other pages to call APIs.

## Note

Your backend currently fails startup if MySQL auth fails. Update DB credentials in your local .env.
