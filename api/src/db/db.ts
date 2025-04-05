import dotenv from "dotenv";
dotenv.config()

const username = encodeURIComponent(process.env.mongoUsername as string);
const password = encodeURIComponent(process.env.mongoPassword as string);


export const mongoURI = `mongodb+srv://${username}:${password}@cluster0.vke6xg0.mongodb.net/advnode?retryWrites=true&w=majority&appName=Cluster0`;



export const cookieKey = "123123123";



