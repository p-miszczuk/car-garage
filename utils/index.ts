import transcriptions from "../shares/transcriptions/index.json";
import _get from "lodash/get";

export const getDescription = (page: string) => {
  const lang = "en";
  const transcription = _get(transcriptions, `${page}.${lang}`, {});

  return transcription;
};
