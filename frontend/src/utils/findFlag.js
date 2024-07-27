import FranceFlag from "/france-svgrepo-com.svg";
import GermanyFlag from "/germany-svgrepo-com.svg";
import SaudiArabiaFlag from "/saudi-arabia-svgrepo-com.svg";
import UnitedKingdomFlag from "/united-kingdom-uk-svgrepo-com.svg";
import SpainFlag from "/spain-svgrepo-com.svg";

export function findFlag(country) {
  switch (country.toLowerCase()) {
    case "france":
      return FranceFlag;
    case "germany":
      return GermanyFlag;
    case "saudi arabia":
      return SaudiArabiaFlag;
    case "united kingdom":
      return UnitedKingdomFlag;
    case "spain":
      return SpainFlag;
    default:
      return null;
  }
}
