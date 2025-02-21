import { Dispatch, SetStateAction } from "react";
import "./Filter.css";

//mui
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface FilterType {
  price: number[];
  setPrice: Dispatch<SetStateAction<number[]>>;
  rating: number[];
  setRating: Dispatch<SetStateAction<number[]>>;
  maxPrice: number;
  onClose: () => void;
}

const sliderStyle = {
  color: "var(--coral-accent)", // Change the main slider color
  "& .MuiSlider-thumb": { backgroundColor: "var(--coral-accent)" }, // Thumb color
  "& .MuiSlider-track": { backgroundColor: "var(--coral-accent)" }, // Track color
  "& .MuiSlider-rail": { backgroundColor: "var(--coral-accent)" }, // Rail color
};

export default function Filter({
  price,
  setPrice,
  rating,
  setRating,
  maxPrice,
  onClose,
}: FilterType) {
  function handlePriceChange(_e: Event, newValue: number | number[]) {
    setPrice(newValue as number[]);
  }

  function handleRatingChange(_e: Event, newValue: number | number[]) {
    setRating(newValue as number[]);
  }

  return (
    <aside className="filter-container">
      <div className="filter-close" onClick={onClose}>
        <CloseRoundedIcon sx={{ fontSize: "30px" }} />
      </div>
      <div className="filter-slider">
        <span>Price</span>
        <Box sx={{ width: "100%" }}>
          <Slider
            getAriaLabel={() => "Price range"}
            value={price}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={maxPrice}
            sx={sliderStyle}
          />
        </Box>
      </div>
      <div className="filter-slider">
        <span>Rating</span>
        <Box sx={{ width: "100%" }}>
          <Slider
            getAriaLabel={() => "Rating range"}
            value={rating}
            onChange={handleRatingChange}
            valueLabelDisplay="auto"
            min={0}
            max={5}
            sx={sliderStyle}
          />
        </Box>
      </div>
    </aside>
  );
}
