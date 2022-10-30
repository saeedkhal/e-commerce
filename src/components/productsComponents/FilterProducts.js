import React, { useEffect, useState } from "react";
import { useContextProvider } from "../../context/context";
import { UPDATE_FILTERED_PRODUCTS } from "../../assets/contsntants/constants";
import {
  RiCheckboxCircleFill,
  RiCheckboxBlankCircleFill,
} from "react-icons/ri";

import { deltaE, hexToRgb } from "./utils";
function FilterProducts() {
  const { dispatch, getProducts, products, channels, categoryies } =
    useContextProvider();
  const [filterObject, setFilterObject] = useState({
    category: "",
    price: 150,
    color: "",
    freeShipping: false,
    searchName: "",
    channel: "",
  });
  const btnColors = [
    "#000000",
    "#c80000",
    "#9EB296",
    "#183F7A",
    "#FFA500",
    "#7ccded",
    "#c8c8c8",

  ];
  const filterProducts = () => {
    const newProducts = products
      ?.filter((product) => {
        if (!filterObject?.category) {
          return true;
        }
        return filterObject?.category === product?.fields?.category.toString();
      })
      .filter((product) => {
        if (!filterObject?.freeShipping) {
          return true;
        }
        return product?.fields?.freeShipping === filterObject?.freeShipping;
      })
      .filter((product) => {
        if (!filterObject?.searchName) {
          return true;
        }
        return product?.fields?.name
          .toLowerCase()
          .includes(filterObject?.searchName?.toLowerCase());
      })
      .filter((product) => {
        if (!filterObject?.channel) {
          return true;
        }
        return product?.fields?.chennel?.includes(filterObject?.channel);
      })
      .filter((product) => {
        return product?.fields?.price <= filterObject?.price;
      })
      .map((product) => {
        if (!filterObject?.color) {
          return product;
        } else {
          const colorIndex = product?.fields?.colors?.findIndex((color,i) => {
            return deltaE(hexToRgb(color), hexToRgb(filterObject?.color)) <= 20;
          });
          return {
            ...product,
            fields: { ...product?.fields, activeImg: colorIndex },
          };
        }
      })
      .filter((product) => {
        return product?.fields?.activeImg !== -1;
      });

    dispatch({ type: UPDATE_FILTERED_PRODUCTS, payload: newProducts });
  };
  useEffect(() => {
    filterProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObject]);
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main className="container fiterproduct-contaoner">
      <div className="container-filter">
        <section className="cateogry">
          <h3 className="header-filter">Cateogry</h3>
          {categoryies?.map((category, index) => {
            const { id, fields } = category;
            return (
              <button
                key={index}
                className={
                  id === filterObject?.category.toString()
                    ? "cateory-active"
                    : ""
                }
                onClick={() => {
                  setFilterObject({ ...filterObject, category: id });
                }}
              >
                {fields?.name}
              </button>
            );
          })}
          <button
            className={!filterObject?.category ? "cateory-active" : ""}
            onClick={() => {
              setFilterObject({
                ...filterObject,
                category: "",
              });
            }}
          >
            ALL
          </button>
        </section>
        <section className="channel">
          <h3 className="header-filter">Channel</h3>
          <select
            onChange={(e) => {
              setFilterObject({
                ...filterObject,
                channel: e.target.value,
              });
            }}
          >
            <option value="">ALL</option>
            {channels?.map((channel, index) => {
              const { id, fields } = channel;
              return (
                <option key={index} value={id}>
                  {fields?.name}
                </option>
              );
            })}
          </select>
        </section>
        <section className="price">
          <h3 className="header-filter">Price</h3>
          <div className="price-container">
            <input
              className="price-input"
              max={Math.max(
                ...products.map((product) => product?.fields?.price)
              )}
              type="range"
              value={filterObject?.price}
              onChange={(e) =>
                setFilterObject({ ...filterObject, price: e.target.value })
              }
            />
            <span className="price-output">{filterObject?.price}$</span>
          </div>
        </section>
        <section className="color">
          <h3 className="header-filter">Color</h3>
          <button
            className="All"
            style={!filterObject?.color ? { borderBottom: "1px solid" } : {}}
            onClick={() => setFilterObject({ ...filterObject, color: "" })}
          >
            All
          </button>
          {btnColors?.map((color, index) => {
            return (
              <button
                key={index}
                onClick={() => setFilterObject({ ...filterObject, color })}
              >
                {filterObject?.color === color ? (
                  <RiCheckboxCircleFill style={{ color }} />
                ) : (
                  <RiCheckboxBlankCircleFill
                    className="active"
                    style={{ color }}
                  />
                )}
              </button>
            );
          })}
        </section>
        <section className="shipping">
          <h3 className="header-filter">Free Shipping</h3>
          <input
            type="checkbox"
            checked={filterObject?.freeShipping}
            onChange={() => {
              setFilterObject({
                ...filterObject,
                freeShipping: !filterObject?.freeShipping,
              });
            }}
          />
        </section>
      </div>
      <section className="product-found">
        23 product found
        <div className="h-line">
          <hr />
        </div>
        <span>
          sorted by
          <select>
            <option value="min-pirce">min-price</option>
            <option value="max-pirce">max-price</option>
            <option value="name">name asce</option>
            <option value="name">name desc</option>
          </select>
        </span>
      </section>
      <input
        placeholder="Search"
        className="search-products"
        onChange={(e) => {
          setFilterObject({
            ...filterObject,
            searchName: e.target.value,
          });
        }}
      />
    </main>
  );
}

export default FilterProducts;
