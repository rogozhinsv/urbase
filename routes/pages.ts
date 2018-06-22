import * as Express from 'express';
import * as Request from "request-promise";
import { reject } from 'bluebird';
var Config = require("./../config.json");
import { IRestApiRequest } from "./../models/rest-api";

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
        var regions: any[] = [], companies: any[] = [];

        var getRegionsPromise: Promise<void> = new Promise((resolve, reject) => {
            Request.get(Config.wcfHost + "/regions?limit=104", { json: true}).then((regionsRequestResult: IRestApiRequest)  => {
                regions = regionsRequestResult.results;
                resolve();
            }).catch(err => {
                reject(err.error);
            });
        });

        var getCompaniesPromise: Promise<void> = new Promise((resolve, reject) => {
            var wcfUrl = Config.wcfHost + "/companies?limit=20&offset=0";
            if (req.query["okved"]) {
                wcfUrl += "&okved__in=" + req.query["okved"];
            }
            Request.get(wcfUrl, { json: true}).then((companiesRequestResult: IRestApiRequest)  => {
                companies = companiesRequestResult.results;
                resolve();
            }).catch(err => {
                reject(err.error);
            });
        });
        
        Promise.all([getRegionsPromise, getCompaniesPromise]).then(() => {
            if (req.query["okved"]) {
                res.render('data', { pageData: {regions: regions, companies : companies}});
            }
            else {
                res.render('data', { pageData: {regions: regions, companies : companies}});
            }
        }).catch(totalPromisesError => {
            res.status(500).send(totalPromisesError);   
        });   
    }
}

export default new PagesRouter().Router;