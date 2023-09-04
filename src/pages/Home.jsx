import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import Banner from '../components/Banner';
import { motion, useMotionValue } from 'framer-motion';

const BlogCard = React.lazy(() => import('../components/BlogCard'));

const Home = () => {
  const [blogData, setBlogData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        'https://anj-blog-app-server.onrender.com/api/v1/post/get'
      );
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
        <motion className="row mt-5">
          {blogData.map((item) => (
            <BlogCard key={item?._id} data={item} />
          ))}
        </motion>
        {/* </div> */}
      </div>
    </>
  );
};

export default Home;
