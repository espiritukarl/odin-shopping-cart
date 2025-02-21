import { Dispatch, SetStateAction } from "react";

//mui
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

interface FilterType {
  price: number[];
  setPrice: Dispatch<SetStateAction<number[]>>;
  rating: number[];
  setRating: Dispatch<SetStateAction<number[]>>;
  maxPrice: number;
}

export default function Filter({
  price,
  setPrice,
  rating,
  setRating,
  maxPrice,
}: FilterType) {
  function handlePriceChange(_e: Event, newValue: number | number[]) {
    setPrice(newValue as number[]);
  }

  function handleRatingChange(_e: Event, newValue: number | number[]) {
    setRating(newValue as number[]);
  }

  return (
    <aside className="filter-container">
      <div className="filter-price">
        <Box sx={{ width: 300 }}>
          <Slider
            getAriaLabel={() => "Price range"}
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={maxPrice}
          />
        </Box>
      </div>
      <div className="filter-rating">
        <Box sx={{ width: 300 }}>
          <Slider
            getAriaLabel={() => "Rating range"}
            value={rating}
            onChange={handleRatingChange}
            valueLabelDisplay="auto"
            min={0}
            max={5}
          />
        </Box>
      </div>
    </aside>
  );
}
