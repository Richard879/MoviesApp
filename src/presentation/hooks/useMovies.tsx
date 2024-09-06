import React, { useEffect, useState } from 'react'
import { Movie } from '../../core/entities/movie.entity'
import * as UseCases from '../../core/use-cases'
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';

let popularPageNumber = 1;

export const useMovies = () => {
  
    const [isLoading, setIsLoading] = useState(true);
    const [nowPlaying, setNowPlaying] =  useState<Movie[]>([]);
    const [popular, setPopular] =  useState<Movie[]>([]);
    const [topRated, setTopRated] =  useState<Movie[]>([]);
    const [upcoming, setUpComing] =  useState<Movie[]>([]);
    
    useEffect(() => {
        initialLoad();
    }, [])
    
    const initialLoad = async() => {
        const  nowPlayingPromise = await UseCases.moviesNowPlayingUseCase(movieDBFetcher);
        // console.log(nowPlayingMovies[0]);
        const  popularPromise = await UseCases.moviesPopularUseCase(movieDBFetcher);
        const  topRatedPromise = await UseCases.moviesTopRatedUseCase(movieDBFetcher);
        const  upComingPromise = await UseCases.moviesUpComingUseCase(movieDBFetcher);

        const [
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upcomingMovies
        ] =  await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upComingPromise
        ]);

        setNowPlaying(nowPlayingMovies);
        setPopular(popularMovies);
        setTopRated(topRatedMovies);
        setUpComing(upcomingMovies);

        setIsLoading(false);

        // console.log(nowPlayingMovies);
    }

    return {
        isLoading,
        nowPlaying,
        popular,
        topRated,
        upcoming,

        //Methods
        popularNextPage: async() => {
            popularPageNumber ++;
            const popularMovies = await UseCases.moviesPopularUseCase( movieDBFetcher, {
                page: popularPageNumber
            } );

            setPopular(prev => [...popular, ...popularMovies]);
        }
    }
}