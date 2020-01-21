import { Path } from '../model/path';
import { Injectable } from '@angular/core';
import { Configuration } from '../model/configuration';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ConfigurationService } from './configuration.service';
import { Levenshtein } from '../model/levenshtein';

@Injectable({ providedIn: 'root' })
export class PathResolver implements Resolve<string | null> {
  thresholds: Levenshtein;
  constructor(private config: ConfigurationService) {
    this.config = config;
    this.config.configuration.subscribe(cfg => {
      this.thresholds = cfg.levenshtein;
    });
  }

  resolve(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string | null {
    const typoPath = state.url.replace('/', '');
    const threshold = this.getThreshold(typoPath);
    const dictionary = Object.values(Path)
      .filter(path => Math.abs(path.length - typoPath.length) < threshold);

    if (!dictionary.length) return null;

    this.sortByDistances(typoPath, dictionary);

    return `/${dictionary[0]}`;
  }

  // the maximum length delta between the input and correct value from paths dictionary
  getThreshold(path: string): number {
    if (path.length < this.thresholds.shortWord) return this.thresholds.shortDistance;
    return this.thresholds.longDistance;
  }

  sortByDistances(typoPath: string, dictionary: string[]) {
    const pathsDistance = {} as { [name: string]: number };

    dictionary.sort((a, b) => {
      if (!(a in pathsDistance))
        pathsDistance[a] = this.levenshtein(a, typoPath);
      if (!(b in pathsDistance))
        pathsDistance[b] = this.levenshtein(b, typoPath);

      return pathsDistance[a] - pathsDistance[b];
    });
  }

  levenshtein(a: string, b: string): number {
    if (a.length === 0 || b.length === 0) return 0;

    const matrix = [];

    // increment along the first column of each row
    for (let i = 0; i <= b.length; i++)
      matrix[i] = [i];

    // increment each column in the first row
    for (let j = 0; j <= a.length; j++)
      matrix[0][j] = j;

    // Fill in the rest of the matrix
    for (let i = 1; i <= b.length; i++)
      for (let j = 1; j <= a.length; j++)
        if (b.charAt(i - 1) === a.charAt(j - 1))
          matrix[i][j] = matrix[i - 1][j - 1];
        else
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1, // deletion
          );

    return matrix[b.length][a.length];
  }
}
