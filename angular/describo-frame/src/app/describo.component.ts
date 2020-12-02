import {Component, Injectable, Inject, ElementRef, ApplicationRef} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {FormArray, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {UserSimpleService} from './shared/user.service-simple';
import {DashboardService} from './shared/dashboard-service';
import {PlanTable, Plan} from './shared/dashboard-models';
import * as _ from "lodash";
import {LoadableComponent} from './shared/loadable.component';
import {OnInit} from '@angular/core';
import {PaginationModule, TooltipModule} from 'ngx-bootstrap';
import {TranslationService} from './shared/translation-service';
import {RecordsService} from './shared/form/records.service';
import {RelatedObjectSelectorField} from './shared/form/field-relatedobjectselector.component';
import {WorkspaceTypeService} from './shared/workspace-service';
import {DescriboService} from "./describo.service";
import {User} from "./shared/user-models";
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

declare var pageData: any;
declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'describo',
  templateUrl: './describo.html'
})
@Injectable()
export class DescriboFrameComponent extends LoadableComponent implements OnInit {
  branding: string;
  portal: string;
  packageType: string;
  recordColLabel: string;
  typeColLabel: string;
  linkColLlabel: string;
  rdmpColLabel: string;
  descriptionColLabel: string;
  createWorkspaceLabel: string;
  searchLabel: string;

  workflowSteps: any = [];
  records: any;
  saveMsgType = "info";
  initSubs: any;
  createMode: boolean;
  selectorField: RelatedObjectSelectorField;
  selectedRdmpUrl: string;
  nextButtonLabel: string;
  backButtonLabel: string;

  services: any = [];
  rdmpUrl: string = '';
  requestButtonLabel: string = 'Next';
  selectedOID: string;
  user: User;
  iFrameURL: SafeUrl = null;
  errorMessage: string = '';

  constructor(
    @Inject(WorkspaceTypeService) protected workspaceTypeService: WorkspaceTypeService,
    @Inject(DashboardService) protected dashboardService: DashboardService,
    protected recordsService: RecordsService,
    @Inject(DOCUMENT) protected document: any,
    protected elementRef: ElementRef,
    public translationService: TranslationService,
    protected app: ApplicationRef,
    @Inject(UserSimpleService) protected UserSimpleService: UserSimpleService,
    @Inject(DescriboService) protected DescriboService: DescriboService,
    private sanitizer: DomSanitizer) {
    super();
    this.setLoading(true);
    this.initTranslator(this.translationService);
  }

  ngOnInit() {
    this.branding = this.elementRef.nativeElement.getAttribute('branding');
    this.portal = this.elementRef.nativeElement.getAttribute('portal');
    this.packageType = this.elementRef.nativeElement.getAttribute('packageType');
    this.initSubs = this.dashboardService.waitForInit((initStat: boolean) => {
      this.initSubs.unsubscribe();
      this.translationService.isReady(tService => {
        this.typeColLabel = this.getTranslated(`workspaces-type-column`, "Type");
        this.descriptionColLabel = this.getTranslated(`workspaces-description-column`, "Description");
        this.recordColLabel = this.getTranslated(`workspaces-title-column`, "Name");
        this.linkColLlabel = this.getTranslated(`workspaces-link-column`, "Location");
        this.rdmpColLabel = this.getTranslated(`workspaces-rdmp-column`, "Plan");
        this.searchLabel = this.getTranslated('create-workspace-selector-search', 'Search for your Data Management Plan');
        this.createWorkspaceLabel = this.getTranslated('create-workspace', "Find a plan to create a research workspace");
        this.nextButtonLabel = this.getTranslated('create-workspace-next', "Next");
        this.backButtonLabel = this.getTranslated('create-workspace-back', "Back");
      });
      this.UserSimpleService.getInfo().then(userInfo => {
        this.user = _.clone(userInfo);
        this.loadFrame();
        this.checkIfHasLoaded();
      });

    });
  }

  public hasLoaded() {
    return this.translatorReady && !_.isEmpty(this.records);
  }

  getTranslated(key, defValue) {
    if (!_.isEmpty(key) && !_.isUndefined(key)) {
      if (_.isFunction(key.startsWith)) {
        let translatedValue = this.translationService.t(key);
        if (translatedValue == key) {
          return defValue;
        } else {
          return translatedValue;
        }
      } else {
        return key;
      }
    } else {
      return defValue;
    }
  }

  loadFrame() {
    this.DescriboService.getSessionId(this.user).then(res => {
      if (res.status) {
        this.iFrameURL = this.sanitizer.bypassSecurityTrustResourceUrl(res.url);
      } else {
        console.error(res.message);
        this.errorMessage = res.message;
        this.iFrameURL = null;
      }
      this.isLoading = false;
    });
  }


}
