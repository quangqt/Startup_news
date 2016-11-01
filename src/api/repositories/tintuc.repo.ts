import { RepoBase } from './repositories.base';
import { TinTuc } from '../models/tintuc.model';
import { Pool, QueryResult } from 'pg';

export class TinTucRepo extends RepoBase {

    constructor() {
        super();
    }

    public getList(option): Promise<TinTuc[]> {
        let queryText = 'SELECT * FROM public."TinTuc" ORDER BY "IDTinTuc" ASC';

        console.info('Excute: ' + queryText);
        let pResult;

        if (option) {
            pResult = this._pgPool.query(queryText, [option.id, option.name])
        } else {
            pResult = this._pgPool.query(queryText)
        }


           return pResult.then(result => {
            let TinTucs: TinTuc[] = result.rows.map(r => {
                // let TinTuc = new TinTucModel();
                // TinTuc.IDTinTuc=r.idtintuc;
                // TinTuc.IDDanhMucSite = r.iddanhmucsite;
                // TinTuc.TieuDe = r.tieude;
                // TinTuc.MoTa=r.mota;
                // TinTuc.NoiDung=r.noidung;
                // TinTuc.ThoiGianDangTin=r.thoigiandangtin;
                // TinTuc.URlNews=r.urlnew;
                // TinTuc.URLThumbImage=r.urlthumbimage;
                // TinTuc.URLImage=r.urlimage;
                // console.log(r.idtintuc)
                return result.rows;
            });
            return TinTucs;
        })
            .catch(err => {
                console.error(err.message);
                return null;
            });
    }
    public count(option): Promise<number> {
        let queryText = 'select count(*) as abc from test.books';

        console.info('Excute: ' + queryText);

        return this._pgPool.query(queryText)
            .then(result => {
                return result.rows[0].abc
            })
    }
}