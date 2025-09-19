import http from "k6/http";
import { sleep } from "k6";

/**
 * Configuração do teste de carga
 * - Stages: simula o aumento e redução gradual de usuários virtuais (VUs)
 * - Thresholds: define critérios de sucesso/falha do teste
 */
export const options = {
    stages: [
        { duration: "2m", target: 200 }, // aquecimento até 200 VUs
        { duration: "3m", target: 500 }, // mantém 500 VUs
        { duration: "2m", target: 1000 }, // rampa até 1000 VUs
        { duration: "3m", target: 1000 }, // carga máxima sustentada
        { duration: "2m", target: 0 }, // ramp down
    ],
    thresholds: {
        http_req_failed: ["rate<0.01"], // <1% falhas
        http_req_duration: [
            "avg<1000", // média < 1s
            "p(90)<1500", // 90% < 1.5s
            "p(95)<2000", // 95% < 2s
            "p(99)<4000", // 99% < 4s
        ],
        checks: ["rate>0.99"], // >99% dos checks passam
    },
};

// Endpoints que simulam navegação real
const BASE_URL = "http://localhost:8080"; // substitua pela URL real
const paths = [
    "/",
    "/web/portalone/noticias",
    "/web/portalone/eventos",
    "/web/portalone/perguntas-frequentes",
    "/web/portalone/institucional",
    "/web/portalone/agenda",
    "/web/portalone/galeria",
    "/web/portalone/editais",
    "/web/portalone/arquivos",
    "/web/portalone/fale-conosco",
    "/web/portalone/dialect-theme",
];

/**
 * Função principal executada por cada VU:
 * - Escolhe uma rota aleatória
 * - Realiza uma requisição HTTP GET
 * - Simula tempo de leitura/click (0–3s)
 */
export default function () {
    const path = paths[Math.floor(Math.random() * paths.length)];
    http.get(`${BASE_URL}${path}`);
    sleep(Math.random() * 3);
}
