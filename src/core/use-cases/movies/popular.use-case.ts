import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMoviesResponse } from "../../../infrastructure/interfaces/movie-db.response";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import type { Movie } from "../../entities/movie.entity";

interface Options {
    page?: number;
    limit?: number;
}

export const moviesPopularUseCase = async (fetcher: HttpAdapter, options?: Options):Promise<Movie[]> => {
    try {
        const popular = await fetcher.get<MovieDBMoviesResponse>('/popular', {
            params: {
                page: options?.page ?? 1
            }
        });
        
        // return nowPlaying.results.map(result => MovieMapper.fromMovieDBResultToEntity(result));
        return popular.results.map(MovieMapper.fromMovieDBResultToEntity);

    } catch (error) {
        console.log(error);
        throw new Error('Error fetching movies - PopularUseCases');
    }
}