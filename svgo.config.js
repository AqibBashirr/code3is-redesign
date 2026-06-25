module.exports = {
  plugins: [
    {
      name: "preset-default",
    },
    {
      name: "add-hover-class-to-black-paths",
      type: "visitor",
      fn: () => {
        return {
          element: {
            enter: (node) => {
              // If the shape is black, apply your custom classes
              if (
                node.attributes.fill === "#000" ||
                node.attributes.fill === "#000000"
              ) {
                // Add your exact requested classes (Add your specific color after 'fill-')
                node.attributes.class =
                  "fill-black group-hover:fill-amber-700 transition-colors duration-300";

                // Remove the hardcoded fill so Tailwind works
                delete node.attributes.fill;
              }
            },
          },
        };
      },
    },
  ],
};
