
import { AxiosRequestConfig } from "axios";
import ButtonIcon from "components/ButtonIcon";
import { useForm } from "react-hook-form";
import { Review } from "types/review";
import { requestBackend } from "util/requests";
import './styles.css';

type Props = {
    movieId: string;
    onInsertReview: ( review: Review) => void;
};

type FormData = {
    movieId: number;
    text: string;
};


const ReviewForm = ({movieId, onInsertReview}: Props) => {


const {
    register,
    handleSubmit,
    formState: {errors},
    setValue
} = useForm<FormData>();

const onSubmit = ( formData: FormData) => {


formData.movieId = parseInt(movieId);

console.log(formData);

const config: AxiosRequestConfig = {

    method:'POST',
    url:'/reviews',
    data: formData,
    withCredentials:true,
};

requestBackend(config)
.then(response => {
    setValue('text','');
    onInsertReview(response.data);
    console.log("SUCESSO AO SALVAR", response);
})
.catch(error => {
    console.log("ERRO AO SALVAR", error);
});


};


return (

    <div className="card-container base-card">
    <div className="box-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("text", {
            required: "Campo não pode estar vazio",
          })}
          className={`form-control bg-white ${
            errors.text ? "is-invalid" : ""
          }`}
          type="text"
          placeholder="Deixe sua avaliação aqui "
          name="text"
        />
        <div className="feedback d-block">{errors.text?.message}</div>
        <div className="bbb">
          <ButtonIcon text="salvar avaliação" />
        </div>
      </form>
    </div>
  </div>


);
};
        

export default ReviewForm;