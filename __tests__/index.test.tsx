import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {type ReactElement} from "react";

export function Home(): ReactElement {
    return <h2>Hola</h2>;
}

describe("Home", () => {
    it("renders a heading", () => {
        render(<Home />);

        const heading = screen.getByText("Hola");

        expect(heading).toBeInTheDocument();
    });
});
