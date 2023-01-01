import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {
  fireEvent,
  getByRole,
  getByTestId,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import PokemonMap from "./PokemonMap";
import "@testing-library/jest-dom";
describe("Pokemon Map", () => {
  it("opens the character guess menu when pokemon map is clicked", async () => {
    render(<PokemonMap />);
    await userEvent.click(screen.getByTestId("pokemon-map"));
    expect(screen.getByText("Pichu")).toBeTruthy();
  });
  it("closes the guess menu when menu is double clicked", async () => {
    render(<PokemonMap />);
    //opens menu
    await userEvent.click(screen.getByTestId("pokemon-map"));

    //close menu
    await fireEvent(
      screen.getByTestId("menu"),
      new MouseEvent("dblclick", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(screen.queryByText("Pichu")).toBeFalsy();
  });
});
