import "https://deno.land/x/dotenv/load.ts";

const defaultPort = 8080;
const defaultHolidaysAPI = "https://holidays.dummy";

export default {
  server: {
    port: parseInt(Deno.env.get("SERVER_PORT") as string, 10) || defaultPort,
  },
  external: {
    holidaysAPI: Deno.env.get("EXTERNAL_HOLIDAYS_API") || defaultHolidaysAPI,
  },
};