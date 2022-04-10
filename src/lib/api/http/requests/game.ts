import { postRequest } from "../index";

export const beatLevelRequest = (body: {
  level: string;
  stars?: number;
  unlockNext?: boolean;
}) => {
  return postRequest("/game/beatLevel", { ...body });
};

export const unlockLevelRequest = (body: {
  unlockLevel: string;
  cost: number;
}) => {
  return postRequest("/game/unlockLevel", { ...body });
};
