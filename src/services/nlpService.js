import { string } from "wink-nlp-utils";

export const nlpService = {
  processQuery: (query) => {
    console.log("Processing query:", query);
    const tokens = string.tokenize(query);
    const stopwords = new Set(["the", "is", "at", "which", "on"]);
    const filteredTokens = tokens.filter(
      (token) => !stopwords.has(token.toLowerCase())
    );
    return filteredTokens.join(" ");
  },
};

console.log(nlpService);
