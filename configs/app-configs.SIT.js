export default {
    hostingPort: 5000,
    apiSettings: {
        enabledApi: true,
        apiUrl: "http://10.2.189.51:6310",
        authUrl: "http://10.2.189.51:6313",
        client: {
            id: "game-server",
            secret: "gameserver@20luminet&",
        },
        useAuthenticate: true,
        requestTimeout: 10000,
        placeBetTimeout: 4500,
        hitJackpotTimeout: 200000,
        enabledApiLogs: true,
    },
    mainServerApiSettings: {
        url: "http://10.2.189.51:7778/sit/main/api",
        auth: {
            url: "http://10.2.189.51:6313",
            id: "game-services",
            secret: "gameservices@20luminet&",
        },
        requestTimeout: 10000,
        placeBetTimeout: 4500,
        useAuthenticate: true,
    },
    socketOptions: {
        pingInterval: 60 * 1000,
        pingTimeout: 60 * 1000,
        transports: ["websocket"],
        allowUpgrades: false,
    },
    enabledLogs: true,
    database: {
        url: "mongodb://lmn_backend:LmnBackend%40517@10.99.99.187:37301/?replicaSet=SabaL2SIT",
        options: {
            dbName: "minigame",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    sentry: {
        sentryUrl: "http://405685c1446540f9b105579e1aefe04e@10.99.99.187:800/205",
        logIdentifier: "blackjack",
        env: "SIT",
    },
    authenticateSettings: {
        audiences: ["api", "admin-api"],
    },
    adminSecretKey: "asWDEerfOIdgsdqRTFabvmgh",
    enableCorsWs: true,
    corsUrls: [
        "https://sit.sabagame.net",
        "http://sit.sabagame.net",
        "http://sit-admg.sabagame.net",
        "https://sit-admg.sabagame.net",
        "http://sit-adm.sabagame.net",
        "https://sit-adm.sabagame.net",
    ],
    freeSpinLiveSeconds: 86400, // 1 day
    bonusLiveSeconds: 128,
};
