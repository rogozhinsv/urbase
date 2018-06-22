import * as Express from 'express';

class NotFoundPageRouter {
    public routePage(req: Express.Request, res: Express.Response, next: Express.NextFunction): void {
        res.render("404");
    }
}

export default new NotFoundPageRouter().routePage;
