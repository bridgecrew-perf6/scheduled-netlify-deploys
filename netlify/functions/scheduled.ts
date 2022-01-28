import { env } from "process";

import { schedule, Handler } from "@netlify/functions";

import axios from "axios";

const func: Handler = async () => {
  const buildUrl = env.BUILD_HOOK_URL;

  if (buildUrl === undefined) {
    console.error("Build hook URL is not configured");

    return {
      statusCode: 500,
    };
  }

  await axios.post(buildUrl);

  return {
    statusCode: 200,
  };
};

export const handler = schedule("@hourly", func);
