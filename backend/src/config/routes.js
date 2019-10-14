const express = require('express')

module.exports = function(server) {
    //Define base URL for all routers
    const router = express.Router()
    server.use('/api', router)

    //Billing cycle routers
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(router, '/billingCycles')
}