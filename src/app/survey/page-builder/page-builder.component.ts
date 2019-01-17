import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Subscription } from 'rxjs';
import { FormJson } from '../models/form-json.model';
import { Router } from '@angular/router';
import { UserService } from '../../authentication/user.service';
import { User } from '../models/user.model';
import { FormJsonService } from '../services/form-json.service';

@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.css']
})
export class PageBuilderComponent implements OnInit, OnDestroy {
  formJson: FormJson;

  numberOfPages = 0;

  userSubscription: Subscription;
  user: User;

  constructor(private router: Router,
              private apiService: ApiService,
              private userService: UserService,
              private formJsonService: FormJsonService) {
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.userSubscription = this.userService.userChanged.subscribe((user: User) => {
      this.user = user;
    });

    this.getJson();
  }

  getJson () {
    this.apiService.getFormJson().subscribe(
      (data: string) => this.success(data), (error) => this.failed()
    );
  }

  private success(data: string) {
    // this is necessary because the API ads some extra backslashes and quotes for some reason
    data = data.slice(1, data.length - 1);
    data = data.replace(/\\/g, '');
    this.formJson = <FormJson>JSON.parse(data);
    this.formJsonService.setFormJson(this.formJson);
    this.countPages();
  }

  private failed() {
    this.router.navigate(['/404']).then();
  }

  private countPages() {
    if (!this.formJson.questions_by_types) {
      return;
    }

    for (const questionByTypes of this.formJson.questions_by_types) {
      for (const activity of this.user.activity) {
        if (activity.activity_type === questionByTypes.type && questionByTypes.questions.length > 0) {
          this.numberOfPages++;
          break;
        }
      }
    }
    // this.numberOfPages += this.formJson.number_of_pages;
    this.formJsonService.setNumberOfPages(this.numberOfPages);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  isParticipant(typeName: string): boolean {
    return (this.user.activity.map(activity => activity.activity_type).indexOf(typeName) > -1);
  }
}
