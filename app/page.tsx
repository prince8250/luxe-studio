import { Suspense } from "react";

import { Hero } from "@/components/public/hero";
import {
  HomeServices,
  HomeServicesLoading,
} from "@/components/public/home-services";

export default function Home() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<HomeServicesLoading />}>
        <HomeServices />
      </Suspense>
    </main>
  );
}
