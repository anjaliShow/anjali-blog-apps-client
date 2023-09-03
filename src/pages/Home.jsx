import React, { Suspense, useEffect, useState } from 'react';
// import BlogCard from "../components/BlogCard";
import { data } from '../assets/data';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Loading } from '../components/Loading';
import Banner from '../components/Banner';

const BlogCard = React.lazy(() => import('../components/BlogCard'));

const Home = () => {
  const [blogData, setBlogData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('https://anj-blog-app-server.onrender.com/api/v1/post/get');
      // console.log('data', data);
      setBlogData(data?.post);
    };
    getData();
  }, []);

  // console.log('blogData', blogData);

  return (
    <>
      <Banner />
      <div className="container">
        {/* <div className="m-5 row"> */}
        <div className="row mt-5">
          {blogData.map((item) => (
            <BlogCard key={item?._id} data={item} />
          ))}
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Home;
