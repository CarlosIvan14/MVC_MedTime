// src/utils/dateUtils.js
export function isPast(date) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return date < today;
  }
  