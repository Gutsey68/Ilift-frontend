export type NotificationType = {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow';
  content: string;
  isRead: boolean;
  createdAt: string;
  sender: {
    id: string;
    pseudo: string;
    profilePhoto: string | null;
  };
};

export type NotificationResponse = {
  notifications: NotificationType[];
  unreadCount: number;
};
