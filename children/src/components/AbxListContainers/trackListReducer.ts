export interface AbxTrackItem<T> {
  id: number | string;
  index: number;
  isRemoved: boolean;
  data: T;
}

export interface AbxTrackListState<T> {
  source: AbxTrackItem<T>[];
  destination: AbxTrackItem<T>[];
  dirty: boolean;
}

export const initialState = {
  source: [],
  destination: [],
  dirty: false,
};

type ActionType<T> =
  | { type: "moveToDestination"; payload: { itemId: number | string } }
  | { type: "moveToSource"; payload: { itemId: number | string } }
  | {
      type: "loadLists";
      payload: { source: AbxTrackItem<T>[]; destination: AbxTrackItem<T>[] };
    }
  | {
      type: "reorder";
      payload: { list: "source" | "destination"; from: number; to: number };
    };

const moveToDestination = <T>(
  state: AbxTrackListState<T> = initialState,
  itemId: number | string
): AbxTrackListState<T> => {
  if (state.destination.find((item) => item.id === itemId)) {
    return state;
  }

  const source = state.source.map((item) => {
    return item.id === itemId ? { ...item, isRemoved: true } : item;
  });

  const destination = [
    ...state.destination,
    state.source.find((item) => item.id === itemId),
  ] as AbxTrackItem<T>[];

  return { ...state, source, destination, dirty: true };
};

const moveToSource = <T>(
  state: AbxTrackListState<T>,
  itemId: number | string
): AbxTrackListState<T> => {
  const source = state.source.map((item) => {
    return item.id === itemId ? { ...item, isRemoved: false } : item;
  });

  const destination = state.destination.filter((item) => item.id !== itemId);

  return { ...state, source, destination, dirty: true };
};

const loadLists = <T>(
  state: AbxTrackListState<T>,
  payload: { source: AbxTrackItem<T>[]; destination: AbxTrackItem<T>[] }
): AbxTrackListState<T> => {
  return {
    ...state,
    source: payload.source,
    destination: payload.destination,
    dirty: false,
  };
};

const move = (arr: any[], from:number ,to: number) => {
  return arr.reduce((prev, current, idx, self) => {
    if (from === to) {
      prev.push(current);
    }
    if (idx === from) {
      return prev;
    }
    if (from < to) {
      prev.push(current);
    }
    if (idx === to) {
      prev.push(self[from]);
    }
    if (from > to) {
      prev.push(current);
    }
    return prev;
  }, []);
}

const reorder = <T>(
  state: AbxTrackListState<T>,
  payload: { list: "source" | "destination"; from: number; to: number }
) => {
  if (payload.list === "source") {
    const result = move(state.source, payload.from, payload.to);
    return {...state, source: result, dirty: true };
  } else {
    const result = move(state.destination, payload.from, payload.to);
    return {...state, destination: result, dirty: true };
  }  
};

export const trackListReducer = <T>(
  state: AbxTrackListState<T>,
  action: ActionType<T>
): AbxTrackListState<T> => {
  switch (action.type) {
    case "moveToDestination":
      return moveToDestination(state, action.payload.itemId);
    case "moveToSource":
      return moveToSource(state, action.payload.itemId);
    case "loadLists":
      return loadLists(state, action.payload);
    case "reorder":
      return reorder(state, action.payload);
    default:
      return state;
  }
};
