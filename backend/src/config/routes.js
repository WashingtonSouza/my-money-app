const express = require('express'),
    auth = require('./auth')

module.exports = function(server) {
    // Routers protected by JWT Token
    const protectedApi = express.Router()
    server.use('/api', protectedApi)
    protectedApi.use(auth)

    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(protectedApi, '/billingCycles')

    // Open Routers
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
}