import star from "assets/images/star.svg";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Review } from "types/review";
import { requestBackend } from "util/requests";

import "./styles.css";

type Props = {
  movieId: number;
};
const ListReview = ({ movieId }: Props) => {
  const [review, setReview] = useState<Review[]>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setReview(response.data);
    });
  }, [movieId]);
  return (
    <>
      {review &&
        review.map((item) => (
          <div className="list-reviews-content" key={item.id}>
            <div className="list-reviews-user" >
              {" "}
              <img src={star} alt="star" /> <h1>{item.user.name}</h1>{" "}
            </div>
            <p>
              {item.text}
            </p>
          </div>
        ))}
    </>
  );
};

export default ListReview;
