module.exports = {
  // Tells SVGR to generate .tsx files instead of .jsx
  typescript: true,
  icon: true,
  replaceAttrValues: {
    "#BBFD58": "currentColor",
    "#BDBDBD": "currentColor",
  },
  template: (variables, { tpl }) => {
    // 1. Remove the default 'className' attribute if SVGR tries to add one
    variables.jsx.openingElement.attributes =
      variables.jsx.openingElement.attributes.filter(
        (attr) => attr.name.name !== "className",
      );

    // 2. Safely inject your dynamic template literal: className={`group ${className || ""}`}
    variables.jsx.openingElement.attributes.push({
      type: "JSXAttribute",
      name: { type: "JSXIdentifier", name: "className" },
      value: {
        type: "JSXExpressionContainer",
        expression: {
          type: "TemplateLiteral",
          quasis: [
            {
              type: "TemplateElement",
              value: { raw: "group ", cooked: "group " },
              tail: false,
            },
            {
              type: "TemplateElement",
              value: { raw: "", cooked: "" },
              tail: true,
            },
          ],
          expressions: [
            {
              type: "LogicalExpression",
              operator: "||",
              left: { type: "Identifier", name: "className" },
              right: { type: "StringLiteral", value: "" },
            },
          ],
        },
      },
    });

    // 3. Output the exact TypeScript format you requested
    return tpl`
import type { SVGProps } from "react";

const ${variables.componentName} = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  ${variables.jsx}
);

export default ${variables.componentName};
`;
  },
};
