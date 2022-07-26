import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { requestBackend } from "util/requests";
import "./styles.css";

import { toast } from "react-toastify";
import { hasAnyRoles } from "util/auth";
import { Movie } from "types/movie";
import ButtonIcon from "components/ButtonIcon";
import ListReview from "components/ListReview";

type UrlParams = {
  movieId: string;
};

type FormData = {
  review: string;
};
const MovieDatails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { movieId } = useParams<UrlParams>();
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: "GET",
      url: `/movies/${movieId}`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  const onSubmit = (formData: FormData) => {
    const params: AxiosRequestConfig = {
      method: "POST",
      url: `/reviews`,
      withCredentials: true,
      data: {
        text: formData.review,
        movieId: movie?.id,
      },
    };

    requestBackend(params).then((response) => {
  
        toast.success('Avaliação realizada!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          });
         
      
    }).finally(()=>{
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      
    });
  };

  return (
    <div className="container  movie-datail-conteiner">
      <div className=" base-card movie-datail-content">
        <div className=" movie-datail-img">
          <img src={movie?.imgUrl} alt={movie?.title} />
        </div>
        <div className="movie-datail-container-text">
          <h1>{movie?.title}</h1>
          <h2>{movie?.year}</h2>
          <p className="movie-datail-container-text-subTitle">{movie?.subTitle}</p>
          <p className="movie-datail-container-text-synopsis">{movie?.synopsis}</p>
        </div>
      </div>

      {hasAnyRoles(["ROLE_MEMBER"]) && (
        <div className="movie-datail-review base-card">
          <div className="mb-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("review", {
                  required: "Campo obrigatório",
                })}
                type="text"
                className={`form-control base-input ${
                  errors.review ? "is-invalid" : ""
                }`}
                placeholder="Deixe sua avaliação"
                name="review"
              />
              <div className="invalid-feedback d-block">
                {errors.review?.message}
              </div>

              <div className="review-submit">
                <ButtonIcon text="SALVAR AVALIAÇÃO" />
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="movie-datail-list-reviews base-card ">
        {movie && <ListReview movieId={movie?.id}></ListReview>}
      </div>
    </div>
  );
};

export default MovieDatails;
