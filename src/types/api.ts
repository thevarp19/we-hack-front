export interface LoginDTO {}
export interface RegisterDTO {}
export interface UserProfileDTO {}
export interface JwtDTO {}
export interface UploadPhotoDTO {
    pcImage: File;
    tabletImage?: File;
    mobileImage?: File;
    previewImage?: File;
}
