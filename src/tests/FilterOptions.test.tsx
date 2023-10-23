import React from "react";
import { render, screen } from "@testing-library/react";
import FilterOptions from "../components/FilterOptions";
import userEvent from "@testing-library/user-event";

describe("FilterOptions component", () => {
  const onFilterChange = jest.fn();

  it("should render a select element with the correct options", () => {
    render(<FilterOptions onFilterChange={onFilterChange} />);

    const selectElement: HTMLSelectElement = screen.getByRole("combobox");

    expect(selectElement).toHaveProperty("options");
    expect(selectElement.options.length).toBe(4);
    expect(selectElement.options[0].value).toBe("");
    expect(selectElement.options[1].value).toBe("Black");
    expect(selectElement.options[2].value).toBe("Stone");
    expect(selectElement.options[3].value).toBe("Red");
  });

  it("should call the onFilterChange callback when the selected color changes", () => {
    render(<FilterOptions onFilterChange={onFilterChange} />);

    // Get the select element
    const selectElement: HTMLSelectElement = screen.getByRole("combobox");

    // Set the value of the select element to "Black"
    selectElement.value = "Black";

    // Dispatch a change event on the select element
    userEvent.selectOptions(selectElement, "Black");

    // Now, check if onFilterChange was called with "Black"
    expect(onFilterChange).toHaveBeenCalledWith("Black");
  });
});
