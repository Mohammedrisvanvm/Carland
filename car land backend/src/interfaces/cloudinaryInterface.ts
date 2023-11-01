export interface CloudinaryUploader {
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
 export  interface CloudinaryRemover {
    deleted: Record<string, string>;
    deleted_counts: Record<string, any>;
    partial: boolean;
    rate_limit_allowed: number;
    rate_limit_reset_at: Date;
    rate_limit_remaining: number;
}