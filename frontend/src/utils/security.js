/**
 * Simple input sanitization to prevent basic XSS and injection.
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

/**
 * Validates EPIC number format (Mock validation)
 */
export const isValidEPIC = (epic) => {
  const epicRegex = /^[A-Z]{3}[0-9]{7}$/;
  return epicRegex.test(epic);
};
