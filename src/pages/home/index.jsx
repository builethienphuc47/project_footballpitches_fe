import React, { useEffect, useState } from "react";
import PitchCard from "../../components/pitch-card";
import Navbar from "../../components/navbar";
import CarouselList from "../../components/carousel";
import { pitches } from "../../assets/data/pitches";
import Loader from "../../components/loader";
import "./styles.scss";
import axios from "axios";
import { API_GET_PITCHES_MANAGEMENT } from "../../assets/urls/endpoint";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userName = localStorage.getItem("name");

  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(API_GET_PITCHES_MANAGEMENT)
      .then(function (response) {
        // handle success
        const data = response.data.pitches;
        console.log("My pitches: ", data);
        setData(data.reverse());
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        console.log(error);
      });
  };


  useEffect(() => {
    fetchAPI();
    console.log('hàm này chạy đầu tiên')
  }, []);

  return (
    <div>
      {/* header */}
      <Navbar />
      <div className="px-20">
        <div className="welcome pt-20">
          {userName && (
            <>
              <span className="text">Chào mừng </span>{" "}
              <span className="h5">{userName}</span>
            </>
          )}
        </div>
        <CarouselList />
        <div className="listPitch">
          <h1 className="title">Danh sách sân bóng</h1>
          {loading ? (
          // nếu loading = false thì sẽ chạy cái phần className 'pt-20'
            <div className="pt-20">
              {/* nếu như dữ liệu chưa trả về thì sẽ loading */}
              <Loader />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-6 gap-y-20 pb-20">
              {data?.map((item) => (
                // vòng lặp map sẽ lấy toàn bộ dữ liệu sân từ DB về và hiển thị lên UI
                <div key={item?._id} className="px-3">
                  <PitchCard isShowInHome={true} data={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
