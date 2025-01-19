/**
 * Type représentant une notification
 * @property type - Type de notification (like, comment, follow)
 * @property isRead - État de lecture de la notification
 */
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

/**
 * Type représentant la réponse des notifications avec le compteur non lu
 */
export type NotificationResponse = {
  notifications: NotificationType[];
  unreadCount: number;
};
