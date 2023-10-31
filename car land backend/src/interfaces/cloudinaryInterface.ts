export interface CloudinaryAsset {
    asset_id?: string;
    public_id: string;
    version: number;
    version_id?: string;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    folder?: string;
    api_key?: string;
  }