
export interface MoviesResponse {
    page?:          number;
    results?:       ResultMovies[];
    total_pages?:   number;
    total_results?: number;
}

export interface ResultMovies {
    adult?:             boolean;
    backdrop_path?:     string;
    genre_ids?:         number[];
    id?:                number;
    original_language?: OriginalLanguage;
    original_title?:    string;
    overview?:          string;
    popularity?:        number;
    poster_path?:       string;
    release_date?:      Date;
    title?:             string;
    video?:             boolean;
    vote_average?:      number;
    vote_count?:        number;
}

export enum OriginalLanguage {
    En = "en",
    Fr = "fr",
    Te = "te",
}


export interface MoviesDetails {
    adult?: boolean;
    backdrop_path?: string;
    belongs_to_collection?: any;
    budget?: number;
    genres?: Genre[];
    homepage?: string;
    id?: number;
    imdb_id?: string;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: Productioncompany[];
    production_countries?: Productioncountry[];
    release_date?: string;
    revenue?: number;
    runtime?: number;
    spoken_languages?: Spokenlanguage[];
    status?: string;
    tagline?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
    cast?:Cast[];
  }
  
  interface Spokenlanguage {
    iso_639_1: string;
    name: string;
  }
  
  interface Productioncountry {
    iso_3166_1: string;
    name: string;
  }
  
  interface Productioncompany {
    id: number;
    logo_path?: string;
    name: string;
    origin_country: string;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  
  export interface RespuestaCredits {
    id: number;
    cast: Cast[];
    crew: Crew[];
  }
  
  export interface Crew {
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    name: string;
    profile_path?: string;
  }
  
  export interface Cast {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path?: string;
  }