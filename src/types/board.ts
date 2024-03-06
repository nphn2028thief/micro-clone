import { Id } from "../../convex/_generated/dataModel";

export interface IBoardCreateRequest {
  orgId: string;
  title: string;
}

export interface IBoardResponse {
  _id: Id<"boards">;
  _creationTime: number;
  orgId: string;
  title: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
  isFavorite: boolean;
}

export interface IBoardUpdateRequest {
  id: string;
  title: string;
}

export interface IFavoriteRequest {
  id: string;
  orgId: string;
}
