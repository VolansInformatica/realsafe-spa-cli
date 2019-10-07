export const items = {

    /**
     * Configurações do ambiente de desenvolvimento
     */

    "dev": {
        "company": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "listCompanies": "/api/v1/company/listCompanies",
                "findCompanyById": "/api/v1/company/findCompanyById",
                "create": "/api/v1/company/create",
                "update": "/api/v1/company/update",
                "remove": "/api/v1/company/remove"
            }
        },
        "unit": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "listUnitsByCompanyId": "/api/v1/unit/listUnitsByCompanyId"
            }
        },
        "user": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "login": "/api/v1/user/login",
                "listUserGroups": "/api/v1/user/listUserGroups",
                "listUserCompanies": "/api/v1/user/listUserCompanies",
                "listUserUnits": "/api/v1/user/listUserUnits",
            }
        },
        "localGroupOwner": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "getLocalGroupOwner": "/api/v1/group-owner/getLocalGroupOwner",
            }
        },
        "localTerminal": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "getLocalTerminal": "/api/v1/terminal/getLocalTerminal",
            }
        },
        "terminal": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "getTerminalStatus": "/api/v1/terminal/getTerminalStatus",
                "openTerminal": "/api/v1/terminal/openTerminal",
                "getOpeningDetail": "/api/v1/terminal/getOpeningDetail",
                "closeTerminal": "/api/v1/terminal/closeTerminal",
                "getClosingDetail": "/api/v1/terminal/getClosingDetail",
            }
        },
        "functionality": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "listFunctionalitiesByRoleId": "/api/v1/functionality/listFunctionalitiesByRoleId"
            }
        },
        "transactionLog": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "listTransactionsByTerminal": "/api/v1/transaction-log/listTransactionsByTerminal",
                "listTransactionsByGroupOwner": "/api/v1/transaction-log/listTransactionsByGroupOwner",
                "listDepositDetails": "/api/v1/transaction-log/listDepositDetails"
            }
        },
        "deposit": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "deposit": "/api/v1/deposit/deposit",
            }
        },
        "depository": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "check": "/api/v1/depository/check",
                "getStatus": "/api/v1/depository/getStatus",
                "startDeposit": "/api/v1/depository/startDeposit",
                "deposit": "/api/v1/depository/deposit",
                "endDeposit": "/api/v1/depository/endDeposit",
                "reset": "/api/v1/depository/reset"
            }
        },
        "printer": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "check": "/api/v1/printer/check",
                "getStatus": "/api/v1/printer/getStatus",
                "print": "/api/v1/printer/print",
                "reset": "/api/v1/printer/reset"
            }
        },
        "health": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "check": "/api/v1/health/check"
            }
        }
    },

    /**
     * Configurações do ambiente de homologação
     */

    "hom": {
        "company": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "listCompanies": "/api/v1/company/listCompanies",
                "findCompanyById": "/api/v1/company/findCompanyById",
                "create": "/api/v1/company/create",
                "update": "/api/v1/company/update",
                "remove": "/api/v1/company/remove"
            }
        },
        "unit": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "listUnitsByCompanyId": "/api/v1/unit/listUnitsByCompanyId"
            }
        },
        "user": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "login": "/api/v1/user/login"
            }
        },
        "localGroupOwner": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "getLocalGroupOwner": "/api/v1/group-owner/getLocalGroupOwner",
            }
        },
        "localTerminal": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "getLocalTerminal": "/api/v1/terminal/getLocalTerminal",
            }
        },
        "terminal": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "getTerminalStatus": "/api/v1/terminal/getTerminalStatus",
                "openTerminal": "/api/v1/terminal/openTerminal",
                "getOpeningDetail": "/api/v1/terminal/getOpeningDetail",
                "closeTerminal": "/api/v1/terminal/closeTerminal",
                "getClosingDetail": "/api/v1/terminal/getClosingDetail",
            }
        },
        "functionality": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "listFunctionalitiesByRoleId": "/api/v1/functionality/listFunctionalitiesByRoleId"
            }
        },
        "transactionLog": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "listTransactionsByTerminal": "/api/v1/transaction-log/listTransactionsByTerminal",
                "listTransactionsByGroupOwner": "/api/v1/transaction-log/listTransactionsByGroupOwner",
                "listDepositDetails": "/api/v1/transaction-log/listDepositDetails"
            }
        },
        "deposit": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "deposit": "/api/v1/deposit/deposit",
            }
        },
        "depository": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "check": "/api/v1/depository/check",
                "getStatus": "/api/v1/depository/getStatus",
                "start": "/api/v1/depository/start",
                "count": "/api/v1/depository/count",
                "deposit": "/api/v1/depository/deposit",
                "reset": "/api/v1/depository/reset"
            }
        },
        "printer": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "check": "/api/v1/printer/check",
                "getStatus": "/api/v1/printer/getStatus",
                "print": "/api/v1/printer/print",
                "reset": "/api/v1/printer/reset"
            }
        },
        "health": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "check": "/api/v1/health/check"
            }
        }
    },

    /**
     * Configurações do ambiente de produção
     */

    "prod": {
        "company": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "listCompanies": "/api/v1/company/listCompanies",
                "findCompanyById": "/api/v1/company/findCompanyById",
                "create": "/api/v1/company/create",
                "update": "/api/v1/company/update",
                "remove": "/api/v1/company/remove"
            }
        },
        "unit": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "listUnitsByCompanyId": "/api/v1/unit/listUnitsByCompanyId"
            }
        },
        "user": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "login": "/api/v1/user/login"
            }
        },
        "localGroupOwner": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "getLocalGroupOwner": "/api/v1/group-owner/getLocalGroupOwner",
            }
        },
        "localTerminal": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "getLocalTerminal": "/api/v1/terminal/getLocalTerminal",
            }
        },
        "terminal": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "getTerminalStatus": "/api/v1/terminal/getTerminalStatus",
                "openTerminal": "/api/v1/terminal/openTerminal",
                "getOpeningDetail": "/api/v1/terminal/getOpeningDetail",
                "closeTerminal": "/api/v1/terminal/closeTerminal",
                "getClosingDetail": "/api/v1/terminal/getClosingDetail",
            }
        },
        "functionality": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "listFunctionalitiesByRoleId": "/api/v1/functionality/listFunctionalitiesByRoleId"
            }
        },
        "transactionLog": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "listTransactionsByTerminal": "/api/v1/transaction-log/listTransactionsByTerminal",
                "listTransactionsByGroupOwner": "/api/v1/transaction-log/listTransactionsByGroupOwner",
                "listDepositDetails": "/api/v1/transaction-log/listDepositDetails"
            }
        },
        "deposit": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "deposit": "/api/v1/deposit/deposit",
            }
        },
        "depository": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "check": "/api/v1/depository/check",
                "getStatus": "/api/v1/depository/getStatus",
                "start": "/api/v1/depository/start",
                "count": "/api/v1/depository/count",
                "deposit": "/api/v1/depository/deposit",
                "reset": "/api/v1/depository/reset"
            }
        },
        "printer": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "check": "/api/v1/printer/check",
                "getStatus": "/api/v1/printer/getStatus",
                "print": "/api/v1/printer/print",
                "reset": "/api/v1/printer/reset"
            }
        },
        "health": {
            "endpoint": "http://localhost:8080/realsafe",
            "resources": {
                "check": "/api/v1/health/check"
            }
        }
    }

};