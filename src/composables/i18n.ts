import { isRecord } from '@tool-belt/type-predicates'

export const l = (data: string | Record<string, string>, locale: ReturnType<typeof useI18n>['locale'] | ReturnType<typeof useI18n>['locale']['value']) => {
  if (typeof data === 'string') {
    return data
  }

  if (isRecord(data)) {
    const loc = typeof locale === 'string' ? locale : locale.value
    return data[loc.replace('-', '_')]
  }
}
