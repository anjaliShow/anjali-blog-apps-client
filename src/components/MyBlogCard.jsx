import React, { useMemo } from 'react';
import { createdTime, truncate } from '../utils/functions';
import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

const MyBlogCard = ({ data, handleDelete }) => {
  const memoizedCreatedDate = useMemo(
    () => createdTime(data?.createdAt),
    [data?.createdAt]
  );

  const truncateContent = useMemo(
    () => truncate(data?.content, 200),
    [data?.content]
  );

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-3">
            <Link to={`/blog/${data?._id}`}>
              <img
                src={data?.image}
                alt={data?.title}
                className="img-thumbnail thumbnail_img"
              />
            </Link>
          </div>
          <div className="col-sm-6">
            <div className="text-secondary">{memoizedCreatedDate}</div>
            <div className="">
              <Link
                to={`/blog/${data?._id}`}
                className="fs-3 fw-semibold text-dark text_decoration_none"
              >
                {data?.title}
              </Link>
            </div>
            <div className="">{truncateContent}</div>
          </div>
          <div className="col-sm-3 d-flex">
            <div>
              <Link
                to="/write-blog"
                state={{ postData: data }}
                className="fs-5 text-primary curser text-decoration-none"
              >
                <BiEditAlt />
              </Link>
            </div>
            <div
              className="fs-5 text-danger curser"
              onClick={() => handleDelete(data?._id)}
            >
              <MdDeleteOutline />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBlogCard;
