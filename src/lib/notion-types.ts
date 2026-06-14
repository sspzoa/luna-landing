export interface NotionTitleProperty {
  title?: { plain_text: string }[];
}

export interface NotionRichTextProperty {
  rich_text?: { plain_text: string }[];
}

export interface NotionSelectProperty {
  select?: { name: string };
}

export interface NotionMultiSelectProperty {
  multi_select?: { id: string; name: string }[];
}

export interface NotionNumberProperty {
  number?: number | null;
}

export interface NotionDateProperty {
  date?: { start?: string | null; end?: string | null };
}

export interface NotionFilesProperty {
  files?: { file?: { url: string }; external?: { url: string } }[];
}

export interface NotionPage {
  id: string;
  public_url?: string;
}

export interface NotionAwardPage extends NotionPage {
  properties: {
    year?: NotionSelectProperty;
    image?: NotionFilesProperty;
    name?: NotionTitleProperty;
    prize?: NotionRichTextProperty;
    team?: NotionRichTextProperty;
    members?: NotionMultiSelectProperty;
    date?: NotionDateProperty;
    prizemoney?: NotionNumberProperty;
  };
}

export interface NotionQnAPage extends NotionPage {
  properties: {
    question?: NotionTitleProperty;
    order?: NotionNumberProperty;
    answer?: NotionRichTextProperty;
  };
}

export interface NotionMemberPage extends NotionPage {
  properties: {
    position?: NotionSelectProperty;
    image?: NotionFilesProperty;
    name?: NotionTitleProperty;
    generation?: NotionSelectProperty;
    class?: NotionSelectProperty;
    description?: NotionRichTextProperty;
    lunaGeneration?: NotionSelectProperty;
  };
}

export interface NotionInformationPage extends NotionPage {
  properties: {
    moto?: NotionTitleProperty;
  };
}

export interface NotionProjectPage extends NotionPage {
  properties: {
    year?: NotionSelectProperty;
    image?: NotionFilesProperty;
    name?: NotionTitleProperty;
    description?: NotionRichTextProperty;
    awards?: NotionMultiSelectProperty;
  };
}
