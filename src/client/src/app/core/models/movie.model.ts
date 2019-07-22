export class Movie {
  domain: string;
  href: string;
  thumbnail: string;
  nameVi: string;
  nameEn: string;
  time: string;

  public fromJson(json: any): Movie {
    if (!json) {
      return this;
    }

    this.domain = json.domain;
    this.href = json.href;
    this.thumbnail = json.thumbnail;
    this.nameVi = json.nameVi;
    this.nameEn = json.nameEn;
    this.time = json.time;

    return this;
  }
}
