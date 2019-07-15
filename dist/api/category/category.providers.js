"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_schema_1 = require("./category.schema");
exports.categoryProviders = [
    {
        provide: 'category',
        useFactory: (connection) => connection.model('category', category_schema_1.CategorySchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=category.providers.js.map