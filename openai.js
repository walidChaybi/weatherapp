import { Configuration, OpenAIApi } from "openai"

const configuration = new configuration({
  apiKey: process.send.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default openai
