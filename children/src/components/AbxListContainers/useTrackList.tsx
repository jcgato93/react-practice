import { useEffect, useReducer } from "react";
import { AbxTrackItem, trackListReducer } from "./trackListReducer";
import { initialState as trackListInitialState } from "./trackListReducer";

type useTrackListProps<T> = {
  source: AbxTrackItem<T>[];
  destination: AbxTrackItem<T>[];
};

const useTrackList = <T extends object>({
  source,
  destination,
}: useTrackListProps<T>) => {
  const [
    {
      source: sourceResult,
      destination: destinationResult,
      dirty: dirtyResult,
    },
    dispatch,
  ] = useReducer(trackListReducer, trackListInitialState);

  useEffect(() => {
    dispatch({
      type: "loadLists",
      payload: { source, destination },
    });
  }, []);

  const moveToSource = (itemId: number | string) => {
    dispatch({
      type: "moveToSource",
      payload: { itemId },
    });
  };

  const moveToDestination = (itemId: number | string) => {
    dispatch({
      type: "moveToDestination",
      payload: { itemId },
    });
  };

  const loadLists = (
    source: AbxTrackItem<T>[],
    destination: AbxTrackItem<T>[]
  ) => {
    dispatch({
      type: "loadLists",
      payload: { source, destination },
    });
  };

  const reorder = (
    list: "source" | "destination",
    from: number,
    to: number
  ) => {
    dispatch({
      type: "reorder",
      payload: { list, from, to },
    });
  };

  return {
    sourceResult,
    destinationResult,
    dirtyResult,
    moveToSource,
    moveToDestination,
    loadLists,
    reorder,
  };
};

export default useTrackList;
