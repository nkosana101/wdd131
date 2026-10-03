/* ============================================================
   scripts/form.js  —  logic for form.html
   ============================================================ */

/* ------------------------------------------------------------
   1. Populate the Product Name <select>
   ------------------------------------------------------------
   NOTE ON THE SPEC: the HTML section says the option's value
   should be the product NAME, while the JavaScript section says
   the array's `id` is used for the value and `name` for the
   display text. These conflict. We follow the JavaScript
   section (id as value), because review.js needs a stable,
   URL-safe key to look the product back up on the
   confirmation page.
   ------------------------------------------------------------ */
const productSelect = document.querySelector("#productName");

if (productSelect) {
  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;          // value = id   → sent in the URL
    option.textContent = product.name;  // text  = name → shown to the user
    productSelect.appendChild(option);
  });
}

/* ------------------------------------------------------------
   2. Common footer content (year + last modified)
   ------------------------------------------------------------ */
const yearSpan = document.querySelector("#currentYear") ||
                 document.querySelector("#currentyear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const modifiedSpan = document.querySelector("#lastModified");
if (modifiedSpan) {
  modifiedSpan.textContent = document.lastModified;
}