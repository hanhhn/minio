import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movie.model';
import { CrawlerService } from 'src/app/core/services/crawler.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [CrawlerService]
})
export class HomeComponent implements OnInit {
  @Input()
  keyword: string = "";

  movies: Movie[] = [];

  constructor(private _crawlerService: CrawlerService) {}

  ngOnInit() {}

  onClickSearch(event) {
    this._crawlerService
      .search(this.keyword.replace(" ", "-"))
      .subscribe(movies => {
        this.movies = movies;
      });
  }
}
