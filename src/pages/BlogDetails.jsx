import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Offcanvas from '../components/Offcanvas';
import { createdTime } from '../utils/functions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogDetails = () => {
  const { id } = useParams();
  // console.log('params', id);
  const [blogData, setBlogData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    getData();
    getCommentsData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/post/get/${id}`
    );
    // console.log('data', data);
    setBlogData(data?.post);
  };

  // console.log('blogData', blogData);

  const getCommentsData = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/post/get-comments/${id}`
    );
    // console.log('data', data.comment?.comments);
    setCommentsData(data.comment?.comments);
  };

  const memoizedCreatedDate = useMemo(
    () => createdTime(blogData?.createdAt),
    [blogData?.createdAt]
  );

  const handleDeleteComment = useCallback(async (data) => {
    const { postId, commentId } = data;
    console.log('postId', postId);
    console.log('commentId', commentId);
    try {
      await axios
        .delete(
          `http://localhost:8000/api/v1/post/delete-comments/${postId}/${commentId}`,
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        )
        .then((res) => {
          // console.log('res', res);
          toast.success(res.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          getCommentsData();
        })
        .catch((err) => {
          // console.log('err', err);
          toast.error(err.response.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } catch (error) {
      console.log('error', error);
      toast.error(error.response?.data?.message || 'An error occurred', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-center width_full">
        <div className="d-flex justify-content-center flex-column">
          <div className="">
            <h1 className="" style={{ fontWeight: '900' }}>
              {blogData?.title}
            </h1>
          </div>

          <div className="d-flex justify-content-start align-items-center gap-3">
            <div className="">
              <img
                src={blogData?.author?.avatar}
                alt=""
                className="blogcard_avatar rounded-circle"
              />
            </div>
            <div className="">
              <span className="fs-5"> {blogData?.author?.fullName} </span>{' '}
              <br />
              <span className="text-secondary">{memoizedCreatedDate}</span>
            </div>
          </div>
          <div className="my-3">
            <Offcanvas
              data={commentsData}
              handleDeleteComment={handleDeleteComment}
            />
          </div>
          <div className="mt-4">
            <img src={blogData?.image} alt="" className="img-fluid blog_img" />
          </div>
          <div className="mt-4 width_700">
            <p className="fs-5 lh-lg">{blogData?.content}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
