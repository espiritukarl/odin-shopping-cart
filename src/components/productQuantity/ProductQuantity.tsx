//react
import { Dispatch, SetStateAction } from "react";
import "./ProductQuantity.css";

export function ProductQuantity({
  productClass,
  quantity,
  setQuantity,
}: {
  productClass: string;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}) {
  const reduceQuantity = () => setQuantity(quantity - 1);
  const addQuantity = () => setQuantity(quantity + 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? 0 : value);
  };

  return (
    <div className={`product-quantity-container ${productClass}`}>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          reduceQuantity();
        }}
        disabled={quantity <= 0}
      >
        -
      </button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => handleInputChange(e)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addQuantity();
        }}
      >
        +
      </button>
    </div>
  );
}
