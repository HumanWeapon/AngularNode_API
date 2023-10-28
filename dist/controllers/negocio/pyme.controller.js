"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPyme = exports.getAllPymes = void 0;
const pyme_models_1 = require("../../models/negocio/pyme-models");
const getAllPymes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pyme = yield pyme_models_1.Pyme.findAll();
    res.json(pyme);
});
exports.getAllPymes = getAllPymes;
const getPyme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pyme } = req.body;
    const pymes = yield pyme_models_1.Pyme.findOne({
        where: { pyme: pyme }
    });
    if (pymes) {
        res.json(pymes);
    }
    else {
        res.status(404).json({
            msg: `No existe la Pyme: ${pyme}`
        });
    }
});
exports.getPyme = getPyme;
