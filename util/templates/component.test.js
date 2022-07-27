module.exports = (componentName) => ({
  content: `import React from "react";
import { render, screen } from "@testing-library/react";

import ${componentName} from "./${componentName}";
import { ${componentName}Props } from "./${componentName}.types";

describe("${componentName} Component", () => {
  const setup = (props) => {
    render(<${componentName} {...props} />);
  }

  it("should render foo text correctly", () => {
    setup({ foo: "text prop is this one" })

    expect(screen.getByText(/text prop is this one/i)).toBeInTheDocument();
  });
});
`,
  extension: `.test.tsx`
});
