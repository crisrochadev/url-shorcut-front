const conflictingClasses = [
  "flex",
  "order-first",
  "order-last",
  "cursor-not-alowed",
  "cursor-pointer",
  "block",
  "inline-block",
  "text-justify",
  "hidden",
  "invisible",
  "overflow-auto",
  "overflow-hidden",
];
const removeObj = {
  ...Object.fromEntries(conflictingClasses.map((cc) => [`.${cc}`, "*"])), // Removes all properties from conflicting classes
  body: ["font-family", "font-size"], // You can also remove things like fonts and colors.
};

module.exports = {
  plugins: [
    ...require("postcss-remove-declaration")({ remove: removeObj }), // The plugin must be placed before Tailwind import!
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
