import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Movie } from "../models/movie.model";
import { HttpService } from "./http.service";

@Injectable()
export class CrawlerService {
  constructor(private _httpService: HttpService) {}

  public search(keyword: string): Observable<Movie[]> {
    const url = `/search/${keyword}`;
    return this._httpService.doGet(url, null).pipe(
      map(res => {
        if (res.status === 200) {
          return res._body;
        }

        return null;
      }),
      map((moveis: any[]) => {
        return moveis.map(m => {
          return new Movie().fromJson(m);
        });
      })
    );
  }
}
