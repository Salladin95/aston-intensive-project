import React from "react";

export type SvgProps = React.SVGAttributes<SVGElement>

export type PropsWithClassName = {
  className?: string
}

export type PropsWithChildren = {
  children?: React.ReactNode
}

export interface User {
	username: string
	password: string
}

export interface Movie {
  Title: string
  Year: string
  Awards: string
  Poster: string
  Type: string
  imdbID: string
}

export interface MovieDetailedInfo {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export interface Rating {
  Source: string
  Value: string
}
