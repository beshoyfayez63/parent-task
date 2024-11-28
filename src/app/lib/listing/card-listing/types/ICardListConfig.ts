import { Observable } from "rxjs";
import { IPaginationSettings } from "../../pagination/types/IPagination";

export interface ICardListConfig<Res, Data extends object[]> {
  getData(page: number): Observable<Res>;
  dataMapper(res: Res): Observable<Data>;
  paginationMapper(res: Res): IPaginationSettings
}

