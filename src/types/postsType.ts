import { ExerciseResult } from './exerciceResultsType';

export type PostType = {
  id: string;
  photo?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  isValid?: boolean;
  isMyPost?: boolean;
  doILike?: boolean;
  isShared?: boolean;
  sharedAt?: string;
  isSuggested?: boolean;
  sharedBy?: string;
  sharedByUser?: {
    id: string;
    pseudo: string;
  };
  exercicesResults?: ExerciseResult[];
  exercicesResultsPosts: Array<{
    exercicesResults: {
      id: string;
      createdAt: string;
      exercice: {
        id: string;
        name: string;
      };
      sets: Array<{
        id: string;
        reps: number;
        weight: number;
      }>;
    };
  }>;
  tags: Array<{
    postId: string;
    tagId: string;
    tag: {
      id: string;
      name: string;
    };
  }>;
  _count?: {
    likes: number;
    comments: number;
  };
  author: {
    id: string;
    pseudo: string;
    profilePhoto?: string;
  };
};

export type TagType = {
  postId: string;
  tagId: string;
  createdAt: string;
  updatedAt: string;
  tag: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type CommonPost = {
  id: string;
  photo?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  isValid?: boolean;
  doILike?: boolean;
  isShared?: boolean;
  sharedAt?: string;
  sharedBy?: string;
  exercicesResultsPosts: Array<{
    exercicesResults: {
      id: string;
      createdAt: string;
      exercice: {
        id: string;
        name: string;
      };
      sets: Array<{
        id: string;
        reps: number;
        weight: number;
      }>;
    };
  }>;
  sharedByUser?: {
    id: string;
    pseudo: string;
  };
  tags: Array<{
    postId: string;
    tagId: string;
    tag: {
      id: string;
      name: string;
    };
  }>;
  _count?: {
    likes: number;
    comments: number;
  };
  author: {
    id: string;
    pseudo: string;
    profilePhoto?: string;
  };
};
