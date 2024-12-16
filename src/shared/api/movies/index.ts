import axios from "~/app/axios";
import { AxiosError } from "axios";
import { Movie, MovieDetailedInfo } from "~/shared/types";
import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";

type FetchMoviesResponse = Movie[]
type FetchMovieResponse = MovieDetailedInfo

export async function searchMoviesByTitle(title: string): Promise<FetchMoviesResponse> {
	const res = await axios.get<{ Search: Movie[] }>(`?s=${title}`);
	return res.data.Search
}

export async function searchMovieById(imdbID: string): Promise<FetchMovieResponse> {
	const res = await axios.get(`?i=${imdbID}`);
	return res.data
}

export const searchMoviesByTitleKey = 'searchMoviesByTitle'

export function useSearchMoviesByTitle(title: string, options?: Omit<UseQueryOptions<FetchMoviesResponse, AxiosError>, "queryFn" | "queryKey">) {
	return useSuspenseQuery({
		queryKey: [searchMoviesByTitleKey, title],
		queryFn: ({ queryKey }) => searchMoviesByTitle(queryKey[1] as unknown as string),
		...options,
	});
}

export function useSearchMovieById(id: string, options?: Omit<UseQueryOptions<FetchMovieResponse, AxiosError>, "queryFn" | "queryKey">) {
	return useSuspenseQuery({
		queryKey: [searchMoviesByTitleKey, id],
		queryFn: ({ queryKey }) => searchMovieById(queryKey[1] as unknown as string),
		...options,
	});
}