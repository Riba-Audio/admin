const keywords = ["Riba Audio", "Audiobooks"];

let description = "";
let title = "Riba Audiobooks Admin | Where stories come to life, one word at a time.";
let url = `${process.env.NODE_ENV === "development" ? "http://localhost:3000": "https://ribaaudio.com"}`; 
let siteName = "The Social Worker Mike";

const baseMetadata = {
    keywords, description, title, url, siteName
};

export default baseMetadata; 