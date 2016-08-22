ServiceConfiguration.configurations.remove({service: 'google'})

ServiceConfiguration.configurations.upsert({ service: "google" }, {
    $set: {
        clientId: "183454396381-bjr9g6lbadglqsm59jst6r24qtvmop0f.apps.googleusercontent.com",
        secret: "0rULpgISM9ynHfsGpTm5qhPy"
    }
})