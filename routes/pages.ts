import * as Express from 'express';
import * as Request from "request-promise";
import * as _ from "underscore";
import { reject } from 'bluebird';
var Config = require("./../config.json");
import { IRestApiRequest, IOkved } from "./../models/rest-api";

class PagesRouter {
    private _router: Express.Router = Express.Router();
    public get Router(): Express.Router {
        return this._router;
    }

    constructor() {
        this._router.get("/", this.routeIndexPage);
        this._router.get("/about-us", this.routeAboutUsPage);
        this._router.get("/data", this.routeDataPage);
    }

    private routeIndexPage(req: Express.Request, res: Express.Response, next: Express.NextFunction): void {
        res.render("index", {
            title: "Express"
        });
    }

    private routeAboutUsPage(req: Express.Request, res: Express.Response, next: Express.NextFunction): void {
        res.render('about-us', { title: 'Express' });
    }

    private routeDataPage(req: Express.Request, res: Express.Response, next: Express.NextFunction): void {
        var okveds: IOkved[] = [];

        var getOkvedPromise: Promise<void> = new Promise((resolve, reject) => {
            if (req.query["okved"]) {
                Request.get(Config.wcfHost + "/okved/" + req.query["okved"], { json: true }).then((okvedRequestResult: IOkved) => {
                    okveds.push(okvedRequestResult);
                    resolve();
                }).catch(err => {
                    reject(err.stack);
                });
            }
            else if (req.query["query"]) {
                Request.get(Config.wcfHost + "/okved?title=" + encodeURIComponent(req.query["query"]), { json: true }).then((okvedRequestResult: IRestApiRequest) => {
                    okveds = okvedRequestResult.results;
                    resolve();
                }).catch(err => {
                    reject(err.stack);
                });
            }
            else {
                Request.get(Config.wcfHost + "/okved?limit=3000", { json: true }).then((okvedRequestResult: IRestApiRequest) => {
                    okveds = okvedRequestResult.results;
                    resolve();
                }).catch(err => {
                    reject(err.stack);
                });
            }
        });

        getOkvedPromise.then(() => {
            var regions: any[] = [], companies: any[] = [];
            var nextCompaniesUrl = "";

            var getRegionsPromise: Promise<void> = new Promise((resolve, reject) => {
                Request.get(Config.wcfHost + "/regions?limit=104", { json: true }).then((regionsRequestResult: IRestApiRequest) => {
                    regions = regionsRequestResult.results;
                    resolve();
                }).catch(err => {
                    reject(err.stack);
                });
            });

            var getCompaniesPromise: Promise<void> = new Promise((resolve, reject) => {
                var wcfUrl = Config.wcfHost + "/companies?limit=20&offset=0";
                if ((req.query["okved"] || req.query["query"]) && okveds.length > 0) {
                    wcfUrl += "&okved__in=" + _.map(okveds, x => x.id).join(",");
                }
                Request.get(wcfUrl, { json: true }).then((companiesRequestResult: IRestApiRequest) => {
                    companies = companiesRequestResult.results;
                    nextCompaniesUrl = companiesRequestResult.next ? decodeURIComponent(companiesRequestResult.next) : "";
                    resolve();
                }).catch(err => {
                    reject(err.stack);
                });
            });

            Promise.all([getOkvedPromise, getRegionsPromise, getCompaniesPromise]).then(() => {
                res.render('data', { pageData: { regions: regions, companies: companies, okveds: okveds, nextCompaniesUrl: nextCompaniesUrl } });
            }).catch(totalPromisesError => {
                res.status(500).send(totalPromisesError);
            });
        }).catch(err => {
            res.status(500).send(err);
        });
    }
}

export default new PagesRouter().Router;