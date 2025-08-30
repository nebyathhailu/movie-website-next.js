import ActionSection from '@/components/ActionSection';
import ArabicSection from '@/components/ArabicSection';
import Banner from '@/components/Banner';
import LatestSection from '@/components/LatestSection';

import PopularSection from '@/components/PopularSection';
import SeriesSection from '@/components/SeriesSeries';



export default function Home() {

 return (

   <main>

     <Banner />

     <PopularSection/>

     <LatestSection/>

     <ActionSection/>

     <ArabicSection/>

     <SeriesSection/>
   </main>

 );

}
