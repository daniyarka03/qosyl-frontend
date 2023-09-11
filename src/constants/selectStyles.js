const selectStyles = {
  container: (baseStyles, state) => ({
    ...baseStyles,
    marginTop: "1rem",
  }),
  singleValue: (baseStyles, state) => ({
    ...baseStyles,
    color: "#000000",
  }),
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderRadius: "1.2rem",
  }),
  valueContainer: (baseStyles, state) => ({
    ...baseStyles,
    padding: "2rem",
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#000000",
  }),
  placeholder: (baseStyles, state) => ({
    ...baseStyles,
    fontSize: "1.25rem",
    color: "#534e4e",
    fontWeight: "700",
  }),
  menu: (baseStyles, state) => ({
    ...baseStyles,
    fontSize: "1.25rem",
    color: "#000000",
    fontWeight: "700",
  }),
};

export default selectStyles;