/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare global {
  interface Window {
    TrelloPowerUp: Trello.PowerUp;
    // locale: string;
  }
}

export namespace Trello {
  interface HeaderAction {
    icon: string;
    alt: string;
    callback(): void;
    position: "left" | "right";
    url?: string;
  }

  //#region RestApi
  type LabelColors =
    | "green_light"
    | "green"
    | "green_dark"
    | "yellow_light"
    | "yellow"
    | "yellow_dark"
    | "orange_light"
    | "orange"
    | "orange_dark"
    | "red_light"
    | "red"
    | "red_dark"
    | "purple_light"
    | "purple"
    | "purple_dark"
    | "blue_light"
    | "blue"
    | "blue_dark"
    | "sky_light"
    | "sky"
    | "sky_dark"
    | "lime_light"
    | "lime"
    | "lime_dark"
    | "pink_light"
    | "pink"
    | "pink_dark"
    | "black_light"
    | "black"
    | "black_dark"
    | "null";

  type Colors = LabelColors | "light-gray";

  // type AlertDisplay = 'info' | 'warning' | 'error' | 'success';

  interface Board {
    id: string;
    name: string;
    url: string; // https://trello.com/c/I5nAdteE/9-test
    shortLink: string;
    members: Member[];
    dateLastActivity: string; // "2019-11-28T15:53:19.709Z"
    idOrganization: string;
    customFields: CustomField[];
    labels: Label[];
    memberships: Membership[];
    prefs: BoardPrefs;
    lists?: List[]; // optional Nested Resource
  }

  interface BoardPrefs {
    backgroundImage: string | null;
    backgroundColor?: string;
    backgroundBottomColor: string;
    backgroundTopColor: string;
    backgroundImageScaled: BackgroundImageScaled[] | null;
  }

  interface BackgroundImageScaled {
    width: number;
    height: number;
    url: string;
  }

  interface Card {
    // address: string | null;
    attachments: Attachment[];
    badges: BadgesInfo;
    // closed: boolean;
    // coordinates: Coordinates | null;
    // cover: Attachment | null;
    customFieldItems: CustomFieldItem[];
    dateLastActivity: string; // "2019-11-28T15:53:19.709Z"
    desc: string;
    due: string | null; // "2019-11-28T15:53:19.709Z"
    dueComplete: boolean;
    dueReminder: number | null;
    id: string;
    idList: string;
    idShort: number;
    idMembers: string[];
    // labels: Label[];
    // locationName: string | null;
    // members: Member[] | undefined;
    name: string;
    pos: number;
    shortLink: string;
    url: string; // https://trello.com/c/I5nAdteE/9-test
    idLabels: string[]; // Note: my change
    idBoard: string; // Note: my change
    checklists: any[];
    stickers: any[];
    board?: Board; // optional Nested Resource
    list?: List; // optional Nested Resource
  }

  interface Label {
    id: string;
    idBoard: string; // Note: my change
    name: string;
    color: LabelColors;
  }

  interface CustomField {
    // display: CustomFieldDisplay;
    // fieldGroup: string;
    id: string;
    idModel: string;
    // isSuggestedField: boolean;
    modelType: "board"; //'card' | 'board' | 'member';
    name: string;
    pos: number; // | 'top' | 'botton';
    type: "checkbox" | "date" | "list" | "number" | "text";
    options: CustomFieldListOption[];
  }

  interface CustomFieldListOption {
    id: string;
    idCustomField: string;
    value: CustomFieldListOptionValue;
    color: string;
    pos: number;
  }

  interface CustomFieldListOptionValue {
    text: string;
  }

  interface CustomFieldItem {
    id: string;
    idCustomField: string;
    idModel: string;
    modelType: "card" | "board" | "member";
    idValue?: string;
    value?: CustomFieldItemValue | "";
  }

  // interface CustomFieldDisplay {
  // 	cardFront: boolean;
  // 	// name: string;
  // 	// pos: string;
  // 	// options: CustomFieldDisplayOption[]
  // }

  // interface CustomFieldDisplayOptionValue {
  // 	text: string;
  // }

  interface CustomFieldItemValue {
    checked?: string;
    date?: string;
    text?: string;
    number?: string;
  }

  interface Attachment {
    date: string;
    edgeColor: string;
    id: string;
    idMember: string;
    name: string;
    previews: Preview[];
    url: string;
  }

  interface BadgesInfo {
    attachments: number;
    attachmentsByType: AttachmentsByType;
    checkItems: number;
    checkItemsChecked: number;
    comments: number;
    description: boolean;
    due: string; // timestamp
    dueComplete: boolean;
    fogbugz: string;
    location: boolean;
    subscribed: boolean;
    viewingMemberVoted: boolean;
    votes: number;
  }

  interface List {
    id: string;
    name: string;
    // closed: boolean;
    pos: number;
    // softLimit: null;
    idBoard: string;
    // subscribed: boolean;
  }

  type Member = NonAuthorizedMember;

  interface NonAuthorizedMember {
    avatar: string;
    fullName: string;
    id: string;
    initials: string;
    paidStatus: "enterprise";
    username: string;
  }

  // interface Member {
  //   id: string;
  //   // bio:                      string;
  //   // bioData:                  BioData | null;
  //   // confirmed:                boolean;
  //   // memberType: MemberType; // it seems API is returning wrong values
  //   username: string;
  //   // activityBlocked:          boolean;
  //   avatarHash: null | string;
  //   avatarUrl: null | string;
  //   fullName: string;
  //   idEnterprisesAdmin: string[];
  //   organizations: Organization[];
  //   enterprises: Enterprise[];
  //   // idEnterprise:             null;
  //   // idEnterprisesDeactivated: any[] | null;
  //   // idMemberReferrer:         null;
  //   // idPremOrgsAdmin:          any[];
  //   initials: string;
  //   // nonPublic:                NonPublic;
  //   // nonPublicAvailable:       boolean;
  //   // products:                 any[];
  //   // url:                      string;
  //   // status:                   string;
  // }

  interface AttachmentsByType {
    [key: string]: {
      board: number;
      card: number;
    };
  }

  interface Preview {
    bytes: number;
    height: number;
    scaled: boolean;
    url: string;
    width: number;
  }

  type MemberType = "admin" | "normal" | "observer";

  interface Membership {
    deactivated: boolean;
    id: string;
    idMember: string;
    memberType: MemberType;
    unconfirmed: boolean;
  }

  interface Organization {
    id: string;
    name: string;
    displayName: string;
    memberships: Membership[];
    idEnterprise: string;
    members: Member[];
  }

  interface Enterprise {
    id: string;
    name: string;
    displayName: string;
    members: Member[];
    idOrganizations?: string[];
    idAdmins?: string[];
  }

  //#endregion RestApi

  interface PowerUp {
    iframe(options: PowerUp.PluginOptions): PowerUp.IFrame;
    initialize(
      handlers: PowerUp.CapabilityHandlers,
      options?: PowerUp.PluginOptions,
    ): PowerUp.Plugin | PowerUp.IFrame;
    Promise: PromiseConstructorLike;
  }

  namespace PowerUp {
    type Model = "board" | "card" | "organization";

    type Scope = Model | "member";
    // type Permissions = 'read' | 'write';

    type Visibility = "shared" | "private";
    // interface PluginOptions extends LocalizerOptions {
    interface PluginOptions {
      appKey?: string;
      appName?: string;
    }

    type OrganizationFields = keyof Organization;
    type BoardFields = keyof Board;
    type CardFields = keyof Card;
    type ListFields = keyof List;
    type MemberFields = keyof Member;

    type ResourceDictionary = {
      [key: string]: string;
    };

    // // eslint-disable-next-line @typescript-eslint/interface-name-prefix

    interface IFrame {
      member(query: string): Member
      board(query: string): Board
      organization(query: string): Organization
    }

    interface IFrame extends HostHandlers {
      io: any | null;
      args: any[];
      secret?: string;
      options: IFrameOptions;
      i18nPromise: PromiseLike<void>;
      init(): any;
      connect(): void;
      request(command: string, options: any): PromiseLike<any>;
      render(fxRender: () => void): any;
      initApi(): void;
      getRestApi(): RestApi;
      initSentry(): void;
      jwt({ state: string }?): PromiseLike<string>;
    }

    interface RestApi {
      getToken(): Promise<string | undefined>;
      clearToken(): PromiseLike<void>;
      isAuthorized(): PromiseLike<boolean>;
      authorize({ scope: string }): Promise<void>;
    }

    interface AnonymousHostHandlers {
      requestWithContext(command: string, options: any): PromiseLike<any>;
      getAll(): PromiseLike<any>;
      get(
        scope: Scope | string,
        visibility: Visibility,
        key?: string,
        defaultValue?: any,
      ): Promise<any>;
      set(
        scope: Scope | string,
        visibility: Visibility,
        key: string,
        defaultValue?: any,
      ): Promise<void>;
      set(
        scope: Scope | string,
        visibility: Visibility,
        entries: {
          [key: string]: any;
        },
      ): Promise<void>;
      remove(
        scope: Scope | string,
        visibility: Visibility,
        key: string,
      ): PromiseLike<void>;
      remove(
        scope: Scope | string,
        visibility: Visibility,
        entries: string[],
      ): PromiseLike<void>;
      safe(html: string): string;
      localizeKey(
        key: string,
        data?: {
          [key: string]: string;
        },
      ): string;
      localizeKeys(keys: [string | string[]]): string[];
      localizeNode(node: Element): void;
      // board(...fields: ['all'] | BoardFields[]): PromiseLike<Board>;
      // cards(...fields: ['all'] | CardFields[]): PromiseLike<Card[]>;
      // lists(...fields: ['all'] | ListFields[]): PromiseLike<List[]>;
      // member(...fields: ['all'] | MemberFields[]): PromiseLike<Member>;
      // organization(...fields: ['all'] | OrganizationFields[]): PromiseLike<Organization>;
    }

    interface HostHandlers extends AnonymousHostHandlers {
      getContext(): Context;
      isMemberSignedIn(): boolean;
      // memberCanWriteToModel(modelType: Model): boolean;
      // arg(name: string, defaultValue?: any): any;
      signUrl(url: string, args?: { [key: string]: any }): string;
      // navigate(options: { url: string }): any;
      // showCard(idCard: string): PromiseLike<void>;
      // hideCard(): PromiseLike<void>;
      alert(options: {
        message: string;
        duration?: number;
        // display?: AlertDisplay;
      }): PromiseLike<void>;
      hideAlert(): PromiseLike<void>;
      popup(options: PopupIframeOptions): PromiseLike<void>; // removed some types from options
      // overlay(options: {
      // 	url: string;
      // 	args: { [key: string]: any };
      // 	inset: unknown;
      // }): PromiseLike<void>;
      // boardBar(options: {
      // 	url: string;
      // 	args?: { [key: string]: any };
      // 	height?: number;
      // 	accentColor?: string | Colors;
      // 	callback?(t: PowerUp.IFrame): void;
      // 	title?: string;
      // 	actions?: HeaderAction[];
      // 	resizable?: boolean;
      // }): PromiseLike<void>;
      modal(options: {
        url: string;
        accentColor?: string | Colors;
        height?: number;
        fullscreen?: boolean;
        callback?(): void;
        title?: string;
        actions?: HeaderAction[];
        args?: { [key: string]: any };
      }): PromiseLike<void>;
      // updateModal(options: {
      // 	accentColor?: string | Colors;
      // 	actions?: HeaderAction[];
      // 	fullscreen?: boolean;
      // 	title?: string;
      // }): PromiseLike<void>;
      closePopup(): PromiseLike<void>;
      // back(): PromiseLike<void>;
      // hideOverlay(): PromiseLike<void>;
      // closeOverlay(options?: {
      // 	inset?: unknown;
      // }): PromiseLike<void>;
      // hideBoardBar(): PromiseLike<void>;
      // closeBoardBar(): PromiseLike<void>;
      closeModal(): PromiseLike<void>;
      sizeTo(arg: string | number | Element): PromiseLike<void>;
      card(...fields: ["all"] | CardFields[]): PromiseLike<Card>;
      // list(...fields: ['all'] | ListFields[]): PromiseLike<List>;
      // attach(data: {
      // 	name: string;
      // 	url: string;
      // }): PromiseLike<void>;
      // requestToken(options: unknown): PromiseLike<string>;
      authorize(
        authUrl: string,
        options?: {
          height?: number;
          width?: number;
          validToken?(value: string): boolean;
        },
      ): Promise<string>;
      // storeSecret(secretKey: string, secretData: string): PromiseLike<void>;
      // loadSecret(secretKey: string): PromiseLike<string>;
      // clearSecret(secretKey: string): PromiseLike<void>;
      notifyParent(
        message: "done",
        options?: {
          targetOrigin: string;
        },
      ): PromiseLike<void>;
    }

    interface Context {
      board: string;
      card?: string;
      command?: string;
      member: string;
      organization?: string;
      enterprise?: string;
      permissions?: {
        board: Permissions;
        card: Permissions;
        organization: Permissions;
      };
      version: string;
    }

    // // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    // interface IFrameOptions extends LocalizerOptions {
    interface IFrameOptions {
      context?: string;
      secret?: string;
      helpfulStacks?: boolean;
    }

    interface PopupIframeOptions {
      callback?(t: PowerUp.IFrame, options: { locale: string }): void;
      title: string;
      url: string;
      args?: {
        [key: string]: any;
      };
      height?: number;
    }

    //#region Plugin
    interface Plugin extends AnonymousHostHandlers {
      options: PluginOptions;
      connect(): any; // return an instance of PostMessageIO
      request(command: string, options: any): PromiseLike<any>; //  // return PostMessageIO.request, whatever that is
      init(): any; // return an instance of PostMessageIO
      NotHandled(): any; // return PostMessageIO.NotHandled, whatever that is
    }

    interface PluginOptions extends LocalizerOptions {
      Sentry?: {
        configureScope(
          callback: (scope: {
            setTags(name: string, value: string): void;
            setUser(value: { id: string }): void;
          }) => void,
        ): void;
      };
      appKey?: string;
      appName?: string;
      apiOrigin?: string;
      authOrigin?: string;
      localStorage?: Storage;
      tokenStorageKey?: string;
      helpfulStacks?: boolean;
    }

    interface Localizer {
      resourceDictionary: ResourceDictionary;
      localize(key: string, args: readonly string[]): string;
    }

    interface Localization {
      defaultLocale: string;
      supportedLocales: string[];
      resourceUrl: string;
    }

    interface LocalizerOptions {
      localizer?: Localizer;
      loadLocalizer?(): PromiseLike<Localizer>;
      localization?: Localization;
    }

    //#endregion

    //#region CapabilityHandlers
    type CapabilityHandlers = {
      "attachment-sections"?: (
        t: PowerUp.IFrame,
        options: {
          entries: Attachment[];
        },
      ) =>
        | AttachmentSection[]
        | LazyAttachmentSection[]
        | PromiseLike<AttachmentSection[] | LazyAttachmentSection[]>;
      "attachment-thumbnail"?: () => void;
      "board-buttons"?: (
        t: PowerUp.IFrame,
        opt: any,
      ) => PromiseLike<(BoardButtonUrl | BoardButtonCallback)[]>;
      "card-back-section"?: (t: PowerUp.IFrame) => PromiseLike<CardBackSection>;
      "card-badges"?: (
        t: PowerUp.IFrame,
        opts: { attachments: Attachment[] },
      ) => PromiseLike<(CardBadgeDynamic | CardBadge)[]>;
      "card-buttons"?: (t: PowerUp.IFrame) => PromiseLike<CardButton[]>;
      "card-detail-badges"?: (
        t: PowerUp.IFrame,
      ) => PromiseLike<(CardDetailBadgeDynamic | CardDetailBadge)[]>;
      "card-from-url"?: () => void;
      "format-url"?: () => void;
      "list-actions"?: (t: PowerUp.IFrame) => PromiseLike<ListAction[]>;
      "list-sorters"?: (t: PowerUp.IFrame) => PromiseLike<ListSorter[]>;
      "on-enable"?: (t: PowerUp.IFrame) => void;
      "on-disable"?: (t: PowerUp.IFrame) => void;
      "remove-data"?: (t: PowerUp.IFrame) => void;
      "show-settings"?: (t: PowerUp.IFrame) => PromiseLike<void>;
      "authorization-status"?: (t: PowerUp.IFrame) => void;
      "show-authorization"?: (t: PowerUp.IFrame) => void;
    };

    type Condition =
      | "admin"
      | "always"
      | "edit"
      | "readonly"
      | "signedIn"
      | "signedOut";

    // USER-FACING INTERFACES
    interface BoardButtonBase {
      icon?: {
        dark: string;
        light: string;
      };
      text: string;
      condition?: Condition;
    }

    interface BoardButtonCallback extends BoardButtonBase {
      callback: (t: Trello.PowerUp.IFrame) => PromiseLike<void>;
    }

    interface BoardButtonUrl extends BoardButtonBase {
      url: string;
      target?: string;
    }

    interface CardBackSection {
      title: string;
      icon: string;
      content: {
        type: "iframe";
        url: string;
        height?: number;
      };
    }

    interface CardBadge {
      text?: string;
      icon?: string;
      color?: Colors;
      refresh?: number;
    }

    interface CardBadgeDynamic {
      dynamic(): CardBadge;
    }

    interface CardDetailBadge extends CardBadge {
      title: string;
      callback?(t: PowerUp.IFrame): void;
      url?: string;
      target?: string;
    }

    interface CardDetailBadgeDynamic {
      dynamic(): CardDetailBadge;
    }

    interface ListAction {
      text: string;
      callback(t: PowerUp.IFrame): PromiseLike<void>;
    }

    interface ListSorter {
      text: string;
      callback(
        t: PowerUp.IFrame,
        options: {
          cards: Card[];
        },
      ): PromiseLike<{ sortedIds: string[] }>;
    }

    interface CardButton {
      icon: string;
      text: string;
      condition?: Condition;
      callback(t: Trello.PowerUp.IFrame): PromiseLike<void>;
      url?: string;
      target?: string;
    }

    interface AttachmentsByType {
      [key: string]: {
        board: number;
        card: number;
      };
    }

    interface Preview {
      bytes: number;
      height: number;
      scaled: boolean;
      url: string;
      width: number;
    }

    interface AttachmentSectionBase {
      claimed: Attachment[];
      icon: string;
      content: {
        type: string;
        url: string;
        height?: number;
      };
    }

    interface AttachmentSection extends AttachmentSectionBase {
      title: string;
    }

    interface LazyAttachmentSection extends AttachmentSectionBase {
      id: string;
      title(): string;
    }

    //#endregion
  }
}
