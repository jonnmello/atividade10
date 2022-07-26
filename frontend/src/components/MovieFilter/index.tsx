
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Genre } from 'types/genre';
import { requestBackend } from 'util/requests';

import './styles.css';

export type MovieFilterData = {
    genre: Genre | null;
  };

type Props = {
    onSubmitFilter: (data: MovieFilterData) => void;
  };

const MovieFilter = ({onSubmitFilter}:Props) => {
    const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

    const { handleSubmit, setValue, getValues, control } =
    useForm<MovieFilterData>();

    const onSubmit = (formData: MovieFilterData) => {
        onSubmitFilter(formData);
      };

      const handleChangeCategory = (value: Genre) => {
        setValue('genre', value);
    
        const obj: MovieFilterData = {
          genre: getValues('genre'),
        };
    
        onSubmitFilter(obj);
      };
    
         
      useEffect(() => {
        requestBackend({ withCredentials: true,url: '/genres' }).then((response) => {        
          setSelectGenres(response.data);
        });
      }, []);

  return (
    <div className="base-card  product-filter-container">
      <form  onSubmit={handleSubmit(onSubmit)} className="product-filter-form">
    
      

        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
          <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectGenres}
                  isClearable
                  placeholder="Categoria"
                  classNamePrefix="product-filter-select"
                  onChange={(value) => handleChangeCategory(value as Genre)}
                  getOptionLabel={(category: Genre) => category.name}
                  getOptionValue={(category: Genre) => String(category.id)}
                />
              )}
            />
          </div>
         
          </div>
      </form>
    </div>
  );
};

export default MovieFilter;
