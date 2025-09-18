import http from "k6/http";

export const options = {
    vus: 1000,
    duration: "60s",
    thresholds: {
        http_req_failed: ["rate<0.01"], // erros http devem ser menores que 1%
        http_req_duration: ["p(95)<200"], // 95% devem ser menor que 200ms
    },
};

export default function () {
    http.get("http://localhost:8080", "", {});
}
