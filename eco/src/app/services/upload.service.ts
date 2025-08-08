import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

@Injectable({ providedIn: 'root' })
export class UploadService {
  private storage = getStorage();

  async uploadProfileImage(file: File, userId: string): Promise<string> {
    const storageRef = ref(this.storage, `profile_images/${userId}/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }
}
