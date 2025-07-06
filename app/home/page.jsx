"use client";
import React, { useEffect, useState } from "react";
import "../../src/assets/js/main";
import BrandsSwiper from "@/components/ui/BrandsSwiper";
import GridSwiper from "@/components/ui/GridSwiper";
import Hero from "@/components/ui/Hero";
import { useAppContext } from "../../context/AppContext";
import en from "../../locales/en.json";
import ar from "../../locales/ar.json";

export default function Home() {
  const { state = {}, dispatch = () => {} } = useAppContext() || {};
  const [translation, setTranslation] = useState(ar); // fallback to Arabic

  useEffect(() => {
    if (state.LANG === "EN") {
      setTranslation(en);
    } else {
      setTranslation(ar);
    }
  }, [state.LANG]);

  const searchTypes = [
    {
      title: translation.newArrivals,
      badgeType: "blue",
      type: "NEW ARRIVAL",
      route: "/products?itemType=NEW ARRIVAL&itemStatus=AVAILABLE",
      id: "new-arrival",
    },
    {
      title: translation.offers,
      badgeType: "green",
      type: "GIVEAWAY",
      route: "/products?itemType=GIVEAWAY&itemStatus=AVAILABLE",
      id: "giveaway",
    },
    {
      title: translation.commingSoon,
      badgeType: "yellow",
      type: "COMMING SOON",
      route: "/products?itemType=COMMING SOON&itemStatus=AVAILABLE",
      id: "coming-soon",
    },
    {
      title: translation.clearance,
      badgeType: "red",
      type: "CLEARANCE",
      route: "/products?itemType=CLEARANCE&itemStatus=AVAILABLE",
      id: "clearance",
    },
  ];

  return (
    <>
      <Hero />
      <div className="mt-90 py-4">
        <BrandsSwiper />
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-16">
        {searchTypes.map((grid, i) => (
          <GridSwiper
            key={i}
            title={grid.title}
            badgeType={grid.badgeType}
            type={grid.type}
            route={grid.route}
            id={grid.id}
          />
        ))}
      </div>
    </>
  );
}
