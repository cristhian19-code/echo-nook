export interface Post {
    title: string,
    message: string,
    tags: string,
    selectedFile: string;
    creator: string | Object;
}

export interface User {
    email: string,
    firstname: string,
    lastname: string,
}
