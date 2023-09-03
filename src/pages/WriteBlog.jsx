import React, { useEffect, useState } from 'react';
import { FomInputs, SelectInput } from '../components/FomInputs';
import { blogFormInput, category } from '../assets/data';
import { BsPlusCircle } from 'react-icons/bs';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';

const WriteBlog = () => {
  const location = useLocation();
  // console.log('location', location);
  const postData = location?.state?.postData;
  // console.log('postData', postData);

  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    image: null,
  });
  const [editMode, setEditMode] = useState(false);
  console.log('editMode', editMode);

  useEffect(() => {
    if (postData) {
      setEditMode(true);
      setBlogData(postData);
    }
  }, [postData]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setBlogData({ ...blogData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', blogData.title);
      formData.append('content', blogData.content);
      formData.append('image', blogData.image);

      if (editMode === true) {
        await axios
          .put(
            `https://anj-blog-app-server.onrender.com/api/v1/post/update/${postData?._id}`,
            formData,
            {
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            }
          )
          .then((res) => {
            console.log('res', res);
            toast.success(res.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            navigate('/my-posts');
          })
          .catch((err) => {
            console.log('err', err);
            toast.error(err.response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
      } else {
        await axios
          .post('https://anj-blog-app-server.onrender.com/api/v1/post/create', formData, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          })
          .then((res) => {
            console.log('res', res);
            toast.success(res.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            navigate('/my-posts');
          })
          .catch((err) => {
            console.log('err', err);
            toast.error(err.response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
      }
    } catch (error) {
      console.log('error', error);
      toast.error(error.response?.data.message || 'An error occurred', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <>
      <ToastContainer />

      <div className="d-flex justify-content-center align-items-center width_full">
        <form
          className="d-flex justify-content-center flex-column"
          onSubmit={handleSubmit}
        >
          {blogData?.image && (
            <img
              className="blog_img_input rounded-3 img-fluid mt-2"
              src={
                blogData?.image instanceof File
                  ? URL.createObjectURL(blogData?.image)
                  : blogData?.image || ''
              }
              alt="img"
            />
          )}
          {/* {blogData?.image && (
            <img
              className="blog_img_input rounded-3 img-fluid mt-2"
              src={URL.createObjectURL(blogData?.image)}
              alt="img"
            />
          )} */}
          <div className="my-3 curser">
            {/* <label htmlFor="">
              <BsPlusCircle />
            </label>
            <input
              type="file"
              id="fileInput"
              name="image"
              className="visually-hidden"
              // onChange={handleFileChange}
              // style={{ display: 'none' }}
            /> */}
          </div>

          {blogFormInput?.map((input, index) => (
            <FomInputs
              key={index}
              {...input}
              value={input?.name === 'image' ? '' : blogData[input?.name]}
              onChange={
                input?.name === 'image' ? handleFileChange : handleChange
              }
            />
          ))}
          {/* <div className="my-3">
            <SelectInput data={category} onchange={handleChange} />
          </div> */}
          <div className="my-3">
            <textarea
              placeholder="Tell your story..."
              type="text"
              className="border border-0"
              name="content"
              onChange={handleChange}
              value={blogData.content}
            ></textarea>
          </div>
          <button
            type="submit"
            className={`col-12 curser  text-light border border-0 p-2 rounded-sm rounded-1 my-3 auth_button`}
          >
            Publish
          </button>
        </form>
      </div>
    </>
  );
};

export default WriteBlog;
