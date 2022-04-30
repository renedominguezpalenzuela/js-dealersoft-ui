export interface Image {
  id: number,
  attributes: {
    alternativeText: string,
    caption: string,
    createdAt: Date,
    ext: string,
    formats: any,
    hash: string
    height: number
    mime: string
    name: string
    previewUrl: string
    provider: string
    provider_metadata: any
    size: number
    updatedAt: Date
    url: string
    width: number
  }
}
