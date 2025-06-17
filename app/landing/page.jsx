import "../../src/assets/js/main";
import BrandsSwiper from "@/components/ui/BrandsSwiper";
import GridSwiper from "@/components/ui/GridSwiper";
import ContactTools from "@/components/ui/ContactTools";
import Hero from "@/components/ui/Hero";

const searchTypes = [
  {
    title: "أحدث المنتجات",
    badgeType: "blue",
    type: "NEW ARRIVAL",
    route: "/products?itemType=NEW ARRIVAL",
    id: "new-arrival"
  },
  {
    title: "أبرز العروض",
    badgeType: "green",
    type: "GIVEAWAY",
    route: "/products?itemType=GIVEAWAY",
    id: "giveaway"
  },
  {
    title: "قريباً في المتجر",
    badgeType: "yellow",
    type: "COMMING SOON",
    route: "/products?itemType=COMMING SOON",
    id: "comming-soon"
  },
  {
    title: "عروض التصفية",
    badgeType: "red",
    type: "CLEARANCE",
    route: "/products?itemType=CLEARANCE",
    id: "clearance"
  },
];

export default async function Home() {

  return (
    <>
      <Hero />
      <div className="mt-90 py-4">
        <BrandsSwiper />
      </div>

      <div className="max-w-screen-xl mx-auto p-4 space-y-16">
        {
          searchTypes.map((grid, i) => (
            <GridSwiper
            key={i}
              title={grid.title}
              badgeType={grid.badgeType}
              type={grid.type}
              route={grid.route}
              id={grid.id}
            />
          ))
        }
        <ContactTools />
      </div>
    </>
  );
}
