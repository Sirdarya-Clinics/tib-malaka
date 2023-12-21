import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import HeaderUz from "@/components/Header";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biz haqimizda",
  description: "Biz haqimizdagi sahifa",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
    <HeaderUz/>
      <Breadcrumb
        pageName="Biz haqimizda"
        description=" Respublika o’rta tibbiyot va farmasevtika xodimlari malakasini oshirish va ularni ixtisoslashtirish markazi Guliston filialining asosiy vazifasi Sirdaryo viloyati davolash profilaktika muassasalarining o’rta tibbiyot va farmasevtika xodimlarini malakasini oshirish va ularni ixtisoslashtirish bo’yicha  kunduzgi  (ishdan ajralgan va ishdan ajralmagan holda) oqishlarni tashkil etishdir.
        Filialda 15 nafar o’qituvchi, 14 nafar ishchi xodim faoliyat ko’rsatadi. Viloyatdagi 16 ta Davolash profilaktika muassalalari bilan hamkorlik shartnomasi tuzilgan va shu asos amaliy mashg’ulotlar uchun sharoitlar yaratilgan."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default AboutPage;
