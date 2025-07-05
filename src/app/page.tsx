import Header from "./components/header";
import Image from "next/image";
import Subheader from "./components/subheader";

import Services from "./components/services";
import Portfolio from "./components/portfolio";
import Technologies from "./components/technologies";
import Contacts from "./components/contacts";
import ReviewsServer from "./components/ReviewsServer";
import Footer from "./components/footer";
import MainPage from "./MainPage";

export default function Home() {
  return <MainPage reviews={<ReviewsServer limit={6} showAllLink={true} />} />;
}
