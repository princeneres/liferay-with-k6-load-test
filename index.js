import http from "k6/http";
import { sleep } from "k6";

// Configuração do teste de carga
export const options = {
    stages: [
        { duration: "2m", target: 200 }, // aquecimento: sobe até 200 VUs
        { duration: "3m", target: 500 }, // mantém 500 VUs por 3 min
        { duration: "2m", target: 1000 }, // rampa até 1000 VUs
        { duration: "3m", target: 1000 }, // carga máxima sustentada
        { duration: "2m", target: 0 }, // rampa para desligar
    ],
    thresholds: {
        http_req_failed: ["rate<0.01"], // menos de 1% de falhas
        http_req_duration: [
            "avg<1000", // tempo médio < 1s
            "p(90)<1500", // 90% das requisições < 1.5s
            "p(95)<2000", // 95% < 2s
            "p(99)<4000", // 99% < 4s (tolera picos)
        ],
        checks: ["rate>0.99"], // pelo menos 99% das verificações passaram
    },
};

// Caminhos a serem testados (simula navegação real)
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

const BASE_URL = "http://localhost:8080";

export default function () {
    // Seleciona uma rota aleatória
    const path = paths[Math.floor(Math.random() * paths.length)];

    // Faz a requisição HTTP simulando o acesso do usuário
    http.get(`${BASE_URL}${path}`);

    // Pausa aleatória (0–3s) para simular tempo de leitura/click do usuário
    sleep(Math.random() * 3);
}
