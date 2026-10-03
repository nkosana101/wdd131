/* ============================================================
   scripts/review.js  —  logic for review.html
   ============================================================ */

/* ---------- Constants ---------- */
const STORAGE_KEY = "wdd131.reviewCount";

/* ---------- Elements ---------- */
const detailsEl = document.querySelector("#reviewDetails");
const counterEl = document.querySelector("#reviewCounter");

/* ---------- Read the data submitted by form.html ---------- */
const params = new URLSearchParams(window.location.search);

/* A real submission always carries productName AND rating.
   (Both are required fields, so a direct visit to review.html
   will not have them — this prevents inflating the counter.) */
const isSubmission = params.has("productName") && params.has("rating");

/* ---------- Review counter (localStorage) ---------- */
const totalReviews = updateCounter(isSubmission);
if (counterEl) counterEl.textContent = totalReviews;

/* ---------- Build the confirmation output ---------- */
if (isSubmission) {
  renderDetails();
} else if (detailsEl) {
  const note = document.createElement("p");
  note.className = "notice";
  note.textContent =
    "No review data was found. Please submit the review form first.";
  detailsEl.appendChild(note);
}

/* ---------- Footer (year + last modified) ---------- */
const yearSpan = document.querySelector("#currentyear") ||
                 document.querySelector("#currentYear");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const modifiedSpan = document.querySelector("#lastModified");
if (modifiedSpan) modifiedSpan.textContent = document.lastModified;

/* ============================================================
   Functions
   ============================================================ */

/**
 * Increments the stored review count once per form submission
 * and returns the current total.
 * @param {boolean} shouldIncrement
 * @returns {number}
 */
function updateCounter(shouldIncrement) {
  let count = 0;

  try {
    count = Number(localStorage.getItem(STORAGE_KEY)) || 0;

    if (shouldIncrement) {
      count += 1;
      localStorage.setItem(STORAGE_KEY, String(count));
    }
  } catch (error) {
    // localStorage can be blocked (private mode, disabled cookies).
    console.warn("Review counter unavailable:", error);
  }

  return count;
}

/**
 * Renders the submitted review as a <dl> inside #reviewDetails.
 */
function renderDetails() {
  const list = document.createElement("dl");
  list.className = "review-details";

  addRow(list, "Product",              productName(params.get("productName")));
  addRow(list, "Overall Rating",       ratingElement(params.get("rating")));
  addRow(list, "Date of Installation", formatDate(params.get("installDate")));
  addRow(list, "Useful Features",      formatFeatures(params.getAll("features")));
  addRow(list, "Written Review",       params.get("writtenReview")?.trim() || "—");
  addRow(list, "Your Name",            params.get("userName")?.trim() || "Anonymous");

  detailsEl.appendChild(list);
}

/**
 * Appends one label/value pair to a <dl>.
 * @param {HTMLDListElement} list
 * @param {string} label
 * @param {string|Node} value
 */
function addRow(list, label, value) {
  const dt = document.createElement("dt");
  dt.textContent = label;

  const dd = document.createElement("dd");
  if (value instanceof Node) {
    dd.appendChild(value);
  } else {
    dd.textContent = value;
  }

  list.append(dt, dd);
}

/**
 * Turns the product id back into its display name.
 * Falls back to the raw value if products.js isn't loaded.
 * @param {string|null} id
 * @returns {string}
 */
function productName(id) {
  if (!id) return "—";
  if (typeof products === "undefined") return id;

  const match = products.find((product) => product.id === id);
  return match ? titleCase(match.name) : id;
}

/**
 * Builds a 5-star visual plus an accessible text equivalent.
 * @param {string|null} value  e.g. "4"
 * @returns {HTMLElement}
 */
function ratingElement(value) {
  const stars = Math.min(Math.max(Number(value) || 0, 0), 5);

  const wrap = document.createElement("span");
  wrap.className = "rating-stars";
  wrap.setAttribute("role", "img");
  wrap.setAttribute("aria-label", `${stars} out of 5 stars`);

  const filled = document.createElement("span");
  filled.className = "on";
  filled.textContent = "★".repeat(stars);

  const empty = document.createElement("span");
  empty.className = "off";
  empty.textContent = "☆".repeat(5 - stars);

  const text = document.createElement("span");
  text.className = "rating-text";
  text.textContent = ` (${stars} of 5)`;

  wrap.append(filled, empty, text);
  return wrap;
}

/**
 * Formats an ISO date string (yyyy-mm-dd) for display.
 * The "T00:00:00" prevents a timezone shift on the date.
 * @param {string|null} value
 * @returns {string}
 */
function formatDate(value) {
  if (!value) return "—";

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

/**
 * Joins the checked feature values into a readable list.
 * @param {string[]} values
 * @returns {string}
 */
function formatFeatures(values) {
  return values.length ? values.join(", ") : "None selected";
}

/**
 * Capitalizes each word: "flux capacitor" → "Flux Capacitor".
 * @param {string} text
 * @returns {string}
 */
function titleCase(text) {
  return text.replace(/\b\w/g, (letter) => letter.toUpperCase());
}