"use client";
import React, { useCallback, useEffect, useState, useRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import Cookies from 'js-cookie';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

const MultiRangeSlider = ({ min, max, selectedFrom ,selectedTo, title, initiallyOpen = false, handlePriceFrom, handlePriceTo }) => {
  const [open, setOpen] = useState(selectedFrom && selectedTo ? true : false);
  let saved = {
    minVal: selectedFrom,
    maxVal: selectedTo
  }

  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  const [minVal, setMinVal] = useState(() => {
    // const saved = JSON.parse(localStorage?.getItem(STORAGE_KEY));
    return saved?.minVal ?? min;
  });

  const [maxVal, setMaxVal] = useState(() => {
    // const saved = JSON.parse(localStorage?.getItem(STORAGE_KEY));
    return saved?.maxVal ?? max;
  });

  useEffect(() => {
    // localStorage?.setItem(STORAGE_KEY, JSON.stringify({ minVal, maxVal }));
    minValRef.current = minVal;
    maxValRef.current = maxVal;
  }, [minVal, maxVal]);

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  const updateRangeBar = useCallback(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [getPercent]);

  // Update range visually when min or max changes
  useLayoutEffect(() => {
    updateRangeBar();
  }, [minVal, maxVal, updateRangeBar]);;

  // Update again when accordion opens
  useEffect(() => {
    if (open) {
      // slight delay to ensure DOM is ready
      setTimeout(() => updateRangeBar(), 50);
    }
  }, [open, updateRangeBar]);


  return (
    <Disclosure defaultOpen={open}>
      {({ open: isOpen }) => (
        <div className="accordion-wrapper">
          <DisclosureButton
            onClick={() => setOpen((prev) => !prev)}
            className="accordion-item w-full flex items-center justify-between cursor-pointer"
          >
            <span className="title">{title}</span>
            <i
              className={`icon-arrow-down-01-round arrow-down ${
                isOpen ? "rotate-180" : ""
              }`}
            ></i>
          </DisclosureButton>

          <DisclosurePanel className="text-gray-500">
            <div className="slider-container">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                  const value = Math.min(
                    Number(event.target.value),
                    maxVal - 1
                  );
                  setMinVal(value);
                  handlePriceFrom(event.target.value)
                }}
                className="thumb thumb--left"
                style={{ zIndex: minVal > max - 100 ? "5" : undefined }}
              />
              <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {
                  const value = Math.max(
                    Number(event.target.value),
                    minVal + 1
                  );
                  setMaxVal(value);                  
                  handlePriceTo(event.target.value)
                }}
                className="thumb thumb--right"
              />

              <div className="slider">
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
                <div className="slider__right-value">
                  <span>{maxVal}</span>
                  <span> دينار</span>
                </div>
                <div className="slider__left-value">
                  <span>{minVal}</span>
                  <span> دينار</span>
                </div>
              </div>
            </div>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  title: PropTypes.string,
  initiallyOpen: PropTypes.bool,
};

export default MultiRangeSlider;
