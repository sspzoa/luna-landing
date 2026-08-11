import type {
  NotionDateProperty,
  NotionFilesProperty,
  NotionMultiSelectProperty,
  NotionNumberProperty,
  NotionRichTextProperty,
  NotionSelectProperty,
  NotionTitleProperty,
} from '@/lib/notion-types';

export function titleText(property?: NotionTitleProperty) {
  return property?.title?.[0]?.plain_text ?? null;
}

export function richText(property?: NotionRichTextProperty) {
  return property?.rich_text?.[0]?.plain_text ?? null;
}

export function selectName(property?: NotionSelectProperty) {
  return property?.select?.name ?? null;
}

export function multiSelectNames(property?: NotionMultiSelectProperty) {
  return property?.multi_select?.map((item) => item.name) ?? [];
}

export function multiSelectOptions(property?: NotionMultiSelectProperty) {
  return (
    property?.multi_select?.map((item) => ({
      id: item.id,
      name: item.name,
    })) ?? []
  );
}

export function numberValue(property?: NotionNumberProperty) {
  return property?.number ?? null;
}

export function numberAsString(property?: NotionNumberProperty) {
  const value = numberValue(property);
  return value === null || value === undefined ? null : value.toString();
}

export function fileUrl(property?: NotionFilesProperty) {
  const file = property?.files?.[0];
  return file?.file?.url ?? file?.external?.url ?? null;
}

export function dateRange(property?: NotionDateProperty) {
  if (!property?.date) return null;
  return {
    start: property.date.start ?? null,
    end: property.date.end ?? null,
  };
}
