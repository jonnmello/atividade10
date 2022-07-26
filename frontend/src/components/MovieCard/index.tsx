import { Movie } from 'types/movie';
import './styles.css';

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <div className="base-card  card-container">
      <div className="cardd-containerr-img">
        <img src={movie.imgUrl} alt={movie.title}></img>
      </div>

      <div className="card-container-text">
       
        <h1>{movie.title}</h1>
        <h2>{movie.year}</h2>
        <p>{movie.subTitle}</p>
      </div>
    </div>
  );
};

export default MovieCard;
