export interface NpmResponse {
  caption: string;

  package: {
    name: string, version: string, scope: string, description: string, keywords: string[], date: Date,
    links: { npm: string, homepage: string, repository: string, bugs: string },
    author: { name: string, email: string, url: string, username: string },
    publisher: { username: string, email: string },
    maintainers: { username: string, email: string }[]
  };
  flags: { deprecated: string };
  score: { final: number, detail: { quality: number, popularity: number, maintenance: number } };
  searchScore: number;
}
