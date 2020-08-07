module.exports = [
  {
    "name": "default",
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "entities": [
      "./dist/modules/**/infra/typeorm/entities/*.js"
    ],
    "migrations": [
      "./dist/shared/infra/typeorm/migrations/*.js"
    ],
    "cli": {
      "migrationsDir": "./dist/shared/infra/typeorm/migrations"
    }
  },
  {
    "name": "mongo",
    "type": "mongodb",
    "url": "mongodb+srv://sadeploy:wG9N2hxXfEMVPxv1@cluster0-hiufg.mongodb.net/mongogobarber",
    "useNewUrlParser": true,
    "synchronize": true,
    "logging": true,
    "useUnifiedTopology": true,
    "entities": [
      "./dist/modules/**/infra/typeorm/schemas/*.js"
    ]
  }
]
