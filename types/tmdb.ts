export interface DataTMDB {
    dates: Dates
    page: number
    results: Result[]
    total_pages: number
    total_results: number
}

export interface Dates {
    maximum: Date
    minimum: Date
}

export interface Result {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: OriginalLanguage
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: Date
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export enum OriginalLanguage {
    En = "en",
    Ja = "ja",
    No = "no",
}

export interface KeywordsData {
    id: number
    keywords: Keyword[]
}

export interface Keyword {
    id: number
    name: string
}

export interface SingleDataTMDB {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: BelongsToCollection
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: Date
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface BelongsToCollection {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
}

export interface Genre {
    id: number
    name: string
}

export interface ProductionCompany {
    id: number
    logo_path: null | string
    name: string
    origin_country: string
}

export interface ProductionCountry {
    iso_3166_1: string
    name: string
}

export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}
