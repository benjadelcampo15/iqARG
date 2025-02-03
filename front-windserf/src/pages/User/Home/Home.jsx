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
import "swiper/css/effect-coverflow";

import { useProducts } from "../../../context/ProductContext";
import { useEffect, useState } from "react";

const Home = () => {
  const { products } = useProducts();
  const [outletProducts, setOutletProducts] = useState([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detectar si el dispositivo es táctil
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0
      );
    };

    checkTouchDevice();
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter(
      (product) => product.discount !== null
    );
    setOutletProducts(filteredProducts.slice(0, 8));
  }, [products]);

  return (
    <main className="flex flex-col">
      <section className="flex w-full justify-center pt-4">
        <Swiper
          centeredSlides={true}
          slidesPerView={window.innerWidth >= 640 ? 2 : 1}
          spaceBetween={0}
          initialSlide={1}
          modules={[EffectCoverflow, Navigation]}
          effect="coverflow"
          coverflowEffect={
            window.innerWidth >= 640
              ? {
                  rotate: 50,
                  stretch: 65,
                  depth: 860,
                  scale: 1.15,
                  modifier: 1,
                  slideShadows: true,
                }
              : {
                  rotate: 50,
                  stretch: 65,
                  depth: 860,
                  scale: 1.15,
                  modifier: 1,
                  slideShadows: true,
                }
          }
          className="w-11/12 sm:w-full rounded-lg sm:rounded relative z-10 "
          style={
            window.innerWidth >= 640 ? { height: "71vh" } : { height: "60vh" }
          }
          navigation={true}
        >
          <SwiperSlide>
            <div className="w-full h-full relative">
              <Link
                className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl font-semibold ${
                  isTouchDevice ? "opacity-50" : "opacity-0 hover:opacity-100"
                } transition-opacity duration-300`}
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
                className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl font-semibold ${
                  isTouchDevice ? "opacity-50" : "opacity-0 hover:opacity-100"
                } transition-opacity duration-300`}
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
                className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl font-semibold ${
                  isTouchDevice ? "opacity-50" : "opacity-0 hover:opacity-100"
                } transition-opacity duration-300`}
                to="/Wing foil"
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
        <h2 className="text-brown text-4xl self-center sm:self-start sm:text-5xl mb-6">
          Outlet
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-11/12 mx-auto justify-center">
          {outletProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <Link
          to="/Outlet"
          className="w-8/12 sm:w-5/12 md:w-3/12 lg:w-2/12 mt-3 p-2 px-4 self-center text-center bg-lightYellow rounded-3xl text-black hover:bg-darkYellow transition-colors duration-300"
        >
          Ver más
        </Link>
      </section>

      <section className="flex flex-col mt-14 items-center">
        <h2 className="text-brown text-3xl sm:text-4xl mb-6">Contacto</h2>
        <h5 className="mb-2">+5492613748269</h5>
        <h5 className="mb-4">tomasguignet9@gmail.com</h5>
        <div className="flex space-x-4">
          <button>
            <img className="w-6 sm:w-7" src={instagram} alt="Instagram" />
          </button>
          <button>
            <img className="w-6 sm:w-7" src={facebook} alt="Facebook" />
          </button>
          <button>
            <img className="w-6 sm:w-8" src={twitter} alt="Twitter" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
