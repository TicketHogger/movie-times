import http from "k6/http";
import { sleep } from "k6";

export let options = {
    vus: 200,
    duration: "120s",
    rps: 200
  };

export default function() {
    http.get("http://localhost:3002/api/moviesbyid/1364707");
    sleep(1);
  };
