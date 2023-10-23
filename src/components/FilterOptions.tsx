import React, { memo } from "react";

interface Props {
  onFilterChange: (color: string) => void;
}

const FilterOptions: React.FC<Props> = ({ onFilterChange }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedColor = e.target.value;
    onFilterChange(selectedColor);
  };

  return (
    <select
      role="combobox"
      onChange={handleFilterChange}
      style={{ padding: "6px", margin: "16px" }}>
      <option value="">All Colors</option>
      <option value="Black">Black</option>
      <option value="Stone">Stone</option>
      <option value="Red">Red</option>
      {/* Add more color options here */}
    </select>
  );
};

export default memo(FilterOptions);
