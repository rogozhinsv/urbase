import * as Express from "express";
import * as Path from 'path';
import * as Favicon from 'serve-favicon';
import * as Logger from 'morgan';
import * as CookieParser from 'cookie-parser';
import * as BodyParser from 'body-parser';
import * as PagesRouter from './routes/pages';
import * as NotFoundPageRouter from "./routes/404";

export class UrbaseApp {
  private _app: Express.Express = Express();
  private _logger: any = Logger;
  private _cookieParser: any = CookieParser;

  public get App(): Express.Express {
    return this._app;
  }

  constructor() {
    this.init();
  }

  private init(): void {
    // view engine setup
    this._app.set('views', Path.join(__dirname, 'views'));
    this._app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    this._app.use(this._logger('dev'));
    this._app.use(BodyParser.json());
    this._app.use(BodyParser.urlencoded({ extended: false }));
    this._app.use(this._cookieParser());
    this._app.use(Express.static(Path.join(__dirname, 'public')));

    this._app.use(PagesRouter.default);
    this._app.use(NotFoundPageRouter.default);
    this._app.use((err: Error, req: any, res: any, next: any) => res.send(err.stack));

    this._app.listen(8080, () => console.log("app listening on port 8080"));
  }
}

module.exports = new UrbaseApp().App;
