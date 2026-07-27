export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
}

export interface UserProfile {
    uid: string;
    email: string | null;
}