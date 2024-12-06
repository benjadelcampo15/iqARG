import { Link } from "react-router-dom";
import foilBg from "../../../assets/foil.jpg";
import windsurfBg from "../../../assets/windsurf.jpg";
import wingFoilBg from "../../../assets/wing-foil.jpg";
import Product from "../../../components/Product/Product";
import instagram from "../../../assets/logo-instagram.png";
import facebook from "../../../assets/logo-facebook.png";
import twitter from "../../../assets/logo-twitter.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

import "./Swiper.css";
import { useProducts } from "../../../context/ProductContext";
import { useEffect, useState } from "react";

const Home = () => {
  const { products } = useProducts();
  const [outletProducts, setOutletProducts] = useState([]);

  useEffect(() => {
    // Filtrar productos de la categoría "Outlet"
    const filteredProducts = products.filter(
      (product) => product.category === "Outlet"
    );
    setOutletProducts(filteredProducts.slice(0, 8)); // Mostrar los primeros 8 productos
  }, [products]);
  return (
    <main className="flex flex-col bg-red">
      <section className="flex w-full justify-center pt-4">
        {/* <img className="w-2/3 rounded" src={background} alt="" /> */}
        <Swiper
          centeredSlides={true}
          slidesPerView={2}
          spaceBetween={10}
          initialSlide={1}
          modules={[EffectCoverflow, Navigation]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 65,
            depth: 860,
            scale: 1.15,
            modifier: 1,
            slideShadows: true,
          }}
          className="w-full relative z-10"
          style={{ height: "71vh" }}
          navigation={true}
        >
          <SwiperSlide>
            <div className="w-full h-full relative">
              <Link
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300"
                to="/Windsurf"
              >
                Windsurf
              </Link>
              <img
                className="w-full h-full object-cover rounded"
                src={windsurfBg}
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full relative">
              <Link
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300"
                to="/Foil"
              >
                Foil
              </Link>
              <img
                className="w-full h-full object-cover rounded"
                src={foilBg}
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full h-full relative">
              <Link
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300"
                to="/Wing-foil"
              >
                Wing Foil
              </Link>
              <img
                className="w-full h-full object-cover rounded"
                src={wingFoilBg}
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="flex flex-col w-4/5 m-auto mt-14">
        <h2 className="text-brown text-5xl mb-6">Outlet</h2>
        <div className="flex flex-row flex-wrap w-11/12 mx-auto justify-center">
          {outletProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <Link
          to="/Outlet"
          className="w-2/12 mt-3 p-2 px-4 self-center bg-lightYellow rounded-3xl text-black hover:bg-darkYellow transition-colors duration-300"
        >
          Ver mas
        </Link>
      </section>
      <section className="flex flex-col mt-14 items-center">
        <h2 className=" text-brown text-4xl mb-6">Contacto</h2>
        <h5 className="mb-2">+5492613748269</h5> {/* whatsapp */}
        <h5 className="mb-4">tomasguignet9@gmail.com</h5> {/* mail */}
        <div className="flex flex-row ">
          <button className="mx-2">
            <img className="w-7 mb-2" src={instagram} alt="" />
          </button>
          <button className="mx-2">
            <img className="w-7 mb-2" src={facebook} alt="" />
          </button>
          <button className="mx-2">
            <img className="w-8 mb-2" src={twitter} alt="" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
