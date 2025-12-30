# BeyondChats Article Updater Project

## 📌 Overview

This project fetches articles from BeyondChats, stores them in a database, updates
the articles using an LLM by comparing top-ranking Google articles, and displays both
original and updated versions in a React frontend.

---

## 🧠 Architecture / Data Flow

Scraper → Database → APIs → LLM → Updated Content → React Frontend

User
↓
React Frontend
↓
Laravel / Node API
↓
Database
↓
LLM API
