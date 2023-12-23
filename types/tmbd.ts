export interface DataTMBD {
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
