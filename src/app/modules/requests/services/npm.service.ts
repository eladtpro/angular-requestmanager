import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { NpmResponse } from '../model/npm-response';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ConfigurationService } from '../../../shared/services/configuration.service';

interface NpmResults {
  total: number;
  results: NpmResponse[];
}

@Injectable()
export class NpmService {
  constructor(private http: HttpService, private config: ConfigurationService) {
    this.config.configuration.subscribe(cfg => {
      this.npmRepositoryUrl = cfg.npmRepositoryUrl;
    });
   }

   private npmRepositoryUrl: string;
   search(query: string): Observable<NpmResponse[]> {
    if (!query || query.length < 3)
      return of([]);

    return this.http.get<NpmResults>(this.npmRepositoryUrl, { params: { q: query.toLowerCase() } })
      .pipe(
        map(result => result.results),
        tap(responses => {
          responses.forEach(response => {
            response.caption = `${response.package.name}@${response.package.version} - ${response.package.description}`;
          });
        })
      );
  }
}
