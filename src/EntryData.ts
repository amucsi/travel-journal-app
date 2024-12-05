/**
 * The type that defines the entries in the journal
 * Contains an ID, title, content, location, date, username, images and videos
 * Images and videos are encoded into Base64
 *
 * @export
 */
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
