export type SimPort = {
  port: number;
  service: string;
  state: "open" | "closed" | "filtered";
  banner?: string;
};

// Fixed, fictional sandbox host — intentionally not a real network target.
// PortRecon is a real TCP connect scanner; running it against arbitrary
// visitor-supplied hosts from a public page is an abuse/legal liability, so
// this demo replays realistic, canned output instead of opening sockets.
export const SIM_HOST = "sandbox.demo.lab";

export const SIM_PORTS: SimPort[] = [
  { port: 22, service: "ssh", state: "open", banner: "SSH-2.0-OpenSSH_9.6" },
  { port: 25, service: "smtp", state: "filtered" },
  { port: 80, service: "http", state: "open", banner: "nginx/1.25.3" },
  { port: 139, service: "netbios-ssn", state: "closed" },
  { port: 443, service: "https", state: "open", banner: "nginx/1.25.3 (TLS 1.3)" },
  { port: 3306, service: "mysql", state: "filtered" },
  { port: 3389, service: "ms-wbt-server", state: "closed" },
  { port: 8080, service: "http-proxy", state: "open", banner: "Werkzeug/3.0 Python/3.12" },
];
