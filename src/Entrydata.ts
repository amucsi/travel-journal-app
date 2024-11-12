export type EntryData = {
    id: Date;
    title: string;
    content: string;
    location: {
        lat: number;
        lng: number;
    } | null;
    date: string;
    username: string | null;
    images: string[];
    videos: string[];
}