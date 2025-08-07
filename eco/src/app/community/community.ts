import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, collectionData, updateDoc, doc, Timestamp } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

interface CommunityPost {
  id?: string;
  message: string;
  user: string;
  responses: { user: string; message: string }[];
  createdAt: Timestamp;
}

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './community.html',
  styleUrls: ['./community.scss']
})
export class CommunityComponent implements OnInit {
  posts$: Observable<CommunityPost[]> = of([]);
  newPost: string = '';
  replyMessage: string = '';
  replyingToPostId: string | null = null;
  currentUser: string = '';
  publishMode: boolean = false;  // <-- CORREGIDO: agregamos la variable publishMode

  constructor(private firestore: Firestore, private auth: Auth) {}

  ngOnInit(): void {
    const user = this.auth.currentUser;
    this.currentUser = user?.email || 'Anónimo';

    const postsRef = collection(this.firestore, 'comunidad');
    this.posts$ = collectionData(postsRef, { idField: 'id' }) as Observable<CommunityPost[]>;
  }

  async publishPost() {
    if (this.newPost.trim() === '') return;

    const postsRef = collection(this.firestore, 'comunidad');
    await addDoc(postsRef, {
      message: this.newPost,
      user: this.currentUser,
      responses: [],
      createdAt: Timestamp.now()  // <-- CORREGIDO: usamos Timestamp.now()
    });

    this.newPost = '';
    this.publishMode = false;
  }

  startReply(postId: string) {
    this.replyingToPostId = postId;
    this.replyMessage = '';
  }

  async submitReply(post: CommunityPost) {
    if (this.replyMessage.trim() === '') return;

    const postRef = doc(this.firestore, 'comunidad', post.id!);
    const updatedResponses = [...post.responses, { user: this.currentUser, message: this.replyMessage }];

    await updateDoc(postRef, { responses: updatedResponses });

    this.replyingToPostId = null;
    this.replyMessage = '';
  }
}
