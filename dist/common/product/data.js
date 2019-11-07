"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products = [
    { id: 'p700', point: 700 },
    { id: 'p4000', point: 4000 },
    { id: 'p16000', point: 16000 },
    { id: 'p40000', point: 40000 },
    { id: 'p80000', point: 80000 },
];
exports.getPointById = (id) => {
    let product = products.find(item => item.id === id);
    if (product)
        return product.point;
    else
        500;
};
//# sourceMappingURL=data.js.map