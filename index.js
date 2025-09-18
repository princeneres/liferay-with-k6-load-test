import http from "k6/http";

export const options = {
    vus: 1000,
    duration: "60s",
    thresholds: {
        http_req_failed: ["rate<0.01"], // erros http devem ser menores que 1%
        http_req_duration: ["p(90)<2000"], // 90% devem ser menor que 2s
    },
};

export default function () {
    http.get("http://localhost:8080");
}
