
export interface IConversation {
  _id: string ; 
  userId: string;
  hubId: string;
  createdAt: Date;
  updatedAt: Date;
  userName: string[];
  image: string[];
}