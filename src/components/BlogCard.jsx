import React, { Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from './Loading';
// import { BsBookmarkPlus } from 'react-icons/bs';
import { createdTime, truncate } from '../utils/functions';

const BlogCard = ({ data }) => {
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
      <Suspense fallback={<Loading />}>
        <div className="col-sm my-4 shadow-4">
          <div className="card card_img">
            <img
              src={data?.image}
              className="card-img-top thumbnail_img"
              alt="..."
            />
            <div className="card-body">
              {/* <p className="text-secondary text-center">
                {memoizedCreatedDate}
              </p> */}
              <div className="d-flex gap-3 align-items-center my-2">
                <img
                  src={data?.author?.avatar}
                  className="rounded-circle blogcard_avatar"
                />
                <div className="d-flex flex-column">
                  <div className="fw-6">{data?.author?.fullName}</div>
                  <div className="text-secondary">{memoizedCreatedDate}</div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <h3>
                  <Link
                    to={`/blog/${data?._id}`}
                    className="fs-4  text-dark text_decoration_none"
                    style={{ fontWeight: '900' }}
                  >
                    {data?.title}
                  </Link>
                </h3>
                {/* <span className="px-5">
                  <BsBookmarkPlus />
                </span> */}
              </div>
              <div className="card-text">
                <Link
                  to={`/blog/${data?._id}`}
                  className="text_decoration_none"
                >
                  <p className="text-dark">{truncateContent}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="d-flex my-5 gap-5"> */}
        {/* <div className="d-flex flex-column">
          <div className="container my-5">
            <div className="row">
              <div className="col-8">
                <div className="d-flex gap-3 align-items-center my-2">
                  <img
                    src={data?.author?.avatar}
                    className="rounded-circle blogcard_avatar"
                  />
                  <div className="fw-6">{data?.author?.fullName}</div>
                  <div className="text-secondary">{memoizedCreatedDate}</div>
                </div>
                <div className="d-flex align-items-center">
                  <Link
                    to={`/blog/${data?._id}`}
                    className="fs-4  text-dark text_decoration_none"
                    style={{ fontWeight: '900' }}
                  >
                    {data?.title}
                  </Link>
                  <span className="px-5">
                    <BsBookmarkPlus />
                  </span>
                </div>

                <Link
                  to={`/blog/${data?._id}`}
                  className="text_decoration_none"
                >
                  <div className="text-dark">{truncateContent}</div>
                </Link>
              </div>
            </div>
            <div className="col-4 my-4">
              <Link to={`/blog/${data?._id}`} className="text_decoration_none">
                <img src={data?.image} alt="" className="thumbnail_img" />
              </Link>
            </div>
          </div>
        </div> */}

        {/* </div> */}
      </Suspense>
    </>
  );
};

export default BlogCard;
