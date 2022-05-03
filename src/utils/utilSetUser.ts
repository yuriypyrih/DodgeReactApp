import { LocalLevels } from "../Models/data/LocalLevels";
import { LEVEL_STATUS } from "../Models/enum/LEVEL_STATUS";
import { setLevels, setSelectedRelic } from "../redux/slices/gameSlice";
import { setUser } from "../redux/slices/authSlice";
import { dispatch } from "../index";

export const utilSetUser = (user: any) => {
  dispatch(setUser({ ...user }));
  const userLevels = user.unlockedLevels;
  if (userLevels && Array.isArray(userLevels)) {
    const newLevels = LocalLevels.map((l) => {
      if (l.status === LEVEL_STATUS.LOCKED) {
        if (userLevels.includes(l.levelId)) {
          return { ...l, status: LEVEL_STATUS.UNLOCKED };
        } else return l;
      } else return l;
    });
    dispatch(
      setSelectedRelic({
        relic: user.selectedRelic || null,
        relic_available_uses: 0,
      })
    );
    dispatch(setLevels(newLevels));
  }
};
